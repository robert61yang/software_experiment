import React from 'react';
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
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    UncontrolledDropdown
} from 'reactstrap';

import { instanceOf } from 'prop-types';
import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import { withCookies, Cookies } from 'react-cookie';

import './Main.css';

 class Main extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            unit: 'metric',
            city: 'na',
            navbarToggle: false,
            favoriteCities: cookies.get('cities')? cookies.get('cities') : []
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.setFavoriteCities = this.setFavoriteCities.bind(this);
        this.clearFavoriteCities = this.clearFavoriteCities.bind(this);
        this.reOpenCities = this.reOpenCities.bind(this);

    }

    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>
                        <Navbar color="faded" light expand="md">
                            <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                            <NavbarToggler onClick={this.handleNavbarToggle}/>
                            <Collapse isOpen={this.state.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown>
                                        <DropdownToggle nav caret>
                                            History
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {this.state.favoriteCities.map((m=><DropdownItem key={m.id} onClick={()=>this.reOpenCities(m)}>{m}</DropdownItem>))}
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.clearFavoriteCities}>
                                                clear
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                </Nav>
                                <span className='navbar-text ml-auto'>DataLab</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today city={this.state.city} unit={this.state.unit} onUnitChange={this.handleUnitChange} onQuery={this.handleFormQuery}/>
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast city={this.state.city} unit={this.state.unit} onUnitChange={this.handleUnitChange} onQuery={this.handleFormQuery}/>
                    )}/>
                </div>
            </Router>
        );
    }

    reOpenCities(city){
        console.log(city);
        this.setState({
            city: city
        })
    }
    

    setFavoriteCities(city) {
        const{cookies} = this.props;
        var i;
        for(i of this.state.favoriteCities){
            if(i==city){
                return;
            }
        }
        this.state.favoriteCities.push(city);
        cookies.set('cities',this.state.favoriteCities); 
    }


    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleFormQuery(city, unit) {
        const{cookies} = this.props;
        this.setFavoriteCities(city);
        this.setState({
            city: city,
            unit: unit,
        }, ()=>{});
        //console.log(this.state.favoriteCities);
    }


    handleUnitChange(unit) {
        this.setState({
            unit: unit
        });
    }

    clearFavoriteCities() {
        const{cookies} = this.props;
        cookies.remove('cities');
        this.setState({
            favoriteCities:[]
        })
    }
}

export default withCookies(Main);