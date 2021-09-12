import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';


class CustomerDelete extends React.Component {
   constructor(props){
       super(props);
       this.state = {
           open : false
       }
   }

   handleOpen = () => {
    this.setState({
        open: true
    })
}

   handleClose = () => {
       this.setState({
           open: false
       })
   }

    deleteCustomer(id){
        const url = '/customers/'+id;
        fetch(url,{
            method:'DELETE'
        });
        this.handleClose();
        this.props.refreshState();
    }

    render() {
        return ( 
            <div>
                <Button variant="contained" color = "secondary" onClick={this.handleOpen}>
                    삭제 
                </Button>
                <Dialog open = {this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        삭제하시겠습니까?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={(e) => {this.deleteCustomer(this.props.id)}} variant="contained" color="primary">
                            삭제
                        </Button>
                        <Button onClick={this.handleClose} variant="outlined" color="primary">
                            취소
                        </Button>
                    </DialogActions>
                </Dialog> 
            </div>
        )
    }
}

export default CustomerDelete;