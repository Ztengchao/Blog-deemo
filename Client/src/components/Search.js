import React, { Component } from 'react';
import { MyInfiniteScroll } from './Data/MyInfiniteScroll';
import Axios from 'axios';
import { Card } from 'antd';

export class Search extends Component {

    constructor(props) {
        super(props);
        let title = document.getElementById("searchInput").value;
        if (!title) {
            props.history.replace("/");
        }

        this.state = {
            title: title,
            data: [],
        }
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

    render() {
        return (
            <MyInfiniteScroll
                loadData={this.requestData}
                header={"\"" + this.state.title + "\" 搜索结果"}
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
                                    this.props.history.push("./editor");
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