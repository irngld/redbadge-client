import * as React from "react";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Fade from "@material-ui/core/Fade";

export default function UserMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleClose();
		localStorage.removeItem("sessionToken");
	};

	return (
		<div style={{ display: "flex", justifyContent: "flex-end", margin: "30px" }}>
			<Button
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				style={{}}>
				<MenuIcon style={{ fontSize: "50px", color: "white" }} />
			</Button>
			<Menu
				id='fade-menu'
				MenuListProps={{
					"aria-labelledby": "fade-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}>
				<MenuItem onClick={handleClose}>
					<Link style={{ textDecoration: "none" }} to='/assets'>
						Asset Management
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link style={{ textDecoration: "none" }} to={`/assets/1/lifecycle`}>
						LifeCycle
					</Link>
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<Link style={{ textDecoration: "none" }} to='/'>
						Logout
					</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}
