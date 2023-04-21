
# Viceversa | Software Engineer Interview Challenge

*Please read instructions carefully*

Use this file as part of the `README.md` in your repository, and invite su on github (@go-viceversa) when you're done!

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

## ----> Gianpaolo's explanations <----

Ho usato nest perchè permette scalabilità, ha molte funzionalità modulari e permette di dare una struttura del progetto più precisa a differenza di express. 
Può avere un tempo di setup più lungo
Ho usato JWT come autenticazione perchè è il sistema più usato ma ho preferito non usare librire eg Passport perchè il progetto al momento non lo richiede, allo stesso tempo
implementarlo non richiederebbe un grosso refactor per come è progettato nest (i middleware nello specifico, sarebbe stato lo stesso per express eventualmente)
Ho usato Typeorm perchè supporta moltissimi DBMS. Dovremo dare subito una struttura precisa ai dati ma allo stesso tempo quando si passerà da un db in-memory (SQLite in questo caso) a uno tradizionale non dovremmo avere grossi problemi di refactoring (eccetto i formati dati, che per una preview come questa sono molto base).
Dockerizzo il tutto per avviare in modo semplice il backend.

workflow:
1- create account
2- login