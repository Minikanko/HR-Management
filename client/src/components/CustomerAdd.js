import React from "react";
import { post } from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            fileName: '',
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            fileName: '',
            open: false
        });
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextValue = {};
        nextValue[e.target.name] = e.target.value;
        this.setState(nextValue);
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCutomer()
            .then((res,err) => {
                console.log('사용자 등록완료: ' + res);
                this.handleClickClose();
                this.props.refreshState();
            })
    }

    addCutomer = () => {
        const url = '/customer';
        const formData = new FormData();
        formData.append('IMAGE', this.state.file);
        formData.append('NAME', this.state.userName);
        formData.append('GENDER', this.state.gender);
        formData.append('JOB', this.state.job);
        formData.append('BIRTHDAY', this.state.birthday);
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        };

        return post(url, formData, config);
    }
    render() {
        const { classes } = this.props;

        return ( 
            <div>
             <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                 고객 추가하기
             </Button>
             <Dialog open={this.state.open} onClose={this.handleClickClose} >
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input type="file" accept="image/*" id="raised-file" className = {classes.hidden} file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                    <label htmlFor="raised-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} fullWidth></TextField>
                    <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} fullWidth></TextField>
                    <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} fullWidth></TextField>
                    <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} fullWidth></TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                        추가하기
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClickClose}>
                        닫기
                    </Button>
                </DialogActions>
             </Dialog>
            </div>
        );
    }
}

export default withStyles(style)(CustomerAdd);