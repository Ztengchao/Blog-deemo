//注册页面
import React, { Component } from 'react';
import { Form, Button, Input, Alert } from 'antd';
import Axios from 'axios'

const { Item } = Form;

const validateMessage = {
    required: "请输入${label}",
    string: {
        range: "'${label}' 长度为 ${min} 到 ${max} ",
    },
}

export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayAlert: false,
            registerSuccess: true,
            message: ""
        }
    }

    register = registerInfo => {
        console.log(registerInfo);
        //发送数据到后台
        Axios.post("api/user/signUp", registerInfo)
            .then(res => {
                console.log(res);
                return res.data;
            })
            .catch(error => console.error('Error:', error))
            .then(value => {
                console.log(value);
                if (!value.success) {
                    this.setState({ displayAlert: true, registerSuccess: false, message: value.message })
                } else {
                    this.setState({ displayAlert: true, registerSuccess: true, message: "注册成功" })
                }
            });
    }

    closeAlert = () => this.setState({ displayAlert: false })

    render() {
        return (
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                <Form wrapperCol={{ span: 16 }} labelCol={{ span: 4 }} style={{ width: "60%", }} name="register" onFinish={this.register} validateMessages={validateMessage}>
                    {this.state.displayAlert ? <Alert
                        message={this.state.message}
                        type={this.state.registerSuccess ? "success" : "error"}
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

                    <Item label="显示昵称" name="nickname" rules={[{ max: 20, message: "昵称字数不能超过20" }]}>
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

                    <Item label="确认密码" name="comfirmPassword" rules={[{
                        required: true
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('确认密码与密码输入不一致');
                        }
                    })
                    ]}>
                        <Input.Password />
                    </Item>

                    <Item>
                        <Button htmlType="submit" type="primary">注册</Button>
                    </Item>
                </Form>
            </div>
        );
    }
}