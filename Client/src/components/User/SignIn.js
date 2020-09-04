//登录页面
import React, { Component } from 'react';
import { Form, Button, Input, message } from 'antd';
import Axios from 'axios';
import cookie from 'react-cookies'

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
        if (cookie.load("account") != undefined) {
            props.history.replace("/");
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
                    message.error("登录失败：" + value.message);
                } else {
                    message.success('登录成功');
                    const expires = new Date();
                    expires.setDate(Date.now() + 1000 * 60 * 60);
                    cookie.save('account', value.data, {
                        expires: expires
                    });
                    this.props.history.replace("/");
                }
            });
    }

    render() {
        return (
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                <Form wrapperCol={{ span: 16 }} labelCol={{ span: 4 }} style={{ width: "60%", }} name="register" onFinish={this.login} validateMessages={validateMessage}>
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