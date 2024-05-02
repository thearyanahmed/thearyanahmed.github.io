This chapter is part of a series Learning Rust. In this chapter, I’ll discuss about the common programming concepts like variables, data types, functions and control flow. You can find the first chapter here [Learning Rust : Part One - Intro to Rust](https://thearyanahmed.com/blog/articles/learning-rust-part-one-intro-to-rust/) and all the chapters here [Learning Rust](https://thearyanahmed.com/series/learning-rust). 

### Variables
In rust, there are a couple of ways to define a variable. We’ll start with the  simplest one. 
```rust
let x = 1;
println!("The value of the variable is {}",x);
```
We’ll be talking about data types  in a bit. But, here, declare the variable x and set its value to 1. On the next line, we are printing using the variable. 
We can do simple stuff like, 
```rust
let a = 2;
let b = 3;
let sum = a + b;
let product = a * b;
let sub = b - a;

println!("sum {}", sum);
println!("product {}", product);
println!("sub {}", sub); 
```

In rust, all the variables must be used. Else the compiler will throw a warning during cargo run. And if you run cargo build, it’ll also fail. 
```rust
fn main() {
	let hello = 1;
}
```
 
The output for this build would be 
```txt
warning: unused variable: `hello`
  --> src/main.rs:12:9
   |
12 |     let hello = 123;
   |         ^^^^^^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_unused_variable
`
   |
   = note: `#[warn(unused_variables)]` on by default

warning: `hello_world` (bin "hello_world") generated 1 warning (run `cargo fix --bin "hello_world"` to app
ly 1 suggestion)
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
```

Here, I want to talk about the compiler’s suggestions. It says there `hello` is unused. And specifies the line number. It also suggests prefixing the variable with an underscore if that is intentional. 
Updating the code to `let _hello = 123;` would remove the error. Rust wants us to ensure that all the resources we are gonna use in our program are for a valid reason. Imaging holding a variable that stores data with a big footprint but for no reason would be using unnecessary resources of the computer. 

Now, let's add another variable and try to add it to `sum`.
```rust
let a = 2;
let b = 3;
let sum = a + b;
let c = 10;

sum = sum + c;
println!("total sum is {}", sum);
```

This simple code, as expected to add 10 to the already declared `sum` variable would not work. In many languages, variables are `mutable`. You can change the values even after declaration. However, with rust, you need to explicitly tell the compiler that this variable will be changed in the future. 

If you are using any LSP / IDE with rust enabled, you’ll have something like the following,

![https://raw.githubusercontent.com/thearyanahmed/thearyanahmed.github.io/master/markdown/assets/learning-rust/part-02-mut.png](https://raw.githubusercontent.com/thearyanahmed/thearyanahmed.github.io/master/markdown/assets/learning-rust/part-02-mut.png)

You’ll get something similar if you try to run it with `cargo run` . As it says, on line 9, the actual error, 
```txt
cannot assign twice to immutable variable `sum`
```
  
On line 5, it asks us to consider making the variable mutable. 
On line 5, if we add the `mut` keyword before the variable name, it would make the following variable mutable and solve our problem. 

```rust
let mut sum = a + b;
let c = 10;

sum = sum + c;
```
This code will work as expected.

### Bit about Mut
Mut ( `mutable` ) is explicit, because in rust, we can not have multiple mutable references to a variable. Which can lead to problems down the line in multi-threaded programming (eg: multiple writes from different references). This comes as rust’s attempt to memory safety. We’ll talk in details about mutable reference in the future inshallah.

Back to our example, as rust is strictly typed, you can not just re-assign one variable to a different data type. 
```rust
let mut x = 1;
x = "hello"; # mismatch types
```

We need to ensure all the data types match. Even adding a `float` and `int` would require a conversion between one of them to match the other one. 

### Shadowing
```rust
// <-- Scope A Starts
let x : f32 = 12.0;
    
println!("x is originally {}",x);
    
{ // <-- Scope B Starts
    let x =  x as i32;

	let a_string = "hello";
        
    println!("The value x inside the scope {}", x / 2);
	println!("a_string is {}",a_string);

} // <-- Scope B Ends, drops the value of x that is inside the Scoep B
    
println!("Outside the scope, the value of scope is {}",

println!("a_string outside the scope is {}", a_string); // Error: cannot find value `a_string` in this scope

// println!("Trying to divide the original floating point x by 2 (int) {}", x / 2);
// Uncommenting this line of code above would give us 
// "cannot divide `f32` by `{integer}` ..."


// <-- Scope A Ends
```
Output of the program 
```txt
x is originally 12
The value x inside the scope 6
Outside the scope, the value of scope is 12
```

Within Rust's scoping system, shadowing lets you introduce a new variable with the same name as an existing one. This creates a hidden copy, effectively blocking access to the original variable for the rest of the current scope, be it a code block, function, or loop. This power extends to data type changes. 

You can redeclare the shadowed variable with a different type, allowing for conversions on the fly. Shadowing is also useful for temporary modifications. Imagine a loop counter variable; you can shadow it to perform calculations without affecting the original loop iteration value. However, while shadowing offers flexibility, overuse can make code harder to understand. Use it strategically for clarity.

In the code above, there is also a way to handle scopes. There are two scopes. The outter (Scope A), inside that, we have a nested scope Scope B. Within the inner scope, we have access to the parent scope or outter scope here. But after the scope ends ( <-- Scope B Ends ), the values are dropped (more on this dropping of value later) and we have no access outside the nested scope.

## Data Types
Rust is a statically typed language. Meaning, 
**Statically typed:** This means the types of all variables must be known at compile time. The compiler checks to make sure you're assigning values of the correct type to variables. This helps catch errors early in the development process.

So, every value in rust must be of a certain type. For data types, we have **Scalar types** and **Compound types**. Scalar types are of single value. And rust has 4 types. `integer`, `float` , `boolean` and `characters`. `integer` and `floats` have different sizes, based on the size of the value you want to store inside them. `bool` and `char` take `1 byte` and `4 bytes` respectively. 

Boolean holds one `truthy` of `falsey` value. Where `char` holds one single character. 
> `char` is written with single quotes.  

Declaring a variable with double quotes would result it in a `string` type, **NOT `char`**. 

### Scalar Types
Rust has support for `8`, `16`, `32`, `64`, `128`, `arch` bits, each of them are prefixed by `i` or `u`. `i` for signed and `u` for unsigned. So, integer 32 would be `i32` and if it is unsigned, then `u32` . 

Rust has a special `arch` type. It denotes `architecture` . Assigning the data type of `isize` or `usize` would fall back into the architecture of the system. If the system is running on 64 bit, then it will be 64 bit value. If 32 bit, that will fall back to 32 bit value.

```rust
    let integer_8: i8 = 1;     // Range: -128 to 127
    let integer_16: i16 = 1;   // Range: -32,768 to 32,767
    let integer_32: i32 = 1;   // Range: -2,147,483,648 to 2,147,483,647
    let integer_64: i64 = 1;   // Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
    let integer_128: i128 = 1; // Range: -170,141,183,460,469,231,731,687,303,715,884,105,728 
                                //        to 170,141,183,460,469,231,731,687,303,715,884,105,727
    
    // Unsigned integers
    let uinteger_8: u8 = 1;    // Range: 0 to 255
    let uinteger_16: u16 = 1;  // Range: 0 to 65,535
    let uinteger_32: u32 = 1;  // Range: 0 to 4,294,967,295
    let uinteger_64: u64 = 1;  // Range: 0 to 18,446,744,073,709,551,615
    let uinteger_128: u128 = 1;// Range: 0 to 340,282,366,920,938,463,463,374,607,431,768,211,455
    
    // Floating-point types
    let float_32: f32 = 1.0;   // IEEE-754 single-precision floating point
    let float_64: f64 = 1.0;   // IEEE-754 double-precision floating point

```

> We’ll cover **Integer overflow** and how rust handles them in a future article. 

### Compound Types
Compound types are groups of multiple values into a single type. Rust has mainly two primitive compound types. `Tuples` and `Arrays`.

Arrays hold multiple values of the same data type. Array is of fixed size, allocated on the stack. If you create an array, it’ll take up the blocks next to each other. Each element can be accessed by their index value, starting from 0. 

```rust
// Create array, of type i32, with the length 5
let a: [i32; 5] = [1, 2, 3, 4, 5];

// Create an array with 5 elements, each of them has the value 10
// let a: [i32; 5] = [10; 5]; 

let second = a[1]; // arrays are zero based. The first element would be a[0];

// let out_of_index = a[50]; // Throws an error, as index 50 does not exist.
```


**Understanding Array Memory Allocation**
* **Contiguous Memory:** When you declare an array in most programming languages, the system allocates a contiguous block of memory to store all the elements. This means the elements are placed sequentially in memory, making access efficient.
* **Predetermined Size:** At compile time (when your code is translated into machine code), the compiler typically determines the size of the array based on the declaration (e.g., int numbers[10];). This size remains fixed throughout the program's execution.

![How arrays take up space in your memory block](https://raw.githubusercontent.com/thearyanahmed/thearyanahmed.github.io/master/markdown/assets/learning-rust/part-02-memory-allocation.png)

Imagine this is your system's memory. Part of your program or other programs running on the systems are using chunks of memories here and there. When you declare an array, your system needs to have enough **contiguous memory** blocks. In the art here, if you declare an array with the length of 5, it'll **not** start from the top left (row 0, col 0). The program will look for an area where it can fit 5 elements (one in each block). So it looks for empty / usable contiguous cell of 5 or more. 

If we declared an array of 6, it would go to the second row, marked in orange with `array (7)`. 


⠀**Memory Considerations**
* **Limited Memory Resources:** Every system has a finite amount of memory available for running programs. Other applications and the operating system itself also consume memory.
* **Allocation Failure:** If the requested array size exceeds the available contiguous memory, the allocation might fail. This can lead to a program crash or runtime error if not handled properly.

In tuples, we can group multiple values with multiple types. Rust offers custom data types using structs but tuples can be used for many of those cases. For example, you can have a color tuple that represents RBGa value.

```rust
let rbga_red: (u8, u8, u8, f32) = (255, 0, 0, 0.75); 
```

There are two ways to access the values for tuples, using indexes and destructuring. 
```rust
let color: (u8, u8, u8, f32) = (255, 0, 0, 0.75); 

// index based
println!("red : {}, green : {} , blue : {}, opacity: {}",  color.0, color.1, color.2, color.3);

// destructuring
let (red, green, blue, opacity) = color;
println!("red : {}, green : {} , blue : {}, opacity: {}", red, green, blue, opacity);
```

## Inferred Types
Sometimes it is obvious of the data type of a value, in those scenarios we don’t need to specify what is the type. Rust infers the data type, which reduces boilerplate code, improves readability in some scenarios. 
```rust
let a : f32 = 1.0;
let b = 1.0; // f32, rust inferred the data type understanding it is a floating point.
let c : f64 = 1.0; // specify data type
```

These were the primitive data types that rust has to offer. We can obviously make our own custom data types using structs but more on in a future chapter inshallah. Next, we’ll be talking about functions a bit.