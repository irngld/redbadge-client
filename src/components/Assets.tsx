import React from "react";

interface Asset {
	asset_tag: string;
	dev_type: string;
	form_factor: string;
	id: number;
	make: string;
	model: string;
	serial_number: string;
	series: string;
	createdAt: string;
	updatedAt: string;
}

interface InitialProps {}

interface InitialState {
	loading: boolean;
	error: string;
	assets: Asset[];
}

class Assets extends React.Component<InitialProps, InitialState> {
	constructor(props: InitialProps) {
		super(props);
		this.state = {
			loading: false,
			error: "",
			assets: [],
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		const APIURL = process.env.REACT_APP_API_URL;

		const endPoint = "/asset/";

		fetch(`${APIURL}${endPoint}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "",
			}),
		})
			.then((res) => res.json())
			.then((assets) => {
				this.setState({ assets });
			})
			.catch((err) => {
				this.setState({ error: err.message });
			})
			.finally(() => {
				// gets called, regardless of success or failure
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

		if (this.state.assets.length == 0) {
			return <div>No Assets!</div>;
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
						{this.state.assets.map((row, i) => {
							return (
								<tr>
									<td>{row.asset_tag}</td>
									<td>{row.model}</td>
									<td>{row.make}</td>
									<td>{row.series}</td>
									<td>{row.dev_type}</td>
									<td>{row.serial_number}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Assets;
