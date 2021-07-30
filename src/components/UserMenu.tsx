import React from "react";
import { Redirect, Link, RouteComponentProps, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Fade from "@material-ui/core/Fade";

interface InitialState {
	anchorEl: null | HTMLElement;
}

interface customProps extends RouteComponentProps {
	handleLogout: () => void;
}

class UserMenu extends React.Component<customProps, InitialState> {
	constructor(props: customProps) {
		super(props);
		this.state = {
			anchorEl: null,
		};
	}

	handleClick = (event: React.MouseEvent<HTMLElement>) => {
		this.setState({ anchorEl: event.currentTarget });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleOnLogout = () => {
		this.props.handleLogout();
		this.props.history.push("/");
	};

	render() {
		const open = Boolean(this.state.anchorEl);
		return (
			<div style={{ display: "flex", justifyContent: "flex-end", margin: "30px" }}>
				<Button
					id='fade-button'
					aria-controls='fade-menu'
					aria-haspopup='true'
					aria-expanded={open ? "true" : undefined}
					onClick={this.handleClick}
					style={{}}>
					<MenuIcon style={{ fontSize: "50px", color: "white" }} />
				</Button>
				<Menu
					id='fade-menu'
					MenuListProps={{
						"aria-labelledby": "fade-button",
					}}
					anchorEl={this.state.anchorEl}
					open={open}
					onClose={this.handleClose}
					TransitionComponent={Fade}>
					<MenuItem onClick={this.handleClose}>
						<Link style={{ textDecoration: "none" }} to='/assets'>
							Asset Management
						</Link>
					</MenuItem>
					<MenuItem onClick={this.handleClose}>
						<Link style={{ textDecoration: "none" }} to={`/assets/1/lifecycle`}>
							LifeCycle
						</Link>
					</MenuItem>
					<MenuItem onClick={this.handleOnLogout}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default withRouter(UserMenu);
