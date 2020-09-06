import React, { Component } from 'react';
import { Typography, Divider, Comment, Pagination, List, Tooltip, Avatar, Form, Input, Button, message } from 'antd';
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
            pageNow: 1,
            pageSize: 10,
        }
    }

    componentDidMount() {
        document.getElementById("title").innerHTML = this.state.data.title;
        document.getElementById("content").innerHTML = this.state.data.content;
        this.pageOnChange(1, 10);
    }

    pageOnChange = (page, pageSize) => {
        Axios.get("api/comment/find?articleId=" + this.state.data.id
            + "&page=" + page
            + "&countPerPage=" + pageSize)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        comments: res.data.data.comments,
                        totalComments: res.data.data.totalComments,
                        pageNow: page,
                        pageSize
                    });
                } else {
                    message.error("加载评论失败：" + res.data.message);
                }
            })
            .catch(
                err => {
                    message.error("加载评论失败：" + err);
                }
            )
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        Axios.post("api/comment/add", {
            articleId: this.state.data.id,
            content: this.state.value,
            userId: cookie.load("userInfo").userId,
        }).then(
            res => {
                if (res.data.success) {
                    this.pageOnChange(this.state.pageNow, this.state.pageSize)
                } else {
                    message.error("评论失败：" + res.data.message)
                }
                this.setState({
                    submitting: false,
                });
            }
        ).catch(err => {
            message.error("评论失败：" + err);
            this.setState({
                submitting: false,
            });
        })
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

        //TODO 添加回复评论功能

        const { submitting, value } = this.state;

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
                            total={this.state.totalComments}
                            onChange={this.pageOnChange.bind(this)}
                            defaultCurrent={1}
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
                                    alt={item.nickname}
                                />
                            }
                            actions={actions}
                            author={<Link to="/">{item.nickname}</Link>}
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