import * as React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
// import HamburgerButton from "./HamburgerButton";

export default function UserMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button id='fade-button' aria-controls='fade-menu' aria-haspopup='true' aria-expanded={open ? "true" : undefined} onClick={handleClick}>
				{/* <HamburgerButton /> */}
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
				<MenuItem onClick={handleClose}>Assets</MenuItem>
				<MenuItem onClick={handleClose}>LifeCycles</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
}

// import * as React from "react";
// import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@material-ui/core";

// export default function UserMenu() {
// 	const [open, setOpen] = React.useState(false);
// 	const anchorRef = React.useRef<HTMLButtonElement>(null);

// 	const handleToggle = () => {
// 		setOpen((prevOpen) => !prevOpen);
// 	};

// 	const handleClose = (event: Event | React.SyntheticEvent) => {
// 		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
// 			return;
// 		}

// 		setOpen(false);
// 	};

// 	function handleListKeyDown(event: React.KeyboardEvent) {
// 		if (event.key === "Tab") {
// 			event.preventDefault();
// 			setOpen(false);
// 		} else if (event.key === "Escape") {
// 			setOpen(false);
// 		}
// 	}

// 	// return focus to the button when we transitioned from !open -> open
// 	const prevOpen = React.useRef(open);
// 	React.useEffect(() => {
// 		if (prevOpen.current === true && open === false) {
// 			anchorRef.current!.focus();
// 		}

// 		prevOpen.current = open;
// 	}, [open]);

// 	return (
// 		<div>
// 			<Paper>
// 				<MenuList>
// 					<MenuItem>Assets</MenuItem>
// 					<MenuItem>LifeCycle</MenuItem>
// 					<MenuItem>Logout</MenuItem>
// 				</MenuList>
// 			</Paper>
// 			<div>
// 				<Button
// 					ref={anchorRef}
// 					id='composition-button'
// 					aria-controls={open ? "composition-menu" : undefined}
// 					aria-expanded={open ? "true" : undefined}
// 					aria-haspopup='true'
// 					onClick={handleToggle}>
// 					Dashboard
// 				</Button>
// 				<Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
// 					{({ TransitionProps, placement }) => (
// 						<Grow
// 							{...TransitionProps}
// 							style={{
// 								transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
// 							}}>
// 							<Paper>
// 								<ClickAwayListener onClickAway={(e) => handleClose}>
// 									<MenuList autoFocusItem={open} id='composition-menu' aria-labelledby='composition-button' onKeyDown={handleListKeyDown}>
// 										<MenuItem onClick={handleClose}>Assets</MenuItem>
// 										<MenuItem onClick={handleClose}>LifeCycle</MenuItem>
// 										<MenuItem onClick={handleClose}>Logout</MenuItem>
// 									</MenuList>
// 								</ClickAwayListener>
// 							</Paper>
// 						</Grow>
// 					)}
// 				</Popper>
// 			</div>
// 		</div>
// 	);
// }
