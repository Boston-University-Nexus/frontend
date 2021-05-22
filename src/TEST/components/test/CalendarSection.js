import { BsFillPauseFill, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io'
import React from 'react'
import Calendar from './Calendar'

class CalendarSection extends React.Component {
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
        activeSchedule: 0, // Determines which schedule is visible
        loggedIn: false
    }

    addToSchedule = (event) => {
        let index = Number(event.target.id.slice(event.target.id.length-1,event.target.id.length));

        let cartList = this.state.cart;

        cartList[this.state.activeSchedule] = cartList[this.state.activeSchedule].concat(this.state.classes[index]);
        this.setState({ cart:cartList })
    }

    checkScrollClasses = (e) => {
        // Checks if a user has scrolled to the bottom and calls load more classes
        let element = e.target
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 500) {   
            this.loadMore();
        }
    }

    loadMore() {
        // Store the new classes loaded
        let arr = []

        // Display HTML
        var count = 0;
        for (const item of this.state.classes) {
            // We start where the previous load finished
            if(count >= this.state.currentDisplayingClasses) {
                arr.push(
                    <div key={count+this.state.currentDisplayingClasses} className="shadow p-5 border-gray-200 border-t border-b">
                        <code className="tracking-tighter">{item.college + " " + item.department + " " + item.number}</code>
                        <span className="font-normal text-gray-8append00 ml-2">{item.title}</span><br />
                        <span className="bg-green-300 text-green-500 px-2 py-1 mx-1 rounded mt-2 inline-block">2.7</span>
                        <span className="font-normal text-gray-400 align-middle inline-block mr-3 ml-1">Quality</span>
                        <span className="bg-red-300 text-red-500 px-2 py-1 mx-1 rounded mt-2 inline-block">4.0</span>
                        <span className="font-normal text-gray-400 align-middle inline-block mr-3 ml-1">Difficulty</span>
                        <div className="inline-block mt-2 ">
                            <BsStarFill className="text-yellow-300 inline"/>
                            <BsStarFill className="text-yellow-300 inline"/>
                            <BsStarFill className="text-yellow-300 inline"/>
                            <BsStarFill className="text-yellow-300 inline"/>
                            <BsStarHalf className="text-yellow-300 inline"/>
                        </div>
                        <IoIosAddCircleOutline id={"addButton" + count} onClick={this.addToSchedule(this.state.activeSchedule)}  className="float-right align-middle inline relative text-2xl" />
                    </div>
                )
            }

            // If we reach MAX classes/load then stop
            if(count > this.state.currentDisplayingClasses + this.state.maxClassesDisplay)
                break;
            else {
                count++;
            }
        }

        // Check if search is empty to display not found text
        if(this.state.classes.length < 1) {
            this.setState({ classesHtml:[<div className="font-light py-2 px-5">No results found...</div>],doneUpdating: true })
        } else {
            this.setState({ classesHtml:this.state.classesHtml.concat(arr),doneUpdating: true,currentDisplayingClasses:this.state.currentDisplayingClasses+50 })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // With this we avoid making queries infinitely and making them only when the field changed
        if (this.props.textTyped !== prevState.textTyped) {
            // Getting the search bar text
            this.setState({textTyped:this.props.textTyped})

            var str = "http://localhost:8000/api/classes/?"

            // Splitting into College, Department and Number

            var textTyped = this.props.textTyped.split(' ');

            // Parsing the user typed text into different arrays so they can search in many formats
            // /^\d+$/.test(str) checks if the string is a number (to see where the number of the class is)
            if (this.props.textTyped.length == 0)
                textTyped = []
            else if(this.props.textTyped.length > 2 && /^\d+$/.test(this.props.textTyped.slice(2,3)) && !(/^\d+$/.test(this.props.textTyped.slice(0,1))))
                textTyped = [this.props.textTyped.slice(0,2),this.props.textTyped.slice(2,5)]
            else if(this.props.textTyped.length > 5 && /^\d+$/.test(this.props.textTyped.slice(5,6)) && !(/^\d+$/.test(this.props.textTyped.slice(2,3))))
                textTyped = [this.props.textTyped.slice(0,3),this.props.textTyped.slice(3,5),this.props.textTyped.slice(5,8)]
            else if(this.props.textTyped.length > 3 && !(/^\d+$/.test(this.props.textTyped.slice(5,6))) && this.props.textTyped.length < 6)
                textTyped = [this.props.textTyped.slice(0,3),this.props.textTyped.slice(3,5)]

            switch(textTyped.length) {
                // Depending on how many words the user has typed we search differently
                case 1:
                    let isnum = /^\d+$/.test(textTyped[0]);

                    // Only typed numbers
                    if(isnum)
                        str += "number__startswith=" + textTyped[0].toUpperCase()
                    else {
                        // Typed a department(most likely) else its a college
                        if(textTyped[0].length <= 2)
                            str += "department__startswith=" + textTyped[0].toUpperCase()
                        else
                            str += "college__startswith=" + textTyped[0].toUpperCase()
                    }
                    break;
                case 2:
                    let isnum2 = /^\d+$/.test(textTyped[1]);
                    // If second word is a number its most likely department + number
                    if(isnum2) {
                        str += "department__contains=" + textTyped[0].toUpperCase() + "&"
                        str += "number__startswith=" + textTyped[1].toUpperCase()
                    } else {
                        // if its two text words its probably college + department
                        str += "college__startswith=" + textTyped[0].toUpperCase() + "&"
                        str += "department__startswith=" + textTyped[1].toUpperCase()
                    }
                    break;
                case 3:
                    // all 3 words is the standard class code
                    str += "college__contains=" + textTyped[0].toUpperCase() + "&"
                    str += "department__contains=" + textTyped[1].toUpperCase() + "&"
                    str += "number__startswith=" + textTyped[2].toUpperCase()
                    break;
                default:
                    // Else we empty the search and empty our classes in state
                    str = ""
                    this.setState({classesHtml: [<div className="font-light py-2 px-5">No results found...</div>]});
                    break;
            }

            // If we finished the first query then we can make another one (avoids lag and multiple simultaneous queries)
            if(this.state.doneUpdating && str != "") {
                this.setState({doneUpdating:false},() => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Token " + localStorage.getItem('token')
                        }
                    };
                    fetch(str, requestOptions)
                        .then(response => {
                            if(response.ok) {
                                this.setState({ loggedIn: true })
                                return response.json();
                            } else
                                if(response.status === 401) {
                                    this.setState({
                                        loggedIn: false,
                                        classesHtml: [<div className="font-bold text-red-500 py-2 px-5">You need to log in to search classes...</div>]
                                    })
                                }
                                throw new Error(response.status); // Avoids using empty data
                        })
                        .then(data => {
                            // Mapping the response to dictionaries storable in the state
                            this.setState({
                                classes: data.map(item => ({
                                    college: item.college,
                                    department: item.department,
                                    number: item.number,
                                    semester: item.semester,
                                    prereqs: item.prereqs,
                                    coreqs: item.coreqs,
                                    description: item.description,
                                    credits: item.credits,
                                    title: item.title,
                                    id: item.id
                                }))
                            },() => {
                                let arr = []

                                // Display HTML
                                var count = 0;
                                for (const item of this.state.classes) {
                                    arr.push(
                                        <div key={count} className="shadow p-5 border-gray-200 border-t border-b">
                                            <code className="tracking-tighter">{item.college + " " + item.department + " " + item.number}</code>
                                            <span className="font-normal text-gray-8append00 ml-2">{item.title}</span><br />
                                            <span className="bg-green-300 text-green-500 px-2 py-1 mx-1 rounded mt-2 inline-block">2.7</span>
                                            <span className="font-normal text-gray-400 align-middle inline-block mr-3 ml-1">Quality</span>
                                            <span className="bg-red-300 text-red-500 px-2 py-1 mx-1 rounded mt-2 inline-block">4.0</span>
                                            <span className="font-normal text-gray-400 align-middle inline-block mr-3 ml-1">Difficulty</span>
                                            <div className="inline-block mt-2 ">
                                                <BsStarFill className="text-yellow-300 inline"/>
                                                <BsStarFill className="text-yellow-300 inline"/>
                                                <BsStarFill className="text-yellow-300 inline"/>
                                                <BsStarFill className="text-yellow-300 inline"/>
                                                <BsStarHalf className="text-yellow-300 inline"/>
                                            </div>
                                            <IoIosAddCircleOutline onClick={e => this.addToSchedule(e)} id={"addButton" + count} className="float-right align-middle inline relative text-2xl" />
                                        </div>
                                    )
                                    if(count > this.state.maxClassesDisplay)
                                        break;
                                    else {
                                        count++;
                                    }
                                }

                                // Check if search is empty to display not found text
                                if(this.state.classes.length < 1) {
                                    this.setState({ classesHtml:[<div className="font-light py-2 px-5">No results found...</div>],doneUpdating: true })
                                } else {
                                    this.setState({ classesHtml:arr,doneUpdating: true,currentDisplayingClasses:50 })
                                }
                            });
                        })
                        .catch(function(error) {
                            console.log(error);
                        });;
                });
            }

            if(!this.state.loggedIn) {
                this.setState({ classesHtml: [<div className="font-bold text-red-500 py-2 px-5">You need to log in to search classes...</div>] })
            }
        }
    }

    render() {
        return (
            <div className="h-5/6 grid grid-cols-4 gap-4 mt-5 font-sans">
                <div className="bg-white shadow-xl">
                    <p className="p-5 text-2xl border-b-2 border-gray-400 text-gray-600">Search results:</p>
                    <div className="classDisplay" onScroll={ this.checkScrollClasses }>{ this.state.classesHtml }</div>
                </div>
                {/* I would minimize the div under -- hard coded HTML LOL */}
                <div className="bg-white shadow-xl">
                    <div className="p-5 text-2xl border-b-2 border-gray-400 text-gray-600">Recommended</div>
                    <div className="recommended-content grid grid-cols-2">
                        <div className="p-5 inline-block text-center">Schedules</div>
                        <div className="p-5 inline-block text-center bg-gray-200">Classes</div>
                        <div className="classDisplay col-span-2">
                            <div className="shadow p-5 border-gray-200 border-t border-b mt-5">
                                <div className="block bg-green-500 text-white relative p-2 banner w-1/2">RECOMMENDED</div>
                                <p className="tracking-tighter text-xl inline-block align-middle">Nexus recommendation 
                                <IoIosAddCircleOutline className="align-middle inline relative text-2xl ml-2" /></p>
                                <div className="grid grid-cols-2 divide-x-2 mt-4">
                                    <div>
                                        <span className="mr-5 bg-green-300 text-green-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Avg. Hours/day: 2.7</span>
                                        <span className="mr-5 bg-red-300 text-red-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Avg. Difficulty: 4.0</span>
                                        <span className="mr-5 bg-blue-300 text-blue-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Earliest start: 8:00 AM</span>
                                        <span className="mr-5 bg-yellow-300 text-yellow-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Latest end: 4:55 PM</span>
                                    </div>
                                    <div>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS CS 131</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS CS 132</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS WR 120</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS PH 100</span>
                                    </div>
                                </div>
                            </div>
                            <div className="shadow p-5 border-gray-200 border-t border-b mt-5">
                                <p className="tracking-tighter text-xl block align-middle">Prioritized majors 
                                <IoIosAddCircleOutline className="align-middle inline relative text-2xl ml-2" /></p>
                                <div className="grid grid-cols-2 divide-x-2">
                                    <div>
                                        <span className="mr-5 bg-green-300 text-green-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Avg. Hours/day: 2.7</span>
                                        <span className="mr-5 bg-red-300 text-red-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Avg. Difficulty: 4.0</span>
                                        <span className="mr-5 bg-blue-300 text-blue-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Earliest start: 8:00 AM</span>
                                        <span className="mr-5 bg-yellow-300 text-yellow-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Latest end: 4:55 PM</span>
                                    </div>
                                    <div>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS CS 131</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS CS 132</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS WR 120</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS PH 100</span>
                                    </div>
                                </div>
                            </div>
                            <div className="shadow p-5 border-gray-200 border-t border-b mt-5">
                                <p className="tracking-tighter text-xl block align-middle">Prioritized hubs 
                                <IoIosAddCircleOutline className="align-middle inline relative text-2xl ml-2" /></p>
                                <div className="grid grid-cols-2 divide-x-2">
                                    <div>
                                        <span className="mr-5 bg-green-300 text-green-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Avg. Hours/day: 2.7</span>
                                        <span className="mr-5 bg-red-300 text-red-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Avg. Difficulty: 4.0</span>
                                        <span className="mr-5 bg-blue-300 text-blue-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Earliest start: 8:00 AM</span>
                                        <span className="mr-5 bg-yellow-300 text-yellow-700 px-1 py-1 mx-1 rounded mt-2 block text-center text-sm">Latest end: 4:55 PM</span>
                                    </div>
                                    <div>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS CS 131</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS CS 132</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS WR 120</span>
                                        <span className="ml-5 rounded mt-2 block bg-gray-200 text-center px-1 py-1 mx-1 text-sm">CAS PH 100</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="classDisplay h-70vh">{ this.state.recommended }</div>
                    </div>
                </div>
                {/* Until here */}
                <div className="bg-white shadow-xl col-span-2 select-none">
                    <Calendar classes={this.state.cart[0]} />
                </div>
            </div>
        )
    }
}

export default CalendarSection;
