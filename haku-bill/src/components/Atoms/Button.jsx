import React from "react";

const Button = (props) => {
	const defaultClasses =
		"inline-block uppercase py-2 mx-1 shadow bg-gray-100 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-base px-4 rounded";
	const combinedClasses = props.className ? `${props.className} ${defaultClasses}` : defaultClasses;

	return (
		<button {...props} className={combinedClasses}>
			{props.children}
		</button>
	);
};

export default Button;
