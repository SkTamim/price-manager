import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/images/logo light.svg";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

export default function SearchBar() {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
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
			<Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
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
