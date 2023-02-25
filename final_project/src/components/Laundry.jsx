import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {getLaundry} from 'states/laundry-actions.js';
import './Laundry.css';



class Laundry extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getLaundry());
    }
    


    render() {

        return (
            <div className = 'container' id = 'laundries'>
            <div className = 'row' id = 'machines'>
                <div className = 'col container'>
                    <img className = 'wash' src='images/laundry.png'/>
                    <div className = 'left-time'>剩餘時間： {this.props.lasttime[0]} 分鐘</div>
                </div>
                <div className = 'col container'>
                    <img className = 'wash' src='images/laundry.png'/>
                    <div className = 'left-time'>剩餘時間： {this.props.lasttime[1]} 分鐘</div>
                </div>
                <div className = 'col container'>
                    <img className = 'wash' src='images/laundry.png'/>
                    <div className = 'left-time'>剩餘時間： {this.props.lasttime[2]} 分鐘</div>
                </div>
                <div className = 'col container'>
                    <img className = 'wash' src='images/laundry.png'/>
                    <div className = 'left-time'>剩餘時間： {this.props.lasttime[3]} 分鐘</div>
                </div>
            </div>
            <div className ="row justify-content-md-center">
                <img className = 'cover' src = 'images/FB cover.jpg'></img>
            </div>
            <div className = 'imgref'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>

        );
    }
}

export default connect(state => ({
    lasttime: state.laundry.lasttime,
}))(Laundry);
