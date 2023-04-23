
# Viceversa | Software Engineer Interview Challenge

*Please read instructions carefully*

Use this file as part of the `README.md` in your repository, and invite us on github (@go-viceversa) when you're done!

## General pointers
We are looking for an experienced engineer who found the sweet spot between pragmatism and idealism.
Your challenge will be evaluated on:
 * Architectural decisions (also implied ones)
 * Test coverage 
 * Adherence to instructions  
 * Cost of further upgrades
 * Cost of maintenance
 * Readability
 * Commit history
 

**Please #1:** make it easy for us to try your project on our machines 🙏  
**Please #2:** if you start with a boilerplate/starter project make it the first commit separated from your contributions 🙏

> **Note:** To balance the need to best show what you can do and the precious time you are dedicating to us: if you want to add something that you would have included it in a real project but you can't do it in the test time constraints, feel free to mock it instead. Beats not letting us know you know 😁


## Requirements

We would like you to implement:

- a POST endpoint `/add-messages` with body as follows, that adds this information to an in-memory store.  
As a side effect, when a message is successfully added, an event should be triggered that sends an email: you can mock the email sending by adding a console log "email sent to ${user} with ${message}" with a timeout of 1 second.  
If from the same request multiple messages are sent, all of them should be sent before accepting another request for the same user.  
**Bonus:** We would like to avoid accidentally sending the same message multiple times, can you find a solution?

```javascript
{
    user: string,
    message: string[],
}
```
example:
```javascript
{
    user: "123@email.com"
    message: [
        "message1",
        "message2"
    ]
}
```


- a GET endpoint `/messages` that gets the full list of user/messages.  
It should be unaffected by the event sending.  
The same user can be used on multiple requests; messages should be unique by user.  
Register the dateTime for the message saving and message sent through the event.  
In the future we expect more events to be triggered, of different kind (ex. event that send an sms); structure your code around that possibility.

- add any kind of API authentication, explaining your choice 

- Please include a postman export in the repo to try your project


## ----> Gianpaolo's explanations <----

# Framework: NestJS
This project was bootstrapped using `NestJS` because it's scalable, has a lot of addons and allows us to give a more solid structure to the project. Cons: it's slower in setting up than Express. ExpressJS gives us more freedom and surely is faster for a first-use but you need to be disciplined and keep the project structure under control to not fall in a mess when the codebase grows.

# Auth: JWT
JWT is the best method to authenticate requests in a RESTful service. I used a widely downloaded npm packahe `jsonwebtoken` that gives us enough security to not let people join the service without being authenticated. It's not complex to setup and it's sufficient for the purpose of the project. Using other modules like Passport costed too much time. Plus, for how NestJS works we can still do a little refactor and put in place another auth system.
I didn't manage cases like double valid issued jwts for a user (both not expired but issued in different times).

# In memory storage: TypeORM + SQLite
I choose to use `TypeORM` because it will help us in case the project gets bigger. `SQLite` was a forced choice because it's the only dbms that allows in-memory storage. I could also use something like Redis (when i read or listen to "in-memory storage" i think to that) but I think that TypeORM is a better choice because:
- Supports the most used DBMS out there. Changing the DMBS during early stages of development requires little to no refactoring at all. 
- Data can be managed used the powerful TypeORM/SQL apis.
- SQLite gives us the SQL strenght without need to setup a database, so for development purposes saves a little time.

# Setup the service
- First method: (only if you have node >= 18LTS) cd in the project root and first run `npm install` then `npm start`. (PS there is a env variable for the JWT secret which by default is hardcoded as "test" so you don't need to add anything to your env) 
- Second method: using docker-compose, run `docker-compose up` in the project root.
The server can be reached at localhost:3000.


## Consuming the service
- First of all you need to create an account using the /api/user/signup POST request (check the payload on the Postman collection)
- then you need to login at POST /api/user/login
- feel free to hit the /api/message/add-messages POST or /api/message/messages GET (using the jwt as Bearer token)

# Postman - Swagger
I have provided a `collection` to import in Postman (Postman -> Collections -> Import) (it has also a prerequest script to automaticcally set the Bearer header).<br>
If it doesn't work, NestJS comes with a Swagger addon, reachable at localhost:3000/api or localhost:3000/api-json to get a JSON file to import in Postman. Make sure to auth your request with an Authorization header with value "Bearer {YOUR_TOKEN}".

# Notes
Regarding the events notifications, in a real project i would have used something different from a simple setTimeout. The main problem is that when you have events in memory and a crash happens you will loose the entire queue. But for this case we have the entire db in memory, it's just an exercise so we can keep that.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).


