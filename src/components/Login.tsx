import React, { Component } from "react";
import { Redirect, Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Paper, TextField, Button, Typography } from "@material-ui/core";

type initialState = {
	email: string;
	password: string;
};

interface initialProps extends RouteComponentProps {
	authenticateUser: (token: string, roleId: number, userId: number) => void;
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

	onLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (this.state.email && this.state.password) {
			const APIURL = process.env.REACT_APP_API_URL;
			const endPoint = "/user/login";

			fetch(`${APIURL}${endPoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				}),
			})
				.then((res) => res.json())
				.then((parsedRes) => {
					const {
						token,
						user: { roleId, id },
					} = parsedRes;
					console.log(token, roleId);
					this.props.authenticateUser(token, roleId, id);
					this.props.history.push("/assets"); // can also have it identify role and push to necessary endpoint
				})
				.catch((err) => {
					console.log(err);
				})
				.finally();
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
