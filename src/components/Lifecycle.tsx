import React from "react";

interface InitialProps {}

interface InitialState {
	loading: boolean;
	error: string;
	lifecycle: Lifecycle[];
}

class Lifecycle extends React.Component<InitialProps, InitialState> {
	constructor(props: InitialProps) {
		super(props);
		this.state = {
			loading: false,
			error: "",
			lifecycle: [],
		};
	}

	componentDidMount() {
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/lifecycle/";

		fetch(`${APIURL}${endPoint}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "",
			}),
		})
			.then((res) => res.json())
			.then((lifecycle) => console.log(lifecycle))
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				// gets called regardless of success or failure
				this.setState({ loading: false });
			});
	}

	render() {
		if (this.state.loading) {
			return <div>loading . . .</div>;
		}

		if (this.state.error) {
			return <div>error: {this.state.error}</div>;
		}

		if (this.state.lifecycle.length == 0) {
			return <div>No Lifecycle(s)!</div>;
		}

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Asset Tag</th>
							<th>Model</th>
							<th>Make</th>
							<th>Series</th>
							<th>Device Type</th>
							<th>Serial No.</th>
						</tr>
					</thead>
					<tbody>
						{this.state.lifecycle.map((cell, i) => {
							return (
								<tr>
									<td>{cell}</td>
									<td>{cell}</td>
									<td>{cell}</td>
									<td>{cell}</td>
									<td>{cell}</td>
									<td>{cell}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Lifecycle;
