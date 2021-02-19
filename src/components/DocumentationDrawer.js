/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../style.scss';
import clsx from 'clsx';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CodeSnippet from './CodeSnippet';

const drawerWidth = 240;

const artificienTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Avenir',
    ].join(','),
  },
});

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    margin: '10px',
  },
  appBar: {
    position: 'absolute',
    marginTop: '87px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginTop: '87px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    display: 'flex',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '87px',
    position: 'absolute',
  },
  drawerHeader: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginRight: '10%',
    textAlign: 'left',
    fontFamily: 'Fira Code',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class DocumentationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    console.log(this.props.userDataset);

    const { classes } = this.props;
    // const { theme } = useTheme();

    const handleDrawerOpen = () => {
      this.setState({ open: true });
    };

    const handleDrawerClose = () => {
      this.setState({ open: false });
    };

    return (
      <div className="drawer-font-body">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            //   position="relative"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar style={{ 'background-color': '#AF71EB' }}>
              <IconButton
                color="purple"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <div className="documentation-toolbar-header">
                <Typography style={{ 'font-family': 'Avenir' }} variant="h6" noWrap>
                  Integrating with Artificien
                </Typography>
                {/* <a className="documentation-redirect" href="/" rel="noreferrer">Return to homepage</a> */}
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <Typography>
              Library Functions
            </Typography>
            <Divider />
            <Typography>
              Connecting To Your App&lsquo;s Node
            </Typography>
            <Divider />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: this.state.open,
            })}
          >
            <div className={classes.drawerHeader} />
            {/* <Typography paragraph>
              {this.props.userDataset && <Typography>{this.props.userDataset.app.S}</Typography>}
            </Typography> */}
            <Typography variant="h2">The Docs</Typography>
            <br />
            <Typography variant="h5">Library Functions</Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit.
            </Typography>
            {this.props.userDataset ? <CodeSnippet content={this.props.userDataset.app.S} /> : <CodeSnippet content="bingus" />}
            <br />
            <br />
            <br />
            <Typography variant="h5">Connecting To Your App&lsquo;s Node</Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit.
            </Typography>
            {this.props.userDataset ? <CodeSnippet content={this.props.userDataset.app.S} /> : <CodeSnippet content="bingus" />}
          </main>
        </div>
      </div>

    );
  }
}

export default withStyles(useStyles(artificienTheme))(DocumentationDrawer);
