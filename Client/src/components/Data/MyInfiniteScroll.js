import React, { Component } from 'react';
import { List, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

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
        },this);
    }

    render() {
        return (
            <div style={this.props.style} className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={this.props.renderItem}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}