এই article টায় একটা router এর মত কিছু বানাবো। যেটা ঐ raw TCP data নিয়ে, সেটাকে HTTP তে convert করে । Well, HTTP ই থাকে শুরু থেকে, তবে form অন্য থাকে। তারপরে HTTP এর rules অনুযায়ি request parse করে আবার response ও করবো। আর along the way, একটা router এর মত কিছু বানিয়ে ফেলবো যেটা দিয়ে basic http তে communicate করতে পারবো (hopefully) ।

হতে পারে JSON, বা html । Code টা rust এ করা। আর এটা কোনো tutorial না, more like a discussion? I guess (?). 
But that’s not all. এটা বানানোর সময় কিছুটা threading আর async rust নিয়েও কাজ করা লাগছে, নাহলে একটা প্রতিটা request sequentially execute করা লাগতো! So, this article covers my findings.  

So, শুরুতে কি বানাবো? ইনশাল্লাহ একটা program লিখবো, যা Transmission Control Protocol এ data receive করবে, সেটা parse করবে আর HTTP তে response দেবে। 

Code টা rust এ লিখছি। যদিও শুরুতে ভেবেছিলাম C তে করবো (but I forgot C) । আপনি rust না পারলেও চলবে, চেষ্টা করবো পুরোটা explain করতে । আর এটা একটা tutorial না, যেখানে আমি আগেই code লিখে পরে article টা লিখছি। Infact, আমি একি সাথে দুইটা করছি, so it’s like building along the way. 

