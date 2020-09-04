//登录页面
import React, { Component } from 'react';
import { Form, Button, Input,Alert } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const { Item } = Form;

const validateMessage = {
    required: "请输入${label}",
    string: {
        range: "'${label}' 长度为 ${min} 到 ${max} ",
    },
}


export class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayAlert: false,
            message: ""
        }
    }

    login = loginInfo => {
        Axios.post("api/user/signIn", loginInfo)
            .then(res => {
                return res.data;
            })
            .catch(error => console.error('Error:', error))
            .then(value => {
                if (!value.success) {
                    this.setState({ displayAlert: true, message: value.message })
                } else {
                    this.props.history.push("/")
                }
            });
    }

    closeAlert = () => this.setState({ displayAlert: false })

    render() {
        return (
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                <Form wrapperCol={{ span: 16 }} labelCol={{ span: 4 }} style={{ width: "60%", }} name="register" onFinish={this.login} validateMessages={validateMessage}>
                    {this.state.displayAlert ? <Alert
                        message={this.state.message}
                        type={"error"}
                        onClose={this.closeAlert}
                        closable></Alert> : <span></span>}
                    <Item label="登录用户名" name="username" rules={[{
                        required: true
                    }, {
                        max: 20,
                        min: 8
                    }]}>
                        <Input />
                    </Item>
                    <Item label="密码" name="password" rules={[{
                        required: true
                    }, {
                        max: 20,
                        min: 8
                    }]}>
                        <Input.Password />
                    </Item>
                    <Item>
                        <Button htmlType="submit" type="primary">登录</Button>
                    没有账户，<a href="/SignUp">立即注册</a>
                    </Item>
                </Form>
            </div>
        );
    }
}