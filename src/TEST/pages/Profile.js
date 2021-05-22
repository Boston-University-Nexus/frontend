import React from "react"

class Profile extends React.Component {
    state = {
        name:"",
        lastname:"",
        email:"",
        buid:"",
        image:""
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token " + localStorage.getItem('token')
            }
        };
        fetch('http://localhost:8000/getuser/', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    name: data[0].name,
                    lastname: data[0].lastname,
                    email: data[0].email,
                    buid: data[0].buid,
                    image: data[0].image
                },() => console.log(this.state))
            });
    }

    render() {
        return (
            <div className="w-4/5 shadow-xl bg-white m-auto p-10">
                <img className="rounded-full mb-5" src={this.state.image} />
                <input className="p-4 pl-7 bg-gray-50 rounded my-2 block border border-gray-200 min-w-full" type="text" placeholder="First name..." defaultValue={this.state.name} />
                <input className="p-4 pl-7 bg-gray-50 rounded my-2 block border border-gray-200 min-w-full" type="text" placeholder="Last name..." defaultValue={this.state.lastname} />
                <input className="p-4 pl-7 bg-gray-50 rounded my-2 block border border-gray-200 min-w-full" type="text" placeholder="BU Email..." defaultValue={this.state.email} />
                <input className="p-4 pl-7 bg-gray-50 rounded my-2 block border border-gray-200 min-w-full" type="text" placeholder="BU ID..." defaultValue={this.state.buid} />
                <button className="bg-blue-400 px-7 py-4 text-white text-lg hover:bg-blue-500">Update profile</button>
            </div>
        )
    }
}

export default Profile;