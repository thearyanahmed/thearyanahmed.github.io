I was working on a CLI that interacts with [projectlighthouse](https://projectlighthouse.io/) via API. The CLI is written in Rust. One of the things that I want is **"correctness"**. Even for small things. And since lighthouse is my own project, I want to ensure that as much as I can. Obviously I can't guarantee nor do I expect that it will be a completely correct program, still.

There's another reason - in many of Bangladesh's skill-based ed-Tech platforms, mainly the **tech-"edTech"** ones, you often see errors on the welcome page first, and the page may or may not load afterwards. In many cases there are manual features, which sometimes require learners to contact customer support, sometimes wait, sometimes the experience is not good. Often it's not good.

Thanks for reading Aryan's Journal! Subscribe for free to receive new posts and support my work. These are based on my first hand observation.

On one hand, many people complain that we are far behind. But on the other hand, the solutions that are coming are not in good shape either - that error on the welcome page first thing.

I think the people of Bangladesh deserve better than this.

So, I was working on a CLI that will be released as a binary. And its API will work with a remote server. The remote server's URL will be known through environment variables. Environment variable because when I develop locally, the URL is likely `localhost`.

So at the beginning, a function that will hold some values to initialize the API client: `base_url`, `environment` and `api_version`. This article is about `base_url`. It will likely be something like `https://projectlighthouse.io/api` or `/something`, but the CLI (binary) that learners will use will always call `projectlighthouse.io` (as of current plan), focusing on the domain, not the uri path.

So the initial code:

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F173e0db6-b8ae-4f35-a799-09b0d2cb153c_2166x854.png)

But since we'll need `localhost` in the development environment, I'm taking the value from env instead of hardcoding it.

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff79bb65a-0c99-41ec-896e-ff4366937448_2170x210.png)

And it works. But, what is stopping me from setting:

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9447ace-d218-4db6-b019-5e407f7dafc8_2180x194.png)

Or, when some bad actor attempts some malicious act, could they set something like `LUX_API_BASE_URL=https://badactor.gonnastealyourdata.com` and run `lux auth --something`? Could be a social engineering attack as well? No?

> By the way, `lux` is the name of the CLI.

Well, how likely is this scenario? I will probably set up a GitHub action or some automation script once that sets `LUX_API_BASE_URL` to `https://projectlighthouse.io/api`. And then likely no one will change it again. And, there's no critical data here that a hacker would come and try to hack. At least not yet, some features might be different in the future.

### …but,

I think the people of Bangladesh deserve better than this. Just like the machines deserve better software for it to run.

## How to solve it

Those who think this is not a waste of time, many of you might think, this can be solved just by writing a validation. And yes, that's the solution, but it's part of the solution. This won't be completely right until we ensure that `base_url` is of a very specific type. Then we can validate it with the type. Kinda like we don't have to validate this code to see if it's correct or not:

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff804f0e5-3f96-420b-b48a-4039f6950eb5_2174x324.png)

This won't compile. Because adding the string "Hello" with the number 10 is not logical. Unless you are writing JavaScript (which is also not logical >_<). Let's define our base api struct:

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9beb0922-29a2-478e-94e7-ec17c6b2e7b5_2178x210.png)

In Rust's language, this is called a **tuple struct**.

> Rust also supports structs that look similar to tuples, called *tuple structs*. Tuple structs have the added meaning the struct name provides but don't have names associated with their fields; rather, they just have the types of the fields.

*From* **The Rust Book** ([source](https://doc.rust-lang.org/book/ch05-01-defining-structs.html#using-tuple-structs-without-named-fields-to-create-different-types))

Tuple structs don't have named fields (properties). We will now use a tuple struct to construct a `LighthouseAPIBaseURL` type from a string.

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe793e91-acf9-4d46-9003-794eb7f5e12f_2168x1686.png)

We are exposing a `from()` method in the tuple struct, which executes the validation logic and returns a `Result<Self = LighthouseAPIBaseURL, String>`.

## Don't unwrap()

We could have used `unwrap()` here if we wanted. But who knows, if projectlighthouse becomes a billion $ company like Cloudflare someday, we won't lose millions of dollars because of one unwrap.

### Cloudflare outage, unwrap() somewhat responsible

- "In this case, the 3 hour 20 minute outage could have direct and indirect losses of around $250 million to $300 million when you consider the cost of down-time and the downstream effects of services like Shopify or Etsy that host the stores for tens to hundreds of thousands of businesses." - [Report by CNET](https://www.cnet.com/tech/services-and-software/cloudflare-ceo-apologizes-for-unacceptable-outage-and-explains-what-went-wrong/)

- Outage details: [Cloudflare outage on November 18, 2025](https://blog.cloudflare.com/18-november-2025-outage/)

Back to our rust code, we've implemented the validation logic. If we break down the logic, it comes to this: based on the environment, we're defining different regex patterns. And then we're matching the environment value `LUX_API_BASE_URL` set by the user (me) against that regex pattern with `if re.is_match(base_url) {...}`.

Now, we will initialize the actual API client. First read the environment, and construct the `base_url` with it. But this time the base url is not a `string`. This time it's very specifically something in the `projectlighthouse.io` domain. Which I own.

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff087964f-4904-491c-89ba-91913f30e86e_1572x2082.png)

And now, if I give the wrong URL when releasing, **I'll get a compile time error**. Better to fail then, than failing at user's end. And finally, I don't know if this regex is 100% accurate. Regex still feels like German / Welsh language to me. However, I can write some tests that will increase my confidence in this regex.

![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d8e43e1-5907-4b59-b937-eb9c3adf1800_1552x1198.png)

## Was it too much?

For me, no. This is a very small code base, maybe no one will even use it. Maybe they will. If they do, I can give some extra guarantee that:

- When someone installs or updates something new, they won't get `unreachable api` or `wrong api` url.
- If a hacker comes and tries to do something bad, their requests won't be sent. Because it won't compile.

## Verdict

Although this is a very small use-case, correctness is not something that we'll do later or when a bug is caught.

> Correctness is a culture. Correctness is the cost of not coming back to fix it later.

I'll end with a quote from Chernobyl, I think they are similar, or we can think of them similarly…

> "We're on dangerous ground right now, because of our secrets and our lies. They are practically what defines us. When the truth offends, we lie and lie until we can no longer remember it is even there. But it is still there. Every lie we tell incurs a debt to the truth. Sooner or later, that debt is paid."

### Notes

- I've used images instead of code because substack's code formatting is not good.
- This article is a commitment towards correctness. If you find something wrong in lighthouse in the future, at least raise that.

---

Thanks for reading Aryan's Journal! Subscribe for free to receive new posts and support my work.
