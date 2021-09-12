import './App.css';
import Customer from './components/Customer';
import CustomerAdd  from './components/CustomerAdd';

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';
import Progress from './components/Progress';
//import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 1080
    },
    progress: {
        margin: theme.spacing(2)
    }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
    }
  }

  refreshState = () => {
    this.setState({
      customers:"",
    });
    this.callApi()
            .then(res => this.setState({ customers: res }))
            .catch(err => console.error(err));
  }


    componentDidMount() {
        //this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({ customers: res }))
            .catch(err => console.error(err));
    }

    callApi = async() => {
        const response = await fetch('/customers');
        return await response.json();
    }

    // progress = () =>{
    //   const { completed } = this.state;
    //   this.setState({completed: completed >= 100? 0 : completed+1});
    // }

    render(){
      const { classes } = this.props;
  
      return (
        <div>
          <Paper className = {classes.root}>
            <Table className = {classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>이미지</TableCell>
                      <TableCell>이름</TableCell>
                      <TableCell>성별</TableCell>
                      <TableCell>생년월일</TableCell>
                      <TableCell>직업</TableCell>
                      <TableCell>삭제</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.customers ? this.state.customers.map(c => {
                          return (
                            <Customer
                              key = {c.ID}
                              id = {c.ID} 
                              name = {c.NAME}
                              image = {c.IMAGE}
                              gender = {c.GENDER}
                              birthday = {c.BIRTHDAY}
                              job = {c.JOB}
                              refreshState =  {this.refreshState}
                            />
                          )
                    }):
                        
                    <TableRow>
                      <TableCell colSpan="6" align="center">
                        <Progress/>
                      </TableCell>
                    </TableRow>
                    }
                  </TableBody>
              </Table>
          </Paper>
          <CustomerAdd refreshState= {this.refreshState}/>
        </div>
      )
    }
}

export default withStyles(styles)(App);