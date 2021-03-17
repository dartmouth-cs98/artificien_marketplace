/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { CopyBlock, dracula } from 'react-code-blocks';
import { connect } from 'react-redux';

/*
Documentation for data scientist persona
*/

class DataScientistDocumentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  renderClientDocumentation = () => {
    const printDatasets =
`from artificienlib import syftfunctions as sf
sf.get_my_purchased_datasets(password)`;

    const trainingPlan =
`from artificienlib import syftfunctions as sf
model_params, training_plan = sf.def_training_plan(model, X, y, {"loss":sf.mse_with_logits})`;

    const averagingPlan =
`from artificienlib import syftfunctions as sf
avg_plan = sf.def_avg_plan(model_params)`;

    const sendingModel =
`from artificienlib import syftfunctions as sf
sf.send_model(
    
    # Model Information
    name=name, 
    dataset_id=dataset, 
    version=version, 
    
    # Determine what training should look like
    min_workers=1,
    max_workers=5,
    num_cycles=5,

    # Set the training and average plans
    batch_size=1, 
    learning_rate=0.2,
    model_params=model_params,
    features=feature_names, 
    labels=label_names,
    avg_plan=avg_plan,
    training_plan=training_plan,
    
    # Authenticate
    password=password
)`;

    return (
      <div>
        <h1> Data Scientist Documentation </h1>
        <div>
          <div className="documentationSidebar">
            <strong><a href="#introduction">Introduction</a></strong>
            <strong><a href="#setup">Setup</a></strong>
            <a href="#installLib">&nbsp;&nbsp;&nbsp;&nbsp;Install artificienlib</a>
            <a href="#importLib">&nbsp;&nbsp;&nbsp;&nbsp;Import artificienlib</a>
            <strong><a href="#usage">Usage</a></strong>
            <a href="#selectDataset">&nbsp;&nbsp;&nbsp;&nbsp;Select a dataset</a>
            <a href="#buildModel">&nbsp;&nbsp;&nbsp;&nbsp;Build a PyTorch model</a>
            <a href="#definePlan">&nbsp;&nbsp;&nbsp;&nbsp;Define a training plan</a>
            <a href="#average">&nbsp;&nbsp;&nbsp;&nbsp;Define an averaging plan</a>
            <a href="#sendModel">&nbsp;&nbsp;&nbsp;&nbsp;Send the model</a>
          </div>
          <div className="documentation">

            <h2 id="introduction">Introduction</h2>
            <p>
              This documentation describes how to use the Artificien Library, a custom python library that allows
              authenticated Data Scientists to train AI/ML models using the
              industry-standard, <a href="https://pytorch.org/" target="_blank" rel="noreferrer">PyTorch</a>, and train them on the
              datasets they've purchased access to.
            </p>
            <p>
              The following is a basic use guide. For more step-by-step documentation, refer to the tutorials in
              the <a href="https://github.com/dartmouth-cs98/artificien_tutorials" target="_blank" rel="noreferrer">Artificien Tutorials Repository</a> or
              the <NavLink to="/tutorial">Tutorial</NavLink> page on Artificien site.
            </p>
            <p>
              <strong>Note:</strong> For security reasons, Artificien Library can currently only be run in Artificien's Jupyter
              notebooks. When you create a new model through the Artificien <NavLink to="/models">Models</NavLink> page,
              you'll be taken to this secure JupyterHub environment. Here, you can develop your own custom models to train on
              datasets you've purchased in the marketplace.
            </p>
            <p>
              <strong>Note:</strong> When developing on the Artificien JupyterHub, skip the installation steps below.
            </p>

            <h2 id="setup">Setup</h2>

            <h3 id="installLib">Install artificienlib</h3>
            <p>
              Run the following in the command line. This installs the library as a Python package.
            </p>
            <CopyBlock
              text="pip install artificienlib"
              language="shell"
              showLineNumbers
              theme={dracula}
              codeBlock
            />

            <h3 id="importLib">Import artificienlib</h3>
            <p>
              In your Python file, prior to using <code>artificienlib</code>, add the following line.
            </p>
            <CopyBlock
              text="import artificienlib"
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              You are now ready to use Artificien's library to build and deploy a model.
            </p>

            <h2 id="usage">Usage</h2>
            <p>
              Building a model with <code>artificienlib</code> consists of 5 steps.
            </p>

            <h3 id="selectDataset">Select a dataset</h3>
            <p>
              The first step is selecting a dataset. You can build a model to train on any single dataset you've purchased
              access to. You can check which datasets you've purchased within your <NavLink to="/profile">Profile</NavLink> page
              under "Datasets Purchased", or programmatically.
            </p>
            <p>
              To print available datasets programmatically, run the following in Python.
            </p>
            <CopyBlock
              text={printDatasets}
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              Record the printed <code>dataset_id</code> of the dataset you'd like to use: you'll need it later.
            </p>

            <h3 id="buildModel">Build a PyTorch model</h3>
            <p>
              The second step is specifying a standard PyTorch model of some input and output size. This process is
              no different than using standard PyTorch.
            </p>
            <p>
              For every dataset registered on Artificien, we provide a sample dataset to demonstrate to you what the
              data on user devices will actually look like. Note that the sample dataset is entirely made-up data based
              on ranges estimated by the App Developer. The real data only ever exists on user devices, and it never
              goes anywhere else. We keep the user's privacy first and foremost. You can use this sample dataset to
              define what attributes you'd like to use in your model. Record the names of the attributes you'd like
              to use for features and for labels, and design your model accordingly. You can also use the sample dataset
              to validate your model is working properly before sending it for training.
            </p>
            <p>
              Refer to <a href="https://pytorch.org/" target="_blank" rel="noreferrer">PyTorch</a> documentation for additional
              information on model-building, and to
              the <a href="https://github.com/dartmouth-cs98/artificien_tutorials" target="_blank" rel="noreferrer">Artificien Tutorials Repository</a> for
              an example.
            </p>

            <h3 id="definePlan">Define a training plan</h3>
            <p>
              The third step is defining a training plan. First, we must choose some dummy X and Y representative of our input
              and output parameters respectively. The <code>X</code> should be sample size 1 example of inputs, and <code>Y</code> the corresponding output.
              Such values, along with our PyTorch model, are passed into our training plan definition. To compile the training plan
              with default loss function (softmax cross entropy) and optimizer (naive stochaistic gradient descent), simply run:
              <code>def_training_plan(model, X, Y)</code>.
            </p>
            <p>
              Additional specifiers can be passed into the training plan definition via a dictionary that allow you to change the
              loss function and optimizer to whatever is suitable for your model. This is described below.
            </p>
            <p>
              The training plan has 3 core components:
            </p>
            <p>
              <strong>Loss Function.</strong> The loss function is defaulted to softmax cross entropy. To change it, pass in
              a dictionary containing item <code>"loss": my_loss_function</code> where <code>my_loss_function</code> is a functional
              definition of your loss function that takes input <code>my_loss_function(logits, targets, batch_size)</code>. <code>logits</code>
              and <code>targets</code> must be numpy arrays of size <code>batch_size x C</code> and are the output of model and actual targets
              respectively. <code>artificienlib</code> also has some standard loss functions available out of the box. For
              instance, <code>"loss": sf.mse_with_logits</code> will use a standard implementation of mean squared error, no user-created function instantiation required.
            </p>
            <p>
              <strong>Optimizer.</strong> The optimizer is defaulted to naive stochaistic gradient descent. To change it, pass in
              a dictionary (same one as above) containing item <code>"optimizer": my_optimizer_function</code> where
              the <code>my_optimizer_function</code> is a functional definition of your optimizer function that takes
              input <code>my_optimizer_function(param, **kwargs)</code>. <code>kwargs</code> is simply a dictionary of basic
              parameters. For the purposes of defining an optimizer, <code>kwargs['lr']</code> will give you the learning rate. <code>param</code> are the coefficients.
            </p>
            <p>
              <strong>Training Steps.</strong> The training plan defines back propagation (i.e. how training happens at each
              iteration). A <code>training_plan</code> item and corresponding function in the dictionary would let you
              change it. It's unlikely this feature needs to be used, but if you'd like more information refer to
              <code>syftfunctions.py</code> in <code>artificienlib</code>: the library codebase.
            </p>
            <p>
              The outputs of a call to <code>def_training_plan(model, X, Y)</code> are our model parameters and a
              training plan object respectively. An example call to <code>def_training_plan(model, X, Y)</code> is below.
            </p>
            <CopyBlock
              text={trainingPlan}
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />

            <h3 id="average">Define an averaging plan</h3>
            <p>
              Federated learning essentially compiles gradients from every dataset it's been trained on, then has to
              somehow combine these gradients together. For most usecases, these gradients are simply averaged together.
              This is the default setup, and the function <code>def_avg_plan(model_params)</code> does this. Pass in the
              <code>model_params</code> returned by <code>def_training_plan</code>.
            </p>
            <p>
              The outputs of a call to <code>def_avg_plan(model_params)</code> is an <code>avg_plan</code> object.
              An example call is below.
            </p>
            <CopyBlock
              text={averagingPlan}
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />

            <h3 id="sendModel">Send the model</h3>
            <p>
              Lastly, we must send our model, training plan, and average plan to be trained. Using the function <code>send_model</code> we
              must pass in the <code>name</code>, <code>dataset_id</code>, <code>version</code>, <code>min_workers</code>,
              <code>max_workers</code>, <code>num_cycles</code>, <code>batch_size</code>, <code>learning_rate</code>,
              <code>model_params</code>, <code>training_plan</code>, <code>average_plan</code>, <code>features</code>, <code>labels</code> and
              your Artificien <code>password</code>. An example call is below.
            </p>
            <CopyBlock
              text={sendingModel}
              language="python"
              showLineNumbers
              theme={dracula}
              codeBlock
            />
            <p>
              The above steps are a quick start for developing models with Artificien. Please see the <NavLink to="/tutorial">Tutorial</NavLink> for
              a complete example with guided explanations.
            </p>

          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderClientDocumentation()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

export default withRouter(connect(mapStateToProps)(DataScientistDocumentation)); // might be some sort of login flow thing here
