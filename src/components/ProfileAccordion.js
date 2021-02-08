/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const artificienTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Avenir',
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
    //   setExpanded: false,
    };
  }

  mapDatasetsPurchased = (datasets) => {
    const datasetList = datasets.map((dataset) => {
      return <Typography>{dataset.S}</Typography>;
    });
    return <div>{datasetList}</div>;
  }

  render() {
    const classes = this.props;

    const handleChange = (panel) => (event, isExpanded) => {
      // setExpanded(isExpanded ? panel : false); // //previous state manager , now not needed //
      isExpanded ? this.setState({ expanded: panel }) : this.setState({ expanded: false }); // new state manager//
    };

    return (
      <div className={classes.root} style={{ margin: '10%' }}>
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
            {this.props.content
              ? (
                <Typography style={{ 'font-weight': 'bold', 'padding-left': '20px', 'text-align': 'left' }}>
                  {this.props.content.date_joined && <Typography>Date Joined: {this.props.content.date_joined.S}</Typography>}
                  {this.props.content.username && <Typography>Username: {this.props.content.username.S}</Typography>}
                  {this.props.content.user_id && <Typography>User ID: {this.props.content.user_id.S}</Typography>}
                </Typography>
              ) : <p>You dont have any payment information yet!</p>}
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
            {this.props.content
              ? (
                <Typography style={{ 'padding-left': '20px', 'text-align': 'left' }}>
                  {this.props.content.enterprise && <Typography>Enterprise: {this.props.content.enterprise.S}</Typography>}
                  {this.props.content.bank_info && this.props.content.bank_info.bank && <Typography>Bank Name: {this.props.content.bank_info.bank.S}</Typography>}
                  {this.props.content.bank_info && this.props.content.bank_info.bank_number && <Typography>User ID: {this.props.content.bank_info.bank_number.S}</Typography>}
                </Typography>
              )
              : <p>You dont have any payment information yet!</p>}
          </AccordionDetails>
        </Accordion>
        {/* Anything else to put here? */}
        <Accordion expanded={this.state.expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Datasets Purchased</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {this.props.content.datasets_purchased
              ? (
                <Typography style={{ 'padding-left': '20px', 'text-align': 'left' }}>
                  {this.mapDatasetsPurchased(this.props.content.datasets_purchased.L)}
                </Typography>
              )
              : <p>You havent purchased any datasets yet!</p>}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default withStyles(useStyles(artificienTheme))(ProfileAccordion);
