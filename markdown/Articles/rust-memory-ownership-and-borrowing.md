Rust has a pretty good approach to handling this. There is a bit of learning curve. But if you skip it for any reason, or don’t understand it quite well, then it’ll be difficult for you to write good rust code.

It’s the ownership model. That keeps us safe and lets us sleep at night after we deploy we rust code to production. This is also how rust avoids a garbage collector.

This is my take on the matter, as I’m learning, I might have made a mistake while writing, feel free to point it out.

Lets get started,

## The Stack
> *In computer science, a stack is an abstract data type that serves as a collection of elements, with two main principal operations: *Push, which adds an element to the collection, and Pop, which removes the most recently added element that was not yet removed. — WikiPedia

So, a stack, the idea is to say have objects on top of another. When we add an object, we add it to the top. And when we remove anything from it, we also do it from the top.

## The Stack Frame
Our code, in terms of execution, think that it is loaded in the stack. So, for rust, we start from the main function. We put our main function on the stack.

How to put it…? Imagine our stack frame is a sheet of paper. And the function body is on the sheet of paper.

And imagine our processor is a person, who reads the current sheet of paper in-front of him, and does what’s instructed.

The current stackframe is also, in other words the scope.

## When a function is called
When a function is called, that is when we actually put our sheet of paper on top of our stack. Lets take a look at the following code,

```rust
fn main() {
  println!("Hello, World");
 
  let x = 10;
  println("{}", x);
 
  print_another_variable();
}

fn print_another_variable() {
  let k = 11;
  println!("{}",k)
}
```
Our first stackframe is the main() function body. It writes Hello, World, then assigns the value 10 to x, then prints it. Then calls another function print_another_variable().

print_another_variable() is written in another sheet of paper. When we call it in our main function, we put print_another_variable() sheet on top of our main() sheet.

Now our processor person is reading from what to do from the function write in front of him. Our processor person can only see (access) the page right in front of him. Not the pages beneath.

After the function has been completed, the sheet of paper is torn apart. And we back to the line this function was called from, and move forward.

> Stack is very fast

Now, when we put something on the stack, we need to tell it how much memory we need. For an i32 for example, the size is know. It’s a 32 bit signed integer.

If we try to remember, the maximum value for an integer is 2147483647. If we try to put anything beyond that, it’ll overflow. But the key point is we know the bits. 32 bits fixed. Putting something bigger won’t make it 33 bits. It’ll always be 32 bits.

> Size Unknown
Putting stuff on the stack works fine when the size is known. But what about the times we don’t know the size? For example a slice or vector? Or a string (not a char) .

Let’s think for a moment, we want to store dynamic values. Where the value can grow or shrink. Take an array. Array’s has a fixed length. An array[5] can hold 5 elements at max.

But a vector can grow, you can start with 5 elements, end up having N where N is <, = or > than 5. We can not ask our stack to give us unlimited space.

For these problems, let’s add a layer in between. We don’t directly put the growable data in to the stack, we put our growable dynamic data somewhere else. And, we put a pointer, which’s size is known, we put the point to our stack.

> Heap
Our heap is not as fast and efficient as our stack, but it gives us support for handling dynamic content like strings or vectors.

Putting our growable dynamic data somewhere else. This somewhere else is our heap.

Lets take a look at the code below,

```rust
fn main() {
    let a = String::from("Hello, World");
}
```

For this piece of code, we tell the heap to store “Hello, World” string into memory. It checks how much space does it need based on what we have currently. We have 12 characters (comma and space included).

The heap takes say memory address 0xAB0001 (lets assume), and starts putting our string. Imagine the sequence goes on like this 0xAB0001, 0xAB0002 … 0xABN.

Our hello world string ends at 0xAB0012. But what do we store in our stack? Our stack holds the following values,

ptr = 0xAB0001 # a pointer to our first memory address
cap = 12 # cap stands for capacity 
len = 12 # len stands for length
If we update the string to Hello, our capacity still remain 12, but our length will be 5.

And we know the size of the pointer variable itself. If we break down capacity and length, we know their value too.

So we have a solution. Let’s take a look at the 3 rules of ownership rust tells us about.

## 3 Rules of Ownership
1. Each value in Rust has a variable that’s called its owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped.

## Copy & Pointer
Lets take this example for a moment

```rust
let x = 100;
let y = x;
```

This will trigger a COPY. Copy of the value 100. Cause x in this case is an integer, or in other words, a known sized variable. Same for other known sized. It’s cheap and fast to copy them around.

But, for the following code,

```rust
let a = String::from("Hello");
let b = a ;
```

So, like before, a should be a pointer to the heap memory, holding the data “Hello”. If so, now when we assign b, if it copies the pointer like we would do for an integer or known sized data type, then our “Hello” would have two owners.

## 2 Owners & Double Free Error
For our analogy mentioned above, Hello has two owners. But if one changes, there isn’t any way for the other one to know that something has changed.

Maybe for a we have changed it to “Hello, Universe, this is from the Milky Way galaxy.”, **the capacity and length both has changed. But for b, it doesn’t know yet! The pointers get out of sync**.

