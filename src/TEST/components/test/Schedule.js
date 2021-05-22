import React from 'react'



class Schedule extends React.Component {
    state = {
        times: [],
        timesHtml: [],
        days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        daysHtml: [],
        classes: []
    }

    renderClasses() {
        // Fake list of classes
        let class1 = { "start":"11:00","end":"12:15","title":"CAS CS 112 A1","days":"Tue/Thu" }
        let class2 = { "start":"14:00","end":"15:15","title":"CAS CS 132 A1","days":"Tue/Thu" }
        let class3 = { "start":"08:00","end":"08:50","title":"CAS WR 120 A1","days":"Mon/Wed/Fri" }
        let class4 = { "start":"09:05","end":"09:55","title":"CAS PH 100 A1","days":"Mon/Wed/Fri" }

        let classes = [class1,class2,class3,class4]

        // Possible colors for classes
        let colors = ["red","pink","purple","indigo","blue"]
        let eventsL = [[],[],[],[],[]]

        let colorCount = 0;

        // Height of the cells in the schedule
        let cellHeight = 48;

        for(const course of classes) {  
            var days=[]

            // Add classes to their corresponding days
            if(course['days'].includes('Mon')) {
                days.push(0)
            }
            if(course['days'].includes('Tue')) {
                days.push(1)
            }
            if(course['days'].includes('Wed')) {
                days.push(2)
            }
            if(course['days'].includes('Thu')) {
                days.push(3)
            }
            if(course['days'].includes('Fri')) {
                days.push(4)
            }

            // Display classes
            for(let i = 0; i< days.length; i++) {
                // Conver to minutes for decimals
                let minEnd = course['end'].slice(0,2)*60+Number(course['end'].slice(3,5))
                let minStart = course['start'].slice(0,2)*60+Number(course['start'].slice(3,5))

                // Duration in min
                let duration = minEnd - minStart;

                // Simple calc to get what height the class should have
                let height = duration*cellHeight/60

                // 18 is the max time displayed, so we move it these many cells up
                let position = (18-(minStart/60))*cellHeight - height

                // HTML Saving
                eventsL[days[i]].push(
                    <li className="relative w-full">
                        <li className={"flex bg-" + colors[colorCount%colors.length] + "-300 w-full absolute hover:bg-" + colors[colorCount%colors.length] + "-400"}
                            style={{ bottom: position,height:height}} >
                            <span className="text-center w-full block self-center">{course['title']}</span>
                        </li> 
                    </li>
                )
            }
            colorCount++;
        }
        this.setState({events:eventsL},() => this.renderStructure())
    }

    generateCells() {
        let cells = []

        // Add one cell per time
        for(let i = 0; i < this.state.times.length-1; i++) {
            cells.push(<li className="w-full border border-gray-200 block h-12 p-5 hover:bg-gray-100"></li>)
        }

        return cells;
    }

    renderTimes() {
        let timesToHtml = []

        // Diplay the hours
        for(const time of this.state.times) {
            timesToHtml.push(<li className="text-gray-600 w-100 text-right h-12 pr-3">{time}:00</li>)
        }

        this.setState({ timesHtml: timesToHtml })
    }

    renderStructure() {
        let daysToHtml = []
        let dayN = 0

        // Each column of the calendar (day)
        for(const day of this.state.days) {
            daysToHtml.push(
                <li className="inline-block text-center">
                    <div className="pb-2 text-gray-600">{day}</div>
                    <ul>{this.generateCells()}{this.state.events[dayN]}</ul>
                </li>
            )
            dayN++;
        }

        this.setState({ daysHtml: daysToHtml })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.classes !== prevState.classes) {
            this.setState({ classes: this.props.classes },() => this.renderClasses());
        }
    }

    componentDidMount() {
        let times = []
        for(let time = 8; time < 19;time++) {
            times.push(time)
        }

        this.setState({
            times: times
        },() => {
            this.renderClasses()
            this.renderTimes()
        });
    }

    render() {
        return (
            <div className="grid grid-cols-12 pt-10 pr-10 pl-4">
                <div className="inline-block mt-5">
                    <ul>
                        { this.state.timesHtml }
                    </ul>
                </div>
                <div className="inline-block col-span-11">
                    <ul className="grid grid-cols-5">
                        { this.state.daysHtml }
                    </ul>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Schedule;