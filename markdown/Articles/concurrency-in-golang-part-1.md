This approach ensures that when multiple threads share or access a common resource, undesirable scenarios such as race conditions or deadlocks are avoided. Concurrency also enables disparate computations to yield identical results regardless of the order in which they are performed.

## What is Concurrency?
Concurrency refers to the simultaneous and autonomous execution of multiple processes. This approach ensures that when multiple threads share or access a common resource, undesirable scenarios such as race conditions or deadlocks are avoided. Concurrency also enables disparate computations to yield identical results regardless of the order in which they are performed.

In the context of single-core hardware, concurrency can be attained through context switching. Conversely, in multicore hardware, parallelism comes into play to achieve concurrency.

> “Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once.” — Rob Pike

https://www.youtube.com/watch?v=oV9rvDllKEg&ab_channel=gnbitcom


Before going into patterns, I would like to talk about a few concepts, relevant for writing concurrent code.

## Deadlock
A deadlock is a situation when a task is waiting for something that will never happen. For freshers, a job needs experience, and to have experience you need a job is sort of like a deadlock situation.  
For simplicity,

> In a deadlock, two processes wait for each other.

In terms of go, both of the following will result in a deadlock. The `make(chan int)` creates an unbuffered channel. 

```go
package main

func main() {
	channel := make(chan int)
	<-channel
    
    // or 
    //  channel <- 1
}
```

## Livelock
A livelock situation is a scenario where the processes are trying to resolve the issue within themselves but, they do not succeed. Imagine in an aeroplane isle, only one person can walk. If two people wants to go to the opposite end, they'll be blocked by each other in the middle. In a livelock situation, they'd go back or try in a different way to cross the isle together, individually, but at the same time (timeframe), but will fail cause the isle only allows one person at a time. 

Though they are trying to solve it, they'll not be able to (unless one of them goes back to the starting point and waits for the other person two cross).


## Race condition
Race condition is a scenario where two or more threads have access to the same data and wants to update it simultaneously. But due to the lack of order, the changes are committed. 

Take the following code for example, we have a simple for loop that calls an anonymous function to increment the value of `x` by 1. We call it 5 times. Though in synchronous code, the final result will be 5, in this code, the value will be `0`.

```go
x := 0

fmt.Println("Initial value of x is ", x)

for i := 0; i < 5; i++ {
  go func() { // spawn goroutines here
		x++
	}()
}

fmt.Println("Final value of x is ", x)
```
The reason for this is when the nested function reads the value of `x` it is still `0`, and it increses by 1, but by these time, all other spwaned goroutines have read the same value and increased by 1. 

**Sidenote**  Why `0` then? Why not `1` ? `goroutines` does not wait for this operation to finish and therefore, by the time the final `println` is called, the value is still 0.

## Starvation
One of the ways to solve this race condition would be to use a mutex lock. But imagine a scenario, we have different tasks with different priorities, and what if a task with higher prirority keeps executing (and keeps the CPU busy)? Or the scheduler schedules more high priority tasks and pushes them in the middle?

In this scenario the lower priority task/s will never get executed or will execute after a long delay.

## Synchronization (sync)
It is essential that we sync our tasks when writing concurrent programs. There are a few concepts in these scenarios that we can follow. Golang also has libraries for them. I'll talk about **mutex**, **atomic** and **waitgroups**.

## Mutex

> A mutex is a synchronization primitive used in concurrent programming to control access to shared resources, such as variables, data structures, or code sections, in a way that ensures only one thread or process can access the resource at a time. 

Mutex is short for `mutual exclusion`. A mutex provides two functionalities, acquiring and releasing (a) lock. When we are working with shared data, before starting to work with it, we put a `lock` in it, so other threads can not update the value until we release the lock. After our operation is done, we `release` the lock.

## Atomic
The `sync/atomic` package provides low-level atomic memory operations for basic types, allowing you to perform atomic operations on variables shared by multiple `goroutines` without the need for explicit locking. This is crucial for writing safe and efficient concurrent programs.


## WaitGroup
The `sync.WaitGroup` type in Go is a synchronization primitive used to wait for a collection of goroutines to finish their execution. It provides a way to block the execution of a program until a specified number of goroutines complete their work. This is particularly useful when you have a set of concurrent tasks and you need to ensure that all of them have finished before proceeding with the rest of the program.

## Channels
A channel is like a pathway that lets different functions talk to each other while they're running at the same time. You can send and get data through it, like numbers or words. When you've got lots of tasks happening all together, channels make it easy for them to share information. Think of them as the connections between these tasks. Channels are kind of like pointers, so you can easily give them to tasks and use them to pass data back and forth.

It is one of the most important features of golang. Go has two types of channels. Buffered and unbuffered. Buffered channels are simply a channel with some capacities. It can hold values. While you can think of channels being pipes, buffered channels are pipes with buckets (to store something).

```go

// unbuffered channel
var unbufferedChannel chan int
unbufferedChannel = make(chan int)
go func() {
  unbufferedChannel <- 1
}()
fmt.Println("unbuffered channel ", <-unbufferedChannel)


// buffered channel
bufferedChannel := make(chan int, 2)
bufferedChannel <- 1
bufferedChannel <- 2
// bufferedChannel <- 3 // uncommeting this line will block cause the capaticity is 2 
fmt.Println("first channel ", <-bufferedChannel)
fmt.Println("first channel", <-bufferedChannel)
```