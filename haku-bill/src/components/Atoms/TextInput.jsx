import React from "react";

const TextInput = (props) => {
	return (
		<input
			{...props}
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
		/>
	);
};

export default TextInput;
