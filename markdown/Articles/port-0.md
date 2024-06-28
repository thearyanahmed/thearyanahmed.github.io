কখনো port conflicting এ পড়েছেন ? 
একই app এর দুইটা বাঁ কয়েকটা instance লাগবে । Port আলাদা করে dynamic করে run করা লাগে । It doesn't scale well . আমি এরকম একটা situation এ পড়েছিলাম যে E2E test এর জন্য প্রতি test case রান করার আগে নতুন করে server ( api ) রান করতে হবে । 

সমস্যা হল ১০০০ টা test case থাকলে আর প্রতিটা test case যদি ২ সেকেন্ড চলে তাহলে প্রতিবার test run করলে 16 minutes and 40 second এর মত সময় লাগবে । এটাকে fast করতে parallel ভাবে রান করলে অনেক fast test result পাওয়া যায়। 

কিন্তু সমস্যা হল একবার socket এ serve করার জন্য bind হয়ে থাকলে আরেকটা process তো ঐ port এ bind হতে পারে না । হুম...। কি করার ? 

Well, operating system এ একটা solution আছে । আপনি যদি PORT 0 (zero) তে bind করেন তাহলে OS একটা available port খুঁজে assign করে। 

পুরানো আরেকটা app এ ও ব্যবহার করেছিলাম 
```rust
// config

let config = {
    let mut config = get_configuration().expect("could not load config");

    config.application.port = 0; // Assign port 0
        
    config
};

let app = Application::build(&config)
    .await
    .expect("failed to build application.");

let port = app.port();

let address = format!("http://localhost:{}",port);

let _ = tokio::spawn(app.run_until_stopped());

let db_pool = get_connection_pool(&config.database);

println!("address is {}",address);
```

and telling TCP to use this port,

```rust
let address = format!("{}:{}",&config.application.host,&config.application.port);

let listener = TcpListener::bind(&address)?;

let port = listener.local_addr().unwrap().port();

let server = run(listener, connection_pool, email_client, format!("{}",&config.application.base_url))?;
```

[https://github.com/thearyanahmed/newsletter/](https://github.com/thearyanahmed/newsletter) full source code. 
