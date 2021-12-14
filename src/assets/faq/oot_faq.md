[toc]

# Zelda64 Decompilation FAQ

## What is Decompilation? What is matching decompilation?

Decompilation is a type of reverse engineering: analysing the compiled
binary data that is on the cartridge to produce human-readable code that
has the same result. _Matching_ decompilation is more specific: instead
of merely functionally equivalent code, it aims to produce code that
compiles to _exactly_ the same data as the original.

## What language was this game written in?

[The programming language C](<https://en.wikipedia.org/wiki/C_(programming_language)>),
which is compiled to [MIPS assembly language](https://en.wikipedia.org/wiki/MIPS_architecture),
which transliterates precisely into the raw bytes of machine code/data that
are on the cartridge.

## What is this project's goal?

We aim to produce a complete documented codebase, written in C as far as
possible, for every version of The Legend of Zelda Ocarina of Time. This
may be used for knowledge of the game (how its systems work, for
glitches, for speedruns, etc.), or for changing parts of the game to
make it act differently or do different things (that is, modding). This
code compiles to be byte-for-byte identical to the original ROM, but our
code almost certainly looks very different from the original, since it
is based only on analysing the compiled code.

## What does 100% mean?

100% means that, in the first version of the game we have worked on, all
of the code that can be written as compilable C code has been. It does
**not** mean that the code is in any sense ready to be used easily for
mods (including any ports). It also does not mean that the code is
documented: there is still _a lot_ of work to do on that.

## What next?

Having everything in C is by no means the end of the project: we are not
even close to \"done\". On our list at the moment:

- Reorganisation of systems
- Restructuring of headers
- Documentation
- Other versions: 17 of them!

## Which versions will be decompiled?

It is intended to eventually support every one of the 18 versions we
have available: N64/GC, NTSC/PAL, etc.

## Why start with the PAL Master Quest Debug version?

Before the project began, this version of the game had the most
information available: most romhacks have used it as a base, and it
includes certain data (\"debug strings\") that help with identification
of some of the purposes of functions and variables. It also appears to
be slightly easier to match due to being compiled with slightly
different flags from retail versions.

## Which version will be next?

We intend to work on the versions more similar to the ones we have
completed, which means the order will roughly be PAL (non-MQ) debugs,
PAL GameCube, the other GameCube versions, then the N64 versions and
probably iQue last of all.

## Does decomp run on console?

The romfile that one of our decompilation projects compiles is identical
to the original ROM (that\'s what _matching_ means). Therefore it runs
wherever that romfile will. (Since currently the Ocarina of Time project
is only working on the Master Quest debug ROM, it requires the Expansion
Pak to run on Nintendo 64, because the debug ROM itself needs the extra
4 MB for debugging features; it also needs to be compressed to work well
if injected into the Virtual Console emulator).

## PC port?

The goal of this project is **NOT** to make any kind of port, such as to
PC. Someone else might take our work and make a port (although they
would be foolish to do so before the codebase is improved) but
**ZeldaRET will not be involved in any porting**. A port will not happen
tomorrow anyway: decomp would only be the first step.

Please do not ask about it in Discord, ZeldaRET is not involved and will
not be involved in any such venture.

## Can decomp be used to make mods?

It is possible to use it in its current state (indeed, a number of mods
have already used it), but not recommended unless you are _very_
familiar with the codebase. It will be much better in future, it is a
high priority to improve the codebase's suitability for modding.

## Who can contribute? What do I need to know?

Anyone with a decent knowledge of how the games work can contribute
usefully in some way or other if they learn the basics of C.

- To work with the decompiled code in a nontrivial way you need to
  know C (you can learn enough C to read the code in a week, so it\'s
  not a major time investment).
- Code decompilation itself requires a good knowledge of C,
  particularly structs and pointers, but C has a sufficiently small
  vocabulary and grammar that these can be acquired quickly. MIPS
  assembly knowledge is not actually necessary to start learning to
  decompile: you can pick it up relatively quickly. (MIPS is a
  relatively easy assembly language to understand: it is often used in
  first courses in computer science.)
- To work with asset files, you need to be able to use the repository
  and build the ROM, and know some xml and C, but we now have plenty
  of useful tools (especially
  [Z64Utils](https://github.com/Random06457/Z64Utils)) that make
  understanding how asset files are structured relatively simple.
- Documentation requires good knowledge of C, but much moreso than the
  other areas an understanding of how the game works.
- To contribute to the repository and organise your work with proper
  version control, you need to know the basics of git, and how to use
  it with GitHub.

There is one exception:

### Is any use being made of leaked materials?

No. _No one is allowed to contribute to the project who has accessed
material relating to relevant source code or documentation leaks._ For
specifics, see [the Discord server](http://discord.zelda64.dev/).

## How do I set up the decompilation on my computer?

See the instructions in the
[README.md](https://github.com/zeldaret/oot/#readme).

## Why does the progress graph move so inconsistently?

Firstly, on any project like this, the beginning is slow as the methods
and techniques are created and understanding of anything requires a lot
of analysis of all factors involved. The middle period is fastest, as
techniques are refined, more people join, and they can learn more
quickly from established understanding. Ocarina of Time is now in the
final stages of decompilation: a lot of the files left are taking a long
time because they are hard to decompile.

Secondly, the graph does not take into account

- Code decompiled on people\'s GitHub forks that is currently being
  documented or cleaned up.
- Code in PRs that is under review.
- Asset analysis, symbol replacement, and other documentation.
- Any other version support work done so far.

All of these represent significant decompilation progress that is not
accounted for by the graph. Recent spikes in progress represent code
that has been completed, but required months to document properly.

Lastly, people are doing this in their spare time, so when they don\'t
have spare time, they aren\'t able to contribute.

## When will the project be finished? What would \"Finished\" mean?

This is being done by people in their spare time, so we do not have a
specific deadline in mind. As far as what counts as \"done\", we will
consider the project complete when we have a completely documented
codebase that covers every extant version of the game.

## What decompiler is being used?

We mostly use a custom-built decompiler called
[mips_to_c](https://github.com/matt-kempster/mips_to_c). Occasionally
some people have found Ghidra helpful, but for matching decompilation of
MIPS, custom tools for the job have proven much more capable.

## Is Ocarina of Time more optimized than Super Mario 64?

Yes, the debug ROM that we are using has the standard `-O2` optimization
flags for most files (some of the low-level Nintendo 64 system files are
compiled with other flags). This means that the entire game has been
approximately as difficult to decompile as the last part of Super Mario
64 that was completed, namely the audio, although we have benefited
greatly from the prior experience of Super Mario 64 decomp, as well as
our custom decompiler `mips_to_c`.

## How can I help?

- Ocarina of Time has no more code decompilation work to do, at least
  on the first version.
- Most code still needs a lot of documentation.
- Object decompilation is analysis and identification of the content
  of the asset files used in code (textures, 3D models, animations,
  collision data, etc.). There is plenty of this still to do.
- If you want to do code decompilation now, Majora\'s Mask is similar
  to Ocarina of Time, but a bit more difficult. It has plenty of
  simple actor files available that are suitable for beginners.
- If you would like to help but not in a code-related way, we are very
  happy to talk to anyone who would like to publish articles or videos
  about the project.

## Where can I get more information?

For more information on any of the topics in the scope of this project
that have been discussed here, please join [the
Discord](http://discord.zelda64.dev/). We aim to be helpful and friendly
to newcomers, provided they have read the basics in this FAQ.

### I would like to write an article or make a video about this project. Who should I contact for further information?

Please reach out to one of the project leads via Discord. They will be
happy to either answer your questions themselves, or direct you to
someone who is more knowledgeable in the relevant areas.
