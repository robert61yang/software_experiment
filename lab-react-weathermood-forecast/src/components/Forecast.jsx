import React from 'react';
import {getForecast} from 'api/open-weather-map.js';
import WeatherForm from 'components/WeatherForm.jsx';
import ForecastDisplay from 'components/ForecastDisplay.jsx';

import './weather.css';


export default class Forecast extends React.Component {

    static getUnitString(unit) {
        return unit === 'metric' ? 'C' : 'F';
    }

    static getInitWeatherState() {
        return {
            city: 'na',
            code: [],
            group: [],
            description: [],
            temp: [] ,
            daytime: [],
            group1: 'na'
        };
    }

    componentDidMount() {
        this.getForecast('Hsinchu', 'metric');
    }



    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            masking: false
        };

        this.handleFormQuery = this.handleFormQuery.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            unit: nextProps.unit,
            city: nextProps.city
        }, ()=>{this.getForecast(this.state.city,this.state.unit);
            
        });
    }


    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group0}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                    <ForecastDisplay {...this.state}/>
                </div>
            </div>
        );
    }

    // TODO


    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(weather => {
                this.setState({
                    group0: weather.group[0],
                    group1: weather.group[1],
                    group2: weather.group[2],
                    group3: weather.group[3],
                    group4: weather.group[4],

                    code0: weather.code[0],
                    code1: weather.code[1],
                    code2: weather.code[2],
                    code3: weather.code[3],
                    code4: weather.code[4],

                    description0: weather.description[0],
                    description1: weather.description[1],
                    description2: weather.description[2],
                    description3: weather.description[3],
                    description4: weather.description[4],

                    temp0: weather.temp[0],
                    temp1: weather.temp[1],
                    temp2: weather.temp[2],
                    temp3: weather.temp[3],
                    temp4: weather.temp[4],

                    daytime0: weather.daytime[0],
                    daytime1: weather.daytime[1],
                    daytime2: weather.daytime[2],
                    daytime3: weather.daytime[3],
                    daytime4: weather.daytime[4],
                    
                    ...weather,
                    loading: false
                }, () => this.notifyUnitChange(unit));
                //console.log(this.state.group[0]);
            }).catch(err => {
                console.error('Error getting weather', err);
                this.setState({
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.props.onQuery(city, unit);
        this.getForecast(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.unit !== unit) {
            this.props.onUnitChange(unit);
        }
    }

}
