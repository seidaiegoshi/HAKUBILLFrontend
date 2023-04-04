import React from "react";

const ListBlock = (props) => {
	return (
		<>
			<div className="shadow border select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4">
				<div className="flex-1 pl-1 md:mr-16">
					<div className="font-medium ">{props.children}</div>
				</div>
			</div>
		</>
	);
};

export default ListBlock;
