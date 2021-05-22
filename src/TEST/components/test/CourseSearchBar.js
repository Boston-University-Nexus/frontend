import { FiFilter } from 'react-icons/fi';
import React from 'react'
import CalendarSection from './CalendarSection';

class CourseSearchBar extends React.Component {
    state = {
        typed: ""
    }

    updateText = (e) => {
        this.setState({typed:e.target.value})
    }
    
    render() {
        return (
            <>
                <div className="flex bg-white shadow p-3 flex-col md:flex-row">
                    <input onChange={ this.updateText } className="w-full bg-gray-100 border-0 py-1 px-3 mr-5 rounded mb-4 md:mb-0" placeholder="Search"></input>
                    <div className="flex items-center flex-wrap sm:flex-nowrap sm:space-x-2">
                        <div className="flex items-center mr-2">
                            <FiFilter className="mr-1" color="#6B7280"/>
                            <span className="text-gray-500">Filters</span>
                        </div>
                        <button className="w-auto m-1 mr-2 sm:m-0 text-sm bg-transparent m-0 border-gray-500 rounded-full px-3 py-1 text-gray-500 focus:ring-0 focus:outline-none">Department</button>
                        <button className="w-auto m-1 mr-2 sm:m-0 text-sm bg-transparent m-0 border-gray-500 rounded-full px-3 py-1 text-gray-500 focus:ring-0 focus:outline-none">Start</button>
                        <button className="w-auto m-1 mr-2 sm:m-0 text-sm bg-transparent m-0 border-gray-500 rounded-full px-3 py-1 text-gray-500 focus:ring-0 focus:outline-none">End</button>
                        <button className="w-auto m-1 mr-2 sm:m-0 text-sm bg-transparent m-0 border-gray-500 rounded-full px-3 py-1 text-gray-500 focus:ring-0 focus:outline-none">Day</button>
                        <button className="w-auto text-sm font-bold bg-transparent m-0 border-none px-3 py-1 text-gray-500 focus:ring-0 focus:outline-none whitespace-nowrap">Clear All</button>
                    </div>
                </div>
                {/* Calling the Calendar Section w the text typed in the search bar */}
                <CalendarSection textTyped={this.state.typed}/>
            </>
        )
    }
}

export default CourseSearchBar;
