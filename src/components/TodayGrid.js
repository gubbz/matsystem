import React, { Component } from 'react';
import '../styles/TodayGrid.css';
import TodayInfo from './TodayInfo.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from './Chart';
var data;
export default class TodayGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vGood: this.props.vGood,
            good: this.props.good,
            bad: this.props.bad,
            vBad: this.props.vBad,
            data: [this.props.vGood, this.props.good, this.props.bad, this.props.vBad],
        }
    }

    updateChart(data, amount) {
        switch (data) {
            case "very_bad":
                this.setState({
                    vBad: this.state.vBad + amount,
                }, () => {
                    localStorage.setItem("vBad", parseInt(this.state.vBad));
                });
                break;
            case "bad":
                this.setState({
                    bad: this.state.bad + amount,
                }, () => {
                    localStorage.setItem("bad", parseInt(this.state.bad));
                });
                break;
            case "good":
                this.setState({
                    good: this.state.good + amount,
                }, () => {
                    localStorage.setItem("good", parseInt(this.state.good));
                });
                break;
            case "very_good":
                this.setState({
                    vGood: this.state.vGood + amount,
                }, () => {
                    localStorage.setItem("vGood", parseInt(this.state.vGood));
                });
                break;
        }
        this.setState({
            data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad],
        });
    }
    
    getChartData() {
        return {
            labels: ['Mycket bra', 'Bra', 'Dåligt', 'Mycket dåligt'],
            datasets: [
                {
                    label: 'Population',
                    data: this.state.data,
                    backgroundColor: [
                        'rgba(100, 186, 29, 0.6)',
                        'rgba(216, 230, 8, 0.6)',
                        'rgba(242, 163, 7, 0.6)',
                        'rgba(232, 46, 9, 0.6)',
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <div className="MainContainer">
                <div className="TodayGrid">
                    <div className="LeftColumn">
                        <TodayInfo
                            headline="Dagens måltid"
                            info="Pannbiffar"
                        />
                        <TodayInfo
                            headline="Dagens fråga"
                            info="Vad tyckte du om maten?"
                        />
                    </div>
                    <div className="RightColumn">
                        <Bar
                            data={this.getChartData()}
                            options={{
                                legend: {
                                    display: false,
                                },
                                //responsive: true,
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

/*
componentWillMount() {
this.getChartData();
}
*/