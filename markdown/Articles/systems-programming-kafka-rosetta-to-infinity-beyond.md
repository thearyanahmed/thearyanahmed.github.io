Systems programming is resource-constrained programming. It is programming when every byte counts.

We write many amazing programs in our day-to-day life, but most of us programmers don't know about systems programming, although it underlies everything we do.

We suddenly close our laptop lid with programs running. The operating system detects it, suspends all running programs, turns off the screen with millions of tiny pixels, and puts the computer to sleep. Later when we open the lid, the OS kicks in again, all the components are powered on, we see the same programs running, and we take it for granted.

Every keystroke, every DNS call before your REST API call, every CRUD query to your database, every time you start your computer, close the lid of your laptop and come back to see the same software running, every ssh call you make, everything.

## Do You Know Rosetta?

Rosetta, our comet chaser. After launch, when the situation changed, it was hibernated for 31 months. In the deep dark space, no GPS, chasing comet 67p during hibernation with navigation computer and heating on, everything else off (or low power mode), it was instructed: after 31 months, you should be at this point in space and time, go there, and call us home.

Can you imagine? If we send a person with an address, many (including myself) can't find it many times, and here bunch of computers are being given such a task?

Do you see those two upticks? On **January 20, 2014**, Rosetta called home, saying "**I'm awake**" (and I'm where I should be).

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F770f4ad6-cef5-4db5-b4f7-4c8f6c40db95_2390x1010.png)

I didn't work on this team, but I was so proud that we, human beings achieved that.

What's the relation with systems programming? Well, communication with Rosetta didn't happen through REST API. Rosetta heavily relies on embedded systems, for functionalities like Proportion, communication, attitude control etc.

If you like my writing, feel free to subscribe here.

## Not Systems Programming

Recently I was [looking for](https://www.linkedin.com/feed/update/urn:li:activity:7304834574604271616/) systems programming and lower level programming content in the Bangladesh community. Many people shared many resources (and thank you for that) but I want to share 2 things (and not to shame anyone, I didn't and probably still don't know much about systems programming myself):

- System Design articles

- Building something using tools outside typical programming frameworks

### System Design

These are architecture level content. Usually, if you develop a system with one or more application level programs, it will meet certain objectives. There might be some aspects of systems programming (as it underlies everything), but systems programming doesn't refer to these.

Also not application level client building. For example, emitting events with kafka isn't systems programming. That's just using it as a client. Those who built kafka did systems programming. Kafka is very fast, can handle huge traffic.

If you're thinking why emitting something with Kafka in our application isn't systems programming, well, do we know why Kafka is so fast? Here are some key points.

**Sequential Disk I/O**

One of Kafka's features is that even though it works with disk, it's not only fast on SSD but also very fast on HDD. HDD has a physical needle that needs to move. Usually when we write to disk, it writes to available blocks. Sometimes it's sequential, sometimes or most of the times it's random.

Kafka's engineers take advantage of HDD's sequential disk I/O. Kafka writes data in append-only-fashion. So whatever is written will only be added at the end of the dataset, i.e., sequentially.

Along with this, some beautifully crafted algorithms help kafka minimize disk seek.

**Zero-Copy Principle**

Kafka uses zero-copy technique to send data directly from disk to network, instead of copying to RAM. Because of this, data copy is reduced.

**Efficient Memory Management**

Kafka leverages the operating system's page cache to keep frequently accessed data in memory, which reduces the need for additional disk seeks.

First of all, to use kafka in our application, even without very in-depth knowledge of these, it works. Not saying that should be the case. But it works. You don't need to understand these that much, can be learned from documentation/tutorial/course.

> Any fool can know, but the point is to understand.

For Kafka's amazing performance, very good understanding of this (+ more topics like this) is necessary. Good knowledge about computer systems is necessary. And to know is to understand.

### JavaScript

It damn sure ain't for Systems Programming.

## Systems Programming

Systems programming is resource-constrained programming. It is programming when every byte counts.

Those that directly interact with and manage computer's core components. Which core components? OS, device drivers, hardware, firmware etc. It's about optimizing resource management, ensuring reliability, and maximizing performance by working at a lower level of abstraction.

Essentially, it's about building that foundation layer on which all other software will be built. System programming is for:

- **Operating Systems:** Computer's foundation, service provider, interface for other stuff

- **Device drivers:** Those programs that run and interact with different devices

- **Filesystems**

- **Databases:** Not as a client, but the engine that runs those queries, stores data

- **Cryptography**

- **Media codecs**

- Those programs that run on very cheap level devices (eg: **embedded** systems)

- **Networking**: Imagine the internet

- **Virtualization and software containers:** Docker, hypervisor, virtual machine

- **Scientific simulations**

- Building a higher level programming: like Python or PHP

- **Memory management:** like implementing garbage collector

- Real-time systems

- Embedded systems (Rosetta)

## Why Learn Systems Programming?

Why not? Not everyone has to become a systems programmer. And to be a good programmer, you don't have to be a systems programmer. However,

If you work with systems programming, you'll work with resource constrained environments, work with computer's very core, work with those topics and tools on which the whole world is built. Does it not fascinate you?

Maybe, someday, you'll build something like Rosetta and embark on a journey, to infinity & beyond.

I hope by now the difference between systems programming and application programming has become somewhat clear. If not, I guess I've failed successfully.

## Contribution

#### What can I do?

Currently, there's probably no content about systems programming in the Bangladesh community. For the record, from someone who has been working with this community for a while,

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09013bc9-16f4-4280-833a-a93c28e0c824_1086x294.png)

So, I'll try to slowly write about systems programming. To create various types of programs and write about them in (enough) details. I won't start by writing about kernels. Well, one of the reasons is I don't know how to write a kernel from scratch. But inshallah, I'll :D And I'll share it with you. In Bangla.

If you like systems programming or find it interesting, and want to read the articles, feel free to subscribe here. Articles will reach your email.

#### What can you do?

You can do what I'm doing. No reason not to. If you also create content about systems programming, preferably articles, or videos, or a markdown README, or if you build any program, feel free to reach out. I'd love to read it, and to learn from it.

You can also help me with another thing.

#### Sidenotes

This picture was taken 500 million kms away, on Comet 67p.

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0499b825-45d8-48d6-9533-bf844925da10_3362x3236.png)

### References

- [How we landed on a comet 300 million miles away](https://www.youtube.com/watch?v=MWxijOjmn-g)

- [A picture from 500 million kms away](https://www.youtube.com/watch?v=k1GJp6JCJU8)

- [Rosetta calls home](https://www.youtube.com/watch?v=Wp4JAGbPMT8)
