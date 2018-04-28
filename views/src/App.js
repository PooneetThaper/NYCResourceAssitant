import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import {geolocated} from 'react-geolocated';

function geolocation() {
	return(!this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>);
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			nums: [],
			current: 0,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleForwardClick = this.handleForwardClick.bind(this);
		this.handleBackwardClick = this.handleBackwardClick.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		// Handle fetch here
		let message;
		await axios.post('http://localhost:5000/msg', 
		{
			message: this.state.message
		},
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(response => message = response);
		alert(typeof(message.data));
		this.setState({nums: this.state.nums.concat(message.data)});
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	handleForwardClick(event) {
		if (this.state.current + 1 < this.state.nums.length)
			this.setState({current: this.state.current + 1});
		else
			alert(this.current + ' No!');
	}

	handleBackwardClick(event) {
		if (this.state.current - 1 >= 0)
			this.setState({current: this.state.current - 1});
		else
			alert(this.current + 'No!');
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<input type="button" onClick={this.handleBackwardClick} value="Previous" />
					<input type="button" onClick={this.handleForwardClick} value="Next" />
					<h1 className="App-title">{this.state.nums.join()}</h1>
					
						<CSSTransitionGroup
							transitionName="appear"
							transitionEnterTimeout={500}
							transitionLeave={false}>
							<h2 key={this.state.current}>
							 	Current: {this.state.nums[this.state.current]}
							</h2>
						</CSSTransitionGroup>
	
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.message} onChange={this.handleChange} />
					<input type="submit" value="submit" hidden />
				</form>
			</div>
		);
	}
}

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			num: 0,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
	}

	async handleSubmit(event) {
		event.preventDefault();
		// Handle fetch here
		let message;
		await axios.post('http://localhost:5000/msg', 
		{
			message: this.state.message
		}, 
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(response => message = response);
		alert(typeof(message.data));
		this.setState({num: message.data});
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.message} onChange={this.handleChange} />
				<input type="submit" value="submit" hidden />
			</form>
		)
	}
}
export default App;
