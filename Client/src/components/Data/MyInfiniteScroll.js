import React, { Component } from 'react';
import { List, Spin, Tooltip, Button } from 'antd';
import Cookie from 'react-cookies';
import InfiniteScroll from 'react-infinite-scroller';
import { EditOutlined } from '@ant-design/icons';

import './MyInfiniteScroll.css';

export class MyInfiniteScroll extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
        index: 0,
    }

    componentDidMount() {
        this.props.loadData(newData => {
            this.setState({ data: newData });
        }, this);
    }

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });

        this.props.loadData(newData => {
            data = data.concat(newData);
            this.setState({
                data,
                loading: false,
            });
        }, this);
    }

    render() {
        return (
            <div style={{ marginBottom: "40px" }} className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={this.props.renderItem}
                        header={this.props.header}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
                {
                    Cookie.load("userInfo") != undefined ? (
                        <div style={{ position: "fixed", bottom: "40%", right: "20%" }}>
                            <Tooltip title="写文章">
                                <Button type="primary" style={{ width: "50px", height: "50px" }} shape="circle"
                                    icon={
                                        <EditOutlined style={{ width: "2em", height: "2em" }} />
                                    } onClick={this.writeArticle} />
                            </Tooltip>
                        </div>
                    ) : <span></span>
                }
            </div>
        );
    }
}