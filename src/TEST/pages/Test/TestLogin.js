import React from 'react'
import '../../css/test.css'

class Planner extends React.Component {
    state = {

    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.rEmail) {
            console.log("Email to register",this.state.rEmail);
            console.log("Pass1 to register",this.state.rPass);
            console.log("Pass2 to register",this.state.rConfPass);
        } else if(this.state.lEmail) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username:this.state.lEmail,password:this.state.lPass })
            };
            fetch('https://localhost:8000/accounts/login', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }
    }

    render() {
        return (
            <div className="">
                <form id="register" className="p-5 bg-blue-100 rounded w-1/3 my-10 block mx-auto" onSubmit={this.handleSubmit}>
                    <label className="block text-blue-800 mt-4" htmlFor="Email">Email</label>
                    <input onChange={(e) => this.setState({ rEmail:e.target.value })} className="px-8 py-3 block my-3 w-full border-b-2 border-blue-800 bg-blue-50 text-blue-800" placeholder="Email" type="email" name="Email" />
                    <label className="block text-blue-800 mt-4" htmlFor="Password">Password</label>
                    <input onChange={(e) => this.setState({ rPass:e.target.value })} className="px-8 py-3 block my-3 w-full border-b-2 border-blue-800 bg-blue-50 text-blue-800" placeholder="Password" type="password" name="Password" />
                    <label className="block text-blue-800 mt-4" htmlFor="ConfPassword">Confirm your password</label>
                    <input onChange={(e) => this.setState({ rConfPass:e.target.value })} className="px-8 py-3 block my-3 w-full border-b-2 border-blue-800 bg-blue-50 text-blue-800" placeholder="Confim your password" type="password" name="ConfPassword" />
                    <input className="px-8 py-3 bg-blue-700 w-full text-white font-bold" type="submit" value="Register"/>
                </form>
                <form id="register" className="p-5 bg-blue-100 rounded w-1/3 my-10 block mx-auto" onSubmit={this.handleSubmit}>
                    <label className="block text-blue-800" htmlFor="Email">Email</label>
                    <input onChange={(e) => this.setState({ lEmail:e.target.value })} className="px-8 py-3 block my-3 w-full border-b-2 border-blue-800 bg-blue-50 text-blue-800" placeholder="Email" type="email" name="Email" />
                    <label className="block text-blue-800 mt-4" htmlFor="Password">Password</label>
                    <input onChange={(e) => this.setState({ lPass:e.target.value })} className="px-8 py-3 block my-3 w-full border-b-2 border-blue-800 bg-blue-50 text-blue-800" placeholder="Password" type="password" name="Password" />
                    <input className="px-8 py-3 bg-blue-700 w-full text-white font-bold" type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default Planner
