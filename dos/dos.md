# Denial-of-Service (DoS)

This example demonstrates DoS vulnerabilities and how they can be exploited.

## Steps to reproduce

1. Install all dependencies

   `$ npm install`

2. Ignore if you have already done this once. Insert test data in the MongoDB database. Make sure the mongod is up and running by typing the `mongosh` command in the termainal. If mongod process is up then you will see that the connection was successful. Command to insert test data:

   `$ npx ts-node insert-test-users.ts`

This will create a database in MongoDB called **infodisclosure**. Verify its presence by connecting with mongosh and running the command `show dbs;`.

2. Start the **insecure.ts** server

   `$ npx ts-node insecure.ts`

3. In the browser, pretend to be a hacker and type a malicious request

   ```
       http://localhost:3000/userinfo?id[$ne]=
   ```

4. Do you see the server crashing?

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts** that can lead to a DoS attack.
2. Briefly explain how a malicious attacker can exploit them.
3. Briefly explain the defensive techniques used in **secure.ts** to prevent the DoS vulnerability?

There are mainly two issues with the insecure example. There is no rate limiter, so attacker can send a lot of requests within a short period time and occupy the resources, so that users can not access the server properly. Another issue is that the it extracts id directly from req.query without sanitizing it, and it is vulnerable to NoSQL injection. Attackers can construct the id as a NoSQL query and access confidential data.

In the secure example, there is a rate limiter so attackers cannot overwhelm the server. It has not sanitized the id yet in the secure example, but we can use function isValidObjectId to check if the input is a valid MongoDB id. ("const sanitizedId = id.trim(); if (!isValidObjectId(sanitizedId)) { return res.status(400).send("Invalid ID format");}") Also, the secure example does not include a session middleware, but it would be better to have it.
