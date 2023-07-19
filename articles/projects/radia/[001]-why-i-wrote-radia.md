# Why I wrote Radia
_Back in 2009, life was easy and I had no idea about all the things that would cross my way._

To be fair, I have a soft spot for software that "Just works". Software which is so easy to use, yet so flexible to configure, that everyone between professional and novice can use it. I love when software works out of the box. And I love to build things.

At the beginning of 2023, I was told that my backend knowledge in C\# needs supervising and mentoring. So I got turned down for the position I was applying for. Which is fine, because the position was offered to me after another open position got closed after I applied for that.
However - that bugged me. I'm a fast learner. So I wanted to extend and build something on my own, something backend related.

_Radia_ existed as a project way before this year. It powered my website under the name of _DirectoryListing_ in 2019. Going back to archive.org, my personal websites went from danielstools.de => danielgilbert.de => gilbert.world => g5t.de

Only on the very last domain, _DirectoryListing_ / _Radia_ have been used. However, I always loved to work on my own engines. _danielgilbert.de_ ran on a custom blog engine written in PHP.

I also like to use Git for development. I think being able to go back in time and look at everything you did in the past, really helps to try things out, and not be afraid to break stuff. So when I started working on _Radia_, my vision was to connect it to a repository, and display the contents of this repository on my website.

## Stack
_Radia_ is running on .Net 7, and uses [Fluid](https://github.com/sebastienros/fluid) for templating, which is a C\# implementation of the [Liquid template language](https://shopify.github.io/liquid/). The default template uses some custom CSS. _Radia_ started using _awsm.css_. However, maybe for political reasons, this repository was removed and the css library is not available any longer.

## How it works
The way _Radia_ works is rather simple: You can add multiple repositories, and _Radia_ will display the contents on the start page. You can then click through everything, like you would in a normal directory listing.
