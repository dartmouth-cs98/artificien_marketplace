import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

/*
Cards that display nice little user metrics
App Dev and Data Scientist specific
*/

class UserMetricsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: this.useStyles(),
    };
  }

  useStyles = () => {
    return (
      makeStyles({
        root: {
          width: '275px',
          margin: '10px',
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      })
    );
  }

  render() {
    return (
      <Card className={this.state.classes.root}>
        <CardContent>
          <Typography className={this.state.classes.title} color="textSecondary" gutterBottom>
            {this.props.username}
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.title}
          </Typography>
          <Typography variant="h5" component="h2" color="textSecondary">
            {this.props.body}
          </Typography>
          <br />
        </CardContent>
        <CardActions>
          <NavLink to="/models">
            {(this.props.title === 'Number of Models Created') && <Button size="small">See All Models</Button>}
          </NavLink>
          <NavLink to="/register_app">
            {(this.props.title === 'Number of Datasets Submitted') && <Button size="small">Register New App</Button>}
          </NavLink>
        </CardActions>
      </Card>
    );
  }
}

export default UserMetricsCard;
