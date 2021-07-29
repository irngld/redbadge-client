import React from "react";
import { Asset } from "./Assets";

interface Role {
	id: number;
	role: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

interface User {
	id: number;
	email: string;
	password: string;
	firstName: string;
	midInit: string;
	lastName: string;
	suffix: string;
	title: string;
	dept: string;
	roleID: number; // duplication on table
	createdAt: string;
	updatedAt: string;
	roleId: number; // duplication on table
}

interface Lifecycles {
	id: number;
	state: string;
	location: string;
	createdAt: string;
	updatedAt: string;
	assetId: number;
	userId: number;
	roleId: number;
	assignedToId: number;
	assignedTo: User;
	asset: Asset;
	user: User;
	role: Role;
}

interface InitialProps {
	token: string | null;
}

interface InitialState {
	loading: boolean;
	error: string;
	lifecycles: Lifecycles[];
}

class Lifecycle extends React.Component<InitialProps, InitialState> {
	constructor(props: InitialProps) {
		super(props);
		this.state = {
			loading: false,
			error: "",
			lifecycles: [],
		};
	}

	componentDidMount() {
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/lifecycle/";

		fetch(`${APIURL}${endPoint}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "$2a$13$PqJENFqI.a8HzD26ZW1mceJaVxQEIie5Ix3lXsWoWA493PeI2jB6u",
			}),
		})
			.then((res) => res.json())
			.then((lifecycles) => {
				// console.log(lifecycles);
				this.setState({ lifecycles });
			})
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

		if (this.state.lifecycles.length === 0) {
			return <div>No Lifecycle(s)!</div>;
		}

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>State</th>
							<th>Asset Tag</th>
							<th>Make</th>
							<th>Model</th>
							<th>series</th>
							<th>Serial No.</th>
						</tr>
					</thead>
					<tbody>
						{this.state.lifecycles.map((cell, i) => {
							return (
								<tr>
									<td>{cell.assignedTo.lastName + ", " + cell.assignedTo.firstName}</td>
									<td>{cell.state}</td>
									<td>{cell.asset.asset_tag}</td>
									<td>{cell.asset.make}</td>
									<td>{cell.asset.model}</td>
									<td>{cell.asset.series}</td>
									<td>{cell.asset.serial_number}</td>
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
