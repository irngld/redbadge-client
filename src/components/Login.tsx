import React, { Component } from "react";
import { Redirect, Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Paper, Container, TextField, Button, Typography } from "@material-ui/core";

type initialState = {
	email: string;
	password: string;
};

interface initialProps extends RouteComponentProps {
	authenticateUser: (token: string, userType: string) => void;
	token: string | null;
}

class Login extends Component<initialProps, initialState> {
	constructor(props: initialProps) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.onLoginSubmit = this.onLoginSubmit.bind(this);
	}

	async onLoginSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();

		if (this.state.email && this.state.password) {
			const APIURL = process.env.REACT_APP_API_URL;
			const endPoint = "/user/login";
			let response = await fetch(`${APIURL}${endPoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				}),
			});

			let parsedResponse = await response.json();
			let token = parsedResponse.token;
			let userType = parsedResponse.userType;
			this.props.authenticateUser(token, userType);
			this.props.history.push("/asset"); // can also have it identify role and push to necessary endpoint
		} else {
			alert("Enter email AND password");
		}
	}

	updateEmail(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			email: event.target.value,
		});
	}

	updatePassword(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			password: event.target.value,
		});
	}

	render() {
		if (this.props.token) {
			return <Redirect to='/' />;
		} else {
			return (
				// <Container className='authContainer' maxWidth={false}>
				<Paper className='authForm' elevation={5} style={{ padding: "30px" }}>
					<form onSubmit={this.onLoginSubmit}>
						<Typography component='h2' variant='h4'>
							Login
						</Typography>
						<TextField
							id='loginEmail'
							label='Email'
							type='email'
							value={this.state.email}
							onChange={this.updateEmail}
							margin='normal'
							fullWidth={true}
						/>
						<TextField
							id='loginPassword'
							label='Password'
							type='password'
							value={this.state.password}
							onChange={this.updatePassword}
							margin='normal'
							fullWidth={true}
						/>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button className='authButton' type='submit' disabled={!this.state.email || !this.state.password} color='inherit'>
								Login
							</Button>
						</div>
					</form>
					<Typography component='p'>
						Need to create an account? <Link to='/register'>Register here</Link>
					</Typography>
				</Paper>
				// </Container>
			);
		}
	}
}

export default withRouter(Login);
