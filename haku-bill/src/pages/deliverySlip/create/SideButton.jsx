import React from "react";
import { Link } from "react-router-dom";
import { HiOutlinePrinter } from "react-icons/hi";
import { BsFileEarmarkPlus } from "react-icons/bs";

const SideButton = ({ postDeliverySlip, handlePrint, posted }) => {
	return (
		<nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg fixed bottom-1 -translate-y-2/4 right-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
			<Link
				to="/delivery-slip/new"
				onClick={postDeliverySlip}
				className={
					posted
						? "flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 hover:bg-gray-100 cursor-pointer text-gray-700"
						: "flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 hover:bg-gray-100 cursor-pointer  text-blue-700"
				}>
				<BsFileEarmarkPlus />
				<small className="text-center text-xs font-medium"> {posted ? "登録済" : "登録"} </small>
			</Link>

			<div
				onClick={handlePrint}
				className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 ">
				<HiOutlinePrinter />

				<small className="text-xs font-medium text-center">印刷</small>
			</div>
		</nav>
	);
};

export default SideButton;
