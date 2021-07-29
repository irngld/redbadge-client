import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Wrapper } from "./styles/Containers";
import Login from "./components/Login";
import Register from "./components/Register";
import Assets from "./components/Assets";
import Lifecycle from "./components/Lifecycle";

import Menu from "./components/Menu";
export interface Session {
	token: string | null;
	isUserAdmin: boolean;
}

class App extends React.Component<{}, Session> {
	constructor(props: any) {
		super(props);
		this.state = {
			token: localStorage.getItem("sessionToken"),
			isUserAdmin: false,
		};
		// this.authenticateUser = this.authenticateUser.bind(this);
		// this.handleLogout = this.handleLogout.bind(this);
	}

	authenticateUser(token: string, userType: string): void {
		localStorage.setItem("sessionToken", token);
		this.setState({
			token: token,
			isUserAdmin: userType === "admin",
		});
	}

	handleLogout(): void {
		localStorage.removeItem("sessionToken");
		this.setState({
			token: null,
		});
	}

	render() {
		return (
			// <div className='App' style={{ backgroundImage: `url(${background})` }}>
			<Wrapper className='App'>
				<Router>
					<Menu session={this.state} authenticateUser={this.authenticateUser} />
					<Switch>
						<Route path='/login'>
							<Login authenticateUser={this.authenticateUser} token={this.state.token} />
						</Route>
						<Route path='/register'>
							<Register authenticateUser={this.authenticateUser} token={this.state.token} />
						</Route>
						<Route path='/assets/:id/lifecycle'>
							<Lifecycle token={this.state.token} />
						</Route>
						<Route path='/assets'>
							<Assets token={this.state.token} />
						</Route>
					</Switch>
				</Router>
			</Wrapper>
			// </div>
		);
	}
}

export default App;
