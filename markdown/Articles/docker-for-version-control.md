Last week I joined a Docker session. There were quite a few other people there — many of them working in the industry, many of them new. One use case for Docker kept coming up as an example: suppose you have a Node.js project (of course), running version 24.x, and another one that needs Node.js 26.x. But you've only got one Node.js on your machine. So how do you work on the separate projects?

Now suppose a while later that project needs pgAdmin. Two different versions again. As projects keep growing, this becomes an issue. So you can just dockerise your projects, and then you've got no headache about different versions at all. Right?

Well, it is a solution — but it's not a use case for using Docker, it's a use case for not using Docker, if the objective is managing versions of different things.

If you're asking why? A solution is a solution. Well, in software engineering, using the right tool for the right problem matters a great deal. Trying to force a wrong solution out of one tool usually ends badly. Like when someone thought the frontend language could just be run on the backend, no problem.

To stop version mismatches with Docker, you have to learn a new technology (Docker), and on top of that you have to manage the image versions in your Dockerfile. Not everything should be `FROM nodejs:latest`. Before a container can be spawned from a Dockerfile, the image has to be built.

And because of that, the space on our machines keeps shrinking nicely. On top of that, Docker-based development means an additional program (dockerd) has to keep running, along with the container itself, which may also need networking — just because that app is making requests to PostgreSQL, and pgAdmin also needs networking to connect to PostgreSQL. None of which would have been needed at all in this context, if Docker weren't being used purely for version management.

However lightweight* Docker may be, it has weight. Docker is not a photon. Along with maintaining the Dockerfile, you also have to maintain the security of the container image. There is always a tradeoff. And I'm not against Docker. But — right tool for the right reason. Even an LLM can produce a solution by random guessing.

And for the record, managing different versions across different projects is a solved problem. There are tools like asdf or mise, or language-specific ones like nvm. There's direnv for per-directory `.envrc`. There's nix, devenv, flox (I haven't used them). And in many cases there's first-party language-specific tool support too, like rustup, or Go's `go.mod` + toolchain directive.

So, should you use containers? Yes. Should you use Docker as a version manager? Probably not.

Let us learn first before teaching it to others, also let us be corrected. Arrogance + confidence is much worse than not knowing 😀
