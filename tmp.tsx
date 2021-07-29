import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import NavigationComponent from "./components/app/Navigation";
// import LoginComponent from "./components/auth/Login";
// import RegisterComponent from "./components/auth/Register";
// import MainPageComponent from "./components/app/main/MainPageComponent";
// import UserPageComponent from "./components/app/admin/UserPage";
// import Footer from "./components/app/Footer";

import { Session } from "./utilities/Authorization";
import Login from "./components/Login";
import Register from "./components/Register";
import Assets from "./components/Assets";
import Lifecycle from "./components/Lifecycle";

type initialState = {
	token: string | null;
	isUserAdmin: boolean;
};

class App extends React.Component<{}, initialState> {
	constructor(props: any) {
		super(props);

		this.state = {
			token: localStorage.getItem("sessionToken"),
			isUserAdmin: false,
		};
		this.authenticateUser = this.authenticateUser.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
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
			<div className='App'>
				<Router>
					{/* <NavigationComponent token={this.state.token} handleLogout={this.handleLogout} isAdmin={this.state.isUserAdmin} /> */}
					<div>
						<nav>
							<ul>
								<li>
									<Link to='/login'>Login</Link>
								</li>
								<li>
									<Link to='/register'>Register</Link>
								</li>
								<li>
									<Link to='/assets'>Assets</Link>
								</li>
								<li>
									<Link to='/assets/1/lifecycle'>Lifecycle</Link>
								</li>
							</ul>
						</nav>
					</div>
					<Switch>
						{/* <Route exact path='/login'>
							<LoginComponent authenticateUser={this.authenticateUser} token={this.state.token} />
						</Route>
						<Route exact path='/register'>
							<RegisterComponent authenticateUser={this.authenticateUser} token={this.state.token} />
						</Route>
						<Route exact path='/users'>
							<UserPageComponent isAdmin={this.state.isUserAdmin} token={this.state.token} />
						</Route> */}
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
					{/* <Footer /> */}
				</Router>
			</div>
		);
	}
}

export default App;
