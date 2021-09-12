import React from "react";
import { post } from 'axios';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            fileName: '',
        }
    }

    handleFileChange = (e) => {
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
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
            .then((res) => {
                console.log('사용자 등록완료: '+res);
                this.props.refreshState();
            })
    }

    addCutomer = () => {
        const url = '/customer';
        const formData = new FormData();
        formData.append('IMAGE',this.state.file);
        formData.append('NAME',this.state.userName);
        formData.append('GENDER',this.state.gender);
        formData.append('JOB',this.state.job);
        formData.append('BIRTHDAY',this.state.birthday);
        const config = {
            header:{
                'content-type':'multipart/form-data'
            }
        };

        return post(url,formData,config);
    }
    render() {
        return ( 
            <div>
             <h1>고객추가</h1>
                <form onSubmit = {this.handleFormSubmit}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>프로필이미지</TableCell>
                                <TableCell><input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>이름</TableCell>
                                <TableCell><input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>생년월일</TableCell>
                                <TableCell><input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>성별</TableCell>
                                <TableCell><input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>직업</TableCell>
                                <TableCell><input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><button type="submit">추가하기</button></TableCell>
                            </TableRow>
                        </TableBody>
                    
                    </Table>
                </form>
            </div>
        );
    }
}

export default CustomerAdd;