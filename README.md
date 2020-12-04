# Artificien: Marketplace

This repository contains the front-end code for the web marketplace platform of Artificien: a place where clients can create, submit, and retrieve models trained on the platform's distributed datasets.

<i>See below for sample screenshots</i>
Data Library Page:
![ss2](https://i.ibb.co/B4CB5fT/datalib.png)
- Customers can explore and learn about datasets available for training. These datasets are sorted by category, and contain information about predictable attributes, number of devices, and the app from which data comes 

Models Page:
![](https://i.imgur.com/1mCO2TZ.png)
- Contains cards for each active and inactive model belonging to current user. Contains information about the dataset the model is training on, percent complete

Data Upload Page:
![ss1](https://i.ibb.co/hYp34HX/dataupload.png)
- Input form for uploading a dataset for developers. leads to creation of a "fake" dataset on which developers can then optimize models in jupyterhub. 

## Architecture
- The marketplace is written in React, and is deployed via AWS Amplify
- We authenticate users using Cognito
    - Data Library is the same for all users (this is data they can purchase, which is a feature we will implement later)
    - Models is user specific, since our enterprise user
    - Data Upload is for App Developers to make new datasets
    - Model Upload simply points the user to our Jupyterhub
- All data is stored in DynamoDB, and the information displayed on the front end is based on calls to the database
- Our Database has four tables - apps, models, datasets, and users. Dynamo is a noSQL database. Database is constructed and deployed via the AWS CDK in the artificien_infrastructure repo

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

Deploys the app to the surge URL specified in the `package.json` file: be sure to change this!

## Authors

* Shreyas Agnihotri '21
* Tobias Lange '21
* Alex Quill '21

## Acknowledgments

This webapp was built using a foundation provided by Tim Tregubov in his Web Development class (http://cs52.me/assignments/sa/starterpack/)
