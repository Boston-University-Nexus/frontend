import Schedule from './Schedule'
import ScheduleStatistics from './ScheduleStatistics'

import React, { Component } from 'react'

export default class Calendar extends Component {
    render() {
        return (
            <>
                <Schedule classes={this.props.classes} />
                <ScheduleStatistics classes={this.props.classes} />
            </>
        )
    }
}
