import React from 'react'

class ScheduleStatistics extends React.Component {
    state = {
        stats: {},
        statsHtml:[]
    }

    renderStats() {
        // To display data it needs to be an array, so we create another one with the title of each index in the array
        let arrTitle = ["Earliest Start","Latest End","Average Time Per Day","Difficulty","Course Load","Quality","Rating"]
        let toHtml = []

        // Color of the statistics
        let arrColors = ["purple","purple","pink","red","blue","green","yellow"]

        // To display the hour statistics
        for(let i = 0; i < 3;i++){
            toHtml.push(
                <div className="block px-5 py-3">
                    <span className="inline-block align-middle">{arrTitle[i]}</span>
                    <div className={"text-" + arrColors[i] + "-500 ml-5 inline-block align-middle text-2xl font-bold"}>{this.state.stats[i]} h</div>
                </div>
            )
        }

        // To display user voted statistics
        for(let i = 3; i < this.state.stats.length; i++) {
            toHtml.push(
                <div className="block px-5 py-3">
                    <span className="inline-block align-middle">{arrTitle[i]}</span>
                    <div className="ml-5 border rounded h-7 inline-block align-middle" style={{ width: "150px" }}>
                        <div className={"bg-" + arrColors[i] + "-400 h-7 rounded"} style={{ width: + (150*this.state.stats[i]/5) + "px"}}></div>
                    </div>
                </div>
            )
        }

        this.setState({statsHtml:toHtml})
    }

    componentDidMount() {
        let str = "http://localhost:8000/compute/overalstatistics/"

        // Get statistics of the current classes
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sections: 'CAS CS 112 A1,CAS CS 132 A1,CAS WR 120 A1,CAS PH 100 A1' })
        };

        fetch(str, requestOptions)
            .then(response => {
                if(response.ok) {
                    return response.json();
                } else
                    throw new Error('Network response was not ok.'); // Avoids using empty data
            })
            .then(data => {
                // Save the statistics in state
                this.setState({
                    stats: [
                        data.earliestStart.slice(0,data.earliestStart.length-3),
                        data.latestEnd.slice(0,data.latestEnd.length-3),
                        data.avgTimePerDay.slice(0,data.avgTimePerDay.length-3),
                        data.difficulty,
                        data.courseLoad,
                        data.quality,
                        data.rating
                    ]
                },() => this.renderStats());
            })
            .catch(function(error) {
                console.log(error.message);
            });;
    }

    render() {
        return (
            <div className="w-100 border-t-2 border-gray-200 grid grid-rows-3 grid-flow-col p-4">
                {this.state.statsHtml}
            </div>
        )
    }
}

export default ScheduleStatistics;
