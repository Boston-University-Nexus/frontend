import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';

class Login extends Component {
    state = {
        redirect: ""
    }

    logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
    }

    responseGoogle = (response) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'access_token': response.accessToken
            })
        };
        fetch('http://localhost:8000/login/', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token',"Token " + data.key);
                this.setState({ redirect:<Redirect to="/" /> })
            });
    }

    render() {
        return (
            <div className="shadow-xl px-6 py-10 bg-gray-50 text-center w-1/3 mx-auto rounded">
                <p className="text-2xl my-5">Log in with your BU account:</p>
                <GoogleLogin
                    clientId="616360051557-j76noqevuu5f2opnmbi3vv0ih2iptgfp.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="bg-blue-400 px-5 py-2 shadow-xl font-bold text-white text-lg hover:bg-blue-500" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log in with BU!</button>
                      )}
                    onSuccess={response => this.responseGoogle(response)}
                    onFailure={response => this.responseGoogle(response)}
                    cookiePolicy={'single_host_origin'}
                />
                { this.state.redirect }
            </div>
        )
    }
}

export default Login;
