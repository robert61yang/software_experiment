import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';

import Activities from 'components/Activities.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar , callUserImf} from 'states/main-actions.js';
import DemoApp from 'components/DemoApp.jsx';
import Laundry from 'components/Laundry.jsx';
import MyFollow from 'components/Myfollow.jsx';
import ImportantInfo from 'components/ImportantInfo.jsx';
import {withAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import {Auth} from "aws-amplify";

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.searchEl = null;

        this.callname();

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }


    callname(){
        Auth.currentAuthenticatedUser().then(user =>{
            console.log('get user name and email!')
            this.props.dispatch(callUserImf(user.name, user.email));
        })
    }

    render() {
        Auth.currentAuthenticatedUser().then(user =>{console.log(user)})
        return (
            <Router>
                 <Navbar className='topbar'>
                    <div className = 'topset row'>
                    <i className="fas fa-user-circle ml-auto"></i>
                    <div className = 'ml-auto' id = 'username'>{this.props.curname}</div>
                    <Button className = 'ml-auto' id='logout' onClick = {()=>{Auth.signOut().then(()=>{window.location.reload()})}}>登出</Button>
                    </div>
                </Navbar>           
                <div className='main'>
                    <Navbar color='faded' expand='md' id = 'topnav'>
                            <NavbarToggler onClick={this.handleNavbarToggle}/>
                            <NavbarBrand id = 'navbrand' href="/">載物書院</NavbarBrand>
                            <div className = 'container' id ='collapse'>
                            <Collapse isOpen={this.props.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/' className = 'navlink'>重要公告</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/activities' className = 'navlink'>活動消息</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/calendar' className = 'navlink'>空間預約</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/laundry' className = 'navlink'>洗衣機狀況</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/myfollow' className = 'navlink'>我的關注</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                            </div>
                    </Navbar>


                    <Route exact path="/" render={() => (
                        <ImportantInfo />
                    )}/>
                    <Route exact path="/activities" render={() => (
                        <Activities />
                    )}/>
                    <Route exact path="/calendar" render={() => (
                        <DemoApp/>
                    )}/>
                    <Route exact path="/laundry" render={() => (
                        <Laundry/>
                    )}/>
                    <Route exact path="/myfollow" render={() => (
                        <MyFollow/>
                    )}/>
                   
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default withAuthenticator(connect(state => ({
    ...state.main,
    searchText: state.searchText,
}))(Main));
