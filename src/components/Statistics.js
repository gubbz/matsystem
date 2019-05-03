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

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {

        // Ajax calls here

        this.setState({
            chartData: {
                labels: ["Jan", "Feb", "Mar", "Apr", "Maj"],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            54,
                            57,
                            56,
                            59,
                            62,
                        ],
                        backgroundColor: [
                            'rgba(100, 186, 29, 0.6)',
                            'rgba(216, 230, 8, 0.6)',
                            'rgba(242, 163, 7, 0.6)',
                            'rgba(232, 46, 9, 0.6)',
                        ]
                    }
                ]
            },
            pieData: {
                labels: ["Mycket bra", "Bra", "Dålig", "Mycket dålig"],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            63,
                            47,
                            34,
                            29,
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
                                //data={this.props.stats.pie.pieStats}
                                data={this.state.pieData}
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
