import React from "react";
import { Link } from "react-router-dom";
import { HiOutlinePrinter } from "react-icons/hi";
import { BsFileEarmarkPlus } from "react-icons/bs";

const SideButton = (props) => {
	return (
		<nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg fixed top-2/4 -translate-y-2/4 right-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
			<Link
				to="/delivery-slip"
				onClick={props.register}
				className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 cursor-pointer">
				<BsFileEarmarkPlus />
				<small className="text-center text-xs font-medium"> 登録 </small>
			</Link>

			<Link
				to="/"
				className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 ">
				<HiOutlinePrinter />

				<small className="text-xs font-medium">印刷</small>
			</Link>
		</nav>
	);
};

export default SideButton;
