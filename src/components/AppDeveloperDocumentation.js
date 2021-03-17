/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
// import DocumentationDrawer from './DocumentationDrawer';
import { NavLink, withRouter } from 'react-router-dom';
import { CopyBlock, dracula } from 'react-code-blocks';
import { connect } from 'react-redux';
// import BottomNav from './BottomNav';
// import PersistentDrawerLeft from './PersistentDrawerLeft';
import enableBackgroundTasksImage from '../img/documentation/EnableBackgroundTasks.png';
import configureArtificienImage from '../img/documentation/ConfigureArtificienPlist.png';
import configureInfoImage from '../img/documentation/ConfigureInfoPlist.png';
import registerTaskIDImage from '../img/documentation/RegisterATaskID.png';
import PlistToTarget from '../img/documentation/PlistToTarget.png';

class DataScientistDocumentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  renderDevDocumentation = () => {
    const podfileCode =

`# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Sample-App' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for Sample-App
  pod 'Artificien', :git => 'https://github.com/dartmouth-cs98/artificien_ios_library.git'
  ...

end`;

    const registerBackgroundTask =

`// Override point for customization after application launch.
BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.artificien.background", using: DispatchQueue.global()) { task in

    let artificien = Artificien(chargeDetection: true, wifiDetection: true)

    let appData = prepareAppDataAsDictionary() // Write this yourself
    artificien.train(data: appData, backgroundTask: task)

}`;

    const processingTaskRequest =

`do {
    let processingTaskRequest = BGProcessingTaskRequest(identifier: "com.artificien.background")
    processingTaskRequest.requiresExternalPower = true
    processingTaskRequest.requiresNetworkConnectivity = true
    try BGTaskScheduler.shared.submit(processingTaskRequest)
} catch {
    print(error.localizedDescription)
}`;

    const appDelegate =

`import Artificien

...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    ...

    // Override point for customization after application launch.
    BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.artificien.background", using: DispatchQueue.global()) { task in
                    
        let artificien = Artificien(chargeDetection: true, wifiDetection: true)

        let appData = prepareAppDataAsDictionary() // Write this yourself
        artificien.train(data: appData, backgroundTask: task)

    }

    do {
        let processingTaskRequest = BGProcessingTaskRequest(identifier: "com.artificien.background")
        processingTaskRequest.requiresExternalPower = true
        processingTaskRequest.requiresNetworkConnectivity = true
        try BGTaskScheduler.shared.submit(processingTaskRequest)
    } catch {
        print(error.localizedDescription)
    }

    ...

    return true
}`;

    const dataDictionary =
`
let appData: [String: Float] = [
    "Age": 15,
    "Body Mass Index": 20,
    "Sex": 1,
    "Weekly Step Count": 5000
]
`;

