import React from "react";
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
	createStyles,
	makeStyles,
	WithStyles,
	IconButton,
} from "@material-ui/core";
import { Styles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ComputerIcon from "@material-ui/icons/Computer";

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

interface InitialProps {
	token: string;
	classes?: any;
}

type Form = Omit<Asset, "createdAt" | "updatedAt">;
interface InitialState {
	loading: boolean;
	error: string;
	assets: Asset[];
	form: Form;
	action: "Create" | "Update";
}

const styles: Styles<Theme, {}, string> = (theme: Theme) => ({
	table: {
		minWidth: 650,
	},
});

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
				Authorization: this.props.token,
			}),
		})
			.then((res) => res.json())
			.then((assets) => {
				// console.log(assets);
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
				Authorization: this.props.token,
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

	updateAsset(form: Form) {
		console.log("clicked: update", form.id);
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = `/asset/${form.id}`;

		fetch(`${APIURL}${endPoint}`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.token,
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

	onUpdateLocal(asset: Asset) {
		this.setState((currentState) => {
			return { ...currentState, form: asset, action: "Update" };
		});
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
					Authorization: this.props.token,
				}),
			})
				.then((res) => res.json())
				.then((asset) => console.log(asset))
				.catch((err) => {
					console.log(err);
				})
				.finally();
		} else {
			window.alert("Delete cancelled.");
		}
	}

	onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (this.state.action === "Create") this.createAsset(this.state.form);
		if (this.state.action === "Update") this.updateAsset(this.state.form);
	}

	// onChange(name: string) {
	// 	return (event: React.FormEvent<HTMLInputElement>) => {
	// 		const { value } = event.currentTarget;
	// 		this.setState({
	// 			form: { ...this.state.form, [name]: value },
	// 		});
	// 	};
	// }
	onChange(name: string) {
		return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			const { value } = event.currentTarget;
			this.setState({
				form: { ...this.state.form, [name]: value },
			});
		};
	}

	// PAGINATION CODE
	// emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	// // const [page, setPage] = React.useState(0);
	// // const [rowsPerPage, setRowsPerPage] = React.useState(10);
	// handleChangePage = (event, newPage) => {
	// 	setPage(newPage);
	// };

	// handleChangeRowsPerPage = (event) => {
	// 	setRowsPerPage(parseInt(event.target.value, 10));
	// 	setPage(0);
	// };

	render() {
		const { classes } = this.props;

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
			<Container className='centerDiv'>
				<form onSubmit={this.onSubmit}>
					<div style={{ display: "flex", justifySelf: "start" }}>
						<Grid container spacing={3} style={{ marginTop: 20 }}>
							<Grid item xs={4}>
								{/* <label htmlFor='serial_number'>Serial No.</label>
								<input
									type='text'
									id='serial_number'
									name='serial_number'
									value={this.state.form.serial_number}
									onChange={this.onChange("serial_number")}
								/> */}
								<TextField
									id='outlined-full-width'
									label='Serial Number'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.serial_number}
									onChange={this.onChange("serial_number")}
								/>
							</Grid>
							<Grid item xs={4}>
								{/* <label htmlFor='make'>Make:</label>
								<input type='text' id='make' name='make' value={this.state.form.make} onChange={this.onChange("make")} /> */}
								<TextField
									id='outlined-full-width'
									label='Make'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.make}
									onChange={this.onChange("make")}
								/>
							</Grid>
							<Grid item xs={4}>
								{/* <label htmlFor='model'>Model:</label>
								<input type='text' id='model' name='model' value={this.state.form.model} onChange={this.onChange("model")} /> */}
								<TextField
									id='outlined-full-width'
									label='Model'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.model}
									onChange={this.onChange("model")}
								/>
							</Grid>
							<Grid item xs={4}>
								{/* <label htmlFor='series'>Series:</label>
								<input type='text' id='series' name='series' value={this.state.form.series} onChange={this.onChange("series")} /> */}
								<TextField
									id='outlined-full-width'
									label='Series'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.series}
									onChange={this.onChange("series")}
								/>
							</Grid>
							<Grid item xs={4}>
								{/* <label htmlFor='dev_type'>Device Type:</label>
								<input type='text' id='dev_type' name='dev_type' value={this.state.form.dev_type} onChange={this.onChange("dev_type")} /> */}
								<TextField
									id='outlined-full-width'
									label='Device Type'
									style={{ margin: 4 }}
									placeholder='Desktop . . .'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.dev_type}
									onChange={this.onChange("dev_type")}
								/>
							</Grid>
							<Grid item xs={4}>
								{/* <label htmlFor='form_factor'>Form Factor:</label>
								<input type='text' id='form_factor' name='form_factor' value={this.state.form.form_factor} onChange={this.onChange("form_factor")} /> */}
								<TextField
									id='outlined-full-width'
									label='Form Factor'
									style={{ margin: 4 }}
									placeholder='Placeholder'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
									value={this.state.form.form_factor}
									onChange={this.onChange("form_factor")}
								/>
							</Grid>
						</Grid>
					</div>
					<input type='submit' value={this.state.action} />
				</form>
				<TableContainer component={Paper} style={{ marginTop: "50px" }}>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Asset Tag
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Model
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Make
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Series
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Device Type
								</TableCell>
								<TableCell align='left' style={{ fontWeight: "bold", fontSize: 15 }}>
									Serial No.
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.assets.map((asset, i) => {
								return (
									<TableRow key={asset.id}>
										<TableCell align='left'>{asset.asset_tag}</TableCell>

										<TableCell align='left'>{asset.model}</TableCell>
										<TableCell align='left'>{asset.make}</TableCell>
										<TableCell align='left'>{asset.series}</TableCell>
										<TableCell align='left'>{asset.dev_type}</TableCell>
										<TableCell align='left'>{asset.serial_number}</TableCell>
										<TableCell align='left'>
											<Button
												variant='contained'
												color='primary'
												size='small'
												startIcon={<ComputerIcon />}
												// className='btn-asset-edit'
												onClick={() => this.onUpdateLocal(asset)}>
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
												onClick={() => this.onDelete(asset)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{/* <TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/> */}
				</TableContainer>
			</Container>
		);
	}
}

export default withStyles(styles)(Assets);
