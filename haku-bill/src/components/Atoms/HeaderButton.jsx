import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const HeaderButton = (props) => {
	const [active, setActive] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const regexPattern = new RegExp(`^${props.path}(/|$)`, "i");
		setActive(regexPattern.test(location.pathname));
	}, [location, props.path]);

	return (
		<Link
			className={`flex items-center px-4 py-2 text-base hover:bg-gray-200  ${
				active ? "border-b-purple-600 border-b-2" : "pb-3"
			}`}
			to={props.to}>
			{props.svg}
			<span className="mx-4 font-medium">{props.children}</span>
		</Link>
	);
};

export default HeaderButton;
