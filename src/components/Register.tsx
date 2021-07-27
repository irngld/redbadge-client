import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Session } from "../App";

interface InitialState {
	email: string;
	password: string;
	firstName: string;
	midInit: string;
	lastName: string;
	suffix: string;
	dept: string;
	roleID: string;
}

interface initialProps extends RouteComponentProps {
	setSession(session: Session): any; //void, not returning anything back
}
class Register extends React.Component<initialProps, InitialState> {
	constructor(props: initialProps) {
		super(props);
		this.state = {
			email: "",
			password: "",
			firstName: "",
			midInit: "",
			lastName: "",
			suffix: "",
			dept: "",
			roleID: "",
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e: any) {
		e.preventDefault();
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/user/register";
		fetch(`${APIURL}${endPoint}`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				midInit: this.state.midInit,
				lastName: this.state.lastName,
				suffix: this.state.suffix,
				dept: this.state.dept,
				// roleID: this.state.roleID, // Role should be assigned as user level. Only admins can promote roles
			}), // body: JSON.stringify(),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const session: Session = { token: data.token };
				this.props.setSession(session);
				this.props.history.push("/asset"); // can also have it identify role and push to necessary endpoint
			})
			.catch((err) => {
				console.log(err);
			})
			.finally();
	}

	// onChange(name: string) {
	// 	return (event: React.FormEvent<HTMLInputElement>) => {
	// 		const { value } = event.currentTarget;
	// 		this.setState({ [name]: value });
	// 	};
	// }

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<h3>Log in</h3>

				<div className='form-group'>
					<label>Email</label>
					<input
						type='email'
						className='form-control'
						placeholder='Enter email'
						value={this.state.email}
						onChange={(e) => this.setState({ email: e.target.value })}
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						className='form-control'
						placeholder='Enter password'
						value={this.state.password}
						onChange={(e) => this.setState({ password: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label>First Name</label>
					<input
						type='text'
						className='form-control'
						placeholder='Enter First Name'
						value={this.state.firstName}
						onChange={(e) => this.setState({ firstName: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label>Middle Initial</label>
					<input
						type='text'
						className='form-control'
						placeholder='Enter Middle Initial'
						value={this.state.midInit}
						onChange={(e) => this.setState({ midInit: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label>Last Name</label>
					<input
						type='text'
						className='form-control'
						placeholder='Enter Last Name'
						value={this.state.lastName}
						onChange={(e) => this.setState({ lastName: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label>Suffix</label>
					<input
						type='text'
						className='form-control'
						placeholder='Enter Suffix'
						value={this.state.suffix}
						onChange={(e) => this.setState({ suffix: e.target.value })}
					/>
				</div>
				{/* roleId must be automatically assigned as user level */}
				<input type='submit' value='Submit' />
			</form>
		);
	}
}

export default withRouter(Register);

// ORIGINAL CODE
// import React from "react";

// class Register extends React.Component<{}, {}> {
// 	render() {
// 		return <div>Register</div>;
// 	}
// }

// export default Register;
