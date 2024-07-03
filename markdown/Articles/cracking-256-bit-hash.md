**Time.**

হ্যা। সময় এর মাধ্যমে। আচ্ছা একটা thought experiment করি। ধরুন, একজন hacker bruteforce করে একটা 256 bit hash crack করবে।

So, 256 bits.. এটাকে আমরা লিখতে পারি (2 ^ 32) times 8 । So,

> (2^32) * (2^32) * (2^32) * (2^32) * (2^32) * (2^32) * (2^32) * (2^32) = 2^256

আর 2^32 = 4,294,967,296 ( চার বিলিয়ন এর একটু বেশি )। যেহেতু brute force করবো, তাহলে আমাদের every possible value check করতে হবে। Every possible বলতে? hash(a) = $cipherTextA, hash(b) = $cipherTextB . হলো 2 টা hash value check । ধরুন আমাদের program GeForce RTX 3090 তে run করে আর প্রতি second এ 4 billion অর্থ্যত (2 ^32) টা hash calculate করে । 

**Step 1/8 done**,
এখন আমাদের এরকম অনেক গুলো GPU লাগবে। ধরুন poridhi.io একটা data centre দিয়েছে, যেখানে 4 billion server আছে। আর ঐ 4 billion server এর সব গুলোতে GeForce RTX 3090 আছে। So আমাদের এই stage এ computation output হলো (2 ^ 32) * (2 ^ 32) = 2 ^ 64 । ধরুন আমাদের এই data centre এর নাম Giga Cluster। 

**Step 2 / 8 done**. Earth এর current population around 8 billion এর মত। এর অর্ধেক ( 4 billion ) মানুষের সবার জন্য একটা করে Giga cluster তৈরি করলাম। Everyone has a giga cluster . So now our computation output হলো 2 ^ 96 । 

**Step 3 / 8 done**. ধরলাম এটা আমাদের Earth 2.0।

Next calculation এর জন্য we need to look a bit further..something bigger. আমাদের home Milky Way Galaxy তে ধরা হয় 100 to 400 billion star আছে। যদি upper limit এ ধরি, 400 billion star এর 1% star এও যদি Earth 2.0 থাকে, তাহলে আমাদের current output 2 ^ 128 । এটাকে আমরা বলি umm Milky Way 2.0 । 

এখন ধরুন এরকম 4 billion milky way 2.0 আছে । নাম Galactic Hyper Cluster । এখন আমাদের output হবে 2^160 hash/sec । **Step, 5 / 8 done**. We are close. Only 3 steps left. 

Now, lets take it to a different dimension. Time. 
2^32 seconds হলো 126.75 বছরের মত। … hum long time । কিন্ত in the long run, সময়টা অত বেশি না । তাই না?

Before the next step, বর্তমানে universe এর age ( বয়স ) কত (ধরা হয়)? **13.8 billion** বছরের মত। 
আর **126.75 * 4** billion হল **507 billion** বছরের মত। 

এটা বর্তমান universe এর age এর **39.5** গুন বেশি। That is a very big number, even if we combine all of our lifetimes! We are **7 of 8 steps** done. এখনো 1 step বাকি আছে । I don’t know কি দিয়ে example দিবো । Already universe এর বয়সের থেকেও অনেক সময় বেশি লাগছে। 

### Summary 
যদি আমাদের একটা Galactic Hyper Cluster থাকে, যেখানে 4 billion Milky Way 2.0 Galaxy আছে; যেখানের সবগুলো galaxy তে 4 billion Earth 2.0 আছে, যে Earth গুলোতে 4 billion মানুষ আছে যাদের একেক জনের একটা Poridhi Giga Cluster আছে যে cluster (data centre) এ 4 billion server আছে আর ঐ প্রতিটি server এ GeForce RTX 3090 per second এ 4 billion hash guess করছে, এরকম একটা system যদি 507 billion বছর ধরে every second hash calculate করে যায় তাহলে, 

1 / 4,000,000,000 chance আছে ঐ hash টার actual value পাওয়ার । 

Think for a second :) Pretty amazing right? We create something in milliseconds that takes billions of years cracking. 

Note: The idea of this article was taken from Grant Sanderson's 3blue1brown. Special thanks to him for explaining this in the way he did.  