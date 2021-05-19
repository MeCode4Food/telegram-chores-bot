# Telegram Chores App

## What It Does
* Allows a user to access a chore like (TODO App)
* Allows a user to schedule chores to add at fixed intervals (e.g. every 6 months add "Visit Dentist" chore)
* Allows admin to see chores/schedules for a user via an API

## Getting Started

### Pre-requisites

* NodeJS v14+
* Telegram Bot API token (see [link to create bot](https://core.telegram.org/bots#6-botfather))
* VSCode for Intellisense, debugging set up
  * Prettier extension for VSCode ([link] (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))

### Set up .env file

Create a .env file at the project root. The env file should have the following:

```shell
TELEGRAM_BOT_KEY=telegram_bot_key_here
```

Fields that are flagged as compulsory are defined inside `environment.ts`, and will be assigned to `process.env` via the `dotenv` package. Absent fields will be flagged and will cause the application to exit with an error.

Intellisense is provided via the `environment.ts` file.

### Installing Dependencies

Run `npm install` to install the dependencies defined in `package.json`

Note that `package-lock.json` is not being used in the project

### Debugging

Debugging is done via the VSCode debugger. Run the `Debug App` configuration which is defined in `.vscode/launch.json` using the "Run and Debug" menu option on the left.

Alternately you can use the shortcut `F5` on the keyboard to start the debugging process

For more info see the contents inside `.vscode`

## TODOs

* Create basic chores functionality (CRUD for chores)
* Define and Create scheduling engine
* CI/CD using Github Actions