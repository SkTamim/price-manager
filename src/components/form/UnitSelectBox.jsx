import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { PropTypes } from "prop-types";

import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";

import { database } from "../../firebase/FirebaseConfig";

function UnitSelectBox(props) {
	const { sx, labelId, name, value, onChange } = props;
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
	}, []);

	// ADD NEW UNIT VALUE TO DATABASE
	const [newUnit, setNewUnit] = useState("");
	const [newUnitError, setNewUnitError] = useState(false);
	function addNewUnit() {
		if (unitValues.includes(newUnit)) {
			setNewUnitError(true);
			return;
		}
		if (newUnit.length < 1) {
			setNewUnitError(true);
			return;
		}
		const withNewData = [...unitValues, newUnit];
		try {
			setDoc(doc(database, "companies", "sk-hardwares"), {
				["unit-selects"]: withNewData,
			});
			setNewUnit("");
			setUnitValues(withNewData);
		} catch (error) {
			console.log(error + "form add new unit");
			setNewUnitError(true);
		}
	}

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
					<TextField
						sx={{ width: "100%" }}
						placeholder='Enter Unit name'
						inputProps={{
							style: {
								padding: "6px 10px",
							},
						}}
						variant='outlined'
						value={newUnit}
						onChange={(e) => {
							setNewUnit(e.target.value);
							setNewUnitError(false);
						}}
						error={newUnitError}
						helperText={newUnitError && `New Unit not added, Please retry...`}
					/>
					<Button variant='outlined' onClick={addNewUnit}>
						Add
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
	value: PropTypes.any.isRequired,
	readOnly: PropTypes.bool,
	sx: PropTypes.object,
};

export default UnitSelectBox;
