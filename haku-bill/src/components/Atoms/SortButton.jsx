import React from "react";

const SortButton = (props) => {
	const defaultClasses =
		"inline-block uppercase shadow bg-blue-100 hover:bg-blue-200 focus:shadow-outline focus:outline-none text-base px-4 rounded";
	const combinedClasses = props.className ? `${props.className} ${defaultClasses}` : defaultClasses;

	return (
		<button {...props} className={combinedClasses}>
			{props.children}
		</button>
	);
};

export default SortButton;
