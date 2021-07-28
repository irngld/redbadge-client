import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Session } from "../utilities/Authorization";
// import { Session } from "../App";

interface InitialState {
	email: string;
	password: string;
}

interface initialProps extends RouteComponentProps {
	setSession(session: Session): any; // void, not returning anything back
}
class Login extends React.Component<initialProps, InitialState> {
	constructor(props: initialProps) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e: any) {
		e.preventDefault();
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/user/login";
		fetch(`${APIURL}${endPoint}`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
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
				<input type='submit' value='Submit' />
			</form>
		);
	}
}

export default withRouter(Login);
