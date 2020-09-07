import React, { Component } from 'react';
import { MyInfiniteScroll } from './Data/MyInfiniteScroll';
import Axios from 'axios';
import { Card, Space, Avatar, Divider, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import cookie from 'react-cookies'
import { EditOutlined } from '@ant-design/icons';

export class MyArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    requestData = (callback, that) => {
        let userInfo = cookie.load("userInfo");
        if (userInfo == undefined) {
            message.error("请先登录");
            this.props.history.push("/Login");
        }
        Axios.get("api/article/getArticleByDate?index=" + that.state.index +
            "&count=6&authorId=" + userInfo.userId)
            .then(res => {
                if (!res.data.success) {
                    that.setState({
                        hasMore: false,
                        loading: false,
                    });
                } else {
                    that.state.index += 6;
                    callback(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }


    writeArticle = () => {
        this.props.history.push({
            pathname: "/Editor",
            query: {
            }
        });
    }

    render() {
        return (
            <MyInfiniteScroll
                writeArticle={this.writeArticle}
                loadData={this.requestData}
                header="我的文章"
                renderItem={
                    item => {
                        return (
                            <Card hoverable
                                title={
                                    <div>
                                        <Link to={{
                                            pathname: "/Article",
                                            state: item.article,
                                        }} >
                                            {item.article.title}
                                        </Link>
                                        <Button shape="circle" type="text" style={{ float: "right" }} icon={<EditOutlined />}
                                            onClick={e => {
                                                this.props.history.push({
                                                    pathname: "/Editor",
                                                    state: item.article,
                                                });
                                            }} />
                                    </div>
                                }
                                style={{
                                    marginTop: "20px"
                                }}
                            >
                                <Space>
                                    <Avatar size="large" shape="square" src={item.author.profilePhoto} />
                                    <div>
                                        {item.article.content.replace(/<.*?>/ig, "").substring(0, 200)}
                                    </div>
                                </Space>
                                <Divider />
                                <Space>
                                    <div>
                                        {item.author.nickname}
                                    </div>
                                    <div>
                                        {moment(item.article.deliverDate).format('YYYY-MM-DD HH:mm:ss')}
                                    </div>
                                </Space>
                            </Card>
                        )
                    }
                }
            />
        );
    }
}