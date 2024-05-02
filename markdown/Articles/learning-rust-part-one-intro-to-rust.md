### Introduction to Rust
In the ever-evolving world of programming, there's a constant quest for languages that excel in both speed and reliability. Enter Rust, a cutting-edge systems programming language rapidly gaining traction. Designed by Mozilla, Rust addresses the common pitfalls of low-level languages like C and C++ while offering modern features that boost productivity and code dependability.

One of Rust's core goals is to eliminate bug classes like null pointer dereferences, buffer overflows, and data races, which frequently lead to security vulnerabilities and system crashes in other languages. 

This is achieved through Rust's unique ownership system, ensuring memory safety without the need for garbage collection. By enforcing strict compile-time checks, Rust empowers developers to write robust code, free from many common errors. Additionally, its emphasis on zero-cost abstractions and performance guarantees make it ideal for systems programming tasks where efficiency is paramount.

**Welcome to the Rust Programming Series!**
This would be my take on learning rust.

This series serves as your guide to the exciting world of Rust, from its fundamental building blocks to advanced concepts. We'll embark on a journey that delves into Rust's syntax, control flow, functions, and memory management, concurrency, equipping you with the skills to conquer various programming challenges. 

Along the way, we'll explore the language's strengths and potential hurdles, providing practical solutions and best practices. Whether you're a seasoned programmer or just starting out, this series will equip you to harness the power of Rust and build robust software for the future.

Some points to consider regarding Rust, 
* **Safety and Speed:** Rust is known for being both safe and fast. Unlike some other languages, Rust's memory management system helps prevent crashes and security vulnerabilities from memory errors. At the same time, Rust's performance rivals that of C and C++, making it suitable for applications where speed is crucial.
* **Concurrency:**  Rust promotes safe concurrent programming, which is becoming increasingly important in the age of multi-core processors. This means you can write code that can take advantage of multiple cores without worrying about data races or other concurrency problems.
* **Embedded Systems and IoT:**  Rust's focus on memory safety, small binaries, and efficient resource management makes it a great choice for developing embedded systems and Internet of Things (IoT) devices.  These devices often have limited resources and need to be secure and reliable.
* **Fearless Refactoring:** Rust's ownership system enforces memory safety at compile time, which can make refactoring code much safer.  You can be more confident that changes you make won't introduce new bugs.
* **Modern Toolchain:** Rust boasts a powerful and user-friendly toolchain that includes features like a fast compiler, a great package manager (Cargo), and a top-notch debugger.  This can make development faster and more enjoyable.
* **Community and Learning Resources:** The Rust community is known for being welcoming and helpful. There are many online resources available to help you learn Rust, including tutorials, documentation, and forums.
* **Functional Programming Features:** Rust incorporates elements of functional programming paradigms, which can lead to cleaner and more concise code. This can be especially beneficial for complex projects.
* **Ownership System:**  A core principle in Rust is the ownership system. Every value in Rust has a single owner, and when that owner goes out of scope, the value is dropped. This prevents dangling pointers and memory leaks, which are common culprits in concurrency issues.
* **Borrowing Rules:**  Rust's borrowing checker ensures that you can't have multiple mutable references to the same data at the same time. This stops data races, where threads might accidentally modify the same piece of data concurrently, leading to unpredictable behavior.
* **Synchronization Primitives:**  Rust provides mechanisms like channels and locks for safe communication and coordination between threads. Channels enforce ownership transfer for data being sent, preventing race conditions around shared access. Locks guarantee exclusive access to shared data for a thread, ensuring consistency.
* **Compile-Time Safety:**  By enforcing these rules through the compiler, Rust catches concurrency problems early in the development process. This saves you time debugging issues that might not surface until much later and can lead to more robust and reliable concurrent programs.
* **Growing Demand:**  Rust is a relatively new language, but it's already being used by major tech companies like Mozilla, Facebook, and Dropbox. As Rust continues to grow in popularity, the demand for Rust developers is likely to increase as well.

