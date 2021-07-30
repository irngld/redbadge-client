import React from "react";
import { Session } from "../App";
import { Asset } from "./Assets";
import {
	Container,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Theme,
	Paper,
	withStyles,
	TablePagination,
} from "@material-ui/core";
import { Styles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ComputerIcon from "@material-ui/icons/Computer";

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
	roleId: number;
	createdAt: string;
	updatedAt: string;
}

interface Lifecycles {
	id: number;
	state: string;
	location: string;
	assetId: number;
	userId: number;
	roleId: number;
	assignedToId: number;
	assignedTo: Omit<User, "createdAt" | "updatedAt">;
	asset: Omit<Asset, "createdAt" | "updatedAt">;
	user: Omit<User, "createdAt" | "updatedAt">;
	role: Omit<Role, "createdAt" | "updatedAt">;
	createdAt: string;
	updatedAt: string;
}

interface InitialProps {
	session: Session;
	classes?: any;
}

type Form = Omit<Lifecycles, "createdAt" | "updatedAt">;
interface InitialState {
	loading: boolean;
	error: string;
	lifecycles: Lifecycles[];
	form: Form;
	action: "Create" | "Update";
}

const styles: Styles<Theme, {}, string> = (theme: Theme) => ({
	table: {
		minWidth: 650,
	},
});

class Lifecycle extends React.Component<InitialProps, InitialState> {
	constructor(props: InitialProps) {
		super(props);
		this.state = {
			loading: false,
			error: "",
			lifecycles: [],
			form: {
				id: 0,
				state: "",
				location: "",
				assetId: 0,
				userId: 0,
				roleId: 0,
				assignedToId: 0,
				assignedTo: {
					id: 0,
					email: "",
					password: "",
					firstName: "",
					midInit: "",
					lastName: "",
					suffix: "",
					title: "",
					dept: "",
					roleId: 0,
				},
				asset: {
					asset_tag: "",
					dev_type: "",
					form_factor: "",
					id: 0,
					make: "",
					model: "",
					serial_number: "",
					series: "",
				},
				user: {
					id: 0,
					email: "",
					password: "",
					firstName: "",
					midInit: "",
					lastName: "",
					suffix: "",
					title: "",
					dept: "",
					roleId: 0,
				},
				role: {
					id: 0,
					role: "",
					description: "",
				},
			},
			action: "Create",
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/lifecycle/";
		fetch(`${APIURL}${endPoint}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.session.token,
			}),
		})
			.then((res) => res.json())
			.then((lifecycles) => {
				console.log(lifecycles);
				this.setState({ lifecycles });
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				// gets called regardless of success or failure
				this.setState({ loading: false });
			});
	};

	createLifecycle(form: Omit<Lifecycles, "id" | "createdAt" | "updatedAt">) {
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/lifecycle/";

		fetch(`${APIURL}${endPoint}`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.session.token,
			}),
			body: JSON.stringify({
				state: form.state,
				location: form.location,
				assetId: form.assetId,
				userId: this.props.session.userId,
				roleId: this.props.session.roleId,
				assignedToId: form.assignedToId,
			}),
		})
			.then((res) => res.json())
			.then(() => this.getData())
			.catch((err) => {
				console.log(err);
			})
			.finally();
	}

	updateLifecycle(form: Form) {
		console.log("clicked: update", form.id);
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = `/lifecycle/${form.id}`;

		fetch(`${APIURL}${endPoint}`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.session.token,
			}),
			body: JSON.stringify({
				state: form.state,
				location: form.location,
				assetId: form.assetId,
				userId: this.props.session.userId,
				roleId: this.props.session.roleId,
				assignedToId: form.assignedToId,
			}),
		})
			.then((res) => res.json())
			.then((asset) => console.log(asset))
			.then(() => this.getData())
			.catch((err) => {
				console.log(err);
			})
			.finally();
	}

	onDelete(form: Form) {
		if (window.confirm("Are you sure you want to delete?")) {
			console.log("clicked: update", form.id);
			const APIURL = process.env.REACT_APP_API_URL;
			const endPoint = `/lifecycle/${form.id}`;

			fetch(`${APIURL}${endPoint}`, {
				method: "DELETE",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: this.props.session.token,
				}),
			})
				.then((res) => res.json())
				.then((asset) => console.log(asset))
				.then(() => this.getData())
				.catch((err) => {
					console.log(err);
				})
				.finally();
		} else {
			window.alert("Delete cancelled.");
		}
	}

	onUpdateLocal(lifecycle: Lifecycles) {
		this.setState((currentState) => {
			return { ...currentState, form: lifecycle, action: "Update" };
		});
	}

	onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (this.state.action === "Create") this.createLifecycle(this.state.form);
		if (this.state.action === "Update") this.updateLifecycle(this.state.form);
	}

	onChange(name: string) {
		return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			const { value } = event.currentTarget;
			this.setState({
				form: { ...this.state.form, [name]: value },
			});
		};
	}

	render() {
		const { classes } = this.props;
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
			<Container className='centerDiv'>
				<form onSubmit={this.onSubmit}>
					<div style={{ display: "flex", justifySelf: "start" }}>
						<Grid container spacing={2} style={{ marginTop: 20 }}>
							<Grid item xs={3}>
								<TextField
									id='outlined-basic'
									label='State'
									style={{ margin: 4 }}
									placeholder='State'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.state}
									onChange={this.onChange("state")}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									id='outlined-full-width'
									label='Asset Location'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.location}
									onChange={this.onChange("location")}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									id='outlined-full-width'
									label='Asset ID'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.assetId}
									onChange={this.onChange("assetId")}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									id='outlined-full-width'
									label='Assigned To'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.assignedToId}
									onChange={this.onChange("assignedToId")}
								/>
							</Grid>
						</Grid>
					</div>
					<input type='submit' value={this.state.action} />
				</form>
				<TableContainer>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Name
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									State
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Date
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Asset Tag
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Make
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Model
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									series
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Serial No.
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Location
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.lifecycles.map((lifecycle, i) => {
								return (
									<TableRow key={lifecycle.id}>
										<TableCell align='left'>{lifecycle.assignedTo?.lastName + ", " + lifecycle.assignedTo?.firstName}</TableCell>
										<TableCell align='left'>{lifecycle.state}</TableCell>
										<TableCell align='left'>{new Date(lifecycle.createdAt).toLocaleString()}</TableCell>
										<TableCell align='left'>{lifecycle.asset.asset_tag}</TableCell>
										<TableCell align='left'>{lifecycle.asset.make}</TableCell>
										<TableCell align='left'>{lifecycle.asset.model}</TableCell>
										<TableCell align='left'>{lifecycle.asset.series}</TableCell>
										<TableCell align='left'>{lifecycle.asset.serial_number}</TableCell>
										<TableCell align='left'>{lifecycle.location}</TableCell>
										<TableCell align='left'>
											<Button
												variant='contained'
												color='primary'
												size='small'
												startIcon={<ComputerIcon />}
												// className='btn-asset-edit'
												onClick={() => this.onUpdateLocal(lifecycle)}>
												Edit
											</Button>
										</TableCell>
										<TableCell align='left'>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												startIcon={<DeleteIcon />}
												// className='btn-asset-del'
												onClick={() => this.onDelete(lifecycle)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		);
	}
}

export default withStyles(styles)(Lifecycle);
