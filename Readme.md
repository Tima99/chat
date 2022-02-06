# Web Authentication 🔐
### This API creates secure account for your website`s user. 

They can __Create Secure Account__ and Log in & Log out to account.

__Features__
1. Sign Up
    * Verify Email
    * Password Encrypt 
2. Log In
3. Log Out

---

## Create Environment Variables

create __.env__ file in root folder

Setup __.env__ file look like this  👇

```shell
    WEB_DOMAIN = http://localhost:7000
    DEBUG_MODE = true
    IS_USERNAME_REQUIRE = true
    DB_URL = mongodb://localhost:27017/rest-api
    SECRET_KEY   = Enter Own Secret Key 
    VERIFY_EMAIL_SECRET_KEY   = Enter own secret for verify emails
    MAIL_API_KEY = Enter Mail Api Key 
    MAIL_DOMAIN  = Enter mail website domain here 
```

## Guidelines for NPM 

#### __Note__ : Go to your _root_ directory before run following commands.
>npm i to install required packages
### __npm i__
>npm run dev for start server (*nodemon have to be install)
### __npm run dev__
>npm run start (start server)
### __npm run start__

---

## API Routes

### _POST Request_

* Register 

Email Registration

Post Request on http://localhost:7000/api/register contain following JSON

```JSON
    {
        "username" : "",  
        "email" : "",
        "password" : "",
        "confirm_password" : ""
    }
```

>Important :  **IS_USERNAME_REQUIRE = true** than username is require at time of Registration of account. Else if false than no need to give username.

Note : 
1. _username length should be between 3-20_
2. _password should be alphanumeric (6-15)_
    * Right Passwords 
        * pwd123
        * 2imuser
        * imrightpwdLen00
    * Wrong Passwords
        * password 
        * 276728
        * pwd1
        * imwrongpwdLength00

On ___Register OK___ api return JSON:
```JSON
    {
        "register" : "sucess"
    }
``` 
On ___Invalid data___ api returns JSON :
```JSON
    {
        "error" : "Please provide valid data.",
        "originalError" : "original error here"
    }
```
Note : *only If **(DEBUG_MODE = true)** than get originalError*

* Log in

POST Request on http://localhost:7000/api/login contain following JSON

>Your email must be verified before login.

```JSON
    {
        "email" : "",
        "password" : "",
    }
```

Note : _password should be alphanumeric (6-15). e.g abc123_

On ___Login OK___ api return JSON:
```JSON
    {
        "login" : "true"
    }
``` 

> On Login, **JWT** sets to cookie.

On ___Invalid data___ api returns JSON (error might be one between three.)👇:
```JSON
    {
        "error" : "[Email not registered. , Wrong Password. , Verify your email.]",
        "originalError" : "original error here"
    }
```

### _GET REQUEST_

* Log out

>Logout from active account

GET Request on http://localhost:7000/api/logout 

On logout returns JSON :
```JSON
    {
        "logout": true,
        "message": "You have to login again."
    }
```

* Get Verify Email link

GET REQUEST on http://localhost:7000/api/verify/link/

*You must have Register or Login your account. Before generating email verification link.* 


* Verify Email

GET Request on http://localhost:7000/api/email/verify/_Email_verify_token_goes_here

You have not to worry about verify_token. You can generate it using GET request as we mention above.

After verify email returns :
```JSON
    {
         "email_verify": true
    }
```

