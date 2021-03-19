# Artificien: Marketplace

This repository contains the front-end code for the web marketplace platform of Artificien: a place where clients can create, submit, and retrieve models trained on the platform's distributed datasets.

<i>See below for sample screenshots</i>
<h3>Data Scientist Pages</h3>

Marketplace:
![ss2](https://i.ibb.co/zsbzy3F/marketplace.png)
- Customers can explore and learn about datasets that available for training. These datasets can filtered by category, are searchable, and contain a set of information on the dataset. This information includes the attribute names, types, and a brief description of them, the app URL (so you can verify that this app is legit), and the category they are in.

Models:
![](https://i.ibb.co/3YHZBfF/models.jpg)
- Contains cards for each active and inactive model belonging to current user. Contains information about the dataset the model is training on - the date your model was submitted, percent completed, and the loss of the model.

Data Sci Docs:
![](https://i.ibb.co/1nBfhjG/data-sci-docs.png)
- This documentation page guides the data scientist on how to build a model with Artificien in 5 steps (both related to setup and usage) - it contains code blocks to copy paste, giving the user information on how we think about training/averaging plans, and how to send a model.

Data Scientist Profile:
![](https://i.ibb.co/gr7Bch2/data-sci-profile.png)
- The Data scientist profile contains some user-specific metric cards, as well as a three profile-accordion groups of information. Personal account info contains your username and email. Payment information contains payment info. "Datasets Purchased" contains a small, detailed card with information about each of the datasets you have purchased. The user-specific information is the number of models you have created using Artificien, the number of datasets you have purchased, and the number of active models running at the time.

### App Developer Pages

Register App: ![](https://i.ibb.co/tXF15gH/register-app.png)

- Input form for onboarding a dataset for developers. On this page, app developers will provide us with information about the data they have to offer in their app. This information will include app name, a link to the app store page, the category of the app, as well as attribute-specific information (attr names, types, and descriptions). This dataset will then be put into our db, before being screened to make sure all information is in order and then broadcasted to the marketplace. 

App Dev Docs:
![](https://i.ibb.co/6D9hsPW/app-dev-docs.png)
- This documentation provides app developers with a detailed walkthrough of the onboarding process for their apps:

`Integrating Artificien's on-device training with your existing iOS app is extremely simple. At a high level, it consists of 2 steps: setting up the Artificien CocoaPod and passing your data to Artificien's training function through a background task. We'll show you how to do both below, in under 10 minutes.`

- This documentation is only available to app developers

App Dev Profile:
![](https://i.ibb.co/SsTty2H/app-dev-prof.png)
- The app dev profile contains some user-specific metric cards, as well as four profile-accordion groups of information. Personal account info contains your username and email. Payment information contains payment info. "Registered Apps" contains a small, detailed card with information about each of the apps/datasets you have onboarded, and at the bottom developers will have a button to see their user-specific API key (necessary for syncing your app with Artificien's services).

<b>Role-Agnostic Pages</b>

User Guide:
![](https://i.ibb.co/c8QhGmX/user-guide.png)
- The User Guide provides the user with all of the high-level information they need to understand what Artificien does and what advantage we offer over traditional machine learning paradigms. This section includes simple step-by-step processes for app developers to:
    - `Register Your App`
    - `Integrate Our Code`
    - `Monitor Your Profile`


- And for data scientists to:
    - `Purchase A Dataset`
    - `Create and Deploy Your Model`
    - `Monitor and Download Your Model`

Welcome:
![](https://i.ibb.co/MCdHwtS/welcome.png)
- This beautiful landing page has a dual usage of getting the user enticed to stay on the platform, and also contains a significant educational element about what we're doing at Artificien. It highlights the uniqueness of our product, and explains in simple terms how on-device training works and how simple it is to use the product.  

### User Onboarding

The following steps are how to sign up with Artificien:
- Visit Artificien.com
- Click on "Sign in or Create Account" on the homepage
- Provide your username, password, email, and phone number. 
- Verify your account
- Explore the site and start training!


## Architecture
- The marketplace is written in React, and is deployed via AWS Amplify
- We authenticate users using Cognito
- All data is stored in DynamoDB
- Our Database has three relevant tables - models, datasets, and users. Dynamo is a noSQL database. Database is constructed and deployed via the AWS CDK in the artificien_infrastructure repo

### Development Setup

**NPM** is the dependency package manager for Node.js and the javascript ecosystem in general. We use the package manager to install various javascript tools. 

**Node.js** is a javascript platform for running javascript outside of a browser for developing server side applications . You can do things like `npm install somepackage` and it will download that package and add it to your project. 

**Yarn** is a faster/better npm. It uses the same repository of packages. You can use it practically interchangeably - but don’t mix them, that can cause issues as they store files slightly differently.

**Webpack** is a build tool. What it does is take all your dependencies (all the various files and libraries that your project is using) and bundle them up together — but in a smart way where it will only bundle up the things you need. It can do any preprocessing that you need, such as converting various code syntax and supports hot-reloading, so you never have to refresh the page manually again. Most cleverly it actually analyzes your code and figures out what you are doing and only includes what is necessary. It makes 1 file out of all your JS files, it can optimize your images, it can make your CSS better. Webpack is also used to run our app. We could start up a python webserver to load the files, but webpack comes with a dev server built in and it is much better.

**Babel** is a transpiler that converts newer es6+ javascript syntax to more compatible es5 syntax that browsers actually understand (browsers are typically behind in their ECMAScript support).

**Linters** are code parsers that check your code for syntax errors, common style mistakes, and makes sure that your code is clean and follows some best practices. Linters help save time, detect bugs, and improve code quality. Linters exist for all types of languages and even markdown such as HTML, CSS, and JSON. Linters are especially helpful for detecting syntax errors while using dynamically typed languages in lightweight editors such as VSCode and Atom. This is based on ESLint (for VSCode) with the Airbnb style guide.

**Sass** lets you use features that don't exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again. CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. 

## Setup

```
yarn install
```

Installs all packages necessary to run the app.

```
yarn start
```

Creates and runs the web app locally (localhost)

## Deployment

```
yarn deploy
```

Deploys the app to the surge URL specified in the `package.json` file: be sure to change this! Our architecture uses the AWS Amplify CLI for deployment, which a non-authenticated tester will not have access to.

## Authors

* Shreyas Agnihotri '21
* Tobias Lange '21
* Alex Quill '21

## Acknowledgments

This webapp was built using a foundation provided by Tim Tregubov in his Web Development class (http://cs52.me/assignments/sa/starterpack/)
