import React, { Component } from "react";
import { Redirect, Link, RouteComponentProps, withRouter } from "react-router-dom";
// import Login from "./Login";
import { TextField, Paper, Container, Button, Typography } from "@material-ui/core";

export interface Form {
	email: string;
	password: string;
	verifyPwd: string;
	firstName: string;
	midInit: string;
	lastName: string;
	suffix: string;
	dept: string;
}
interface initialState {
	form: Form;
}

interface intialProps extends RouteComponentProps {
	authenticateUser: (token: string, roleId: number, userId: number) => void;
	token: string;
}

const emailRegex = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,}/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()\-+=^_]).{8,20}$/;

class RegisterComponent extends Component<intialProps, initialState> {
	constructor(props: intialProps) {
		super(props);
		this.state = {
			form: {
				email: "",
				password: "",
				verifyPwd: "",
				firstName: "",
				midInit: "",
				lastName: "",
				suffix: "",
				dept: "",
			},
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		// this.updateEmail = this.updateEmail.bind(this);
		// this.updatePassword = this.updatePassword.bind(this);
		// this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
	}

	onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (this.state.form.email && this.state.form.password && this.state.form.verifyPwd) {
			if (this.state.form.password === this.state.form.verifyPwd) {
				const APIURL = process.env.REACT_APP_API_URL;
				const endPoint = "/user/register";

				fetch(`${APIURL}${endPoint}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: this.state.form.email,
						password: this.state.form.password,
						firstName: this.state.form.firstName,
						midInit: this.state.form.midInit,
						lastName: this.state.form.lastName,
						suffix: this.state.form.suffix,
						dept: this.state.form.dept,
					}),
				})
					.then((res) => res.json())
					.then()
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
	}

	// async onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
	// 	event.preventDefault();

	// 	if (this.state.form.email && this.state.form.password && this.state.form.verifyPwd) {
	// 		if (this.state.form.password === this.state.form.verifyPwd) {
	// 			const APIURL = process.env.REACT_APP_API_URL;
	// 			const endPoint = "/user/register";
	// 			const response = await fetch(`${APIURL}${endPoint}`, {
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					email: this.state.form.email,
	// 					password: this.state.form.password,
	// 					firstName: this.state.form.firstName,
	// 					midInit: this.state.form.midInit,
	// 					lastName: this.state.form.lastName,
	// 					suffix: this.state.form.suffix,
	// 					dept: this.state.form.dept,
	// 				}),
	// 			});

	// 			let parsedResponse = await response.json();
	// 			let token = parsedResponse.token;
	// 			let roleId = parsedResponse.roleId;
	// 			this.props.authenticateUser(token, roleId);
	// 		} else {
	// 			alert("Password mismatch");
	// 		}
	// 	} else {
	// 		alert("Enter email AND password");
	// 	}
	// }

	// updateEmail(event: React.ChangeEvent<HTMLInputElement>): void {
	// 	this.setState({
	// 		email: event.target.value,
	// 	});
	// }

	// updatePassword(event: React.ChangeEvent<HTMLInputElement>): void {
	// 	this.setState({
	// 		password: event.target.value,
	// 	});
	// }

	// updatePasswordConfirm(event: React.ChangeEvent<HTMLInputElement>): void {
	// 	this.setState({
	// 		verifyPwd: event.target.value,
	// 	});
	// }

	onChange(name: string) {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			this.setState({
				form: { ...this.state.form, [name]: value },
			});
		};
	}

	render() {
		if (this.props.token) {
			return <Redirect to='/' />;
		} else {
			return (
				<Container className='authContainer' style={{ width: "50vw" }}>
					<Paper className='authForm' elevation={5}>
						<form onSubmit={this.onSubmit}>
							<Typography component='h2' variant='h4'>
								Register
							</Typography>
							<TextField
								id='registerFirstName'
								label='First Name'
								variant='standard'
								type='text'
								value={this.state.form.firstName}
								onChange={this.onChange("firstName")}
								margin='normal'
								error={!emailRegex.test(this.state.form.firstName) && this.state.form.firstName !== ""}
								helperText='Enter First Name'
								fullWidth={true}
							/>
							<TextField
								id='registerMidInit'
								label='Middle Initial'
								variant='standard'
								type='email'
								value={this.state.form.midInit}
								onChange={this.onChange("midInit")}
								margin='normal'
								error={!emailRegex.test(this.state.form.midInit) && this.state.form.midInit !== ""}
								helperText='Enter Middle Initial'
								fullWidth={true}
							/>
							<TextField
								id='registerLastName'
								label='Last Name'
								variant='standard'
								type='text'
								value={this.state.form.lastName}
								onChange={this.onChange("lastName")}
								margin='normal'
								error={!emailRegex.test(this.state.form.lastName) && this.state.form.lastName !== ""}
								helperText='Enter Last Name'
								fullWidth={true}
							/>

							<TextField
								id='registerSuffix'
								label='Suffix'
								variant='standard'
								type='text'
								value={this.state.form.suffix}
								onChange={this.onChange("suffix")}
								margin='normal'
								error={!emailRegex.test(this.state.form.suffix) && this.state.form.suffix !== ""}
								helperText='Enter Suffix'
								fullWidth={true}
							/>

							<TextField
								id='registerDept'
								label='Department'
								variant='standard'
								type='text'
								value={this.state.form.dept}
								onChange={this.onChange("dept")}
								margin='normal'
								error={!emailRegex.test(this.state.form.dept) && this.state.form.dept !== ""}
								helperText='Enter Department'
								fullWidth={true}
							/>

							<TextField
								id='registerEmail'
								label='Email'
								variant='standard'
								type='email'
								value={this.state.form.email}
								onChange={this.onChange("email")} // this.updateEmail
								margin='normal'
								error={!emailRegex.test(this.state.form.email) && this.state.form.email !== ""}
								helperText='Please enter a valid email address'
								fullWidth={true}
							/>

							<TextField
								id='registerPassword'
								label='Password'
								variant='standard'
								type='password'
								value={this.state.form.password}
								onChange={this.onChange("password")} // this.updatePassword
								margin='normal'
								error={!passwordRegex.test(this.state.form.password) && this.state.form.password !== ""}
								helperText='Password must include uppercase, lowercase, number, & special character'
								fullWidth={true}
							/>

							<TextField
								id='registerPasswordConfirm'
								label='Confirm password'
								variant='standard'
								type='password'
								value={this.state.form.verifyPwd}
								onChange={this.onChange("verifyPwd")} // this.updatePasswordConfirm
								margin='normal'
								error={this.state.form.password !== this.state.form.verifyPwd && this.state.form.verifyPwd !== ""}
								helperText='Passwords must match'
								fullWidth={true}
							/>

							<Button
								className='authButton'
								type='submit'
								disabled={!emailRegex.test(this.state.form.email) || this.state.form.password !== this.state.form.verifyPwd}>
								Register
							</Button>
						</form>
						<Typography component='p'>
							Already have an account?
							{/* <Login token={this.props.session.token} authenticateUser={this.props.authenticateUser}>
								Sign in here
							</Login> */}
							<Link to='/login'>Sign in here</Link>
						</Typography>
					</Paper>
				</Container>
			);
		}
	}
}

export default withRouter(RegisterComponent);
