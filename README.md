## Onboarding

A very simple tutorial that shows you how easy it is to integrate [Honeypot][honeypot].

This tutorial includes the three quick steps:

- Create a simple, bare-bones web page
- Create a honeypot in your [honeypot.run][honeypot] account.
- Integrate the honeypot into your web page and start collecting visitor data

## Steps

1. Create a simple web page

  ```sh
  # create a project directory
  mkdir honeypot-test && cd honeypot-test

  # initialize the HTML file
  touch index.html
  ```

  Add the following to index.html

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Honeypot test</title>
    </head>
    <body>
      <h1>Welcome to my honeypot test!</h1>
      <div>
          <p>
              Fingerprint:
              <span id="fingerprint">loading...</span>
          </p>
      </div>
    </body>
  </html>
  ```

  Now, if you open index.html in your browser, you should see a web page.

  ```sh
  open index.html
  ```

2. Now, you'll create a honeypot. Log into [the Honeypot website](https://honeypot.run/auth).


    From the `Configure -> Honeypots` page, create a new honeypot called `hello-world`. Keep all of the default values.

    When the service is up (i.e. a URL shows in the honeypots table), click the button under the `Integrate` column and follow the instructions.
    
3. After following the integration instructions in the Honeypot UI, you should have a file called `hp.js` in the same directory as your `index.html` file (this file should be downloaded from the UI).

   You should also have added a new script tag in your HTML page, where the `src` is set to your honeypot URL. e.g.
   
   ```html
   <!-- Your honeypot script -->
   <script async src="..."></script>
   ```
   
   
   To access the fingerprint / visitor information (i.e. the _honey_), add one more script tag below your honeypot script:

   ```html
      <!DOCTYPE html>
      <html>
        <head>
           <!-- Your honeypot script -->
           <script async src="..."></script>

           <!-- Add this -->
           <script>
            async function checkHoney() {
                while (!(window.hpot && window.hpot.get && window.hpot.get())) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
                return window.hpot.get();
            }

            // get the honey (i.e. the user data)
            checkHoney().then((honey) => {
                // access the data
                const fingerprint = honey.fingerprint.id
                const flags = honey.flags
                // etc...
                document.getElementById('fingerprint').innerHTML = fingerprint

            })

        </script>
        ...
    ```
  The final step is to reload your `index.html` page in your browser. You should see a fingerprint rendered to the screen. e.g.
  
  ```sh
  Fingerprint: 40dcd21f-c68c-4533-97fc-93679853e940
  ```
  
  
  Your fingerprint will be unique and will remain the same even when you change browsers / IP addresses.
  
  
  
  
  [honeypot]: https://honeypot.run/
