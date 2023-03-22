import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const LinkButton = (props) => {
	const [active, setActive] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setActive(location.pathname.includes(props.to));
	}, [location, props.to]);

	return (
		<Link
			className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200  hover:text-gray-700 rounded-md ${
				active && "bg-gray-100"
			}`}
			to={props.to}>
			{props.svg}
			<span className="mx-4 font-medium">{props.text}</span>
		</Link>
	);
};

export default LinkButton;
