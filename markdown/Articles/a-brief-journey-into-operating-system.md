আমরা প্রায় ই শুনে আসছি, computer এ সব কিছুই binary. 1 আর 0. আমরা যখন কোনো program / code লিখি,  তখন সব compile হয়ে binary তে convert হয়, computer সেটা run করে। হ্যা । কিন্ত এইযে binary, 0 আর 1, এটা টো থিওরি। আমরা ০ আর ১ বলি। A আর B বলতে পারতাম। কিন্ত এই ০ আর ১ বাস্তবে কিভাবে কাজ করে? ফোনে কথা বলার সময় কিভাবে signal গুলো যায়? এটার উত্তর খুজতে খুজতে একটা software বারবার ই সামনে আসে যা আমরা underlook করে যাই। আর সেটি হলো Operating System.  

Operating System modern day computing এর fundamental একটা component. যদিও বেশির ভাগ সময়ে আমরা Operating System এর end user হিসাবেই ব্যবহার করে থাকি ( Mac, Linux, Raspberry Pi, Android )। তবে OS indivually / নিজে কিভাবে কাজ করে তা নিয়ে বেশির ভাগ সময় ভাবে না। OS খুব সুন্দর ভাবে back stage থেকে পুরো program (অনুষ্ঠান) টা পরিচালনা করে । অন্তত আমাদের কাছে। কিন্ত software এর point of view থেকে এটা একদমই অন্যরকম। 

বর্তমানে frontend বা backend development নিয়ে অনেক ধরণের course, tutorial আর training আছে । তবে somehow, এই fundamental piece of software টা নিয়ে খুবি বেশি কিছু নেই। তাই, চেষ্টা করবো OS এর fundamental কিছু বিষয় নিয়ে কথা বলতে । হয়ত, article গুলো শেষে computer এর এই amazing universe নিয়ে আমাদের কিছুটা understanding better হবে। 

## What is an Operating System?
Operating System আর ১০ টা software এর মত আরেকটি software, যার মুল কাজ **Operate** করা। আলাদা আলাদা hardware এর সাথে interact করা । একটি computer এর কিছু hardware component আছে যেটা ছাড়া একটা computer operate করতে পারে না। যেমন CPU, RAM, Networking Interfaces, some part of Storage । আবার কিছু logical part আছে ( eg: instruction set for executing something).  OS এর কাজ এসব resource manage করা (CPU time, Memory, disk space etc), process ঠিক মত schedule & maintain করা করা, process এর জন্য resource allocation, security, error handling যেমন একটি program ঠিক মত না চলার কারণে যেন অন্য program ও সব crash না করে etc. 

OS আমাদের অনেক কাজ সহজ করে দেয় । Market এ different vendor এর different types of devices, different CPU architecture **x86 , ARM, RISC-V, MIPS** .. different types of RAM with different generations like **DDR2, DDR3** , different monitors that supports **VGA** and **HDMI** and **USB2.0, USB2.1, USB3.0, USB C** etc. Different vendor এর different api, different approach একেকটা problem solve করার জন্য । Apple এর recent M series এর (M1, M2, M3) process গুলোতে ARM architecture intel এর processor গুলো থেকে অনেক ভালো করছে। তারা আলাদা ভাবে সলুশন করতে পেরেছে। 

> Operating System, a piece of software that **abstracts** away hardware complexities, enabling seamless interaction between software applications and diverse hardware configurations.

এই abstraction, software engineering এর one of the most powerful concept। এর মাধ্যমে আমরা একটা standard এ focus করে কাজ করতে পারি instead of thinking of all every possible implementation [more on this later].  

উদাহরণ দিতে হলে imagine করতে পারেন একটা Spacecraft, in a galaxy far far away. Operating System হবে spacecraft এর **captain**. Captain তার crew এর মাধ্যমে ( + সাহায্যে ) spacecraft টি পরিচালনা করছে। Captain তার craft এর সব বিষয়েই অবগত। Craft টির প্রতিটি core component এর দায়িত্বে আছে এক একজন Chief Officer. আর captain bridge বা control centre থেকে প্রতিটি component control করছে। 

Bridge, বার এই control centre হল **Kernel**. Kernel কে বাংলা করলে হয় **শাঁস, শস্য, কেন্দ্রস্থল** । Operating System এর core component টি হলো kernel. যা hardware এর সাথে OS এর interaction করায়। আমাদের spacecraft এর engine (CPU), communications (Networking), storage compartment (persistent storage : hard drive), communication device (I/O) etc control করে Captain (OS) তার bridge / control centre (Kernel) এর মাধ্যমে । 

Kernel কেন? Kernel আলাদা আলাদা hardware এর সাথে communicate করতে পারে, যা OS নিজে থেকে পারে না। Hardware এর সাথে communicate করার জন্য Kernel component টাই OS use করে। আমরা যখন variable declare করি, variable গুলোকে
```go
a := 22
b := 9
c := a + b
fmt.Printf("%d",c) 
```
value ধরে রাখতে memory তে যায়গা লাগে। Program OS এর কাছে memory allocate করার জন্য বলে। OS যখন memory allocate করে, তখন Kernel কে বলে এই value গুলোর জন্য memory space লাগবে। Kernel তখন RAM এর actual physical space এ write করে (এর মাঝে আরো অনেক step আছে)। আমরা কিন্তু চাইলেই অন্য model এর ram, cpu, disk etc ব্যবহার করতে পারি, যেগুলোর architecture একটা থেকে আরেকটা একদমই ভিন্ন। Even though আমাদের program এ কিন্ত কোনো change করা লাগছে না। কারণ কোন hardware এর সাথে কিভাবে communicate করতে হবে তা Kernel জানে আর kernel ই handle করে। 

