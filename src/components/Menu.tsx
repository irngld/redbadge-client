import React, { Component } from "react";
import { Session } from "../App";

// import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Button, Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import Login from "./Login";

interface initialProps {
	session: Session;
	authenticateUser: (token: string, userType: string) => void;
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

	// rand() {
	// 	return Math.round(Math.random() * 20) - 10;
	// }

	// getModalStyle() {
	// 	const top = 50 + this.rand();
	// 	const left = 50 + this.rand();

	// 	return {
	// 		top: `${top}%`,
	// 		left: `${left}%`,
	// 		transform: `translate(-${top}%, -${left}%)`,
	// 	};
	// }
	// modalStyle = this.getModalStyle();

	render() {
		return (
			<>
				{!this.props.session.token ? (
					<>
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
					</>
				) : null}
			</>
		);
	}
}

export default Menu;
