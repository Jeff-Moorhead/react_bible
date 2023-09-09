# King James Bible

This is a React frontend on top of https://bible-api.com. The app currently only supports the KJV translation.

Visit https://www.kingjamesbibleverses.com to see the app in action.

It currently only has a few books and chapters. I will be adding more over time.

## Why the Bible?
The Bible has a few properties that made it an interesting candidate for this project. The primary reason I
chose it is the unique layout of books, chapters, and verses. This added a challenge for me of figuring out
how to populate three different `<Select>` components dynamically, since each book has a different number of
chapters, and each chapter a different number of verses.

I chose the King James Version because it's the only one I knew of the translations supported by www.bible-api.com
and also sounds the most profound when quoted (in my opinion).

## What else did I get out of this project?
I got some good practice in managing DNS and setting up some basic infrastructure (although Digital Ocean handles
almost everything automatically, which is really nice). The primary benefit I got out of this project was learning
how to set up a slightly more complex React application with some interesting component positioning and dynamically
populated `<Select>` components.