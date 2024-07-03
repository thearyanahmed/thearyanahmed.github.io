যখন একটা site (eg: thearyanahmed.com) এ যাওয়ার জন্য browser এ "t" লেখেন, তখন কি হয়? ভেবে দেখেছেন?

Keyboard থেকে OS পর্যন্ত signal আসার কথা টা skip করলাম। Browser শুরুতে HSTS (HTTPs Strict Transport Security) লিস্ট এ চেক করে ঐ hostname টা আছে কিনা। ঐ list টা হলো ঐসব site এর list যেগুলো already browser কে request করে রেখেছে HTTPS দিয়ে communicate করতে। 

যদি সেটা না থাকে, তাহলে HTTP তে request যায় প্রথমবার । তারপরে browser check করে তার Cache এ ঐ domain আছে নাকি। না থাকলে`gethostbyname()` কল করে DNS lookup এর জন্য। এই function দেখে local (machine এ থাকা) hosts file দিয়ে resolve করা যায় নাকি। যদি সেখানে না পায় তাহলে DNS server এ request টা করে, যেটা network stack এ configure করা থাকে।Typically that’s the local router or ISP’s DNS Cache Server. 
যদি DNS সার্ভার একই সাবনেটে থাকে, ARP সরাসরি ব্যবহার করা হয়; নাহলে default gateway দিয়ে query করে।

ARP বা Address Resolution Protocol (ARP) হল একটা LAN এ থাকা IP to physical address (MAC) এর mapping. ARP তেও caching থাকে। Depending on the result, either এখন DNS Server or default gateway দিয়ে request টা site এ যাওয়ার journey টা continue করে। 

DNS client এখন DNS Server এর (well known) UDP তে port 53 তে socket connection establish করার try করে। আর request করে DNS record এর জন্য। যদি local বা ISP এর DNS এ এই record না থাকে, তাহলে request recursively যেতে থাকে, যতখন না SOA পাচ্ছে। Recursively যে যাচ্ছে সেটা একটা hierarchy ধরে যায়। Sort of like local server to it’s parent, to it’s parent to the root server. 

SOA হল Start of Authority, request টা যদি authoritative server এর কাছে পৌছায়, SOA record হল ঐ domain সম্পর্কে কিছু essential information রাখে। যেমন Primary Name Server (একাধিক name server ও থাকতে পারে), Refresh Rate, TTL, Expiry etc. 

এইযে nameserver এ ধরুন আছে আমার domain ns1.digitalocean.com, তখন আমার domain টার info আবার এই ns1.digitalocean.com এর কাছে । ns1 তখন hopefully একটা (বা একাধিক) A record return করবে। 

আচ্ছা, আমরা এতক্ষন ধরে যে DNS request করে এতদূর আসলাম, সেটা কি খুজতে খুজতে? Journey শুরু হয়েছিলো “thearyanahmed.com” এ যাওয়ার জন্য। আমরা খুজছিলাম এই domain এর file গুলো কোন server এ host করা আছে সেই server এর IP. 

A record হলো domain name to IP address এর mapping. আমার domain এর টা map করা আছে 185.199.109.153 । আর এত্তকিছু (অনেককিছুই বাদ দিয়েছি) হয়েছে around 20-50 milliseconds এ। 

আচ্ছা আমরা তো IP পেলাম। তারপরে? এতক্ষন তো UDP (or TCP based on certain scenario), request করলাম, HTTP কোথায়? 

এখনো অনেকগুলো step বাকি আছে । Socket, TCP, TLS, Packet drop, congestion control, Cryptography (Diffie Hellman key exchange), HTTP, server side এর reverse proxy or api gateway or load balancing, response (TCP) stream (yes, not a single response), সেটা parse করে যদি HTML পায় তাহলে সেটাকে render করার জন্য DOM tree construct করে আপনার monitor বা mobile এর ঠিক LED গুলোর light আপ করার জন্য signal দিয়ে তারপরে আপনাকে UI টা দেখানো।

I didn’t even scratch the tip of the iceberg. Skipped most of the steps. But isn’t it amazing? এতকিছু হচ্ছে in milliseconds.
