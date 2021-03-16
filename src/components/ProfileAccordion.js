/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable react/sort-comp */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import {
  getUser, getDataset,
} from '../database/databaseCalls';
import { openAppModal } from '../store/reducers/app-reducer';
import AppModal from '../UtilityComponents/AppModal';

const artificienTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Josefin Sans',
    ].join(','),
  },
});

const useStyles = (theme) => ({
  root: {
    width: '80%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ProfileAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      currentAPIkey: null,
      clickedDataset: null,
      purchasedDatasets: [],
      gatheringPurchases: false,
    };
  }

  retrieveAPIkey = async () => {
    const name = this.props.content.username.S;
    const callback = async (successData, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(successData);
        if (successData.Items[0].api_key) {
          const key = successData.Items[0].api_key.S;
          this.setState({ currentAPIkey: key });
        }
      }
    };
    getUser(callback, name);
  }

  mapDatasetsPurchased = (datasets) => {
    const datasetList = datasets.map((dataset) => {
      return <Typography>{dataset.S}</Typography>;
    });
    return <div>{datasetList}</div>;
  }

  showAppSummary = (dataset) => {
    this.setState({ clickedDataset: dataset });
    this.props.openAppModal(true);
    console.log(dataset);
  }

  mapAppsManaged = (datasets) => {
    // we're gonna loop over a list of dataset objects (from dynamo datasets table)
    // each of these datasets has an app field
    // we want to return the app
    const appList = datasets.map((dataset) => {
      console.log(dataset);
      return (
        <div style={{
          'text-align': 'left', 'align-items': 'left', display: 'flex', 'justify-content': 'space-between',
        }}
        >
          <Typography>{dataset.dataset_id.S}</Typography>
          <button type="button" style={{ 'margin-left': '20px', 'margin-top': '2px', 'margin-bottom': '2px' }} onClick={() => this.showAppSummary(dataset)}>Learn More</button>
        </div>
      );
    });
    return <div>{appList}</div>;
  }

  async setPurchasedDatasetsState(datasetNames) {
    this.setState({ gatheringPurchases: true });
    console.log('setting state');
    console.log(datasetNames);
    if (datasetNames.length > 0) {
      for (let i = 0; i < datasetNames.length; i += 1) {
        console.log(datasetNames[i]);
        const stringName = datasetNames[i].S;
        const callback = (data, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            this.setState((state) => {
              state.purchasedDatasets.push(data.Item);
              return {
                ...state,
              };
            });
          }
        };
        getDataset(callback, stringName);
      }
    }
  }

  makeDatasetsPurchasedCard = () => {
    if (this.state.purchasedDatasets.length === 0) {
      console.log('no datasets');
      return null;
    }
    const appList = this.state.purchasedDatasets.map((dataset) => {
      console.log(dataset);
      return (
        <div style={{
          'text-align': 'left', 'align-items': 'left', display: 'flex', 'justify-content': 'space-between',
        }}
        >
          <Typography>{dataset.dataset_id.S}</Typography>
          <button type="button" style={{ 'margin-left': '20px', 'margin-top': '2px', 'margin-bottom': '2px' }} onClick={() => this.showAppSummary(dataset)}>Learn More</button>
        </div>
      );
    });
    return <div>{appList}</div>;
  }

  render() {
    const classes = this.props;
    if (this.props.content.datasets_purchased && !this.state.gatheringPurchases) this.setPurchasedDatasetsState(this.props.content.datasets_purchased.L);

    const handleChange = (panel) => (event, isExpanded) => {
      isExpanded ? this.setState({ expanded: panel }) : this.setState({ expanded: false }); // new state manager//
    };
    return (
      <div className={classes.root} style={{ margin: '0 10% 0 10%' }}>
        {/* Account information */}
        <Accordion expanded={this.state.expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Account Information</Typography>
            {/* <Typography className={classes.secondaryHeading}>I am an accordion</Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            {this.props.content.username
              ? (
                <Typography style={{ 'font-weight': 'bold', 'padding-left': '20px', 'text-align': 'left' }}>
                  {this.props.content.date_joined && <Typography>Date Joined: {this.props.content.date_joined.S}</Typography>}
                  {this.props.content.username && <Typography>Username: {this.props.content.username.S}</Typography>}
                  {this.props.content.user_id && <Typography>Email: {this.props.content.user_id.S}</Typography>}
                </Typography>
              ) : <Typography>You dont have any personal information yet!</Typography>}
          </AccordionDetails>
        </Accordion>
        {/* Payment information */}
        <Accordion expanded={this.state.expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Payment and Employment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {this.props.content.bank_info || this.props.content.enterprise
              ? (
                <Typography style={{ 'padding-left': '20px', 'text-align': 'left' }}>
                  {this.props.content.enterprise && <Typography>Enterprise: {this.props.content.enterprise.S}</Typography>}
                  {this.props.content.bank_info && this.props.content.bank_info.bank && <Typography>Bank Name: {this.props.content.bank_info.bank.S}</Typography>}
                  {this.props.content.bank_info && this.props.content.bank_info.bank_number && <Typography>User ID: {this.props.content.bank_info.bank_number.S}</Typography>}
                </Typography>
              )
              : <Typography>You dont have any payment information yet!</Typography>}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={this.state.expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            {Number.parseInt(this.props.role, 10) === 0
              ? <Typography className={classes.heading}>Datasets Purchased</Typography>
              : <Typography className={classes.heading}>Apps Managing</Typography>}
          </AccordionSummary>
          {Number.parseInt(this.props.role, 10) === 0
            ? (
              <AccordionDetails>
                {this.props.content.datasets_purchased
                  ? (
                    <Typography style={{ 'padding-left': '20px', 'text-align': 'left' }}>
                      {this.makeDatasetsPurchasedCard()}
                    </Typography>
                  )
                  : <p>You havent purchased any datasets yet!</p>}
              </AccordionDetails>
            )
            : (
              <AccordionDetails>
                {this.props.appsManaged && this.props.appsManaged.Items.length > 0
                  ? (
                    <Typography style={{ 'padding-left': '20px', 'text-align': 'left' }}>
                      {this.mapAppsManaged(this.props.appsManaged.Items)}
                    </Typography>
                  )
                  : <p>You don&apos;t manage any apps yet!</p>}
              </AccordionDetails>
            )}
        </Accordion>
        {!!Number.parseInt(this.props.role, 10) && (
        <Accordion expanded={this.state.expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Developer API Key</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <button type="button" onClick={() => this.retrieveAPIkey()} id="signup-signin-button" style={{ 'font-size': '16px', border: '2px solid grey' }}> Retrieve your API Key </button>
            <div style={{
              'text-align': 'center',
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'margin-left': '50px',
              'font-weight': 500,
            }}
            >
              <strong id="apiKey">{this.state.currentAPIkey}</strong>
            </div>
          </AccordionDetails>
        </Accordion>
        )}
        <AppModal open={this.props.open} dataset={this.state.clickedDataset} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.appReducer.open,
  };
};

export default connect(mapStateToProps, { openAppModal })(withStyles(useStyles(artificienTheme))(ProfileAccordion));
