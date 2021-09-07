import './App.css';
import Customer from './components/Customer';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    'id' : '1',
    'image' : 'https://placeimg.com/64/64/10',
    'gender' : '남성',
    'name' : '홍길동',
    'age' : 23
  },
  {
    'id' : '2',
    'image' : 'https://placeimg.com/64/64/5',
    'gender' : '남성',
    'name' : '홍길동',
    'age' : 24
  },
  {
    'id' : '3',
    'image' : 'https://placeimg.com/64/64/7',
    'gender' : '여성',
    'name' : '홍길동',
    'age' : 25
  }
];

class App extends Component{
  render(){
    const { classes } = this.props;

    return (
      <Paper className = {classes.root}>
        <Table className = {classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>나이</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {customers.map(c => {
                      return (
                        <Customer
                          key = {c.id}
                          id = {c.id} 
                          name = {c.name}
                          image = {c.image}
                          gender = {c.gender}
                          age = {c.age}
                        />
                      )
                })}
              </TableBody>
          </Table>
      </Paper>
    )
  }
}

export default  withStyles(styles)(App);
