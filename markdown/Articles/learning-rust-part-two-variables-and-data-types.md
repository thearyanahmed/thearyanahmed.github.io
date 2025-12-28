# Learning Rust Part Two: Variables and Data Types

This is part 2 of learning rust series. In [part 1](https://thearyanahmed.com/blog/articles/learning-rust-part-one-intro-to-rust), I talked about what is rust, some of its benefits and how to get started. Today, I'll try to talk about variables and different data types.

## Variables

In Rust, values are bound to variables. Rust's variables are immutable by default. This means, once a value is assigned to a variable, you can't update (or re-assign) the value. Once assigned, they are final. For reassigning, you'll need to use the `mut` keyword, which is a short of `mutable`. To define a mutable variable, you can do as follows

```rust
let mut x = 5;
x = 6;

println!("The value of x is {x}"); // will print 6
```

On the other hand, constants can be defined using the `const` keyword. They are also immutable (can not be updated), but they are different from regular variables. For example, we can not use `mut` while defining a constant, You can not reassign a value to a constant variable.

```rust
const APP_NAME: &str = "Lucy";
// above will work perfectly

// but this will not work
const mut APP_NAME: &str = "Lucy";
```

Also, rust's conventions for naming a constant uses `UPPER_SNAKE_CASE` while regular variables use `lower_snake_case`. You can use camelCase as well, rust will allow it, but it's the conventional way.

## Shadowing

I also want to talk about a thing called `shadowing`. Now, in normal code, we want to avoid this as it may lead to bugs or unwanted behavior. But in rust, because of the immutability principal, sometimes we can use shadowing to our benefit. Let's take a simple example.

We want to take an input from a user (we'll talk about this later), and validate if it is numeric or not. After we are sure that it is numeric, we can parse the string to an integer.

```rust
let mut user_input = String::new();

io::stdin()
    .read_line(&mut user_input)
    .expect("Failed to read line");

let user_input: i32 = user_input
  .trim()
  .parse()
  .expect("Please type a valid number!");

println!("The value you entered is {user_input}");
```

The input we take is always a string. But then we define the type and parse the value to the desired datatype.  You can see that in line 7, we are defining `user_input` again. It has the same name but it's a different variable. The previous `user_input` was string, the newer one is `i32`. From this point onward, `user_input` will reference this new variable, and the old one is discarded.

The benefit is we didn't have to come up with a different name for the variable.

### Shadowing with const

We can do this with constant as well. For example,

```rust
const APP_NAME: &str = "Lucy";

const APP_NAME: &str = "Rosetta";

println!("the app name is {}", APP_NAME);
```

This is valid code and will print "the app name is Rosetta".

Now we can't shadow with mutable variables.

```rust
let x = 10;
let mut x  = 20; // ERROR
```

Doing so will give us the following error

```bash
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:3:5
  |
2 |     let x = 10;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     x  = 20;
  |     ^^^^^^^ cannot assign twice to immutable variable

For more information about this error, try `rustc --explain E0384`.
error: could not compile `part_two` (bin "part_two") due to 1 previous error
```

One interesting thing to note, here rust gives us a suggestion `help: consider making this binding mutable: mut x`. So the compiler tries to help us write better code.

## Data Types

Coming to datatypes, rust, like many other languages, have 2 major types,

* **Scalar**

* **Compound**

Additionally, there are some special types which we'll talk about later or won't talk about at all, for now, let's focus on these.

## Scalar Types

Scalar types are types that hold a single value, they are known sized types. Some examples of scalar types

* **Integers**

* **Floating Point** numbers

* **Boolean**

* **Chars**

## Integer Types

Integers, the whole numbers, can be signed or unsigned. Singed integers allow negative values (so we need to store the sign), unsigned only allows positive values and zero.

A quick note on binary. An unsigned variable (say 8 bit, `u8`), can store values using all the 8 bits. But for signed (signed 8 bits `i8`) it needs to store the sign (+/-) as well. So we can only use the remaining 7 bits.

So, if we take a look, u8 has a range from 0 to 2 to the power of 8 to 0 to 256. But a signed 8 bit can go from -128 to +127.

What are integer types?

| **Length** | **Signed** | **Unsigned** |
| --- | --- | --- |
| 8 bit | i8 | u8 |
| 16 bit | i16 | u16 |
| 32 bit | i32 | u32 |
| 64 bit | i64 | u64 |
| 128 bit | i128 | u128 |
| architecture dependent | isize | usize |

Can we specify integer value in different formats?

| **Number literals** | **Example** |
| --- | --- |
| Decimal | 10_000 |
| Hex | 0xabcd |
| Octal | 0o177 |
| Binary | 0b1011_1010 |
| Byte (u8 only) | b'A' |

We can write a large number with an underscore (instead of traditional comma) to make it more readable.

## Floating point

As we know, a float has a precision. For floating point value, we can use `f32` for 32-bit float or `f64` for 64-bit float.

> The default type is `f64` because on modern CPUs, it's roughly the same speed as `f32` but is capable of more precision. All floating-point types are signed.

```rust
let x = 4.5; // f64
let y: f32 = 3.0; // f32
```

## Booleans

Good old `bool` . Holds true or false. (nothing fancy here) :D

```rust
let is_new = true;
let is_first_time: bool = true;
```

## Chars

Now rust's `char` is interesting. It is of 4 bytes, representing unicode value. Other languages often use 1 byte for a char, which allows standard ascii value. But with 4 bytes, we can have some complex characters.

```rust
let initial = 'A';

let smile = '😊';

let another_character = 'あ';
```

## Compound Types

Let's move on to compound types, simply put, compound types holds multiple values. For the scope of part two, I'll talk about Tuples and Arrays. Maps are out of scope for now.

## Tuples

Tuples are sort of a list. In rust, Tuples have a fixed length. They can not grow or shrink. Meaning if we define a tuple with 3 values, we can not add the 4th one. Unlike arrays, they can have different data types.

```rust
let user: (String, i32, bool) = (String::from("The Aryan Ahmed"), 25, true);
```

There are two ways to unpack values from tuples. Destructuring and Direct Access.

**Destructuring**

```rust
let (name, age, is_admin) = user;

println!("the user's name is {name}, age is {age} and is_admin value is {is_admin}");

// the user's name is The Aryan Ahmed, age is 25 and is_admin value is true
```

Direct access

```rust
println!("the user's name is {}, age is {} and is_admin value is {}",user.0, user.1, user.2);

// the user's name is The Aryan Ahmed, age is 25 and is_admin value is true
```

Here, 0 is the index (starts from zero) and so is 1,2 and if there are more, 3, 4 and so on. Additionally, tuples without any value is called `unit`. An example use case of `unit` is when a function needs to return something, we can return a `unit` .

## Arrays

Unlike tuples, which can hold different data types, arrays can only hold one type of data and arrays also has a fixed length. In array, we want to have the data listed sequentially. For performance reason, it needs to be side by side.

```rust
let ages: [i32; 3] = [10,20,30];
```

Why would we want to use arrays? Well, to have the data allocated to the stack, rather than the heap. Also, it ensures we always have a fixed length.

However, if we want to have growable data collection, we should use `Vec` , which is the equivalent of vector data structure.

## Slicing

Accessing specific values from an array. We know, in an array, a value always has a fixed index. And we can get the value by accessing it via the index. A simple example

```rust
let ages: [i32; 3] = [10,20,30];

println!("the second age is {}", ages[1]);
// the second age is 20
```

But what if we want to access a selection? Say elements from index 1 to index 3? We need to do slicing. To do slicing,

```rust
let ages: [i32; 6] = [10,20,30,40,50,60];

let subset = &ages[1..5];

// Will contain: 20, 30, 40 and 50
```

Here [1..5] is being used as a way of selecting the slice. The second part of the notation is excluded therefore, it gives us 4 elements. Element from index 1 to index 4.

We have some shortcuts too. `..` `..=` and their other variations.

```rust
let ages: [i32; 6] = [10,20,30,40,50,60];

let first_half = &ages[..3];  // Means from the start till index 3
let last_half = &ages[3..]; // Means from index 3 till the end.
let first_to_third_inclusive = &ages[1..=3]; // from 1 to 3, inclusive
```

With these basics of variables, data types and a few fundamentals, I'll talk about function in [part 3](https://thearyanahmed.com/blog/articles/learning-rust-part-three-functions) of the series.
