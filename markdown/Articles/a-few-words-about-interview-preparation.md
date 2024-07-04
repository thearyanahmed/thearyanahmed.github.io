অনেকে job interview এর preparation নিয়ে কিছু question করেছেন। So these are my two cents. 

## Patience
সবার আগে বলবো, ধৈর্য্য রাখতে। Germany তে ২-৩ মাস এমনিতেই লেগে যায়। যদি application এর timeline চিন্তা করেন, তাহলে আপনি apply করার পরে recruiter CV / resume বাছাই করে অন্য candidate সাথে compare করে তারপরে আপনাকে ডাকবে। First call এর পরে আপনার সম্ভবত hiring manager এর সাথে কথা হবে। 

তারপরে coding challenge বা live coding বা take home assignment । তারপরে system design interview. আবার কিছু যায়গায় coding challenge, technical interview 1-2, cultural fit, যদি অনেক ভালো করেন আর company’র সুযোগ থাকে তাহলে bar raise interview । তারপরে গিয়ে offer letter । 

সব company তে definitely এত হয় না। তবে ৪-৫ টা round সাধারণত থাকে। খেয়াল রাখবেন, তারা শুধু interview নেয়ার জন্য বসে থাকে না। এই সব round এ tech recruiter বাদে বাকি সবার মূল দায়িত্ব ভিন্ন (and not hiring people)। আরেকটা জিনিস খেয়াল রাখার বিষয় হল আরো অনেকেই same role এর জন্য apply করবে। 

আমার Hello Fresh আর Zalando’র একটা sister concern এ both এ সাড়ে তিন তার চার মাসের interview এর experience আছে। আপনি শুরুতে জিজ্ঞেস করে নিতে পারেন full procedure নিয়ে। 

আর early december to mid january, এই সময় টা ছুটির সময়, এরকম সময় apply করে অনেক দেরিতে respond পাবে সাধারণত। 

## Present yourself
<p class="text-gray-400 text-xs">This section is a bit long, feel free to skip ahead.</p>
এর পরে বলবো নিজেকে present করা নিয়ে। আপনি যতই ভালো পারেন না কেন, আপনি নিজেকে present করবেন CV / resume বা linked in (or a rare case, github দিয়ে) । তো CV / resume টা proper way তে সাজানো উচিত। আপনি কি কি achieve করেছেন, আর সেটাতে company / team / software / product এর কি benefit হয়েছে সেগুলো present করার চেষ্টা করা উচিত। Code সবাই করে। আর আপনার coding skill asses করার জন্য technical round গুলো আছে। 

Created admin module, product module, comment module এসব বার বার না লিখে particular achievement / contribution গুলো দেখতে পারেন। 

আমার CV অত আহামরি না, তবে, একটা point ছিলো (যেটা নিয়ে interview তে কথা বলতে পেরেছি) যে আমাদের internal service গুলো যখন আমরা update করি, তখন অন্যান্য সব টিম কে জানাতে হত যে আমরা update করেছি। যদিও আমাদের automated test ছিলো। 

তো, আমি একটা github action লিখেছিলাম যে একটা internal dependant service এর map দেখে সেই repo গুলো কে জানিয়ে শুধু ঐ dependency (নিজের version) update হয়ার জন্য pull request তৈরি করতো। 

আর PR এর description এ breaking changes গুলো add করা থাকতো। যদিও আমার মূল কাজ ছিলো Go এ, তবে
এটা করেছিলাম একটা bash script দিয়ে। এটাতে সুবিধা হয়েছিলো যে, কারো বসে বসে manually dependency update করা লাগো না। সময় বাচতো। Test থাকায় all green হলে অনেকটাই confidence পায় reviewer, তারপরে changes গুলো পড়ে সে easily merge করতে পারে (unless it’s an exception case) । 

এখান থেকে আমার achievement হলো আমি team এর সময় বাচিয়েছি, আর যদিও আমি সেখানে আর কাজ করি না, সেই system এখনো আছে । Doing its job, day after day. Bash দিয়ে লিখলেও আমার interview তে এটা matter করে নি যে এটা go related না । 

