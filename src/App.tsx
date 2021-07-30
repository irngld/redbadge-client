import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Wrapper, TextContainer } from "./styles/Containers";
import Login from "./components/Login";
import Register from "./components/Register";
import Assets from "./components/Assets";
import Lifecycle from "./components/Lifecycle";

import Menu from "./components/Menu";
export interface Session {
	token: string;
	isAdmin: boolean;
	roleId: number;
	userId: number;
}

class App extends React.Component<{}, Session> {
	constructor(props: any) {
		super(props);
		const storage = localStorage.getItem("sessionToken") ?? "";
		const session = storage.length > 0 ? JSON.parse(storage) : { token: "", isAdmin: false, roleId: 0, userId: 0 };
		this.state = session;
		this.authenticateUser = this.authenticateUser.bind(this); // required for redirect in Login:52  "this.props.history.push("/assets")"
		this.handleLogout = this.handleLogout.bind(this);
	}

	authenticateUser(token: string, roleId: number, userId: number): void {
		const session: Session = { token: token, isAdmin: roleId === 3, roleId: roleId, userId: userId };
		localStorage.setItem("sessionToken", JSON.stringify(session));
		this.setState(session);
	}

	handleLogout(): void {
		localStorage.removeItem("sessionToken");
		this.setState({ token: "", isAdmin: false, roleId: 0, userId: 0 });
	}

	protectedView = (page: string, isAdmin: boolean) => {
		console.log("Calling protected view", page, isAdmin);
		let component = <></>;
		if (page === "assets") {
			component = <Assets token={this.state.token} />;
		}

		return this.state.token && (this.state.isAdmin || this.state.isAdmin === isAdmin) ? (
			component
		) : (
			<Redirect to={`/assets/${this.state.userId}/lifecycle`} />
		);
	};

	render() {
		return (
			<Wrapper className='App'>
				<TextContainer>
					<h1>Welcome to, The Asset Tracker</h1>
					<p>Let's get started on managing the lifecycle of your IT assets. </p>
				</TextContainer>

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
						{/* <Route path='/assets'>
							<Assets token={this.state.token} />
						</Route> */}
						<Route path='/assets' component={() => this.protectedView("assets", true)} />
					</Switch>
				</Router>
			</Wrapper>
		);
	}
}

export default App;
