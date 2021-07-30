import React, { Component } from "react";
import { Session } from "../App";
import Login from "./Login";
import UserMenu from "./UserMenu";

// import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Button, Modal } from "@material-ui/core";
import { Link } from "react-router-dom";

interface initialProps {
	session: Session;
	authenticateUser: (token: string, roleId: number, userId: number) => void;
}

interface initialState {
	isModalOpen: boolean;
}

class Menu extends Component<initialProps, initialState> {
	constructor(props: initialProps) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
	}

	toggleModal = () => {
		const isModalOpen = this.state.isModalOpen;
		this.setState({
			isModalOpen: !isModalOpen,
		});
	};

	render() {
		return (
			<>
				{!this.props.session.token ? (
					<div>
						<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight: "20px" }}>
							<Button style={{ marginBottom: "10px", padding: "10px", fontSize: 30, color: "white" }} type='submit' onClick={this.toggleModal}>
								Login
							</Button>
						</div>
						<Modal
							style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
							open={this.state.isModalOpen}
							onClose={this.toggleModal}
							aria-labelledby='simple-modal-title'
							aria-describedby='simple-modal-description'>
							<Login token={this.props.session.token} authenticateUser={this.props.authenticateUser} />
						</Modal>
					</div>
				) : (
					<div>
						<UserMenu />
					</div>
				)}
			</>
		);
	}
}

export default Menu;