CV / resume টা গুছানোর পরে বলবো কাওকে দিয়ে review করিয়ে নিতে। [https://www.cv-library.co.uk/free-cv-review](https://www.cv-library.co.uk/free-cv-review) এখানে গিয়ে একটা free review করিয়ে নিতে পারবেন। AI দিয়ে না, মানুষ দিয়ে। আর তারা অনেক সুন্দর করে details এ review করে দেয়। এটা UK’র perspective এ দেখবে। So আপনি যদি অন্য কোথাও apply করেন, এটা দেখা উচিত সেখানের কোনো specific (or common) format আছে কিনা। 

আরেকটা বিষয়, 

**Your CV is not about you.**

হ্যা । It’s about the company, what value you are giving them. So apply করার আগে, company, team, technology, product এগুলো নিয়ে একটু ঘাটাঘাটি করা উচিত। Company culture, benefits নিয়ে glassdoor এ দেখতে পারেন। 
 
CV তে exgragurate করা উচিত না, নিজেকে নিয়ে যা সত্য সেটাই বলা উচিত। কারণ যারা interview নিবে তারা এই technology নিয়ে নিয়মিত কাজ করে। আপনি kubernetes নিয়ে কাজ না করলে সেটা লিখার দরকার নেই (আর recruiter ask করলেও বলে দেয়া উচিত)। কারণ technical interview তে আপনাকে ask করবে না যে kubernetes কি আর এক লাইনে উত্তর দিয়ে দিলে শেষ।

CV তে অতিরিক্ত skill না দিয়ে মূল বিষয় গুলো focus করা উচিত। 

## Linked In
Linked in আপানর CV / resume’র extended version চিন্তা করতে পারেন। কারণ এখানে একটু বেশই content + skills দিয়ে পারবেন। My linked in is not the best কিন্ত যদি starting point হিসাবে কিছু দেখতে চান feel free to visit [https://linkedin.com/in/thearyanahmed](https://linkedin.com/in/thearyanahmed) (feel free to send a message if you see a mistake) । 

Linked in এ আরো কিছু benefit আছে। আপনি কিন্ত job poster কে অনেক সময় দেখতে পারবেন আর তাকে personally reach করতে পারবেন। Recruit করার সময় knock দিয়ে বলতে পারেন certain post এর কথা। তবে, personally knock দেয়ার আগে make sure to check [https://nohello.net/en/](https://nohello.net/en/) :) এটা বাংলাদেশের অনেকের জন্য প্রযোয্য। 

Linked in premium ও আপনাকে help করতে পারে। কিছু ভালো metric দেখায়। সবটুকু accurate না তবে it gives you some good idea আপনার competitor সম্পর্কে। Premium নেয়ার আগে নিজের profile টা ঠিক করে নেয়া উচিত। Because algorithm টা আপনার data এর উপরে কাজ করবে। 

আর আমি personally একটা বাদে বাকি সব গুলো job ই linked in থেকে পেয়েছি। I think it is a good tool কিন্ত এক মাত্রত tool না । Apply from whereever you can. Application পৌছাইলেই হবে। আর linked in এর Easy apply অকার্যকর একটা জিনিস। 

## Github
Github (or public VCS) profile আপনার updated আর ঠিক ভাবে থাকা উচিত। আর কিছু project ও। ঠিক ভাবে বলতে আপনার ১০৫ টা repo আছে তা না। যে repo / project / package থাকবে সেটায় একটা read me রাখা উচিত। কারণ, most likely, আপনার code শুরুতে পড়ে দেখবে না। 

আপনার readme তে সেটাই লিখবেন এটা কি করছে, কি technology ব্যবহার করে, কিভাবে run করতে হয়, test করতে হয় আর challenge কি আর কিভাবে solve করেছেন । এটা hard rule না, তবে I think these are good rules । 

ভালো commit message এর habit করা উচিত । “wip” “done” “X” এসব না দেয়াই ভালো । Github profile এ একগাদা skill add না করাই ভালো । Give the recruiter proper, concise information ।  

## Basics
Job interview preparation এর one of the best way হলো basic গুলো ঠিক করা। Know your tools । Probably Anam Ahmed একটা কথা বলেছিলেন ২০১৪ সালের দিকে (I think), যদি আপনি আপনার tool গুলোর usage না জানেন, তাহলে you’ll never have enough tools।
আপনি একি জিনিস ১০ টা tool দিয়ে না করে ১০ টা টুল দিয়ে ১০ টা কাজ করতে পারাটা obviously would be preferred and considered more skillful (IMO) । এটা specially JavaScript developer জন্য যায়। কারণ আমি দেখেছি অনেকে বলেন react, vue, next, nuxt, angular, svelte, remix, alpine etc পারি। এগুলো দিয়ে কি করেন? UI component বানাই। সব গুলো দিয়েই।

But it goes for everyone. 

Preparation নিয়ে interview তে যাওয়া উচিত । আগে থেকে কিছু information ask করতে পারেন। যেমন interview টা কেমন হবে, live coding থাকবে কি? etc.

## Problem Solving / DS - Algo / Leetcode 
এটা common । সব company তে দেয় না। তবে সাধারণত কিছু type এর challenge থাকে। যেমন HelloFresh এ ছিলো। আবার Nord Security তে ছিলো না, সেখানে project ছিলো । So it depends, কিন্ত আমার experience অনুযায়ি বেশির ভাগ company তেই ছিলো । 

I had the opportunity to interview at DigitalOcean, Delivery Hero, HelloFresh, Zalando’র একটা sister concern (?), Tier, Nord Security etc. Not giving it away তবে majority to all of these companies, had some sort of problem solving. 

তবে, একটাতেও FAANG এর মত ds algo এর problem ছিলো না। যদি basics ঠিক রাখতে পারেন, it should pass. 

যারা একটু হলেও problem solving করেছেন, তারা হয়ত এটা জানেন কি problem । খুবি সহজ, কিন্ত বলতে পারবেন, যদি garbage collector kick করে, তাহলে কোন line এর জন্য / কিসের জন্য memory fragmentation তৈরি হবে আর কেন হবে?

![An easy solution, followed by a fundamental question](https://thearyanahmed.com/markdown/assets/two-sum.png)

This is a real interview question I was asked । 

## Blind 75
Problem solving নিয়ে খুব চিন্তা না করে কিছুটা practice করলে অনেক সহজ হয়ে যাবে interview গুলো। আর Blind 75 অনেক ভালো একটা guide । এগুলো করলে আপনার interview face করার জন্য primary topic গুলো cover হয়ে যাবে । 

[https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions](https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions)

## Live Coding 
এটা নিয়ে বা take home assignment নিয়েও অনেকে ভাবতে পারেন যে যে কোনো language এ দিবে। কথাটা পুরোপুরি ঠিক না। দিতে পারে। নাও পারে। কিছু company দুই একটা / খুবি specific technology চাইতে পারে । তখন আপনার সেটা দিয়েই solution এ আসা লাগবে। আর আপনি কিভাবে problem টা নিচ্ছেন আর solution এর দিকে যাচ্ছেন সেটা main. Solution দিতে না পারলেও অনেক সময় আপনি পরের round এর কল পাবেন।

## Be Patient
Live coding এ clever solution থেকে gradual solution এ যাওয়াটা I think better। ধরুন আপনাকে বলেছে একটা dataset এ একটা specific element আছে কিনা সেটা খুজে বের করতে হবে। Well, এটা binary search দিয়ে খুবি সহজেই করা যায় । তাই না?

হ্যা । 

আপনি বলেও দিলেন, কিন্ত তারপরে interviewer বল্লো dataset এ data আছে ১৫০ টা। যেটা linear search দিয়ে করলেই হয়ে যাবে। Binary search এর sorting, maintenance, documentation আর testing একটা linear search এর থেকে তুলনায় কঠিন হবে।  

## Take Home Assignment
README, setup guide, your solution for the given problem, test এগুলো must দেয়া উচিত। কিছু করতে না পারলে লিখে দিতে পারেন যে সময়ের অভাবে করতে পারেন নি। 

সুযোগ হলে dockerise করে দেয়া উচিত। Avoid over engineering in this interview and day to day life. এছাড়া এমনিতেও test case লিখার অভ্যাস করা উচিত । আলাদা ধরণের testing নিয়ে জানা থাকা খুবি ভালো ( + উচিত) । 

## System Design Interview
System design এর fundamental topic গুলো নিয়ে basic ধারণা রাখাটা খুবি important । সাধারণত যা দেখেছি, খুব simple একটা কিছু বানাতে বলবে, যেমন একটা app এ string to string ডাটা রাখা লাগবে। কি ব্যবহার করবেন? Hashmap দিয়ে শুরু করলেন, পরে এটা distributed key value pair এর efficient way তে data replication, consistency, architectural diagram পর্যন্ত নিয়ে যাবে। 

[https://bytebytego.com/](https://bytebytego.com/) could be a good starting point. As always, simplicity সাধারণত clever solution থেকে ভালো। 

## Database
Backend engineering role গুলোর জন্য apply করলে database খুবি fundamental. Common আর obvious জিনিস গুলো, ACID, CAP, SQL injection, এ ধরণের topic গুলে নিয়ে জানা উচিত। CAP এ C আর ACID এর C দুইটাই Consistency হলেও একি ধরণের Consistency না । দুইটা আলাদা। অনেক আলাদা। Query optimise করা, best practices, কিভাবে performance analyse করবেন সেগুলো জানা উচিত। 

কখন SQL আর কখন NoSQL ব্যবহার করবেন সেটাও জানা উচিত। Specially JavaScript developer দের জন্য । আমি দেখেছি অনেক MERN stack developer NoSQL ব্যবহার করে ২ টা কারণে, 

1. কোনো data (mutation এ) ই Error দেয় না 
2. Data structure নিয়ে ভাবা লাগে না (না ভাবলেও চলে)

২ টাই invalid reason. 

## DevOps
Um.. আমার জানা মতে DevOps কোনো particular role না। I guess এটা বলতে মানুষ SRE আর platform engineer দের বোঝেন। এসব role এর জন্য logging, tracing, spanning, instrumentation নিয়েও clear ধারণা রাখা উচিত । Prometheus আর Grafana, Elastic stack নিয়েও । 

আর I think docker অনেকটাই defacto containersiation tool হয়ে গেছে। তবে mainly container কি, কেন কিভাবে কাজ করে সেগুলো জানা উচিত। Orchestration এর জন্য kubernetes অনেক ব্যবহার করলেও industry standard alternative আছে, যেমন Nomad. 

CI runner এর জন্য github actions is very popular । 

CNCF (Cloud Native Computing Foundation) এর graduated project গুলোর demand দিন দিন বাড়ছে। You can find them here [https://www.cncf.io/projects/](https://www.cncf.io/projects/) । 

## Cloud Providers
সব company AWS ব্যবহার করে না । Usually hybrid cloud with a specific one in focus. তবে অনেক company public cloud ও ব্যবহার করে না। কারণ AWS অনেক বেশি expensive. 

## Pros and Cons
যে কোনো tool এর pros and cons নিয়ে জানা উচিত। Go ব্যবহার করলে কোথায় method আর কোথায় value receiver আর কোথায় pointer receiver ব্যবহার করবেন, goroutine synchronise করে কিভাবে, concurrency pattern গুলো, to panic or not to panic, concurrency and parallelism এধরণের topic গুলো নিয়েও জানা উচিত। 

## What Happens When
এটা networking এর fundamental level এর question । আমার একটা ছোট্ট article আছে, বাংলা তে । [https://thearyanahmed.com/blog/articles/what-happens-when/](https://thearyanahmed.com/blog/articles/what-happens-when/) । কিছু basic ধারণা দিতে পারে। আরেকটু details এ দেখতে চাইলে [https://github.com/alex/what-happens-when](https://github.com/alex/what-happens-when) । 

## Language
English language টা কথা। যদি used না হয়ে থাকেন তাহলে practice করা উচিত। Written and verbal. 

> Don’t be a jack of all trades, master of none.

## Referral
Referral কাজের জিনিস। তবে আপনার CV , profile, experience etc match না করলে referral কাজে দিবে না। আর interview আপনাকেই দিতে হবে। 

If you are reading this, most probably আপনি হয়ত switch করার চিন্তা করছেন। Well, as of date of writing, we are hiring [https://www.digitalocean.com/careers#open-roles](https://www.digitalocean.com/careers#open-roles) . 

> Learn from your mistakes along the way. 

আমার CV, profile, git আর উপরে mention করা অনেক কিছুই আমি ভুল করে গিয়েছি। তবে শিখেছিও। And I would like to thank [Lenin](https://www.linkedin.com/in/leninhasda/), [Elizabeth](https://www.linkedin.com/in/fahmi-da-islam-3a771a2a2/), [Opu](https://www.linkedin.com/in/opumm/), [Tawsif](https://www.linkedin.com/in/tawsifaqib/), [Arman](https://www.linkedin.com/in/ark1790/) for their support along the way.  

Be patient and have faith in Allah, keep making dua and keep moving forward.  

এত কিছু যা লিখেছি সেগুলো আমার experience থেকে। I wish you all the best. And it’s subjective. আপনার জন্য হয়ত অনেক কিছুই আলাদা হবে। একটা একটা journey. And this was mine :) 