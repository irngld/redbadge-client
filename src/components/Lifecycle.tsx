import React from "react";
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
	// roleID: number; // duplication on table
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
	token: string;
	classes?: any;
}

interface InitialState {
	loading: boolean;
	error: string;
	lifecycles: Lifecycles[];
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
		};
	}

	componentDidMount() {
		const APIURL = process.env.REACT_APP_API_URL;
		const endPoint = "/lifecycle/";

		fetch(`${APIURL}${endPoint}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.props.token,
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
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.lifecycles.map((cell, i) => {
								return (
									<TableRow key={cell.id}>
										<TableCell align='left'>{cell.assignedTo?.lastName + ", " + cell.assignedTo?.firstName}</TableCell>
										<TableCell align='left'>{cell.state}</TableCell>
										<TableCell align='left'>{new Date(cell.createdAt).toLocaleString()}</TableCell>
										<TableCell align='left'>{cell.asset.asset_tag}</TableCell>
										<TableCell align='left'>{cell.asset.make}</TableCell>
										<TableCell align='left'>{cell.asset.model}</TableCell>
										<TableCell align='left'>{cell.asset.series}</TableCell>
										<TableCell align='left'>{cell.asset.serial_number}</TableCell>
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
