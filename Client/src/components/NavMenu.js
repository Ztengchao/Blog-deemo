import React, { Component } from 'react';
import { Input } from 'antd';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import Axios from 'axios';
import './NavMenu.css';
import "antd/dist/antd.css";

const { Search } = Input;

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    logout = () => {
        Axios.get("api/user/logout")
            .catch(err => console.log(err));
        cookie.remove("account");
        this.setState(this.state);
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Blog</NavbarBrand>
                        <Search style={{ width: "20%" }} onSearch={value => console.log(value)} ></Search>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            {
                                cookie.load("account") == undefined ?
                                    <ul className="navbar-nav flex-grow">
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/SignUp">注册</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/SignIn">登录</NavLink>
                                        </NavItem>
                                    </ul> :
                                    <ul className="navbar-nav flex-grow">
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/Profile">{cookie.load("account").name}</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <Button onClick={this.logout.bind(this)}>登出</Button>
                                        </NavItem>
                                    </ul>
                            }

                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