এটা না হলে সব programmer এর যত ধরণের device এ তার program রান করতে চায় তত ধরণের device এর hardware integration নিয়ে জানতে হতো আর instructions লিখতে হত। এই ৪ লাইন যোগ program execute করতেও হয়ত হাজার হাজার line instructions লিখতে হত। শুধু hardware এর সাথে communicate করার জন্য। 

OS এর সাথে সাথে আরো কিছু responsibilities পালন করে। যেমন, আপনার computer এ এখন হয়ত ১০০ টি program রান করছে। আপনার RAM যদি হয় ২ gb, আর প্রতিটি program run করতে যদি ১০০ mb করে যায়গা লাগে তাহলে 100 * 100 = 10,000 / 1024 = 9.7 gb এর মত RAM লাগার কথা। তাহলে এতগুলো program চলবে কিভাবে? আমাদের computer এ সাধারণত এর থেকে অনেক বেশি program রান করে আরো বেশি memory’র । 

আবার আমরা অনেক সময় একটা বড় ফাইল download করে অন্য কিছু করতে থাকি। আমাদের computer যদি একটা file download করার কাজে ব্যস্ত থাকে, তাহলে আমরা ঐ সময়ে অন্য কাজ করি কিভাবে? 

এরকম বিভিন্ন বিষয় handle করা OS এর কাজ। কখন কোন process কে priority দিয়ে কাজ করতে হবে, কোন process এর জন্য কতটুকু resource ঠিক আছে, file system এ file, directory, permission etc manage করা ইত্যাদি। 

To summarise,
1. **Manages hardware:** OS আপনার ব্যবহার করা software (যেমন browser বা game) এবং আপনার computer এর physical components (CPU, memory, storage) এর intermediary হিসাবে কাজ করে। এটি বিভিন্ন program এ processing power এবং memory এর মতো resource allocate করে ।
2. **Provides user interface:** OS আপনাকে computer এর সাথে interact করার একটি উপায় offer করে। এThis can be a graphical user interface (GUI) with windows, icons, and a mouse, or a command-line interface (CLI) where you type commands.
3. **Runs programs:** The OS loads programs into memory and manages their execution. This includes keeping track of open applications, allocating resources, and ensuring they don't interfere with each other. 
4. **File management:** OS hard drive এর মতো storage device এ file organise করে ৷ এটি folder তৈরি করে, file কোথায় আছে তা track রাখে এবং আপনাকে সেগুলি access, edit এবং delete করতে দেয় ।
5. **Security:** The OS helps protect your computer from malware and unauthorised access. এটা controls করে  কোন প্রোগ্রাম কি অ্যাক্সেস করতে পারবে  and provides features like user accounts and passwords.
6. **Device management:** OS connected devices যেমন printers and scanners গুলকে manage করে, allowing you to interact with them. 
7. **Networking:** The OS enables your computer to connect to networks and the internet. It handles communication protocols and allows you to access online resources.


যদি [What Happens When - Part 1](https://www.linkedin.com/posts/thearyanahmed_knowyourbasics-activity-7211444623355822082-qGPS/?utm_source=share&utm_medium=member_desktop) পড়ে থাকেন, ওখানে DNS resolution কিংবা Socket management এর কথা বলেছি সেগুল কিন্তু ওএস করে । 

## Do we always need an Operating System?
### No
আমাদের আসলে সব সময় Operating System এর দরকার হয় না। আমরা, end user হিসাবে আমাদের Operating System লাগে। আমাদের life টা কিছুটা সহয করার জন্য । যারা software engineering করেছেন, software তৈরি করছেন, আমাদের software develop and run করতেও ( eg: servers ) OS লাগে। তাই ব্যবহার করা হয়, কিন্ত আপনি চাইলে OS ছাড়া directly kernel এর জন্য code লিখতে পারবেন । Infact, একদম low level কিছু কাজের ক্ষেত্রে like IOT, embedded systems, RTOS etc এর অনেকাংশেই OS ছাড়া directly kernel এর সাথে interface করে software তৈরি করা হয়। 

> You can build your own Operating System & Kernel

এইতো ছিলো intro এর মত একটা article. আমরা এই series of article এ Operating System এর কিছু core বিষয় যেমন resource management, process management, stacks.. stackoverflow কেন হয়? And heap, virtual memory, task scheduling, networking এর packets, IP, DNS subnet etc, file descriptor, context switching, concurrency & parallelism, asynchronous io এসব নিয়ে আলোচনা করবো। 


ভুল কিছু বাঁ unclear থাকলে জানাবেন । যদি সময় নিয়ে পড়ে থাকেন তার জন্য ধন্যবাদ ।