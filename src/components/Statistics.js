import React, { Component } from 'react'
import '../styles/Statistics.css'
import '../styles/MainContainer.css'
import { Pie, Line } from 'react-chartjs-2'
export default class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {}
        }
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        // Ajax calls here

        this.setState({
            chartData: {
                labels: ['Mycket bra', 'Bra', 'Dåligt', 'Mycket dåligt'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            617594,
                            517594,
                            547594,
                            417594,
                        ],
                        backgroundColor: [
                            'rgba(100, 186, 29, 0.6)',
                            'rgba(216, 230, 8, 0.6)',
                            'rgba(242, 163, 7, 0.6)',
                            'rgba(232, 46, 9, 0.6)',
                        ]
                    }
                ]
            }
        });
    }
    render() {
        return (
            <div className="MainContainer">
                <div className="Statistics">
                    <div className="TimePicker">
                        <p>Tidsperiod: </p>
                        <p>1v</p>
                        <p>1m</p>
                        <p>3m</p>
                        <p>1å</p>
                    </div>
                    <div className="StatGrid">
                        <div className="StatLeftColumn">
                            <Pie
                                data={this.state.chartData}
                                options={{
                                    legend: {
                                        display: true,
                                        position: 'bottom',
                                    }
                                }}
                            />
                        </div>
                        <div className="StatRightColumn">
                            <Line
                                data={this.state.chartData}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
