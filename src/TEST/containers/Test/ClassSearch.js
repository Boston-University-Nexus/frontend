import React, { Component } from 'react'
import ClassCard from '../components/ClassCard'

import { BsFillPauseFill, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io'

export class ClassSearch extends Component {
    state = {
        classes: [], // Will store the response when searching
        recommended: [], // Will store the ids of the courses added
        query: "", // The query to the api
        classesHtml: [<div className="font-light py-2 px-5">Start by typing a class in the search bar...</div>], // To display the classes
        doneUpdating: true, // To avoid multiple queries in a row
        textTyped: "", // Text received from the search bar
        currentDisplayingClasses: 0, // Ammount of classes currently being displayed
        test: false,
        maxClassesDisplay: 50, // The ammount of classes to load at a time,
        cart: new Array(5).fill([]), // Classes added to schedule
        activeSchedule: 0 // Determines which schedule is visible
    }

    checkScrollClasses = (e) => {
        // Checks if a user has scrolled to the bottom and calls load more classes
        let element = e.target
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 500) {   
            this.loadMore();
        }
    }

    loadMore() {}

    render() {
        return (
            <div className="bg-white shadow-xl">
                <p className="p-5 text-2xl border-b-2 border-gray-400 text-gray-600">Class search:</p>
                <div onScroll={e => this.checkScrollClasses(e)} >{ this.state.classes }</div>
            </div>
        )
    }
}

export default ClassSearch
