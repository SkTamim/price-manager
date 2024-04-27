import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from "@mui/material";

import logo from "../assets/images/logo light.svg";

export default function SearchBar() {
	const [openMobileMenu, setOpenMobileMenu] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpenMobileMenu(newOpen);
	};
	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: "#34495E",
				py: {
					xs: 1,
					sm: 0,
				},
			}}
		>
			{/* DESKTOP MENU */}
			<Toolbar
				sx={{
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Link to='/'>
					<img src={logo} alt='Logo' className='menu_logo' />
				</Link>
				<Box
					sx={{
						display: {
							xs: "none",
							sm: "block",
						},
					}}
				>
					<Button
						color='inherit'
						component={NavLink}
						to='/'
						className='nav-link'
					>
						Home
					</Button>
					<Button
						color='inherit'
						component={NavLink}
						to='/products'
						className='nav-link'
					>
						Products
					</Button>
					<Button
						color='inherit'
						component={NavLink}
						to='/add-product'
						className='nav-link'
					>
						Add Product
					</Button>
				</Box>
				<IconButton
					size='large'
					color='inherit'
					sx={{
						display: {
							sx: "block",
							sm: "none",
						},
					}}
					onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>

			{/* MOBILE DRAWER MENU  */}
			<Drawer
				open={openMobileMenu}
				onClose={toggleDrawer(false)}
				anchor='right'
			>
				<Box
					sx={{ width: 200 }}
					role='presentation'
					onClick={toggleDrawer(false)}
				>
					<List>
						<ListItem disablePadding>
							<ListItemButton component={NavLink} to='/' className='nav-link'>
								<ListItemText primary='Home' />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								component={NavLink}
								to='products'
								className='nav-link'
							>
								<ListItemText primary='Products' />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								component={NavLink}
								to='add-product'
								className='nav-link'
							>
								<ListItemText primary='Add Products' />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</AppBar>
	);
}