> The codebase is available at [https://github.com/thearyanahmed/rusttp](https://github.com/thearyanahmed/rusttp).

So,
 
```rust
fn main() {
    println!("Journey of a thousand miles begins with a single commit.");
}
```

তো, শুরুতে planning part. আমরা চাচ্ছি একটা program লিখতে যা HTTP তে communicate করবে। আমরা অনেক language বা framework এ handler ( or controllers) এ $request একটা variable পাই যেখানে incoming request নিয়ে value গুলো থাকে, কি data পাঠানো হয়েছে, header গুলো কি কি etc । 

## HTTP এর আগে,
প্রথমের target, এটুকু যে Tcp data আসবে আর আমরা সেটাকে accept করে `Hello, World!` response করবো। HTTP operates on top of Tcp । সংক্ষেপে Tcp  হলো IP (internet protocol) এ আসা data’র উপর আরো কিছু rules & guidelines. HTTP আবার Tcp এর ওপরে operate করে। 

এখন, শুরুতে আমরা Tcp accept করার জন্য port 8000 একটা socket connection তৈরি করে incoming data’র জন্য listen করবো। আচ্ছা, socket কি? Socket কে আপনার computer এ একটা endpoint চিন্তা করতে পারেন, যেখানে network এ থাকা ২ টা program এর মাঝে two way communication establish হয় । 

Okay, back to the code; rust এর standard library তে TcpListener একটা …ummm.. let's say কিছু functionality আছে, যেগুলো দিয়ে Tcp’র সাথে interact করা যায়। 


```rust
use std::net::TcpListener;

fn main() {
    println!("Journey of a thousand miles begins with a single commit.");

    let listener = TcpListener::bind(“localhost:8000”).expect("failed to bind to address localhost:8000");

    for incoming_stream in listener.incoming() {
        println!("stream coming in");
    }
}
```

এখানে আমরা localhost:8000 এর সাথে bind করার চেষ্টা করছি। Bind হয়ে গেলে, যতক্ষন stream (of data) আসতে থাকবে ততক্ষন আমরা শুনতে থাকবো আর ঐ stream data নিয়ে কিছু করবো। 

আচ্ছা, bind করার চেষ্টা কেন? কারণ bind fail হতে পারে, কারণ হয়ত ঐ port blocked আছে। অন্য কোনো ~program~ process ব্যবহার করছে । 

এখন যদি আমরা একটাকে run করি, আর তারপরে `curl http://localhost:8000` এ request করি, তাহলে আমরা দেখবো `streaming coming in` terminal এ আসছে।

আচ্ছা, first step শেষ। Stream handling part টাকে `handle_incoming_stream` এ নিয়ে যাচ্ছি।

Back to the code,
```rust
use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
};

fn main() {
	// .. old code

    for incoming_stream in listener.incoming() {
        match incoming_stream {
            Ok(valid_stream) => handle_incoming_stream(valid_stream),
            Err(err) => eprint!("connection failed \nerr::{}", err),
        }
    }
}
```

এখানে বেশ কিছু জিনিস add হয়েছে । First of all, `listener.incoming()` একটা `Result` type return করে।

## Result<T,E>
 `Result` কি? Rust এ Result হলো একটা enum. এটার ২ টা variant হতে পারে। 
Ok(T) আর Err(E)। 

ধরুন একটা function থেকে একটা error আসতে পারে যি কিছু ভুল হয়, বা একটা valid value আসতে পারে। Valid value টা Ok(T) variant এ পাওয়া যাবে, আর error হলে Err(E) তে। 

তো আমরা যদি একটা valid stream পাই, তাহলে আমরা একটা function call করবো, আর না পেলে connection failed print হবে। 

## Handling Incoming Stream
এবার actually connection টা handle করার code. 

```rust
fn handle_incoming_stream(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let request = String::from_utf8_lossy(&buffer[..]);
    println!("received request \n->{}", request);

    let response = "Hello from server!".as_bytes();

    stream
        .write_all(&response)
        .expect("failed to write to stream");
    stream.flush().expect("failed to flush response")
}
```

একটা জিনিস খেয়াল করে দেখবেন যে parameter এর আগে `mut` একটা keyword আছে। `mut` মানে হলো variable টা mutable। মানে, একবার value  assign করার পরে আবার change করা যাবে। By default, rust immutable. একবার (say `let x = 1;` ) value assign করলে আর change করা যায় না । 

আচ্ছা, কিন্ত stream টা mutable কেন? আসলে আমরা 2 way communicate করছি same connection এ । আমরা data read করছি stream থেকে, আবার যখন response করবো তখন ঐ stream এই write করতে হবে। মানে stream এর কিছু state (value) change হবে । তাই rust এর developer রা এটাকে mutable করেছেন। 

Moving forward, আমাদের এখন কাজ হলো stream থেকে data read করা। Read করার data টা কোথাও রাখা লাগবে। সেটার জন্য আমরা একটা variable নিচ্ছি `buffer`. এটা একটা array of bytes (`u8`) । আমরা যে data টা read করবো সে hold করার জন্য এই buffer । It’s like preparing a bucket before you want to hold something in it.

1024 কেন? এটা adjustable. আমাদের example program এ এটা একটা average value. যদি বেশি বড় buffer নেয়া হয় তাহলে অনেকখানি allocated memory unused থেকে যাবে। আবার ছোট নিলে পুরো data read হবে না ।

`String::from_utf8_lossy()` function টা bytes array (slice) কে string এ convert করে। আমরা এখানে শুরুতে just print করছি, কি আসে request এ। আর এরপরে একটা string `Hello from server!` ঐ একি stream এ write করবো, যেটা client receive করবে।

এখন যদি আমরা run করি আর curl করি, তাহলে 

client side এ
```bash
curl "http://localhost:8000/dashboard?hello=world"
curl: (1) Received HTTP/0.9 when not allowed
```

server side এ
```txt
GET /dashboard?hello=world HTTP/1.1
Host: localhost:8000
User-Agent: curl/8.6.0
Accept: */*
```
 
এরকম একটা value printed দেখতে পারবেন। Hummm… server side এ যেটা দেখতে পাচ্ছেন, সেটা হলো একটা pure HTTP request. খেয়াল আছে যে protcol হলো কিছু rules and guidelines? HTTP এর ruleset এ এরকম কিছু পাবেন যে request টা (data stream) শুরু হয়ার কথা এরকম format এ

```
$method $routePath $HTTP_VERSION
$header[0].key : $header[0].value
$header[N].key : $header[N].value
$requestBody
```
আমাদের এখানে GET হলো http method, আপনারা যদি GET, POST, PUT, PATCH, DELETE ব্যবহার করে থাকেন সেটা। `/dashboard?hello=world` হলো route path with query parameter, আর এরপরে HTTP version. আমরা request করেছি HTTP/1.1 । এখন (as of the date of writing), HTTP2 আর HTTP3 ও আছে। 

পরের header গুলো key value pair হিসাবে থাকে, আর `:` (colon) দিয়ে separated । আমরা এই request এ কোনো data (form body / body content ) send করিনি। তাই আর কিছু নেই। 

আপনারা যদি পর পর দুইটা request করেন তাহলে দেখবেন ১ম আর ২য় request এর মাঝে একটু ফাকা আছে । কারণ, HTTP’র আরেকটা rule হলো request গুলো ২ টা (`\n\n`) new line দিয়ে শেষ করবে।

## HTTP RFC
HTTP এর rules and guideline নিয়ে পড়বে পারবেন : 
 [https://datatracker.ietf.org/doc/html/rfc2616](https://datatracker.ietf.org/doc/html/rfc2616) . 

আচ্ছা, `curl: (1) Received HTTP/0.9 when not allowed` কেন? আমরা তো HTTP/1.1 এ request করলাম। হ্যা। কিন্ত server response করেছে কোনো specific কিছু declare না করে। তাই default ভাবে 0.9 version এ response গিয়েছে। এটা fix করতে আমরা আমাদের response text এ বলেদিবো যে এটা আসলে HTTP/1.1 .

Adjusted code,
```rust
let response = "Hello from server!";
let response = format!(
    "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}\n\n",
    response.len(),
    response
);

stream
    .write_all(&response.as_bytes())
    .expect("failed to write to stream");
```

And that should fix the problem. 

এখন আমরা একটা জিনিস simulate করি, যে আমাদের application হয়ত কিছু জিনিস process করতে সময় নিচ্ছে, ধরুন ১০ second । কিন্ত তাও যেন আমাদের server অন্য request handle করতে পারে। যদি `handle_incoming_stream()` function এ একটা thread sleep code করেন, তার ২ টা request করেন পর পর তাহলে দেখবেন ২য় request টা অনেকক্ষন stuck হয়ে আছে। 

How about, আমরা request গুলো handle করার জন্য একটা করে thread spawn করি। 

```rust
match incoming_stream {
    Ok(valid_stream) => {
        std::thread::spawn(|| handle_incoming_stream(valid_stream));
    }
    Err(err) => eprint!("connection failed \nerr::{}", err),
}
```

আমরা `std` এর thread crate ব্যবহার করে thread spawn করছি। এখন request করলে দেখবেন response ঠিকই আসছে। Individual response আসতে সময় লাগবে কারণ sleep করছে (or heavy কিছু করছে)। কিন্ত আলাদা আলাদা request করলে সেটা ঠিকি কাজ করবে। 

## A Thread For Each Request
আসলে এটা efficient না, কারণ thread spawn করা একটা heavy operation. আর OS আপনাকে এত বেশি thread spawn করলে অন্য process গুলো কিভাবে কাজ করবে? 
এটা change করার দরকার । শুরুতেই multi threading এ যেতে চাচ্ছি না। কেন? কারণ এটা complexity add করবে। 

Multi threading করা অনেক সহজ (আমরা already করেছি)। Right way তে multithreading অনেক কঠিন। অনেক গুলো caviat আছে। আর আমাদের এই মুহূর্তে লাগবে ও না। কারণ, আরেকটা option আছে। সেটা হলো concurrency! Asynchronous execution. অনেকটা nodejs এর মত। Difference হলো nodejs / javascript single threaded. Rust multi threaded. 

এখন আমাদের যেটা করা লাগবে সেটা হলো একটা async runtime নিয়ে কাজ করা লাগবে। আচ্ছা, runtime কি? 

## Runtime (RTE)
Runtime কে চিন্তা করতে পারেন একটা program যেখানে আপনার লিখা code টা run করবে, sort of একটা platform যেটার উপরে আপনার code act করবে। এই platform কিছু extra and necessary functionality add করে। যেমন ধরেন memory allocation, exception handling, concurrency, multi threading, library support, reflection etc. 

Note: ২ ধরণের runtime concept আছে programming এ। একটা হলো program টা যখন run করছে, CPU যখন machine code টা নিয়ে program instruction গুলো execute করে। এটাকে আমার জানামে (RT) দিয়েই বোঝায় । তবে আমি যে runtime এর কথা বলছি সেটা হলো RTE, elaborate করলে runtime environment. RTE ২ ধরণের আবার। Language specific and general purpose.

আচ্ছা back to the context, আমরা per request এ thread spawn না করে async way তে handle করবো। সেটার জন্য আমরা rust এর tokio crate টা ব্যবহার করবো।

## Tokio
Tokio is an async runtime for Rust. Tokio add করতে `cargo add tokio --features=io-util,macros,rt-multi-thread,net` command টা দিলে tokio আমাদের dependency হিসাবে আসবে। এখন code change করার part. 

```rust
#[allow(dead_code)]
use std::io::{self};
use tokio::io::{AsyncReadExt, AsyncWriteExt}; // change
use tokio::net::{TcpListener, TcpStream}; // change

#[tokio::main] // change
async fn main() -> io::Result<()> { // change
    println!("Journey of a thousand miles begins with a single commit.");

    let addr = "localhost:8000";

    let listener = TcpListener::bind(addr).await?; // change: now using tokio::net::TcpListener;

    loop {
        let (socket, _) = listener.accept().await?; // change: but the same idea
        tokio::spawn(async move {				 // change: instead of threads, we are spawning tasks 				
            if let Err(e) = handle_incoming_stream(socket).await { // change: we’ve added .await
                eprintln!("Failed to handle connection: {}", e);
            }
        });
    }
}

async fn handle_incoming_stream(mut stream: TcpStream) -> io::Result<()> {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).await?; // change

    let request = String::from_utf8_lossy(&buffer[..]);
    println!("received request \n{}", request);

    let response = "Hello from server!";
    let response = format!(
        "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}\n\n",
        response.len(),
        response
    );

    stream.write_all(response.as_bytes()).await?; // change
    stream.flush().await?;

    Ok(())
}
```

আচ্ছা, বেশ কিছু change হয়েছে। যারা rust করেন নি, তাদের জন্য mainly চেষ্টা করছি একটু ভেংগে বলতে, at least important parts. প্রথমত, আমরা import change করেছি, `TcpStream` আর `TcpListener` এই দুইটা। কেন? কারণ, আমাদের আগের TcpListener আর TcpStream (std::net) হলো synchronous, aka blocking! যার জন্য আমাদের thread লেগেছিলো একটু আগে। Tokio’র TcpListener আর TcpStream হলো async. এটার আরেকটা reflection হলো listener bind করার পরে, connection accet করার পরে, আর stream read আর stream এ write করার পরে `.await` keyword টা add করা হয়েছে।

## Let it .await
আচ্ছা, `.await` কি করছে? Well, ঐ কাজ (function) টা শেষ হয়ার জন্য await করছে। যদি `listener.accept().await` কে যদি javascript এর মত করে লিখি, তাহলে এরকম হবে অনেকটা
```js
// pseudo code

// imagine listener is an object of Listener class,
async someFunc(listener) {
	let socket = await listener.acceptConnection()
}
```

Rust এর `.await` এই কাজটাই করছে। কেন? কারণ এটা i/o bound । যেহেতু program টা i/o bound, সেহেতু এটা eventloop ( হ্যা, এখানেও eventloop আছে ) এ offload হয়ে যাচ্ছে। যেহেতু program টা জানে না কখন কাজ শেষ হবে, আর পরের লাইনেই কিন্ত socket value ব্যবহার হচ্ছে, যে value টা `accept()` এর return value. এখানের `accept()` function টা একটা `Future` return করে। Um.. `Future` হলো অনেকটা `Promise` এর মত। কিন্ত ভিতরের mechanism আলাদা, কিছু fundamental difference আছে। 


## The false perception of async
একটু offtopic এ যাচ্ছি। আমি বেশ কিছু developer এর কাছে দেখেছি তারা মনে করেন যে async code হলে blocking functionality হলে ওটাকে side এ রেখে পরের line এ চলে যায়। এখানের `handle_incoming_stream()` code এ ধরেন `stream.read().await` এর জন্য wait না করে পরের `let request = String::from_utf8_lossy(&buffer[..]);` line এ চলে যাবে। 

কিন্ত আসলে সেটা না। async await এটা mainly CPU এর জন্য। যদি ২টা request আসে পর পর, তাহলে CPU একটা process করবে, করার সময় যখন `Future` (i/o bound) কাজ পাবে তখন সেটাকে (i/o bound কাজ টা) offload করে সেটা execute করতে থাকে, আর ঐ যেখান থেকে eventloop এ track রাখে। আর in the meantime, যতক্ষন না i/o bound কাজ শেষ হয় background এ, ততক্ষন ২য় reqeust টা শুরু হয়ে যায়। একি ভাবে যতক্ষন না similar কোনো বাধা পায় বা i/o bound কাজ শেষ হয় আর runtime যেভাবে schedule করে সে অনুযায়ি execute করবে। আপনি চাইলে debuggar এ কিছু breakpoint add করে কিছু print statement দিয়ে test করে দেখতে পারেন। Code synchronous way তেই execute হবে। কারণ async CPU এর জন্য । Single function এ code wait না করে পরের line এ চলে যাওয়ার জন্য না। সেটার জন্য `goroutine` / `coroutine` / `threading` লাগবে, যেটা different topic.

আচ্ছা, এটুকু তো আমরা achieve করলাম, non blocking i/o এর router. Next target হলো একটা router, যেমন laravel এ route add করা যায় আর controller এ `Illuminate\Http\Request $request` এ access পাওয়া যায়, বা `go` এর `net/http` এর `http.HandleFunc` এও `r *http.Request` পাওয়া যায়, দুইটাই কিন্ত Request ( http request ) এর information carry করে। তো, আমরা একটা router বানাবো, যেটা 

Back to code, আমরা code টা আবার change করবো। আমি এরকম একটা api চাচ্ছি যে router এ http method, endpoint আর একটা handler function add করা যাবে যাতে user ( programmer ) এই router টা ব্যবহার করে নিজের মত করে route add করতে পারে। অনেকটা এরকম। 

```rust

let router = Router::new();

router.add_route(“GET”, “/hello”, hello_handler_func);
router.add_route(“GET”, “/world”, world_handler_func);

router.listen_and_serve(); // 

// hello_handler_func 

func hello_handler_func(req: Request) -> Response {} 
```
So, after adjusting the code, 

```rust
#[allow(dead_code)]
use std::io::{self};
use std::sync::Arc;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::{TcpListener, TcpStream};

struct Router {}

impl Router {
    // it is not public because it's in the same module for this example.
    pub fn new() -> Self {
        Self {}
    }

    pub async fn listen_and_serve(self: Arc<Self>, addr: &str) -> io::Result<()> {
        // let addr = "localhost:8000";

        let listener = TcpListener::bind(addr).await?;

        loop {
            let (socket, _) = listener.accept().await?;
            let router_clone = Arc::clone(&self); // Clone Arc<Self> for each task

            tokio::spawn(async move {
                if let Err(e) = router_clone.handle_incoming_stream(socket).await {
                    eprintln!("Failed to handle connection: {}", e);
                }
            });
        }
    }

    async fn handle_incoming_stream(&self, mut stream: TcpStream) -> io::Result<()> {
        let mut buffer = [0; 1024];
        stream.read(&mut buffer).await?;

        let request = String::from_utf8_lossy(&buffer[..]);
        println!("received request \n{}", request);

        let response = "Hello from server!";
        let response = format!(
            "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}\n\n",
            response.len(),
            response
        );

        stream.write_all(response.as_bytes()).await?;
        stream.flush().await?;

        Ok(())
    }
}

#[tokio::main]
async fn main() -> io::Result<()> {
    println!("Journey of a thousand miles begins with a single commit.");

    let router = Arc::new(Router::new());

    router
        .listen_and_serve("localhost:8000")
        .await
        .expect("failed to listen and serve");

    Ok(())
}
```


## Arc
Code টুকু mostly একি আছে তবে একটা গুরুত্বপূর্ণ জিনিস change হয়েছে। সেটা হলো `Arc` নামের একটা জিনিস add হয়েছে। Arc এর full form হলো Atomic Reference Counter । 
Arc একটা reference count রাখে। `let router_clone: Arc<Router> = Arc::clone(&self);` এখানে router নিজের একটা clone করছে। এটা প্রয়োজন কারণ পরের লাইনে `task::spawn` 
করছে। Rust specific এই একটা জিনিস হলো যে একটা value’র এক সময় একটাই owner থাকতে পারে। আর out of scope এ চলে গেলে value drop করে। এখন আমাদের router যেহেতু `move` করছে `(async move { /** here* /})` সেহেতু Arc এর মাধ্যমে একটা count রাখে। যদি count > 0 হয়, তাহলে value টা drop করে না । Tokio internal threadpool use করে। সো main thread এর বাইরে। 

> যদি Arc confusing লাগে তাহলে you can ignore it. Let’s just say এটা আমাদের একটা way async task (from tokio) use করার জন্য। Essential way.

Back to the code, আমাদের এখন objective হলো 
- যে request আসবে, সেটা parse করে match করার চেষ্টা করবে আমাদের routes এ সেটা add করা আছে নাকি
- যদি থাকে, তাহলে সেই handler টা execute করে content render করা
- আর না থাকলে একটা 404 not found response দেয়া


## Parsing the Request
আমরা প্রথমে buffer এ নেয় bytes গুলোকে string এ convert করবো। তারপরে RFC অনুযায়ি parse করে করে validate করবো । String এ convert করার পরে আমাদের request এ দেখা যাবে হয়ত অনেকগুলো `\0\0\0\0\0` এরকম আছে। এগুলো যদি দেখে থাকেন, সেটার কারণ হলো আমরা যে buffer size 1024 বলে দিয়েছিলাম, তো যেটুকু data (bytes) এসেছে সেটুকু value তো আছে, কিন্ত বাকিগুলো \0 বা null byte দিয়ে fill হয়ে আছে। আমাদের এই null byte character গুলোর দরকার নেই। আমরা তাই এগুলো কে filter করে ফেলবো। 

```rust
if let Some(null_index) = request_string.find('\0') {
      request_string.truncate(null_index);
}
```
Now we have the meat. বাকি অংশ টুকুকে আমি ৩ ভাগে ভাগ করবো। ১ম লাইনটা হলো request line. এখানে HTTP version, path with query আর HTTP method (verb) দেয়া থাকে। এটা দিয়ে শুরু হলো। প্রতিটি নতুন লাইন \r\n দিয়ে split করা। ১ম লাইনের পর থেকে header, আর শেষ header এর পরে \r\n\r\n থাকে, তার পরেই body part টা শুরু হয়। আপনি যদি form-data বা json data send করে থাকেন, সেটা এখানে থাকবে। আর body’র শেষ হয়ার পরে \r\n আর তারপরেই \0\0\0\0 repeat থাকে, যেগুলো আমরা filter করে ফেলেছি।

Request parse হয়ে গেলে আমাদের খুজতে হবে এই route এর জন্য আমাদের route list এ কোনো handler register আছে কিনা। যদি না থাকে, তাহলে default একটা response send করবো। আর যদি থাকে তাহলে handler টা execute করবো। আমাদের handler এর signature হলো
```rust
F: Fn(&Request) -> Response + 'static + std::marker::Sync + std::marker::Send,
```

এখানে rust এর witchcraft টা side এ রেখে যদি বোঝার চেষ্টা করি, তাহলে আমাদের handler হলো একটা function `F` (`Fn`), যেটা একটা reference পাবে `Request` এর। যে request struct টা আমরা parse করে আগের step এ তৈরি করেছি, সেটা। আর আসলে এভাবেই আমরা laravel এর controller method এ `Request $request` , Go এর `net/http` এর handlerFunc এ `r *http.Request` বা express এর ` (req, res) => {}` এই value গুলো পাওয়া যায়। 

আর আমরা এটাও বলে দিয়েছি যে ঐ handler গুলো একটা `Response` struct return করবে। যেটার value আমরা stream এ write করবো আর শেষে stream টা flush করে দিবো।  আচ্ছা, stream flush না করলে কি send হবে data? Most probably না। At least পুরোটা যাবে না। কারণ `stream.write_all()` internal buffer এ write করে, যখন আমরা flush করি তখন client এর কাছে যাওয়ার জন্য stream এ write হয়। 

## Stream flush
Stream flush ব্যবহার করার কিছু কারণ ও আছে। যেমন timely manner এ data transmission. Flush করাটা ensure করে যে data টা actually ঐ সময়ে send করা হয়েছে। Low latency, real time communication এধরণের application এর জন্য প্রয়োজন। আর শুধু এটাই না, কিছু কিছু ক্ষেত্রে stream flush করার মাধ্যমে একটা indicate করে যে তার transmission শেষ। 
কখনো graceful shutdown করেছেন? সেখানেও কিন্ত somehow signal দেয়া প্রয়োজন যে program টার data send done, এখন shutdown হতে পারে! 

আমরা যে বিভিন্ন library বা framework ব্যবহার করি, সেখানে program request পায় raw http stream আকারে, কিন্ত developer এর সুবিধার জন্য simple কিছু interface এর মাধ্যমে ঐ data গুলোকে expose করে।  

```go
http.HandleFunc(“/endpoint”, func (w http.ResponseWriter, r *http.Request) {
    // handler logic
})
```
```js
app.get(‘/endpoint, (req, res) => {
    // controller logic 
})
```
```php
public function store(\Illuminiate\Http\Request $request)
{
    // controller logic    
}
```

এই response writer আর res হলো socket এ write করার একটা interface. যেটার মাধ্যমে আমরা client কে response দেই । এখন আমাদের নিজেদের handler এর response টা client কে send করার code, 
```rust
let response = match self
    .routes
    .get(&(request.get_method(), request.get_path().to_string()))
    {
        Some(handler) => handler(&request), // আমরা যদি দেখি যে ঐ method আর route এর জন্য handler আছে তাহলে সেটার response set করছি
        None => Response::default_response(), // নাহলে default একটা
    };

    stream
        .write_all(response.build_http_response().as_bytes()) // finally response নিয়ে stream এ write করছি client এর জন্য
        .await?;
    stream.flush().await?;
```

আচ্ছা, এটা তো হলো, এখন as a user (of the http router) আমরা use করে দেখি। 

```rust
async fn main() -> io::Result<()> {
    let mut router = Router::new();
    router.add_route(Method::GET, "/whoami", who_handler);
    router.add_route(Method::POST, "/say-hi", say_hi_handler);

    let router = Arc::new(router);

    router
        .listen_and_serve("127.0.0.1:8000")
        .await
        .expect("failed to listen and serve");

    Ok(())
}

fn who_handler(_req: &Request) -> Response {
    let mut response = Response::success();
    response.set_content("Hi, I'm Aryan!".to_string());
    response
}

fn say_hi_handler(_req: &Request) -> Response {
    let mut response = Response::success();
    response.set_header("Content-Type".to_string(), "application/json".to_string());

    response.set_content(
        r#"{ "message": "Hi, So, this is supposed to be a post method!"}"#.to_string(),
    );

    response
}
```

আমরা শুরুতে router initialize করে /whoami GET method এ আর /say-hi post method এ register করেছি। Handler গুলোর body দেখলে দেখা যাচ্ছে যে একটা req struct accept করে, আর `Response` struct return করে। Time to try it out. 

```bash
curl -sX POST -d “some=value” http://localhost:8000/say-hi | jq
```
And I see the response

```json
{
  "message": "Hi, So, this is supposed to be a post method!"
}
```

এইতো, আমাদের HTTP router. It kinda works. এই article এ full code দেয়া নেই। চেষ্টা করেছি topic related code গুলো দিতে। আমি আরো কিছু change করে [https://github.com/thearyanahmed/rusttp](https://github.com/thearyanahmed/rusttp) রাখছি। এখানে একটা endpoint add করেছি যেখানে `public/` folder এর html file গুলো query param দিয়ে দেখা যাবে। যেমন `http://localhost:8000/page?view=hello-world` এটায় visit করলে `public/hello-world` টা render হবে। 

Code টা mainly demo purpose এ করা। সময় নিয়ে article টা পড়ে থাকলে ধন্যবাদ। 

**Notes:**
- Variable and function naming, Arc এগুলো convention এ focus না রেখে মূলত descriptive রাখার চেষ্টা করেছি বুঝার সুবধার্তে। 
- Pure HTTP request কোনো technical term না। 
- ইচ্ছা আছে Future নিয়ে ভবিষ্যতে একটা article লিখার । But if you find the time, check it out yourself, it is really simple yet amazing.
- Codebase টা optimise করা না, লিখা হয়েছে এই article টার জন্যই।
