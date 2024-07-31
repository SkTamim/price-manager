import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { PropTypes } from "prop-types";

import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from "@mui/material";

import { database } from "../../firebase/FirebaseConfig";

function UnitSelectBox(props) {
	const {
		sx,
		labelId,
		name,
		value,
		onChange,
		openAddUnitModal,
		addUnitSuccess,
	} = props;
	const [unitValues, setUnitValues] = useState([]);

	// GET UNIT VALUES FORM DATABASE
	async function getSelets() {
		const docRef = doc(database, "companies", "sk-hardwares");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUnitValues(docSnap.data()["unit-selects"]);
		} else {
			console.log("Menu Items not found , Error in getSelects");
		}
	}
	useEffect(() => {
		getSelets();
	}, [addUnitSuccess]);

	return (
		<FormControl sx={sx}>
			<InputLabel id={labelId}>Unit</InputLabel>
			<Select
				labelId={labelId}
				name={name}
				id={name}
				value={unitValues.length > 0 ? value : ""}
				label='Unit'
				onChange={onChange}
			>
				{unitValues.map((item) => (
					<MenuItem key={item} value={item}>
						/ {item}
					</MenuItem>
				))}
				<Stack
					sx={{
						flexDirection: "row",
						mt: 1,
						mx: 1,
						alignItems: "start",
					}}
				>
					<Button fullWidth variant='outlined' onClick={openAddUnitModal}>
						Add new Unit
					</Button>
				</Stack>
			</Select>
		</FormControl>
	);
}

UnitSelectBox.propTypes = {
	id: PropTypes.string,
	labelId: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.any,
	readOnly: PropTypes.bool,
	sx: PropTypes.object,
	openAddUnitModal: PropTypes.func,
	addUnitSuccess: PropTypes.bool,
};

export default UnitSelectBox;
