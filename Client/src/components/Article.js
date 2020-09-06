import React, { Component } from 'react';
import { Typography, Divider, Comment, Pagination, List, Tooltip, Avatar, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import cookie from 'react-cookies'
import Axios from 'axios';
const { Title, Text } = Typography;
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                添加评论
            </Button>
        </Form.Item>
    </>
);

export class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state,
            comments: [],
            totalComments: 0,
            submitting: false,
            value: "",
        }
    }

    componentDidMount() {
        document.getElementById("title").innerHTML = this.state.data.title;
        document.getElementById("content").innerHTML = this.state.data.content;
    }

    pageOnChange = pageNumber => {

    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        //TODO 上传数据到后台
        // setTimeout(() => {

        //     this.setState({
        //         submitting: false,
        //         value: '',
        //         comments: [
        //             {
        //                 author: 'Han Solo',
        //                 avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //                 content: <p>{this.state.value}</p>,
        //                 datetime: moment().fromNow(),
        //             },
        //             ...this.state.comments,
        //         ],
        //     });
        // }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const actions = [
            <span key="comment-basic-reply-to">回复</span>,
        ];

        const { comments, submitting, value } = this.state;

        return (
            <div style={{ marginBottom: "200px" }}>
                <Typography>
                    <Title id="title" />
                    <Divider />
                    <Text style={{ marginTop: "30px" }} id="content" />
                </Typography>
                <Divider />
                <List
                    dataSource={this.state.comments}
                    footer={
                        <Pagination
                            showQuickJumper
                            hideOnSinglePage
                            defaultCurrent={1}
                            total={this.state.totalComments}
                            onChange={this.pageOnChange.bind(this)}
                        />
                    }
                    locale={{
                        emptyText: "暂无评论",
                    }}
                    renderItem={item =>
                        <Comment
                            avatar={
                                <Avatar
                                    src={item.profilePhoto}
                                    alt="Han Solo"
                                />
                            }
                            actions={actions}
                            author={<Link to="/">{item.username}</Link>}
                            content={<p>{item.content}</p>}
                            datetime={
                                <Tooltip title={moment(item.deliverDate).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(item.deliverDate).fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    }
                />
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={cookie.load("userInfo").name}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />

            </div>
        )
    }
}