//登录页面
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';

const { Item } = Form;

const validateMessage = {
    required: "请输入${label}",
    string: {
        range: "'${label}' 长度为 ${min} 到 ${max} ",
    },
}


export class SignIn extends Component {

    render() {
        return (
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                <Form wrapperCol={{ span: 16 }} labelCol={{ span: 4 }} style={{ width: "60%", }} name="register" onFinish={value => console.log(value)} validateMessages={validateMessage}>
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