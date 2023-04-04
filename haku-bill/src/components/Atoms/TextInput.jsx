import React from "react";

const TextInput = (props) => {
	const defaultClasses =
		"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5";
	const combinedClasses = props.className ? `${props.className} ${defaultClasses}` : defaultClasses;

	return <input {...props} className={combinedClasses} />;
};

export default TextInput;
