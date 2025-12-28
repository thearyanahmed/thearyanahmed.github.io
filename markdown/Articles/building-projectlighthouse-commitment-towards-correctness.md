> This is a highly opinionated article, part of a series “Building projectlighthouse”. 

একটা cli এর কাজ করছিলাম, যেটা [projectlighthouse](https://projectlighthouse.io/) এর সাথে api দিয়ে interact করে । Cli টি rust এ লিখা । One of things that I want is “**correctness**”. Even for small things. আর lighthouse নিজের project হয়াতে, I want to ensure that as much as I can. Obviously I can’t guarantee nor do I expect যে একদম correct program হবে, তাও । 

আরো একটা কারণ আছে,  বাংলাদেশের skill based ed-Tech, mainly **tech-“edTech”** গুলোর অনেকগুলোতে গেলেই welcome page এ আগে error আসে, পরে page আসলেও আসতে পারে । অনেক ক্ষেত্রে manual features, আর যার জন্য learner কে sometimes হয়ত customer support এ যোগাযোগ করতে হয় , sometimes wait করতে হয় , sometimes experience ভালো হয় না । অনেক সময়ই ভালো হয় না । 

Thanks for reading Aryan's Journal! Subscribe for free to receive new posts and support my work.These are based on my first hand observation. 

একদিক দিকে অনেকের complaint হলো যে আমরা অনেক পিছিয়ে আছি। আবার অন্য দিকে যা solution আকারে আসছে সেটার অবস্থা ভালো না, ঐযে welcome page এ আগে error আসে । 

I think বাংলাদেশের মানুষ এর থেকে better deserve করেন । 

So, একটা cli তে কাজ করছিলাম, যেটা binary আকারে release করা হবে । আর সেটার api টা কাজ করবে একটা remote server এর সাথে । ঐ remote server এর URL জানতে পারবে environment variable এর মাধ্যমে । Environment variable কারণ আমি locally develop করার সময় URL টি likely `**localhost**` . 

তো শুরুতে, একটা function যেটা api client টা initialise করার জন্য কিছু value রাখবে । ‌`**base_url**` , `**environment**` and `**api_version**` . এই article টা `**base_url**` কে নিয়ে । এটা likely *https://projectlighthouse.io/api* বা `*/something*` জাতীয় কিছু হবে , তবে learner রা যে cli (binary) টা use করবে সেটা always ই `***projectlighthouse.io***` call করবে  (as of current plan) , focusing on the domain, not the uri path । 

 তো একদম শুরুর code

![](https://substackcdn.com/image/fetch/$s_!UXJU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F173e0db6-b8ae-4f35-a799-09b0d2cb153c_2166x854.png)কিন্তু যেহেতু আমারা development environment এ `**localhost**` লাগবে সেহেতু hardcode না করে value টা আমি env থেকে নিচ্ছি । 

![](https://substackcdn.com/image/fetch/$s_!7eGZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff79bb65a-0c99-41ec-896e-ff4366937448_2170x210.png)And it works. কিন্তু, what is stopping me from setting 

![](https://substackcdn.com/image/fetch/$s_!vyoS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9447ace-d218-4db6-b019-5e407f7dafc8_2180x194.png)অথবা, কোনো bad actor কোনো malicious act attempt করার সময় `**LUX_API_BASE_URL=https://badactor.gonnastealyourdata.com**` type এর কিছু set করে দিয়ে `**lux auth —something**` run করতে পারে ? Could be a social engineering attack as well ? No ? 

> By the way, `**lux**` হলো cli টার নাম। 

Well, এই scenario হয়ার chance কতটুকু ? আমি probably একবার github action বা কোনো automation script set করবো যেটা `*LUX_API_BASE_URL*` কে `*https://projectlighthouse.io/api*` তে set করে । আর তারপরে likely এটা আর কেউ change করবে না । আর, এখানে অত আহামরি কোনো critical data থাকছে না যেটা hacker এসে hack করার try করবে । At least এখনো থাকছে না, সামনে কিছু feature different হতে পারে । 

### …কিন্তু, 

I think বাংলাদেশের মানুষ এর থেকে better deserve করেন । Just like the machines deserve better software for it to run. 

## How to solve itযাদের কাছে মনে হচ্ছে এটা অযথা সময় নষ্ট না, তাদের অনেকেই ভাবতে পারেন, এটা তো একটা validation লিখলেই হয়ে যায় । And হ্যা, সেটাই solution, তবে সেটা part of the solution. এটা পুরোপুরি ঠিক হবে না যতক্ষণ না আমরা এটা ensure না করছি যে `**base_url**` টা খুবি specific একটা type এর । তাহলে আমরা type দিয়েই এটাকে validate করতে পারবো । Kinda like আমাদের কিন্তু এই code টুকু validate করতে হয় না যে এটা ঠিক আছে কিনা, ‌

![](https://substackcdn.com/image/fetch/$s_!9ZvH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff804f0e5-3f96-420b-b48a-4039f6950eb5_2174x324.png)এটা compile হবে না । কারণ string “Hello” এর সাথে number 10 যোগ করা logical কিছু না । Unless you are writing JavaScript (যেটাও logical কিছু না >_<) । Lets define our base api struct, 

![](https://substackcdn.com/image/fetch/$s_!fxce!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9beb0922-29a2-478e-94e7-ec17c6b2e7b5_2178x210.png)Rust এর ভাষায় এটাকে বলে **tuple struct**. 

> Rust also supports structs that look similar to tuples, called *tuple structs*. Tuple structs have the added meaning the struct name provides but don’t have names associated with their fields; rather, they just have the types of the fields.

*from* **The Rust Book** ( [source](https://doc.rust-lang.org/book/ch05-01-defining-structs.html#using-tuple-structs-without-named-fields-to-create-different-types) ) 

Tuple struct এর কোনো named field (property) থাকে না । আমরা tuple struct use করে এখন একটা string থেকে `**LighthouseAPIBaseURL**` type construct করবো । 

![](https://substackcdn.com/image/fetch/$s_!fi5H!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe793e91-acf9-4d46-9003-794eb7f5e12f_2168x1686.png)আমরা tuple struct এ `**from()**` method expose করছি, যেটা validation logic টা execute করছে । করে একটা `**Result<Self = LighthouseAPIBaseURL, String>**` return করছে । 

## Don’t unwrap()আমরা এখানে চাইলে `unwrap()` use করতে পারতাম । তবে কে জানে, projectlighthouse কোনোদিন cloudflare এর মত billion $ company হয়ে গেলে একটা unwrap এর কারণে millions of dollar হারাবো না । 

Cloudflare outage, unwrap() somewhat দায়ী

- “In this case, the 3 hour 20 minute outage could have direct and indirect losses of around $250 million to $300 million when you consider the cost of down-time and the downstream effects of services like Shopify or Etsy that host the stores for tens to hundreds of thousands of businesses.”  - [Report by CNET](https://www.cnet.com/tech/services-and-software/cloudflare-ceo-apologizes-for-unacceptable-outage-and-explains-what-went-wrong/) .

- Outage details [Cloudflare outage on November 18, 2025](https://blog.cloudflare.com/18-november-2025-outage/) । 

Back to our rust code, আমরা validation logic টা implement করেছি। Logic টা যদি breakdown করি, তাহলে দাড়াচ্ছে, environment এর ওপর base করে আমরা আলাদা regex pattern define করছি । আর তারপরে ঐ regex pattern এর against এ ``if re.is_match(base_url) {...}`` match করছি user (আমার) এর set করা environment value `**LUX_API_BASE_URL**`  । 

এখন, আমরা actual API client টা initialize করবো । শুরুতে environment read করে, সেটার সাথে নিয়ে `**base_url**` টা construct করা । তবে, এবার আর base url টা `string` না । এবার খুবি specific ভাবে something in `**projectlighthouse.io**` domain এ । যেটার ownership আমার । 

![](https://substackcdn.com/image/fetch/$s_!uEiv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff087964f-4904-491c-89ba-91913f30e86e_1572x2082.png)আর এখন, যদি আমরা ভুল URL দেই release দেয়ার সময়, **I’ll get a compile time error**. Better to fail then, than failing at user’s end. আর শেষ মেষ, এই regex 100% accurate আছে কিনা, সেটা আমি জানি না। Regex এখনো আমার কাছে অনেকটাই German / Welsh ভাষার মত লাগে । তবে, আমি কিছু test লিখতে পারি যেটা আমার এই regex এর ওপর confidence বাড়াবে । 

![](https://substackcdn.com/image/fetch/$s_!FsU4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d8e43e1-5907-4b59-b937-eb9c3adf1800_1552x1198.png)## Was it too much ? আমার কাছে, না । এটা খুবি ছোট্ট একটা code base, হয়ত এটা কেউ ব্যবহার ও করবেন না । হয়ত করবেন । যদি করেণ, আমি কিছুটা extra guarantee দিতে পারছি যে 

- যখন কেউ কোনো নতুন install করবে বা update করবে, তারা `unreachable api` বা `wrong api` url পাবে না । 

- ঐযে যদি hacker এসে খারাপ কিছু করার try করলে, তাদের request গুলো send হবে না । কারণ, compile হবে না । 

## Verdictযদিও এটা অনেক ছোট একটা use-case, তবে correctness এমন কিছু না যেটা আমরা পরে করবো বা bug ধরা পড়লে করবো । 

> Correctness is a culture. Correctness is the cost of not coming back to fix it later. 

শেষ করছি Chernobyl এর একটা quote দিয়ে, I think they are similar, or we can think them similarly…

> “We’re on dangerous ground right now, because of our secrets and our lies. They are practically what defines us. When the truth offends, we lie and lie until we can no longer remember it is even there. But it is still there. Every lie we tell incurs a debt to the truth. Sooner or later, that debt is paid.”

Notes:- Code use না করে ছবি দিয়েছি কারণ substack এর code formatting ভালো না ।

- This article is a commitment towards correctness. যদি future এ lighthouse এর কিছুতে ভুল কিছু পান, at least raise that.  

Thanks for reading Aryan's Journal! Subscribe for free to receive new posts and support my work.