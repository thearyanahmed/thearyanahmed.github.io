বেশ কিছুদিন আগে lighthouse শুরু করেছিলাম। যেটা various কারণে continue করা হয় নি। তবে আবার continue করার ইচ্ছা আছে । একটু different ভাবে ।

Raspberry Pi আর rust দিয়ে ছোট্ট একটা project. A project to get my feet dirty. Rust নিয়ে মাঝে মাঝে tinker করা হয় । তাই ভাবছিলাম, what about, not a REST API but something much simpler? Yet it carries a significant real world value.

### ProjectLighthouse যেমন sailor দের জন্য একটা guide, sea-তে journey করার সময় আরেটা important বিষয় communication. 

Morse Code, dot আর dash signal use করে communication. Kinda like binary, ২ টা different representation ব্যবহার করা । 

Morse code এর আমার favorite usage interstellar এ, যেখানে Cooper অন্য galaxy থেকে dot-dot dash এ blackhole এর quantum data transmit করে ঘড়ির second-এর কাটায়। 

Morse code এর বেশ কিছু usage আছে , যেমন যখন বিপদ আসে । Titanic ডুবতে শুরু করলে তাদের একটা communication মাধ্যম ছিলো morse code. ‘২৪ এর জুলাই এ যখন internet আর mobile data off করে দেয়া হয়েছিলো, তখন হয়ত, আমরা চাইলে কোনো device দিয়ে morse code transmit করে অন্যদের সাথে at least basic communication ধরে রাখতে পারতাম। হয়ত। দরকার ছিলো কিছু radio transmitter এর, যেটার মাধ্যমে signal টা carry হবে ( কেউ চাইলে বানানোর try করতে পারেন ) । 

Morse code low bandwidth, weak signal দিয়েও অনেক effective transmission করা possible. As long as we can transmit two different signal and separate them. 

+ Extremely simple একটা device, emergency যেমন warzone এ communication এ ব্যবহার করা যেতে পারে, backup system হিসাবে রাখা যেতে পারে etc etc. You get the idea (hopefully). 

এগুলোর কি এখনো দরকার আছে? এখন 5G এর যুগ। High bandwith, fast internet etc. 

#### Not so advanced techহ্যা, এখনো দরকার আছে । যদি robotics, aerospace industry তে কাজ করতে চান, যদি আপনার লিখা code দিয়ে কোনো একটা rocket বা satellite কে space এ পাঠাতে চান, যেটা probably আপনাকে outlive করবে, travelling across the stars, where probably no human would ever reach, দরকার আছে।

আমি morse code এর দরকরার এর কথা বলছি না। বলছি এই-সব simple, low level tech নিয়ে in general.

#### Programএসব random জিনিস চিন্তা করতে করতে ছোট্ট একটা program লিখেছি, যৈটা একটা text input কে morse code এ transmit করে । Light আকারে , LED blink করে । 

![](https://substackcdn.com/image/fetch/$s_!3bws!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7999c613-6d57-4afc-b5ad-5912caf0aef1_1712x1848.png)Full source code এখানে আছে :  [https://github.com/thearyanahmed/x-bkon](https://github.com/thearyanahmed/x-bkon)

And the results

আরো কিছু usage connect করতে চাইলে, [rosetta was calling home](https://thearyanahmed.substack.com/i/158828521/do-you-know-rosetta) in the dark-vaccum of space. 

আমার কাছে এখন sound module নেই, তবে morse code এর famous যে sound টা, সেটা এটার sound module এর সাথে connect করলে চলে আসার কথা, along with the light.

Sound module থাকলে kinda এরকম কিছু sound করতো (using a different morse code): 

[https://morsecode.world/international/translator.html](https://morsecode.world/international/translator.html) থেকে morse নিয়ে tinker করতে পারবেন । 

### Explaining the codeএই section টা নতুন দের জন্য, 

আমাদের program টা [main function execute](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L42-L78) করে । প্রথমে check করে নেয় input দেয়া হয়েছে কিনা। যদি না হয়, তাহলে usage print করে exit করে । 

Proper input দেয়া হলে [morse code](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L53) এ text টা transform করে । Morse code এর conversion টা fix, তাই supported characters ( এখানে a-z ) গুলোকে একটা [map এ রেখে দিয়েছি](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L81-L111) । যাতে O(1) lookup time এ চেক করা যায় কোন character এর morse representation কি? 

যেমন **l** (ছোটো হাতের L) এর morse code **.-..** ( [here](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L93) )** .** এরপরে input কে trim করে (removing left and right whitespaces) lowercase এ করে, সেটাকে শব্দগুলোর মাঝের whitespace গুলো দিয়ে split করলে word পাচ্ছি । Word এর প্রতিটা character এর জন্য morse code নিচ্ছি ঐ map থেকে । 

এভাবে আমরা text input এর morse representation টা পাচ্ছি । তারপরে একটা ( initially infinite ) [loop](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L60-L75) use করে morse blink করছি আর একটা count রাখছি। যেটা 100_000 এর বেশি হলে loop থেকে exit করছি ।  

Blink করার function এর কাজটাও বেশ simple. উপরের কাজের পরে আমাদের input এর morse (dots and dash: “.-_.._” etc) আছে । আর এই dots and dash এর ওপর base করে আমরা light টা জালিয়ে রাখছি । 

একটা light দিয়ে ২ টা different state (dot and dash) কিভাবে represent করতে পারি আমরা? Well, এক্ষেত্রে একটা signification difference in delay use করা যেতে পারে । এখানে যেহেতু dot হোক বা dash হোক, light টা শুরুতে off থাকে, তারপরে জলে আবার off হয়ে যায়, তাই dot গুলো [50 ms](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L7) (shorter) আর dash গুলো [400 ms](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L8) (longer) time ধরে জালিয়ে রাখছি । 

So light দিয়ে শুধু on আর off phase না, but আরো data transmit করা possible. হয়ত submarine cable গুলোতে এরকম কিছুই করে ।

আর light connected আছে Raspberry Pi এর [GPIO pin 18](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L56-L57) এর সাথে । 

Can you imagine ? A few lines of code, potentially can save someones life, transmit valuable information ? Notify that there is something wrong? Or right? 

### hum…ছোটো বেলায় কখনো battery’ র সাথে তার লাগিয়ে light জালিয়েছেন? If yes, do you remember the first experience? I was surprised, though was hoping for a similar experience. And boy it was :D 

While this is not the lighthouse, but just a blink. 

Some of my writings