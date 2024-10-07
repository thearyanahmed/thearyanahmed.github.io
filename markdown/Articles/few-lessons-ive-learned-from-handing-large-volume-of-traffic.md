My 2 cents on handling শত, হাজার বা millions of requests . It’s quite challenging. অল্পদিনের career এ কিছু team এর সাথে কাজ করতে পেরেছি আলহামদুলিল্লাহ যারা অনেক large volume of concurrent request handle করতে পারে।

যেসব engineer রা এরকম system বানিয়েছে তাদের (বা তাদের team এ) **fundamental অনেক strong** । Computer কিভাবে কাজ করে, network কিভাবে কাজ করে এগুলোর অনেক খুটিনাটি বিষয়ে তারা knowledge রাখে (+share করে) ।

Expertise; ঐ team গুলোর **expertise ছিলো certain technologies** এ। Fundamental জানা একজিনিস। একটা বিষয়ে expert হয়া আরেক জিনিস। কারণ প্রতিটা tool different way তে problem solve করে । Pros/cons জানাটা অনেক important.

Expertise একটা single course করে আসবে না, course করে সেটা নিয়ে কাজ করে, ঘাটাঘাটি করতে করতে আসবে।

**It’s not magic**, but lots of sleepless nights, hard work, day after day.

একটা উদাহরণ দিলে, একবার একজন teammate go এর context package নিজের মত করে implement করে flame graph দিয়ে default context আর custom context এর performance measure করেছিলো। Context go এর standard lib এর package .

একিসাথে কোন technology’র limitation কোথায় সেটাও জানা উচিত। ঐইযে millions of request handle করা system, self managed server এ। নিশ্চই Kubernetes manage করে।

Yah, not really । আমরা HashiCorp’s Nomad ব্যবহার করতাম। আর অনেক high traffic থাকা স্বর্তেও predictable range এ ছিলো।

Testing, সব ক্ষেত্রেই **tested code** ছিলো। Unit, integration, race detection test, e2e, stress , load, smoke tests এগুলোর কথা মনে আছে / আমার কাজ করা হয়েছে। আর হ্যা, test গুলোর run করা শেষ করতে ঘন্টা সময় লাগতো। প্রতি feature এর জন্য ই কম-বেশি test ছিলো ।

How else do you ensure everything is working? হ্যা, এর পরেও bug থাকে, কিন্ত test না থাকলে feature develop / improvement না, debug করতে করতেই সময় সব যেত।

আমি monolith, microservice both architectural pattern এই কাজ করেছি। তবে test লিখা নেই এরকম production app দেখিনি (speaking of these^) ।

Both scenario তে statically typed language Go use করা হয়েছিলো ।

**Microservice মানেই আলাদা আলাদা repo না**, in-fact ওটার কিছু problem আছে। I prefer monorepo.

A large portion serve করে hardware and networking layer ।

Both team এর অনেক ভালো রকমের log আর trace আছে। এটা request কোন hardware rack এর কোন slot এর NIC দিয়ে land করেছে সেটা জানার capability team গুলো রাখে।

Both team used containers.

Kafka was a big part in one of the teams . **Consistency model** এর উপর base করে অনেক architectural decision change হয় ।

Both team নিজেদের infrastructure এ এসব implement করেছে। 3rd party তে offload করে নি। g/RPC is faster than REST. একটা function all is always faster than rpc. For example, rpc 30ms সময় নিলে on average 10ns function call সময় নেয়, এটা **3 million times** difference.

**Microservice isn’t only about scaling**. Service ownership, autonomy, cultural এরকম বিষয় matter করে, যেগুলো technical না। **Monolith ও scale করা যায়** ।

> Everything has a tradeoff.

They focus on solving problems, not using fancy tech so they can brag.

> If you fail to plan, you plan to fail.

যারা আগে শুরু করেছেন (or new), যদি মনে হয় পিছিয়ে আছেন, সময় নেই…

> The best time to plant a tree was 20 years ago, the next best time is right now.


Notes:

- সব ক্ষেত্রেই tested code ছিলো বলতে 100% test coverage বুঝাইনি
- আমি kubernetes dislike করি না, এখন daily use ও করা হয়। তবে dislike করি মানুষের না বুঝে আন্দাজে kubernetes (or any other) tool use করাটাকে

ভুল দেখলে kindly জানাবেন
