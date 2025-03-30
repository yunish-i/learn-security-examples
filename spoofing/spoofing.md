# Spoofing

This example demonstrates spoofind through two ways -- Stealing cookies programmatically and cross site request forgery (CSRF).

## Steps to reproduce the vulnerability

1. Install dependencies

   `$ npx install`

2. Start the **insecure.ts** server

   `npx ts-node insecure.ts`

3. Start the malicious server **mal.ts**

   `npx ts-node mal.ts`

4. Open **http://localhost:8000** in a browser, type a name and Submit.

5. Open the **Application** tab in the Browser's inspect pane. Find the **Cookies** under **Storage**. You should see a **connect.sid** cookie being set.

6. Open the HTML file **mal-steal-cookie.html** file in the same browser (different tab). Open inspect and view the console.

7. Click the link in the HTML file. Do you see the cookie being stolen in the console?

8. Open the HTML file **mal-csrf.html** file in the same browser (different tab). What do you see if the user has not logged out of **insecure.ts**? What do you see if the user has logged out?

## For you to answer

1. Briefly explain the spoofing vulnerability in **insecure.ts**.
2. Briefly explain different ways in which vulnerability can be exploited.
3. Briefly explain why **secure.ts** does not have the spoofing vulnerability in **insecure.ts**.

There are several problems. The main issue is that the cookie is stored in local files, and is exposed to all requests by default. The session.cookie allow all requests to access cookies, so it is vulnerable to session hijacking and CSRF. The insecure example does not obsecure credentials during entry. As shown in the secure example, it would be better to set "cookie:｛httpOnly: true, sameSite: true｝". "httpOnly: true" denies access to cookies, which are stored locally. "sameSite: true" disables attackers to use foraged requests.

Another issue is that the session.secret is hardcoded, so it is exposed to attackers as long as they get the code. It would be safer to pass in session.secret from an environment variable. In the secure example, session.secret is passed in from an argument, which is the hardcoded version. Besides spoofing, another problem is that there is only one factor authentication here.
