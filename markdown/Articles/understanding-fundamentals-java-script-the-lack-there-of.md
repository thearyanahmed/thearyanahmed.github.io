A highly opinionated take on my experience. Not saying everyone is like this. It is solely based on my experience.

Programming is one of the most enjoyable things I could think of. The ability to create or build something, translating codes into something meaningful, the feeling is amazing. I've been coding professionally for 5 years, give or take. And started coding a few more years before that.

I started with `C` and then went to `C++` . I found my way into different types of languages, interpreter, compiled, statically typed etc. Now, I am mostly working with `go` and sometimes `rust`. Also had the chance to work with `php` , `python` , `javascript` and some of its flavours as well.

While I'm not the best programmer, I do believe to learn something, you should start with fundamentals. And over the years, my fundamental concepts were shaped and I would say have some idea how things work under the hood.

While so, I've never felt so frustrated working with javascript and typescript . Every time I touch it, it feels like this is probably the worst it can be. But every single time, I'm surprised on a different level.
And it's not just the language itself but the culture alongside it.

I found javascript developers with whom I worked with, adopt to most alien practices and makes me wonder **like...why**?

## Not So Interested In Fundamentals

I think I've never seen any other community where they don't want to learn fundamentals. Why would they? When everything works? Lets talk about data types for a bit.
...
well, nothing to say, there are none.

Everything goes with `var / let / const` .  You can not define an int or float or something like that precisely. Not for an array, you can not have an array of ints per say. You'll end up with an array of everything possible.

One might say this is a feature. But if you say that, let me ask you, why would you, the programmer would not know about the data type it's working with?


## TypeScript

TypeScript, the holy grail, solution to everything that is wrong with javascript itself. Well, typescript is more like and one more issue added to the javascript ecosystem. Just typed issue. For example,
it somehow enforces types, fine. But it also carries `any` type. And `null` and `undefined` .

So, if your data can be structured with any , that takes away the necessity of the so called typed. Again, everything works.
One can argue that you can have linter rules that prevent you from using any . Well, one more dependency to add. You can
1. Ignore these and just use whatever you want
2. Add linter rule
3. Take the time to learn about the fundamentals

If it was me, I'd first
1. take the time to learn about the fundamentals
2. then go for `add linter rule` and
1. probably never use `ignore these and just use whatever you want`

For what I've seen, most of the time it has been `1. ignore these and just use whatever you want` , sometimes brag about `2. add linter rule and most of the rules` , eventually, to be removed from the rules as the project grows. And never `3. take the time to learn about the fundamentals` .

> Why? I mean... like why? Not everyone is not a fan of typescript. Read why Turbo 8 is dropping TypeScript ( see :
> https://github.com/hotwired/turbo/pull/971 )




Unstructured data follows unstructured code

```javascript
const statusMessage = useMemo(
  () =>
    statusData?.[0].phase === 'error'
      ? 'Error: Failed to complete operation.'
      : statusData?.[0].phase === 'waiting'
        ? 'Waiting for response...'
        : statusData?.[0].phase === 'transmitting'
          ? `Transmitting: ${Math.round(statusData?.[0]?.progress * 100)}%`
          : statusData?.[0].phase === 'processing'
            ? `Processing: ${Math.round(statusData?.[0].progress * 100)}%`
            : null,
  [statusData]
);
```
This is a real life production code.


## Frameworks

JavaScript has a lot of frameworks. However, they seem to solve the same problem in their own way. Nothing wrong with that. But why so many? You see one feature in one framework, then you see the same feature in all the other frameworks as well.
If that is the case, what then remains the difference? Why would most developers who are users of the framework itself be concerned how it is compiled to pure javascript under the hood? They are probably gonna run a command or two.


## Code reusability

Now, this point pissed me off. Once, I was working with a senior javascript developer, more like a node fanboy. Who said the following two things.
1. JavaScript works better with sockets (websockets)
2. You can reuse code between frontend and backend, you don't need to learn new things

I had no idea how node works better with websockets. Eventually I found out that he thought that because socket.io (socketi) was built using nodejs. So, I guess we should use c for building backends if we are gonna use nginx .


## Separation of Responsibilities

I saw this in many many developers. They think if you learn javascript, for one end, you don't need to learn anything for the other end.

Yes, you don't need to learn a new language, true. But you'd still need to learn different things. A lot of different things. For backend, you'd need to learn about what backend offers and how nodejs can help in that regard. Eg: Making a database query, handling business logic, authentication and authorisation etc.

For frontend, well, you don't make a database query from the frontend itself. Eventually what your are left with are what you get in the standard library and some packages that are agnostic of end you are working with, eg: say a package that works with Number formatting.

Apart from these, I don't think there are any shared responsibilities.


## Database

Most popular db... with the people I've worked with seems to be mongo . Not because they need mongo, but only because you don't need schema . Again, going back to showing no interest in fundamentals.
Mongo is great, so is mysql  or postgres and other databases. And each has their usage. But not having a schema is not one of them.

Even if your datastore can be schema-less, what happens in your application code? Do you still only use object , which is a glorified `hashmap<key:string, value: any>` .


## Boundary

I see frontend developers mostly think they are only responsible for making the frontend interactive. While it may be a big part of their daily job, what about other things? For example, DevEx ? Or shipping your code to production? Helping with the build steps, make some mock apis?

In many cases, they create a boundary where everything is javascript and don't wanna leave it.
While I guess it is okay to use the tools you know and understand more, but one should not be fully bounded with in it's borders.

Once, I asked a fellow team mate to move the pre-commit hooks to github CI . It was rejected. No problem with that, but the problem is it was simply rejected because the person did not have experience with github CI nor did he want to do anything about it.


## Bottom line

As mentioned at the very top, it's highly opinionated, based on my experience. Maybe, hopefully, you will have a better experience with it. For me, it was mostly a nightmare. This has been my experience with the language, mostly with other people.

I still remember the good old days of simple javascript for simple things.
