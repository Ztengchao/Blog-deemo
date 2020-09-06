import React, { Component } from 'react';
import { Card } from 'antd';
import Axios from 'axios';
import { MyInfiniteScroll } from './Data/MyInfiniteScroll';

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
                loadData={this.requestData}
                header="最新投稿"
                renderItem={
                    item => {
                        return (
                            <Card hoverable
                                title={
                                    item.title
                                }
                                style={{
                                    marginTop: "20px"
                                }}
                                onClick={e => {
                                    this.props.history.push({
                                        pathname: "/Article",
                                        state: item,
                                    });
                                }}
                            >
                                {item.content.replace(/<.*?>/ig, "").substring(0, 200)}
                            </Card>
                        )
                    }
                }
            />
        );
    }
}
