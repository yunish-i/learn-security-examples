# Privilege Escalation

The example demonstrates a privilege escalation vulnerability and how to exploit it.

## Steps to reproduce

1. Install all dependencies

   `$ npm install`

2. Start the **insecure.ts** server

   `$ npx ts-node insecure.ts`

3. In the browser, send a GET request

   ```
       http://localhost:3000/send-form
   ```

4. Try different UserIds and see which one gives you authorized access to change the role of that user.

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**
2. Briefly explain how a malicious attacker can exploit them.
3. Briefly explain the defensive techniques used in **secure.ts** to prevent the privilege escalation vulnerability?

In the insecure example, userId is from user input, and it does not check if it is a request from real admin. So as long as attackers get admin's userId, they would be able to update role.

In the secure example, it checks if the user have been logged in before, which guarantees the request is from a real user. And it also has session middleware to prevent session hijacking and CSRF. It would be even better if session.secret is not hardcoded, but from an environment variable.
