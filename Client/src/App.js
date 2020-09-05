import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { SignIn } from './components/User/SignIn';
import { SignUp } from './components/User/SignUp';
import { Editor } from './components/Editor';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/SignIn' component={SignIn} />
                <Route exact path='/SignUp' component={SignUp} />
                <Route exact path="/Editor" component={Editor} />
            </Layout>
        );
    }
}