    return (
      <div>
        <h1> App Developer Documentation </h1>
        <div>
          <div className="documentationSidebar">
            <strong><a href="#introduction">Introduction</a></strong>
            <strong><a href="#setup">Setup</a></strong>
            <a href="#installCocoapods">&nbsp;&nbsp;&nbsp;&nbsp;Install CocoaPods</a>
            <a href="#installArtificien">&nbsp;&nbsp;&nbsp;&nbsp;Install the Artificien Pod</a>
            <a href="#enableBackground">&nbsp;&nbsp;&nbsp;&nbsp;Enable background tasks</a>
            <a href="#registerBackgroundID">&nbsp;&nbsp;&nbsp;&nbsp;Register a task ID</a>
            <a href="#configureInfo">&nbsp;&nbsp;&nbsp;&nbsp;Configure Info.plist</a>
            <a href="#configureArtificien">&nbsp;&nbsp;&nbsp;&nbsp;Configure Artificien.plist</a>
            <strong><a href="#usage">Usage</a></strong>
            <a href="#importArtificien">&nbsp;&nbsp;&nbsp;&nbsp;Import Artificien</a>
            <a href="#scheduleTraining">&nbsp;&nbsp;&nbsp;&nbsp;Schedule training</a>
            <a href="#dataPreparation">&nbsp;&nbsp;&nbsp;&nbsp;Write data prep function</a>
            <a href="#testRun">&nbsp;&nbsp;&nbsp;&nbsp;Do a test run</a>
          </div>
          <div className="documentation">

            <h2 id="introduction">Introduction</h2>
            <p>
              This documentation outlines how to integrate your existing iOS app with Artificien's on-device training.
              Before you do this, please fill out <NavLink to="/register_app">the form here</NavLink> to register your
              app and describe its data. You can also read our <NavLink to="/tutorial">Tutorial</NavLink> page
              to understand how your app fits into the Artificien ecosystem.
            </p>
            <p>
              Integrating Artificien's on-device training with your existing iOS app is extremely simple. At a high level,
              it consists of 2 steps: setting up the Artificien CocoaPod and passing your data to Artificien's training
              function through a background task. We'll show you how to do both below, in under 10 minutes.
            </p>
            <p>
              Following the below instructions closely is absolutely essential in order to make your app's data available
              on the Artificien platform. Your app will not be available on the marketplace until you've implemented and run
              Artificien's code, allowing us to verify proper integration.
            </p>
            <p>
              <strong>Note:</strong> Artificien is distributed through the CocoaPods framework and is thus only compatible with Swift
              and Objective-C Cocoa projects (in other words, native Swift apps built within Xcode). It cannot be used with
              any Android-compatible or ReactNative applications.
            </p>

            <h2 id="setup">Setup</h2>
            <p>
              Artificien's training functions are accessible through the Artificien CocoaPod. If your iOS app already uses
              CocoaPods, jump straight to <a href="#installArtificien">installing the Artificien pod</a>. Otherwise, start
              directly below.
            </p>

            <h3 id="installCocoapods">Install and initialize CocoaPods</h3>
            <p>
              <strong>Note:</strong> for the latest instructions on setting up CocoaPods, follow <a href="https://guides.cocoapods.org/using/getting-started.html">the official documentation</a>.
            </p>
            <p>
              To start, run the following code via the command line, in any directory. This will install CocoaPods, a package
              and dependency manager for iOS, on your machine. Your machine may ask for your password before beginning the
              installation.
            </p>
            <CopyBlock
              text="sudo gem install cocoapods"
              language="shell"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              Now run the following via the command line, in the root directory of your iOS project (the one that contains your
              <code>.xcodeproj</code> file). This creates a <code>Podfile</code> that you will use to configure CocoaPod dependencies.
            </p>
            <CopyBlock
              text="pod init"
              language="shell"
              showLineNumbers
              theme={dracula}
              codeBlock
            />

            <h3 id="installArtificien">Install the Artificien Pod</h3>
            <p>
              Open your <code>Podfile</code> and add Artificien as a dependency to your project with the following line. Our pod is
              distributed through <a href="https://github.com/dartmouth-cs98/artificien_ios_library">an open-source Github repository</a>.
            </p>
            <CopyBlock
              text="pod 'Artificien', :git => 'https://github.com/dartmouth-cs98/artificien_ios_library.git'"
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>Your <code>Podfile</code> should now look something like this.</p>
            <CopyBlock
              text={podfileCode}
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              Now run the following, in the same directory as your <code>Podfile</code>, to download Artificien. This will
              install the Artificien package and create a new file with the <code>.xcworkspace</code> extension in your
              current directory. Use this file, instead of the standard <code>.xcodeproj</code> file, for future development
              in order for your app to access Artificien's functions.
            </p>
            <CopyBlock
              text="pod install"
              language="shell"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              At this point, open the <code>.xcworkspace</code> file to view your project in Xcode.
            </p>

            <h3 id="enableBackground">Enable background tasks</h3>
            <p>
              Background Task Scheduler was introduced in iOS 13 as a way to run background tasks for maintenance, content
              updates, or machine learning. We will be setting these up in your iOS app to allow Artificien to run federated
              learning tasks in the background.
            </p>
            <p>
              <strong>Note:</strong> Apple requires use of iOS 13.0 or higher in order to execute background tasks. If your
              application has a lower deployment target, only those devices with iOS 13.0 will be able to run the Artificien's
              training functions. For the latest instructions on setting up background tasks in iOS,
              follow <a href="https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler">the official documentation</a>.
            </p>
            <p>
              1. Open the project editor in Xcode (the blue icon in the file pane) and select the desired target.
            </p>
            <p>
              2. Click Signing &amp; Capabilities.
            </p>
            <p>
              3. Expand the Background Modes section. If there’s no Background Modes section, click the “+ Capability” button
              and choose Background Modes in the window that appears.
            </p>
            <p>
              4. Select both the check boxes for both Background fetch and Background processing.
            </p>
            <img src={enableBackgroundTasksImage} alt="Xcode screenshot" />

            <h3 id="registerBackgroundID">Register a task ID</h3>
            <p>
              We've now enabled the background task capability in your app. But the system runs only tasks registered
              with identifiers on a list of permitted task identifiers. To create this list, we need to add the identifiers
              to the <code>Info.plist</code> file.
            </p>
            <p>
              1. Open the Project navigator and select your target.
            </p>
            <p>
              2. Click Info and expand "Custom iOS Target Properties."
            </p>
            <p>
              3. Add a new item to the list and choose “Permitted background task scheduler identifiers,” which corresponds
              to the <code>BGTaskSchedulerPermittedIdentifiers</code> array.
            </p>
            <p>
              4. Add the following String to the array, marking it as an authorized task identifier. The key will default
              to "Item 0." We will use this unique identifier later when implementing the background task.
            </p>
            <CopyBlock
              text="com.artificien.background"
              language="shell"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <img src={registerTaskIDImage} alt="Xcode screenshot" />

            <h3 id="configureInfo">Configure Info.plist</h3>
            <p>
              We will need to add 2 additional configuration properties before moving on from this section. Both are
              default iOS properties that should auto-fill when you search for them.
            </p>
            <p>
              1. Add an item to the property list called "Privacy - Camera Usage Description." This allows you to display
              a message to your users in the case that you need to access their camera. No part of Artificien's library uses
              the camera by default, but some portions of the federated learning codebase do trigger a privacy warning during
              App Store deployment that requires you to input a description.
            </p>
            <p>
              2. Add a dictionary called "App Transport Security Settings." Within this, add a Boolean called "Allow Arbitrary
              Loads" and set its value to "YES." This will allow Artificien to connect to its orchestration layer over HTTP
              and download the models that need to train on your app.
            </p>
            <img src={configureInfoImage} alt="Xcode screenshot" />

            <h3 id="configureArtificien">Configure Artificien.plist</h3>
            <p>
              The final step before using Artificien in your codebase is to store the keys needed to uniquely identify
              your app and account. This is accomplished by creating a new <code>.plist</code> file.
            </p>
            <p>
              Create a new file called <code>Artificien.plist</code>, in the same directory that contains your <code>Info.plist</code> file.
              In the new file creation process, be sure to add the file to your app's target.
            </p>
            <img src={PlistToTarget} alt="Xcode screenshot" />
            <p>
              This is where your unique key will be stored, and for this reason we recommend keeping this file out of source
              control (typically by adding it to your <code>.gitignore</code>).
            </p>
            <p>
              After creating and removing the file from source control, you will locate and open the file as a property list in Xcode
              and add 2 keys of type String.
            </p>
            <p>
              1. The first key is called "api_key" and is your unique developer API key. This was
              auto-generated for you when you created your Artificien account. To find it, navigate to
              your <NavLink to="/profile">Profile</NavLink> page, locate the section "Developer API Key," and hit "Retrieve your
              API Key". This will temporarily fetch and display your key on the profile page: copy it from here and paste it
              in <code>Artificien.plist</code>.
            </p>
            <p>
              2. The second property is called "dataset_id". For the value, input the name of the dataset you are
              currently setting up. You can find a list of all datasets you've registered under "Registered Apps" on your <NavLink to="/profile">Profile</NavLink> page.
              Be sure to input the app name exactly as you registered it, as this is a unique identifier for your dataset.
            </p>
            <img src={configureArtificienImage} alt="Xcode screenshot" />
            <p>
              The Artificien library will look for the <code>Artificien.plist</code> file and use the key within it to
              authenticate and filter its communication with the Artificien orchestration layer when downloading models
              and sending training updates.
            </p>

            <h2 id="usage">Usage</h2>
            <p>
              You are now ready to integrate Artificien with your codebase to perform on-device training. By installing the
              CocoaPod and configuring those <code>.plist</code> files, you've given your application access to Artificien's
              library. Training can be achieved with under 20 lines of code, most of which you can simply copy and paste from
              below.
            </p>
            <p>
              All of the training happens within your <code>AppDelegate.swift</code> file, where your background task will
              be registered and run. Open that file — it's typically in your Xcode project's root directory.
            </p>

            <h3 id="importArtificien">Import Artificien</h3>
            <p>
              To begin, you will need to import the Artificien library. At the top of the file, together with any other
              import statements, paste the following line.
            </p>
            <CopyBlock
              text="import Artificien"
              language="swift"
              showLineNumbers
              theme={dracula}
              codeBlock
            />

            <h3 id="scheduleTraining">Schedule training</h3>
            <p>
              Now, we will register a background task within the <code>application(didFinishLaunchingWithOptions:)</code> function.
            </p>
            <p>
              Paste the following code within that function. Here we register a closure to be called whenever the system wants to
              execute a background task for your app. Inside this closure is where we'll execute federated learning tasks, like
              searching for and executing a model training cycle. We use the same task identifier for this call that we registered
              earlier in our <code>Info.plist</code>.
            </p>
            <CopyBlock
              text={registerBackgroundTask}
              language="swift"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              The <code>train</code> function above is where most of the federated learning magic occurs. You're welcome to
              access our open-source repository to understand how we package and use your data to train locally in conjunction
              with the <a href="https://github.com/OpenMined/SwiftSyft">SwiftSyft library</a> from OpenMined.
            </p>
            <p>
              Now, paste the following code below the code from the previous section. Here we specify a <code>BGProcessingTaskRequest</code>,
              again with the same task identifier. While configuring this, we need to specify that the phone should be
              charging, which removes the CPU usage limits for processing tasks. We also need to specify network connectivity,
              since we need to connect to Artificien's orchestration layer to download models and submit the results of our
              training. These 2 parameters also ensure training doesn't maliciously use device resources.
            </p>
            <CopyBlock
              text={processingTaskRequest}
              language="swift"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              If you've done this correctly, your <code>AppDelegate.swift</code> file should look something like the following.
            </p>
            <CopyBlock
              text={appDelegate}
              language="swift"
              showLineNumbers
              theme={dracula}
              codeBlock
            />

            <h3 id="dataPreparation">Write data preparation function</h3>
            <p>
              In the step above, you'll notice the function <code>prepareAppDataAsDictionary()</code>,
              the output of which is passed to the Artificien <code>train</code> function. This function is not a part of
              the Artificien library, and will throw an error in Xcode — it's a placeholder for a function you will write that
              prepares your app's data to pass to the training function.
            </p>
            <p>
              When you registered your app with Artificien, you described your app's attributes: these are what should
              be passed to Artificien's <code>train</code> function in the form of a Swift dictionary. Artificien is configured
              to accept a dictionary of type <code>[String: Float]</code>. Each entry in this dictionary should be one of the
              attributes you've described, with the attribute's name as the key and the attribute's value as the value.
              Your <code>prepareAppDataAsDictionary()</code> should thus collect your on-device data and package it in this format.
              The prepared data dictionary for Artificien-Health, our sample app, might look as follows:
            </p>
            <CopyBlock
              text={dataDictionary}
              language="swift"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              When writing your data preparation function, be sure to include all of the attributes you registered with your app,
              and to use the same attribute names to identify them in the dictionary. You can review your app's attributes in
              your <NavLink to="/profile">Profile</NavLink> page under "Registered Apps." Data Scientists will expect these variables
              as inputs to their models, and the Artificien library will halt model training if any of the expected attributes are
              missing.
            </p>

            <h3 id="testRun">Do a test run</h3>
            <p>
              Now that you've built Artificien into your app, you should be ready to accept models from Data Scientists. The final
              step is to verify that you've implemented the library properly by running your fully configured app. If Artificien's
              orchestration layer receives a successful request from your application with the expected data, your app will be
              approved for display in the marketplace.
            </p>
            <p>
              Because Artificien is configured to run as a background task, performing this test run is as simple as running your
              application. When a background task is triggered by the system, Artificien will automatically connect to the orchestration
              layer to search for models, at which point your app will be marked as a successful first contact. Note that Xcode
              simulators do not support background tasks at this time, and so you must test on a physical iOS device for your app
              to integrate.
            </p>
            <p>
              You can track whether or not your app has been approved on your <NavLink to="/profile">Profile</NavLink> page under "Registered Apps."
              Clicking "Learn More" for an app will pull up an info card with the app's details as well as whether or not it has
              successfuly integrated. Once it has, you will likely want to deploy a production version of your app to your users,
              and as Data Scientists purchase access to your app the Artificien model training system will be in motion.
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderDevDocumentation()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

// export default withRouter(withAuthenticator(Navbar)); // might be some sort of login flow thing here
export default withRouter(connect(mapStateToProps)(DataScientistDocumentation)); // might be some sort of login flow thing here
