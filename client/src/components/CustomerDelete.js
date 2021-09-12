import React from 'react';
import Button from '@material-ui/core/Button';


class CustomerDelete extends React.Component {
   

    deleteCustomer(id){
        const url = '/customers/'+id;
        fetch(url,{
            method:'DELETE'
        });
        this.props.refreshState();
    }

    render() {
        return ( 
            <Button onClick= {(e) => {this.deleteCustomer(this.props.id)}} color = "secondary" >
                삭제 
            </Button> 
        )
    }
}

export default CustomerDelete;