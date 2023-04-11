import React from "react";

const Button = (props) => {
	const defaultClasses =
		"bg-gray-100 inline-block uppercase py-2 mx-1 shadow focus:shadow-outline focus:outline-none text-base px-4 rounded  hover:bg-gray-200";
	const primalClasses =
		"inline-block uppercase py-2 mx-1 shadow focus:shadow-outline focus:outline-none px-4 rounded bg-blue-500  hover:bg-blue-600 text-white";
	const selectedClasses = props.primal ? primalClasses : defaultClasses;
	const combinedClasses = props.className ? `${props.className} ${selectedClasses}` : selectedClasses;

	return (
		<button {...props} className={combinedClasses}>
			{props.children}
		</button>
	);
};

export default Button;
