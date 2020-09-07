import React, { Component } from 'react';
import { Card, Avatar, Space, Divider } from 'antd';
import Axios from 'axios';
import { MyInfiniteScroll } from './Data/MyInfiniteScroll';
import moment from 'moment';

export class Index extends Component {
    componentDidMount() {
    }

    requestData = (callback, that) => {
        Axios.get("api/article/getArticleByDate?index=" + that.state.index + "&count=6")
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
                header="最新投稿"
                renderItem={
                    item => {
                        return (
                            <Card hoverable
                                title={
                                    item.article.title
                                }
                                style={{
                                    marginTop: "20px"
                                }}
                                onClick={e => {
                                    this.props.history.push({
                                        pathname: "/Article",
                                        state: item.article,
                                    });
                                }}
                            >
                                <Space>
                                    <Avatar size="large" shape="square" src={item.author.profilePhoto} />
                                    <div>
                                        {
                                            item.article.content.replace(/<.*?>/ig, "").substring(0, 200)
                                        }
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
