Whizdoo Tutoring Service Website 
- A static website I'm building for my friend's small
tutoring side hustle. I used this experience to learn about web
development and I am learning as I go.

Status: still working on this, adding features and eyeballing things up as I go. It still have some bugs. 

Pages:
- Home
- Blog
- About
- Tutors
- Programs
-   General Tutoring
-   Special Sessions
- Contact
- Book a Session

How it works: 
- Built with plain HTML, CSS, and JavaScript
- The booking form uses Web3Forms to send session requests straight to the client's email, without needing a backend server
- Layout is responsive so it works on mobile and desktop 

Running it locally: 
git clone https://github.com/cybanel/whizdoo-website
cd whizdoo-website

Notes on the Web3Forms key 
- The access key visible in the code is not a secret, Web3Forms is designed to be used this way, 
With the key exposed client-side. It just works as an alias to route form submissions to an email address. 

Author 
- Cybanel
