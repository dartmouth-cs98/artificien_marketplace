import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
          minWidth: 275,
          border: '2px',
          borderColor: '#580D93',
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
          <br />
          {String(this.props.title) !== 'averageTrainingTime'
          && (
          <Typography className={this.state.classes.pos} color="textSecondary">
            {this.props.body}
          </Typography>
          )}
          {String(this.props.title) === 'averageTrainingTime'
          && (
            <Typography className={this.state.classes.pos} color="textSecondary">
              {this.props.body[0]} hours and {this.props.body[1]} minutes
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {this.props.title === 'numModelsCreated' && <Button size="small">See My Models</Button>}
        </CardActions>
      </Card>
    );
  }
}

export default UserMetricsCard;