Now when it’s time to clean up the memory, both owners a and b tries to clear the memory. That will trigger error, cause say a clears the memory at first, and then (imagine), even if it is the very next step b tries to clear the memory.

But it has already been cleared!

Let’s think of another scenario, our capacity was 12. Now we assign a very long string, and make the length (and capacity) of the string 500.

These are 500 characters of single chars. They need to sit next to one another. Just like an array. Remember array takes a fixed memory, so all the elements sits next to another according to the sequence?

Now, the CPU sees that there isn’t 500 free blocks of memory from that 0xAB0001. Meaning, we would need from 0xAB0001 to 0xAB0500 continuous.

Seeing that the space is not available, it reassigns the value to a next memory address. Maybe 0xQQ0001 to OxQQ0500.

But for b, there is no way to know that the string *ptr -> should not longer point to 0xAB0001. Resulting in garbage value.

## Rust’s solution
So for rust, when assigning let b = a where a is a string or of unknown sized data type, it triggers a move instead of copy. Meaning, the pointer information that was stored in a, is now stored in b, and a doesn’t have that information.

If we run the following program, it’ll cause an error, saying `move occurs because a has type String, which does not implement the Copy.

```rust
let a = String::from("Hello");
println!("{}",a);

let b = a;

println!("b = {}",b);
println!("a = {}",a);
```

## Copying the unknown sized data
If we wanted to copy the actual value “Hello” to be, we need to do a Clone instead like let b = a.clone(). And take a moment to realise that these solutions abide by the rules of ownership.

## Rule 3 — Out of scopes
Take a look at the following,

```rust
fn main() {
 let a = String::from("Hello");

 print_something(a);

 println!("a in main => {}", a);
}

fn print_something(a : String) {
 println!("inside the function => {}", a);
}
```

Function params behave in a similar way. In this print_something() function, we pass in an argument a : String . See the function does not return anything.

So, the variable’s pointer information is passed to that function’s a parameter. Just like let b = a example mentioned above. Also, remember that functions are like a sheet of paper? So when the call ends, it’s torn apart.

In rust’s words, the value is dropped.

What happens here? This program will throw an error. Once the ownership of a has been passed to print_something, and print_something has been executed, it goes out of scope. And as the function doesn’t return anything, all the value inside it is dropped.

Therefore, in the main function, we don’t have any value for a. We gave the ownership away. Now running println!(“a in main => {}”, a); after calling print_something() will trigger an error.

But if we called the print_something() function after println, then it would not be a problem cause during println, the a variable still holds the information.

## Returning the ownership
Another way to solve it is to return a value from the function. Take the following code and it will run just fine.

```rust
fn main() {

 // added `mut` here
 let mut a = String::from("Hello");
  
 a = print_something(a);
 
 println!("a in main => {}", a);

}
// Notice the " -> String", it means it is gonna return a string
fn print_something(a : String) -> String {
 println!("inside the function => {}", a);
 
 a // here we are returning a string value
}
```

We needed to add mut because rust’s variables are by default immutable. But the key point here is in a = print_something(a), we are getting back a string from the print_something() function.

## Borrowing | Passing the reference
Another solution would be to pass the reference. Take the following example

```rust
fn main() {
 let a = String::from("Hello");

  // we are passing a reference, denoted by '&'
 print_something(&a);
 
 println!("a in main => {}", a);
}

// see I've added '&' before String
fn print_something(a : &String) {
 println!("inside the function => {}", a);
}
```
This also runs well.

## Single mutable borrow at a time
Rust allows single mutable borrow at a time. You can have multiple immutable or read only borrows. But you can not have

```rust
let mut a = String::from("a");

let b = &mut a;
let c = &mut a;
```

It’ll throw an error. Going back to the same problem, imagine b changes some data but c doesn’t know about it.

Ownership, Read only borrow , Mutable borrow and Returning ownership
You can tell what a function do.

```rust
fn a_func(takes_ownership: String, read_only_borrow: &str, mutable_borrow: &mut String){}
```

// add '-> String' before the first curly brace if you want it to return some ownership.// add '-> String' before the first curly brace if you want it to return some ownership.
**Update**: I would like add the following two sections based on the feedback I’ve received.

## Borrow vs Move under the hood
> that “borrow” keeps the data at the same place on the stack and passes a memory pointer only, but “move” always copies it from one place of the stack to other one. Therefore, only sized data can be moved, and it can cause a performance issue. In this way lifetime is automatically ensured by how stack works.
-Tibor Erdelyi , Lead Software Engineer at Upland BA Insight

Multiple mutation
> While technically Rust offers only one mutable borrow, with Cell<T> you can have multiple &Cell<T> which allow mutation of the contents using Cell::<T>::set(&self, T) associated function.
- Dmitrii Demenev

## Footnote
Why write this article? Because, when I started reading the rust book I thought it might be simply like some other language. Some string functions to lowercase and uppercase and finding length or concatenating.

## I was wrong.
  
Rust book gave me a very good tour of the stack and heap mechanism. It was a nice reminder but a lot to take in. Specially coming from PHP, JavaScript.

And soon after, though I continued to read the book, I had forgotten about the ownership and borrowing.

So I thought I write it down, after looking at some videos and reading the chapter again.