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
                    data: this.props.pieStats,
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
                    <div className="StatGrid">
                        <div className="StatLeftColumn">
                            <h2 className="StatLabels">Total röstfördelning</h2>
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
                        <hr className="StatSeparator"/>
                        <div className="StatRightColumn">
                            <h2 className="StatLabels">Statistik över tid</h2>
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
