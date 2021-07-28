import React from "react";
// import { Session } from "../App"; // added 7/26, testing

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

type Form = Omit<Asset, "createdAt" | "updatedAt">;
interface InitialState {
	loading: boolean;
	error: string;
	assets: Asset[];
	form: Form;
	action: "Create" | "Update";
}

class Assets extends React.Component<InitialProps, InitialState> {
	constructor(props: InitialProps) {
		super(props);
		this.state = {
			loading: false,
			error: "",
			assets: [],
			form: {
				id: 0,
				asset_tag: "",
				dev_type: "",
				form_factor: "",
				make: "",
				model: "",
				serial_number: "",
				series: "",
			},
			action: "Create",
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
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3MzUwNjc4LCJleHAiOjE2Mjc0MzcwNzh9.Ed-iLAfKGhsbbrDuKsoEUchitpu0XyuVmIq4duiD27E",
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

	onUpdateLocal(asset: Asset) {
		this.setState((currentState) => {
			return { ...currentState, form: asset, action: "Update" };
		});
	}

	updateAsset(form: Form) {
		console.log("clicked: update", form.id);
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = `/asset/${form.id}`;

		fetch(`${APIURL}${endPoint}`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3NDMwMzE2LCJleHAiOjE2Mjc1MTY3MTZ9.iXhVLfxworUDxNagYYwtu_pO608yLMAji46cIylY_q4",
			}),
			body: JSON.stringify({
				serial_number: form.serial_number,
				make: form.make,
				series: form.series,
				model: form.model,
				dev_type: form.dev_type,
				form_factor: form.form_factor,
			}),
		})
			.then((res) => res.json())
			.then((asset) => console.log(asset))
			.catch((err) => {
				console.log(err);
			})
			.finally();
	}

	onDelete(form: Form) {
		if (window.confirm("Are you sure you want to delete?")) {
			console.log("clicked: update", form.id);
			const APIURL = process.env.REACT_APP_API_URL;
			const endPoint = `/asset/${form.id}`;

			fetch(`${APIURL}${endPoint}`, {
				method: "DELETE",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3NDMwMzE2LCJleHAiOjE2Mjc1MTY3MTZ9.iXhVLfxworUDxNagYYwtu_pO608yLMAji46cIylY_q4",
				}),
			})
				.then((res) => res.json())
				.then((asset) => console.log(asset))
				.catch((err) => {
					console.log(err);
				})
				.finally();
		} else {
		}
	}

	onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (this.state.action === "Create") this.createAsset(this.state.form);
		if (this.state.action === "Update") this.updateAsset(this.state.form);
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
					<input type='submit' value={this.state.action} />
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
								<tr key={asset.id}>
									<td>{asset.asset_tag}</td>
									<td>{asset.model}</td>
									<td>{asset.make}</td>
									<td>{asset.series}</td>
									<td>{asset.dev_type}</td>
									<td>{asset.serial_number}</td>
									<td>
										<button onClick={() => this.onUpdateLocal(asset)}>Update</button>
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
