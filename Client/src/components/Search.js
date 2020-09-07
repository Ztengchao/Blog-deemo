import React, { Component } from 'react';
import { MyInfiniteScroll } from './Data/MyInfiniteScroll';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Space, Avatar, Divider } from 'antd';
import moment from 'moment';

export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            data: [],
        }
    }

    componentDidMount() {
        let title = document.getElementById("searchInput").value;
        if (!title) {
            this.props.history.replace("/");
        }
        this.setState({ title });

    }


    requestData = (callback, that) => {
        Axios.get("api/article/getArticleByDate?index=" + that.state.index + "&count=6&searchTitle=" + this.state.title)
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
                header={"\"" + this.state.title + "\" 搜索结果"}
                renderItem={
                    item => {
                        return (
                            <Card hoverable
                                title={
                                    <Link to={{
                                        pathname: "/Article",
                                        state: item.article,
                                    }} >
                                        {item.article.title}
                                    </Link>
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