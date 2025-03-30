# Repudiation

The example demonstrates a vulnerability that can lead to repudiation by malicious users attempting to access the services provided by a server.

## Steps to reproduce

1. Install all dependencies

   `$ npm install`

2. Run the server **insecure.ts**.

3. Pretend to be a malicous user and interact with the services by sending requests from the browser.

4. Do you think your actions can be repudiated?

## For you to do

1. Briefly explain the vulnerability.
2. Briefly explain why the vulnerability is addressed in **secure.ts**.
3. Which design pattern is used in the secure version to address the vulnerability? Briefly explain how it works?

The vulnerability is that it lacks logging, so it is a vulnerability of repudiation. In the secure example, it has a middleware for logging requests, and every route also writes into server.log. The design pattern is chain of responsibility. It uses middlewares to sequentially process and pass the job to the next middleware or route.

Additional security mechanisms include user authentication for retrieving messages. We can also sanitize user input to prevent log from being destroyed.
