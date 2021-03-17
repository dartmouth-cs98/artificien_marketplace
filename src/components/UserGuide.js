/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  renderUserGuide = () => {
    return (
      <div>
        <h1> User Guide </h1>
        <div>
          <div className="documentationSidebar">
            <strong><a href="#introduction">Introduction</a></strong>
            <a href="#what-is-artificien">&nbsp;&nbsp;&nbsp;&nbsp;What is Artificien?</a>
            <a href="#basic-app-developer-process">&nbsp;&nbsp;&nbsp;&nbsp;Basic App Developer Process</a>
            <a href="#basic-data-scientist-process">&nbsp;&nbsp;&nbsp;&nbsp;Basic Data Scientist Process</a>
            <strong><a href="#app-developers">App Developers</a></strong>
            <a href="#register-your-app">&nbsp;&nbsp;&nbsp;&nbsp;1. Register Your App</a>
            <a href="#integrate-our-code">&nbsp;&nbsp;&nbsp;&nbsp;2. Integrate Our Code</a>
            <a href="#monitor-your-profile">&nbsp;&nbsp;&nbsp;&nbsp;3. Monitor Your Profile</a>
            <strong><a href="#data-scientists">Data Scientists</a></strong>
            <a href="#purchase-a-dataset">&nbsp;&nbsp;&nbsp;&nbsp;1. Purchase a Dataset</a>
            <a href="#create-and-deploy-your-model">&nbsp;&nbsp;&nbsp;&nbsp;2. Create Your Model</a>
            <a href="#monitor-and-download-your-model">&nbsp;&nbsp;&nbsp;&nbsp;3. Monitor Your Model</a>
            <strong><a href="#next-steps">Next Steps</a></strong>
          </div>
          <div className="documentation">
            <h2 id="introduction">Introduction</h2>
            <p>
              This article serves as a step-by-step user guide explaining the different parts and pages of the
              Artificien web platform. The following will cover the entire flow for both app developers and data
              scientists from sign up to finish. For instructions on coding with and implementing our Python and
              Swift libraries, refer to
              the <NavLink to="/app_developer_documentation">App Developer Documentation</NavLink> and
              the <NavLink to="/data_scientist_documentation">Data Scientist Documentation</NavLink>.
            </p>

            <h3 id="what-is-artificien">What is Artificien?</h3>
            <p>
              At a high level, Artificien is a marketplace like any other. App developers can supply access to the data
              their users generate and data scientists can purchase that data and train machine learning models on it.
              Artificien is built on the concept of on-device training, which allows machine learning models to be written
              remotely and trained bit-by-bit on individual devices. It works like this: "your device downloads the
              current model, improves it by learning from data on your phone, and then summarizes the changes as a small
              focused update. Only this update to the model is sent to the cloud, using encrypted communication, where it
              is immediately averaged with other user updates to improve the shared model. All the training data remains
              on your device, and no individual updates are stored in the cloud." We highly recommend
              reading Google's <a href="https://ai.googleblog.com/2017/04/federated-learning-collaborative.html" target="_blank" rel="noreferrer">pioneering article</a> on
              federated learning for more details.
            </p>
            <p>
              Federated learning enables Data Scientists on the Artificien platform to train models on any data stored
              widely across iOS devices without needing to aggregate or see that data centrally. This preserves user privacy
              and avoids legal and ethical data collection complications. App Developers, meanwhile, can ethically
              monetize their users' data by offering it on the Artificien platform.
            </p>
            <p>
              One account with Artificien gives you access to both sides of the marketplace: you can register and share
              data as an App Developer and buy and train on data as a Data Scientist. Switch between these roles using the
              toggle in the navigation bar.
            </p>

            <h3 id="basic-app-developer-process">Basic App Developer Process</h3>
            <p>The process of offering your application's data on Artificien consists of 3 steps:</p>
            <p>
              <strong>1. Register Your App.</strong> Fill out the <NavLink to="/register_app">Register App</NavLink> form,
              describing your native iOS app and the data it will be exposing to Artificien.
            </p>
            <p>
              <strong>2. Integrate Our Code.</strong> Integrate the Artificien CocoaPod with your registered app to
              expose your data for on-device training. See
              the <NavLink to="/app_developer_documentation">App Developer Documentation</NavLink> for guided instructions.
            </p>
            <p>
              <strong>3. Monitor Your Profile.</strong> Monitor your <NavLink to="/profile">Profile</NavLink> as
              Data Scientists purchase access to and train models on your app.
            </p>

            <h3 id="basic-data-scientist-process">Basic Data Scientist Process</h3>
            <p>The process of training on data with Artificien also consists of 3 steps:</p>
            <p>
              <strong>1. Purchase a Dataset.</strong> Browse the <NavLink to="/marketplace">Marketplace</NavLink> to
              view and purchase an application dataset submitted by an App Developer.
            </p>
            <p>
              <strong>2. Create and Deploy Your Model.</strong> Create a standard machine learning model using PyTorch in our
              JupyterHub environment. Use the Artificien Python library to configure and send your model to your
              purchased application.
            </p>
            <p>
              <strong>3. Monitor and Download Your Model.</strong> Track your model's progress and loss on
              the <NavLink to="/models">Models</NavLink> page. When training is complete, it will be available for download there.
            </p>

            <h2 id="app-developers">App Developers</h2>
            <p>
              As an App Developer, you should be using the Artificien platform if you hope to monetize your app and
              allow Data Scientists to securely and privately train on your users' data. Artificien is currently compatible
              with Swift and Objective-C Cocoa projects (in other words, native Swift apps built within Xcode).
            </p>

            <h3 id="register-your-app">1. Register Your App</h3>
            <p>
              The first stop for an app developer looking to integrate with the Artificien platform is the App
              Registration page. This page asks for several pieces of information about your app. The first 3 are quite
              straightforward:
            </p>
            <p>
              <strong>1. Your app's name.</strong> This should be the unique name of your application as it is
              listed on the iOS app store. Data Scientists will identify your app by this name in the Marketplace.
              You will not be able to proceed to the next step until you hit the button to confirm
              that this name is unique.
            </p>
            <p>
              <strong>2. Your App Store link.</strong> This is the URL to your published application in the iOS
              app store. Data Scientists can explore this link to understand what your app does and how many users you serve.
            </p>
            <p>
              <strong>3. Your app's category.</strong> Select this from the dropdown. This will help us organize your
              application and let it be better discovered by Data Scientists with specific model training needs.
            </p>
            <p>
              The 4th is the most important and worth explaining. It is <strong>your attributes:</strong> the data your app will be
              exposing to Artificien from each user device. Every model trained on your app will expect to have access
              to these variables at the time of training. Let's walk through an example, filling out this form as our
              sample Artificien-Health app (built as a <NavLink to="/tutorial">Tutorial</NavLink>):
            </p>
            <p>
              1. Start by selecting the number of attributes your app has. Artificien-Health exposes 4 pieces of data
              about users: age, sex, BMI, and step count.
            </p>
            <p>
              2. For each attribute, input a descriptive name. For Artificien-Health, these would
              be "Age", "Sex", "Body Mass Index", and "Weekly Step Count".
            </p>
            <p>
              3. For each attribute, select its data type. Because machine learning models only accept numeric data,
              the only option for the time being is Float: a floating point number. For non-numeric variables (like sex,
              in this example), report them as attributes of your app only if you plan to convert them to Floats (in
              our example, we convert to either 0 or 1).
            </p>
            <p>
              4. For each attribute, submit a description. This should explain what the variable measures, in what
              units, and over what time period. A strong description will allow Data Scientists to understand the
              data you are providing. For Artificien-Health, we might describe the "Sex" variable as: "The user's
              self-reported sex, converted to 1 for male and 0 for female."
            </p>
            <p>
              5. Once each attribute is filled out, click the Ranges button. This will save your attributed and open a
              section where you can input a minimum and maximum value for each of your submitted attributes. Fill this out
              as accurately as possible. Artificien uses these ranges to generate sample datasets for your app that Data Scientists
              can test with prior to officially submitting a model for training. If your ranges are slightly off, this won't
              impact the platform asides from potentially-inaccurate sample data.
            </p>
            <p>
              Now you can hit "Submit Ranges" and "Submit" the form as a whole, registering your app in our system.
              An App Developer can submit and manage multiple apps on the Artificien platform, always beginning with this step.
              When you submit an app with Artificien, you also automatically own this app as a Data Scientist, allowing
              you to create your own federated learning workflows if you desire.
            </p>

            <h3 id="integrate-our-code">2. Integrate Our Code</h3>
            <p>
              The next step is to integrate Artificien's Swift library with the app you described in the App Registration.
              This involves a few steps:
            </p>
            <p>
              1. Installing the Artificien CocoaPod
            </p>
            <p>
              2. Setting up a background task
            </p>
            <p>
              3. Configuring your app information in Plists
            </p>
            <p>
              4. Passing your data to Artificien's <code>train</code> function
            </p>
            <p>
              This process sets up Artificien's federated learning logic in your app and enables Artificien to
              train models sent by Data Scientists quietly and securely on your users' devices. Trainings occurs in the
              background and is configured by default to only happen while your users' phones are charging and connected
              to WiFi. Artificien's entire codebase is open-source, and at no point transports your user's data off-device.
            </p>
            <p>
              The first time your app is run with Artificien's code enabled and properly configured, our platform
              will record your connection to the system and make your app available for purchase on the marketplace.
              It's important to test Artificien's code once you've implemented it in order to fully integrate with the platform.
            </p>
            <p>
              For the full, detailed integration instructions see the <NavLink to="/app_developer_documentation">App Developer Documentation</NavLink>.
            </p>

            <h3 id="monitor-your-profile">3. Monitor Your Profile</h3>
            <p>
              Once your app is deployed and integrated with Artificien, Data Scientists will be able to train models
              on your users' devices. You can at any time view the apps you've submitted and other account information
              from your <NavLink to="/profile">Profile</NavLink> page. Clicking the "View Details" button for any of
              your submitted apps (under Apps Managing) allows you to see the information you provided about the app
              as well as how many people have purchased it and whether or not it has been integrated.
            </p>

            <h2 id="data-scientists">Data Scientists</h2>
            <p>
              As a Data Scientist, you should use Artificien if you want to securely analyze and learn
              from distributed data from consumer iOS applications.
            </p>
            <h3 id="purchase-a-dataset">1. Purchase A Dataset</h3>
            <p>
              The first step for a Data Scientist is to peruse the available datasets in
              Artificien's <NavLink to="/marketplace">marketplace</NavLink>. Datasets in the Artificien platform
              are synonymous with applications; an application registered with us exposes certain attributes for
              training, forming a dataset. Applications are only displayed in the marketplace after they are
              registered by an App Developer and successfully expose their data to Artificien for training.
            </p>
            <p>
              Each application has a preview with thorough information about the app:
            </p>
            <p>1. Name</p>
            <p>2. App Store link</p>
            <p>3. Category</p>
            <p>4. Attributes and descriptions</p>
            <p>
              All of this information is reported by the contributing App Developer during the app registration
              process. The attributes represent variables that will be provided by each user device and passed
              to your model.
            </p>
            <p>
              The marketplace also allows you to search for individual apps and filter by category, should
              you need a specific type of data or application.
            </p>
            <p>
              To purchase a dataset, click on the "Purchase" button within the application's preview card.
              This will add the dataset to your Artificien account and enable you to send models to that
              application's users for training.
            </p>

            <h3 id="create-and-deploy-your-model">2. Create and Deploy Your Model</h3>
            <p>
              Once you've purchased a dataset you'd like to use, it is time to build a model around it.
              Navigate to the <NavLink to="/models">Models</NavLink> page and "Create Model." This will
              take you to Artificien's secure JupyterHub environment, where you'll be prompted to sign in again.
            </p>
            <p>
              In this environment, you can build a PyTorch model and use Artificien's Python library to
              configure and deploy your model to your purchased application. The library allows you to specify
              which of the app's attributes you'd like to use as input and output variables as part of models
              creation, as well as model parameters like batch size and devices required. This environment
              will also be auto-populated with sample data for all applications on the platform, allowing you to
              test and more easily develop a strong model.
            </p>
            <p>
              View the full instructions for creating and deploying a model with Artificien in
              the <NavLink to="/data_scientist_documentation">Data Scientist Documentation</NavLink>.
            </p>
            <p>
              Data Scientists can create and send multiple models to any datasets they own using this process.
              Any models created can always be accessed by returning to the Jupyter environment.
            </p>

            <h3 id="monitor-and-download-your-model">3. Monitor and Download Your Model</h3>
            <p>
              The <NavLink to="/models">Models</NavLink> page will contain information about all the models,
              past and present, you've created with Artificien.
            </p>
            <p>
              Models currently training on devices will be displayed in the In Progress section. Typically,
              models take multiple days to train, depending on your parameters, your requirements for data
              volume, and the availability of devices for training. As a model trains, you can view its progress
              and its loss value based on the loss function you've configured.
            </p>
            <p>
              Models that have finished training are displayed in the Completed section. Artificien automatically
              moves models here when their progress reaches 100%. Models in this section are enabled with a download
              link, under "View Model," allowing you to retrieve the final model updated with averaged insights
              from all user devices. These will download as a standard Python <code>.pkl</code> file.
              From here, you can take your model off the Artificien platform and mold it to your use case.
            </p>
            <p>
              The Profile page also shows aggregate information about models created as well as general account information.
            </p>

            <h2 id="next-steps">Next Steps</h2>
            <p>
              After reading the user guide and understanding the components of the platform, you should feel
              comfortable using Artificien as both an App Developer and Data Scientist.
            </p>
            <p>
              For more help and concrete examples while getting started, please reference
              the <NavLink to="/tutorial">Tutorial</NavLink> page, which explains how to use the sample model pre-installed
              on your account with our pre-made sample health dataset.
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderUserGuide()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

export default withRouter(connect(mapStateToProps)(UserGuide)); // might be some sort of login flow thing here
