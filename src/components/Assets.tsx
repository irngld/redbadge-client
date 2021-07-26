import React from "react";

export interface Asset {
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
	form: Omit<Asset, "id" | "createdAt" | "updatedAt">;
}

class Assets extends React.Component<InitialProps, InitialState> {
	constructor(props: InitialProps) {
		super(props);
		this.state = {
			loading: false,
			error: "",
			assets: [],
			form: {
				asset_tag: "",
				dev_type: "",
				form_factor: "",
				make: "",
				model: "",
				serial_number: "",
				series: "",
			},
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: true });
		const APIURL = process.env.REACT_APP_API_URL;

		const endPoint = "/asset/";

		fetch(`${APIURL}${endPoint}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3MjU4NDY1LCJleHAiOjE2MjczNDQ4NjV9.xcUmG0dox-j2kNDLhWqvoxMd83z6VzOkcf4njw3Jyqk",
			}),
		})
			.then((res) => res.json())
			.then((assets) => {
				console.log(assets);
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

	createAsset(form: Omit<Asset, "id" | "createdAt" | "updatedAt">) {
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/asset/";
		fetch(`${APIURL}${endPoint}`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3MjU5NTcxLCJleHAiOjE2MjczNDU5NzF9.SuGp2LrbK4FMN-9c3ZVyuZNBqIHikb5e4AFTyg5gdqg",
			}),
			body: JSON.stringify({
				serial_number: form.serial_number,
				make: form.make,
				series: form.series,
				model: form.model,
				dev_type: form.dev_type,
				form_factor: form.form_factor,
			}), //JSON.stringify(),
		})
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			})
			.finally();
	}

	onUpdate(asset: Asset) {
		console.log("clicked: update", asset.id);
	}

	onDelete(asset: Asset) {
		console.log("clicked: update", asset.id);
	}

	onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log(this.state.form);
		this.createAsset(this.state.form);
	}

	onChange(name: string) {
		return (event: React.FormEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			this.setState({
				form: { ...this.state.form, [name]: value },
			});
		};
	}

	render() {
		if (this.state.loading) {
			return <div>loading . . .</div>;
		}

		if (this.state.error) {
			return <div>error: {this.state.error}</div>;
		}

		if (this.state.assets.length === 0) {
			return <div>No Assets!</div>;
		}

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<label htmlFor='serial_number'>Serial No.</label>
					<br />
					<input
						type='text'
						id='serial_number'
						name='serial_number'
						value={this.state.form.serial_number}
						onChange={this.onChange("serial_number")}
					/>
					<br />
					<label htmlFor='make'>Make:</label>
					<br />
					<input type='text' id='make' name='make' value={this.state.form.make} onChange={this.onChange("make")} />
					<br />
					<label htmlFor='model'>Model:</label>
					<br />
					<input type='text' id='model' name='model' value={this.state.form.model} onChange={this.onChange("model")} />
					<br />
					<label htmlFor='series'>Series:</label>
					<br />
					<input type='text' id='series' name='series' value={this.state.form.series} onChange={this.onChange("series")} />
					<br />
					<label htmlFor='dev_type'>Device Type:</label>
					<br />
					<input type='text' id='dev_type' name='dev_type' value={this.state.form.dev_type} onChange={this.onChange("dev_type")} />
					<br />
					<label htmlFor='form_factor'>Form Factor:</label>
					<br />
					<input type='text' id='form_factor' name='form_factor' value={this.state.form.form_factor} onChange={this.onChange("form_factor")} />
					<br />
					<br />
					<input type='submit' value='Submit' />
				</form>
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
						{this.state.assets.map((asset, i) => {
							return (
								<tr>
									<td>{asset.asset_tag}</td>
									<td>{asset.model}</td>
									<td>{asset.make}</td>
									<td>{asset.series}</td>
									<td>{asset.dev_type}</td>
									<td>{asset.serial_number}</td>
									<td>
										<button onClick={() => this.onUpdate(asset)}>Update</button>
									</td>
									<td>
										<button onClick={() => this.onDelete(asset)}>Delete</button>
									</td>
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
