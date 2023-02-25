import React from 'react';
import PropTypes from 'prop-types';

import './WeatherDisplay.css';
import { Container, Row, Col } from 'reactstrap';

export default class ForecastDisplay extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.array,
        description: PropTypes.array,
        temp: PropTypes.array,
        unit: PropTypes.string
    };


    constructor(props) {
        super(props);
    };



    render() {
        return (
            <div>
            <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
                <img src={`images/w-${this.props.group0}.png`}/>
                <p className='description'>{`Tomorrow: ${this.props.description0}`}</p>&nbsp;
                <h1 className='temp'>
                    <span className='display-3'>{this.props.temp0}&ordm;</span>
                    &nbsp;{(this.props.unit === 'metric')
                        ? 'C'
                        : 'F'}
                </h1>
                </div>
                <div class ='space'> </div>

                <div className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`} >
                <Container>
                <Row>
                    <Col>{this.props.daytime1}: {this.props.temp1} <i class={`owf owf-${this.props.code1}`}></i></Col>
                    <Col>{this.props.daytime2}: {this.props.temp2} <i class={`owf owf-${this.props.code2}`}></i></Col>
                    <Col className = "d-none d-sm-block">{this.props.daytime3}: {this.props.temp3} <i class={`owf owf-${this.props.code3}`}></i></Col>
                    <Col className = "d-none d-sm-block">{this.props.daytime4}: {this.props.temp4} <i class={`owf owf-${this.props.code4}`}></i></Col>
                </Row>
                </Container>
                </div>
            </div>
            
        );
    }

    
    
}
