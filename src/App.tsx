import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Assets from "./components/Assets";
import Lifecycle from "./components/Lifecycle";
import "./App.css";

export class App extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<Router>
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
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/assets/:id/lifecycle'>
						<Lifecycle />
					</Route>
					<Route path='/assets'>
						<Assets />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
