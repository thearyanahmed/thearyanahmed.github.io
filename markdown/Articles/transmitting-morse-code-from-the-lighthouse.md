I started lighthouse quite some time ago. Which wasn't continued for various reasons. But I have the intention to continue again. In a slightly different way.

A small project with Raspberry Pi and Rust. A project to get my feet dirty. I tinker with Rust from time to time. So I was thinking, what about, not a REST API but something much simpler? Yet it carries a significant real world value.

## ProjectLighthouse

Just like it's a guide for sailors, during the journey at sea, another important thing is communication.

Morse Code: communication using dot and dash signals. Kinda like binary, using 2 different representations.

My favorite usage of Morse code is in Interstellar, where Cooper transmits the quantum data of the black hole from another galaxy in dot-dot-dash on the second hand of the watch.

Morse code has several uses, such as when danger comes. When the Titanic started sinking, one of their communication mediums was Morse code. When internet and mobile data were turned off in July '24, maybe we could have maintained at least basic communication with others by transmitting Morse code with some device. Maybe. We would have needed some radio transmitters through which the signal would carry (anyone can try to build one if they want).

Morse code is extremely effective for transmission even with low bandwidth, weak signals. As long as we can transmit two different signals and separate them.

**Key benefits:**

- An extremely simple device can be used for communication in emergencies like warzones
- Can be kept as a backup system
- You get the idea (hopefully)

Do these still have a need? Now it's the era of 5G. High bandwidth, fast internet etc.

### Not so advanced tech

Yes, there's still a need. If you want to work in robotics, the aerospace industry, if you want to send a rocket or satellite to space with code you've written, which will probably outlive you, travelling across the stars, where probably no human would ever reach, there's a need.

I'm not talking about the need for Morse code. I'm talking about these simple, low-level tech in general.

## The Program

While thinking about all these random things, I wrote a small program that transmits a text input in Morse code. In the form of light, by blinking LEDs.

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7999c613-6d57-4afc-b5ad-5912caf0aef1_1712x1848.png)

Full source code is here: <https://github.com/thearyanahmed/x-bkon>

### Real-world connections

If you want to connect more usage, [rosetta was calling home](https://thearyanahmed.substack.com/i/158828521/do-you-know-rosetta) in the dark vacuum of space.

I don't have a sound module right now, but the famous sound of Morse code should come out if connected with its sound module, along with the light.

If there was a sound module, it would sound kinda like this (using a different Morse code):

You can tinker with Morse from: <https://morsecode.world/international/translator.html>

## Explaining the code

This section is for beginners.

Our program [executes the main function](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L42-L78). First it checks if input has been given. If not, it prints usage and exits.

If proper input is given, it [transforms the text into Morse code](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L53). The conversion to Morse code is fixed, so I've kept the supported characters (here a-z) in a [map](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L81-L111). So that we can check in O(1) lookup time what the Morse representation of a character is.

For example, the Morse code for **l** (lowercase L) is `.-..` ([here](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L93)). Then we trim the input (removing left and right whitespaces), make it lowercase, and split it by the whitespaces between words to get the words. For each character of the word, we get the Morse code from that map.

This way we get the Morse representation of the text input. Then using an (initially infinite) [loop](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L60-L75), we blink the Morse and keep a count. When it exceeds 100_000, we exit the loop.

### The blink function

The work of the blink function is also quite simple. After the above work, we have the Morse (dots and dashes: `.-_.._` etc) of the input. And based on these dots and dashes, we're keeping the light on.

How can we represent 2 different states (dot and dash) with one light? Well, in this case, a significant difference in delay can be used. Here, whether it's a dot or a dash, the light is initially off, then turns on and then goes off again, so we keep:

- **Dots** lit for [50 ms](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L7) (shorter)
- **Dashes** lit for [400 ms](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L8) (longer)

So with light, not just on and off phases, but more data transmission is possible. Maybe the submarine cables do something like this.

And the light is connected to [GPIO pin 18](https://github.com/thearyanahmed/x-bkon/blob/master/src/main.rs#L56-L57) of the Raspberry Pi.

## Final thoughts

Can you imagine? A few lines of code, potentially can save someone's life, transmit valuable information? Notify that there is something wrong? Or right?

### Childhood memories

Did you ever light a bulb by connecting wires to a battery in childhood? If yes, do you remember the first experience? I was surprised, though was hoping for a similar experience. And boy it was :D

While this is not the lighthouse, but just a blink.

---

Some of my writings
