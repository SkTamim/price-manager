import PropTypes from "prop-types";

import { TextField } from "@mui/material";

function InputField(props) {
	return (
		<TextField
			id={props.id}
			label={props.label}
			name={props.name}
			onChange={props.onChange}
			value={props.value}
			error={props.error}
			helperText={props.error && `Please enter a proper ${props.name}`}
			sx={{ ...props.sx, width: "100%" }}
			type={props.type ? props.type : "text"}
			variant='outlined'
			readOnly={props.readOnly}
		/>
	);
}
InputField.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.any,
	error: PropTypes.bool,
	type: PropTypes.string,
	readOnly: PropTypes.bool,
	sx: PropTypes.object,
};

export default InputField;
