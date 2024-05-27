# Rendering Patterns

Basic Steps in viewing application
1) Build : once build is completed the application is ready to serve.
2) Serve : get all the data required to render the page, or process the request
3) Client : Client parses the html or response 

SSR (Server Side Rendering) : When server gets a request, server process the data required and creates the html file and sends to the client. Then the app behaves as a CSR SPA.
Build Time : low, Server Processing Time : high, Client Rendering Time : low

CSR (Client Side Rendering) : A simple html file is sent from the server and it js application renders the html, makes api calls to get the data and show the data.
Build Time : high, Server Processing Time : low, Client Rendering Time : high

SSG (Static Side Generation) : All pages are created as static htmls. Good use case for blog
Build Time : high, Server Processing Time : low, Client Rendering Time : low

ISR (Incremental Static Regeneration) : SSG + SSR, During build all pages can be staticlly generated or at the time of requesting the page can be built and cached. The static page can be built at regular intervals based on events
- When user requests a page
- When data is outdated or modified 