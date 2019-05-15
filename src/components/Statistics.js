import React, { Component } from 'react'
import '../styles/Statistics.css'
import '../styles/MainContainer.css'
import { Pie, Line } from 'react-chartjs-2'
export default class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {},
            pieData: {}
        }
    }

    /*componentWillMount() {
        this.getChartData();
    }*/

    getLineData = () => {
        return {
            labels: this.props.lineLabels,
            datasets: [
                {
                    label: 'Population',
                    data: this.props.lineStats,
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

    getPieData = () => {
        return {
            labels: ["Mycket bra", "Bra", "Dålig", "Mycket dålig"],
            datasets: [
                {
                    label: 'Population',
                    data: this.props.allStats.pie,
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
            <div>
                <h1 className="AdminPageName">{this.props.pageName}</h1>
                <div className="Statistics"
                    style={{ boxShadow: this.props.shadow }}
                >
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
                                data={this.getPieData}
                                options={{
                                    legend: {
                                        display: true,
                                        position: 'bottom',
                                    },

                                }}
                            />
                        </div>
                        <div className="StatRightColumn">
                            <Line
                                data={this.getLineData}
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                maxTicksLimit: 5
                                            }
                                        }]
                                    },
                                    elements: {
                                        point: {
                                            radius: 0,
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/*
chartData: {

            },
*/