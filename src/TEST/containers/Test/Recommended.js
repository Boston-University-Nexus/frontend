import React, { Component } from 'react'
import RecommendedClasses from '../components/RecommendedClasses'
import RecommendedSchedules from '../components/RecommendedSchedules'

export class Recommended extends Component {
    render() {
        return (
            <div className="bg-white shadow-xl">
                <p className="p-5 text-2xl border-b-2 border-gray-400 text-gray-600">Recommended:</p>
            </div>
        )
    }
}

export default Recommended
