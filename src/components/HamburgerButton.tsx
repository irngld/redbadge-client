import React from "react";
// import { HamburgerMenu } from "react-hamburger-menu";

interface HamburgerBtnState {
	open: boolean;
}

class HamburgerButton extends React.Component<{}, HamburgerBtnState> {
	constructor(props: any) {
		super(props);
		this.state = {
			open: false,
		};
	}

	handleClick() {
		this.setState({
			open: !this.state.open,
		});
	}

	render() {
		return (
			<>
				{/* <div
				isOpen={this.state.open}
				menuClicked={this.handleClick.bind(this)}
				width={18}
				height={15}
				strokeWidth={1}
				rotate={0}
				color='white'
				borderRadius={0}
				animationDuration={0.5}
			/> */}
			</>
		);
	}
}
export default HamburgerButton;
