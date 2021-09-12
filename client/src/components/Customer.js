import React from 'react';
import {TableRow,TableCell} from '@material-ui/core';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component{
    render(){
        return (
            <TableRow>
                <TableCell><img src ={this.props.image} alt="profile"/></TableCell>
                <TableCell><p>{this.props.name}({this.props.id})</p></TableCell>
                <TableCell><p>{this.props.gender}</p></TableCell>
                <TableCell><p>{this.props.birthday}</p></TableCell>
                <TableCell><p>{this.props.job}</p></TableCell>
                <TableCell><CustomerDelete id={this.props.id}  refreshState={this.props.refreshState}/></TableCell>
            </TableRow>
        );
    }
}

// class CustomerProfile extends React.Component{
//     render(){
//         return(
//             <div>
//                 <img src ={this.props.image} alt="profile"></img>
//                 <p>{this.props.name}({this.props.id})</p>
//             </div>
//         )
//     }
// }

// class CustomerInfo extends React.Component{
//     render(){
//         return(
//             <div>
//                 <p>{this.props.gender}</p>
//                 <p>{this.props.age}</p>
//             </div>
//         )
//     }
// }
export default Customer;