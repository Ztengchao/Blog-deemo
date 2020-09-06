import React, { Component } from 'react';
import { message, Tooltip, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { MyInfiniteScroll } from './Data/MyInfiniteScroll';
import { EditOutlined } from '@ant-design/icons';

export class Index extends Component {
    componentDidMount() {
    }

    requestData = (callback, that) => {
        Axios.get("api/article/getArticleByDate?index=" + that.state.index + "&count=6")
            .then(res => {
                if (!res.data.success) {
                    message.error(res.data.message);
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
            <div>
                <MyInfiniteScroll loadData={this.requestData}
                    style={{ height: "650px", overflow: "auto" }}
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

                <div style={{ position: "fixed", bottom: "40%", right: "20%" }}>
                    <Tooltip title="写文章">
                        <Button type="primary" style={{ width: "50px", height: "50px" }} shape="circle"
                            icon={
                                <EditOutlined style={{ width: "2em", height: "2em" }} />
                            } onClick={this.writeArticle} />
                    </Tooltip>
                </div>
            </div>
        );
    }
}
