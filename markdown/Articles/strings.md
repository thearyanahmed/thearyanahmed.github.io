String তো একি, সবখানেই sequence of characters. 

**হ্যা। কিন্ত না।** 
C, JavaScript আর Rust এ `hello` এর length count করলে 5 আসবে। 

Memory তেও তো একি জায়গা নিবে। তাই না?

**না।** 

`Rust` এর string আর `C` এর string এক না, পাইথনের string ও একিভাবে কাজ করে না। 
C তে string হলো একটা array of char (character) যেটার শেষ হয় null terminator দিয়ে ( \০ )। যেটা দিয়ে memory তে string এর শেষ টা mark করে। 
`hello` C তে `6 byte` যায়গা নিবে। প্রতিটা `char 1 byte` করে আর শেষের null terminator এর জন্য ১ বাইট। 

### Now, what about JavaScript? 
JavaScript string UTF-16, যার প্রতি character ২ বাইট করে জায়গা নেয়, So `10 bytes +` garbage collected হয়ার কারনে কিছুটা overhead আছে metadata রাখার জন্য। 

### What about rust?
`Rust` এ অনেক ধরণের string data type আছে। `String`, `&str`, `COW`, `OsStr` etc. যদি &str data টাইপে রাখা হয়, তাহলে ৫ বাইট, আর যদি String (owned) এ রাখা হয়, তাহলে `5 bytes` for characters, 8 bytes for metadata, capacity, length and pointer. 

আচ্ছা, কোনটা কোথায় থাকে? `Stack` or `heap`? `C` এর `char word[]` থাকে stack এ, এটা একটা array. Dynamically allocated string (using malloc) থাকে `heap` এ। আর literal string থাকে `binary`’র `read-only memory section` এ।
Rust এও অনেকটা একি। Literal string read-only binary তে, String হলে `heap` এ। 
`JavaScript` এর string `heap` এই থাকে, যেখান থেকে garbage collected হয়ে যায়। 

বেশ আলাদা ই। 

আচ্ছা, এই language গুলোতে (ছবিতে দেয়া উধাহরণ গুলোর) string length calculate করার time complexity তো একি হয়ার কথা। যেহেতু string হলো sequence of characters, তাহলে সব character এর ওপর দিয়ে একবার লুপ করে সব গুলোর জন্যই
`O(n)` হয়ার কথা। 

**কিন্ত না।** 

`C` এর `char word[]` O(n), কারণ এটা একটা pure array. JavaScript এ যদি খেয়াল করেণ, `.length` আসলে function না, property। আর property access O(1) constant time. Metadata হিসাবে এগুলো save করে থাকে। Rust এর `.len()` ঠিকই function call. Rust ও metadata store করে রাখে। 

যদি আলাদা language বলতে শুধু আলাদা syntax ই বোঝেন, তাহলে ভুল হবে। A language is much more than syntax. It has it’s own philosophy. It’s own way of solving certain problems.

When you learn a language, don’t learn the syntax. Yes, but also, don’t think all languages are the same. You can't simply change the syntax and rewrite it in a different language. 
That is why, big companies don't just rewrite. And when they do, it's not just changing the syntax and done. 

You probably didn’t need to know this. But what’s the fun in that? 

*Pure array isn’t a programming term, not that I know of. I used it for expressing myself. 

*read-only part in binary is kinda like hardcoded bits, this value does not live in stack nor heap. 