![Compnaines that use Rust (source: workfall)](https://lh3.googleusercontent.com/Dba_67Yaej9lN31As9c_wYTynA5DccWOH8FNhi4LI7MUGdzBJ2GwfYgVy6EvZC7GEihlPzQbCtpniLe1fqpaQxR4Xx2Y1N1NbmaCp49Xf8NNmw0uKJnHzq6_JH17Ea4cmZgm8FqnKIWRXyZdoF5m0A)

And amazon too

![Amazon services that uses Rust (source: workfall) ](https://lh6.googleusercontent.com/WEM69oIXzvjjBaY_VQbM2WdvqRAQBeo2OUD16Fq2csWLVztJ6zI598mB3lElPPNEvi-yreVY7hqpedi9RVxDeFoTbYMkOjI-HQbQS2DpCHWRHiQnqqf0ZNw0Ne61H-E5LOM-JCtVvtpY_d1K5pYc7Q)

### Essence of small changes
A small imperfection here and there leads up to a big buggy code everywhere. I'm not claiming writing rust code would be 'perfect'. 

However, the way rust enforces the programmer to handle all edge cases and other features like the borrow checker removing the need for a garbage collector, it is likely that the same programmer would be less mistakes with rust. As it is baked into the rust ecosystem.

> But when we repeat 1 percent errors, day after day, by replicating poor decisions, duplicating tiny mistakes, and rationalising little excuses,  our small choices compound into toxic results. It’s the accumulation of many missteps - a 1 percent decline here and there - that eventually leads to a problem. 
> 
> *Atomic Habits*

- **Enforces Memory Safety**: Unlike some other languages, Rust prevents memory-related errors like dangling pointers, buffer overflows, and use-after-free. These errors can be subtle and hard to detect, but they can lead to crashes, security vulnerabilities, and unexpected behavior. By eliminating this entire class of errors, Rust helps you write code that's more reliable and less prone to regressions.
- **Catches Errors Early**: Rust's strong type system and borrow checker catch many errors at compile time, not runtime. This means you identify and fix issues before your code even runs. Imagine catching a typo in a variable name before it leads to a logic error further down the line - that's the power of early error detection.
- **Encourages Immutability**: Rust promotes immutability by default, which means data doesn't change after it's created. This helps prevent accidental modifications and unexpected side effects. Think of it like atomic habits for data - small, predictable changes lead to a more stable system.
- **Improves Code Readability**: Rust's focus on ownership and clear semantics makes code easier to understand. This allows you and other developers to reason about the code more easily, reducing the chance of misinterpreting logic and introducing errors.
- **Promotes Small, Focused Improvements**: Rust's modular design encourages breaking down problems into smaller, testable units. Similar to Atomic Habits' focus on small, incremental changes, this allows you to make focused improvements and ensure each step functions correctly before moving on.

By following these principles, we can use Rust to write code with fewer errors, leading to more reliable and maintainable software in the long run. It's like building good coding habits one step at a time, just like the book *Atomic Habits* suggests!

### Installing
You can install rust with the following command
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
For other installation methods, you can find detailed instructions at [Other Installation Methods - Rust Forge](https://forge.rust-lang.org/infra/other-installation-methods.html) 

You can also try rust online from [Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021). 
### Hello World
In a folder, create a file called `main.rs` and add the following code,
```rust
fn main() {
    println!("Hello World!");
}
```
 
And then run `rustc main.rs` . It will create a compiled binary with the file name. For our case, `main` . Then simply run
```bash
./main
```

The output should be “Hello World”. Rust will try to run the entrypoint file’s main function (by default). In our case, main.rs is the entry file. And `fn main` is the main function that will be invoked upon running the program. 

### Hello World, Again!
This time, we want to use `cargo` . Cargo is rust’s build system and package manager. You can see your cargo version with `cargo --version`. To create a new project, we need to run `cargo new hello_world`. It will create a project called *hello_world*. Running `cargo --list` will show all available commands. 
If you want to create a library, you can add the `—lib` flag at the end of the `cargo new` command. 

![hello world again project structure](https://raw.githubusercontent.com/thearyanahmed/thearyanahmed.github.io/master/markdown/assets/learning-rust/part-01-hello-world-again.png)

If you take a look at the project structure, it starts with an empty .git repo. Has the `main.rs` file inside `src`, where most of our code will live. The `target` is a folder created by cargo. When we run `cargo run` (see the bottom part of the screen shot). For now, we can ignore this directory. It holds some files related to build. 

We also have a `Cargo.toml` file. It is the project manifest. Here's a breakdown of what Cargo.toml typically includes:
* **Package Metadata:** Information about your project, such as its name, version, authors, and license.
* **Dependencies:** A list of other Rust crates (libraries) your project relies on to function. You can specify the version requirement for each dependency.
* **Optional Features:** A mechanism to enable or disable functionalities within your crate or its dependencies. This allows for conditional compilation and creating leaner builds.
* **Build Instructions:** You can define custom build instructions or settings within the manifest.

The `Cargo.lock` file stores some extra information for our libraries and dependencies, their versions etc. It will be auto generated / auto updated when we update `Cargo.toml` file. 

Before we move forward, I want to point towards the output message by cargo. It says, 
```txt
Finished dev [unoptimized + debuginfo] target(s) in 0.05s
Running `target/debug/hello_world`
```
 
This build is **unoptimized** and contains **debuginfo**. Which will make the file size a lot bigger. This is useful for, unsurprisingly, debugging. We’ll discuss release builds and how to improve builds based on our needs in a future episode. 
You can also see, it is running `target/debug/hello_world` . Running an `ls` on the target would give you something like 
```txt
$ ls target/debug/
build/         
deps/          
examples/      
hello_world*   <----- Cargo is running this binary
hello_world.d  
incremental/
```

And as expected, in the terminal, we see “Hello, world, Again!” in the final output. With this setup ready, we can start diving into what rust offers as a language and ecosystem. In the next chapter, I have written about basic concepts like [variables and data types](https://thearyanahmed.com/blog/articles/learning-rust-part-two-variables-and-data-types).