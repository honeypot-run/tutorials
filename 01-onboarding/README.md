## Onboarding

A very simple tutorial that shows you how easy it is to integrate [Honeypot][honeypot].

This tutorial includes the four quick steps:

- Create a simple, bare-bones web page
- Create a honeypot in your [honeypot.run][honeypot] account.
- Integrate the honeypot into your web page and start collecting visitor data
- Run a puppeteer stealth bot against your web page and verify detection

## Steps

1. We have created a simple demo web page that contains a minimal HTML file. To start a local server, run the following commands:

  ```sh
  cd website/
  npm install -y
  npm start
  ```
  
  Your website will be available at [http://127.0.0.1:3000/][local-demo].

  With the comments removed, the HTML code is shown below:

  ```html
<!DOCTYPE html>
<html>
  <head>
    <title>Honeypot test</title>
  </head>
  <body>
    <h1>Honeypot test!</h1>
    <div>
        <p>
            Fingerprint:
            <span id="fingerprint">...</span>
        </p>
    </div>
  </body>
</html>
  ```

2. Now, you'll create a honeypot. Log into [the Honeypot website](https://honeypot.run/auth).


    From the `Configure -> Honeypots` page, create a new honeypot called `hello-world`. Keep all of the default values.

    When the service is up (i.e. a URL shows in the honeypots table), click the button under the `Integrate` column and follow the instructions.
    
3. After following the integration instructions in the Honeypot UI, you should have:


  - a file called `hp.js` in the `public/` directory (this file should be downloaded from the UI).
  - a new script tag in your HTML page, where the `src` is set to your honeypot URL. e.g.
   
   ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>Honeypot test</title>
        <!-- Add your honeypot script to index.html -->
        <script async src="ADD_HONEYPOT_URL_HERE"></script>
    ...
   ```
   
   
   To access the fingerprint / visitor information (i.e. the _honey_), uncomment the following JS code from the HTML page. This code makes all of the honeypot data available under a JS object called `honey`.

   ```html
    <script>
        // wait for the honey (i.e. the visitor information)
        async function checkHoney() { while (!(window.hpot && window.hpot.get && window.hpot.get())) { await new Promise(resolve => setTimeout(resolve, 10)); } return window.hpot.get();}

        // access the data
        checkHoney().then((honey) => {
            const fingerprint = honey.fingerprint.id
            const flags = honey.flags
            // etc...
            document.getElementById('fingerprint').innerHTML = fingerprint
        })
    </script>
   ```

  Next, reload your `index.html` page in your browser. You should see a fingerprint rendered to the screen. e.g.
  
  ```sh
  Fingerprint: 40dcd21f-c68c-4533-97fc-93679853e940
  ```
  
  
  Your fingerprint will be unique and will remain the same even when you change browsers / IP addresses.
  
  
 ## Bot Testing
 
We have included a basic puppeteer stealth bot in the `01-onboarding/bot/` directory for you to test bot detection with. Here's how to run it.

1. First, ensure your local website with a honeypot installed is still running at [http://127.0.0.1:3000/][local-demo].

2. Then, in a separate shell, install and run the bot:

    ```sh
    cd 01-onboarding/bot
    npm install
    npm start
    ```

    You should see the following output:

    ```sh
    Running bot
    All done ✨
    ```

3. Finally, sign into the [Honeypot UI][honeypot], click on the `Demo` link in the left navigation, and verify that you now have a `bot` flag.
  
  [honeypot]: https://honeypot.run/
  [local-demo]: http://127.0.0.1:3000/
