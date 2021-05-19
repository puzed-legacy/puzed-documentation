---
id: install
title: Installing
sidebar_label: Installing
lastModified: 2020-11-22
---

Puzed is still in the early days of development and as such the installation steps
are geared around installing Puzed as a developer.

In the future I would like to have a single docker image that will bring up the
API, client and then run the setup script.

For now can follow the instructions below.

### Setup a github app
Puzed has been built to be modular, allowing you to link with a variety of different
git repository and management tools. But for now, the only "provider" we have is
for GitHub, so you'll probably want to complete this step, even thought it's
technically optional.

To register a new app with GitHub go here:
https://github.com/settings/apps/new

Use the following options:

**User authorization callback URL:** https://YOUR_CLIENT_DOMAIN/providers/github/oauth

**Webhook URL:** https://YOUR_API_DOMAIN/providers/github/webhookEndpoint

**Permissions you need**:
- Pull requests (readonly)
- Metadata (readonly)
- Commit status (readonly)

**Tick these boxes at the bottom**:
- Pull request
- Push

### Install PM2
As you'll not want to keep your shell open forever, you need something to run
the api and client as a background service. [PM2](https://www.npmjs.com/package/pm2)
is what I use to keep it running.

```bash
npm install --global pm2
```

### Install and run the Client
The web UI allows you to control the Puzed API server from a web browser.

You will need [nodejs installed](https://github.com/nvm-sh/nvm) on your host machine for this to work.

```bash
git clone https://github.com/puzed/puzed-client.git
cd puzed-client
npm install
pm2 start --name puzed-client npm -- start
cd ../
```

### Install the API
The API server is the main project that runs Puzed.

```bash
git clone https://github.com/puzed/puzed-api.git
cd puzed-api
npm install
```

### Setup the database
Now you have an instance of Puzed up and running, you need to set it up.

There is an installation script provided that will guide you through the inital setup.

```bash
./makeCerts.sh
npm run setup
```

#### What domains will the API be using? (separate with commas)
How you will access the rest api to your puzed instance.

Example: api.puzed.com

#### What domains will the Web Client be using? (separate with commas)
How you will access the user interface (website) to your puzed instance.

Example: puzed.com

#### What ACME provider would you like to use?
If you want to use LetsEncrypt you can select either the staging or production ACME provider, to automatically
generate certificates for your services.

If you are just running locally or testing, you can select `none` to use the default unsafe self signed certificates.

#### What email address do you want to use for ACME?
If you want to use LetsEncrypt you must give them an email address.

Example: your@email.com

#### Would you like to setup a GitHub provider?
If you want to be able to deploy straight from GitHub, you will need to create an app.

Selecting yes to this question will ask you additional questions.

#### What is your GitHub App ID?
When you create your GitHub app they will give you an App ID:

Example: 100000

#### What is your GitHub Client ID?
When you create your GitHub app they will give you a Client ID:

Example: lv1.1a1a1a1a1a1a1a

#### What is your GitHub Client Secret?
When you create your GitHub app they will give you a Client Secret:

Example: 1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a

### Run the API
```bash
pm2 start --name puzed-api index.js
```

### After setup
After running all the steps above you can login to your puzed instance and create an account.

The following repl commands may help you:
```javascript
await db.patch('domains', { verificationStatus: 'success' });
await db.patch('users', { allowedServiceCreate: true });
```
