 ## Bot Testing
This project contains a basic puppeteer stealth bot for you to test bot detection with. Here's how to run it.

1. First, ensure your local website with a honeypot installed is still running at [http://127.0.0.1:3000/][local-demo].

2. Then, in a separate shell, install and run the bot:

    ```sh
    cd honeypot-tutorials/02-stealth-bot
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
