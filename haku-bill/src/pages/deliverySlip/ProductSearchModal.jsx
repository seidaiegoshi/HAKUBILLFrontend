import React from "react";

const ProductSearchModal = (props) => {
	const closeModal = () => {
		props.setModal(false);
	};

	if (!props.showFlag) return <></>;
	return (
		<>
			<div
				id="overlay"
				className="fixed h-screen w-screen flex justify-center items-center top-0 left-0  bg-slate-900/50">
				<div id="modalContent" className="bg-white p-10 rounded-sm">
					<button
						onClick={closeModal}
						className="justify-between block uppercase mx-auto mt-3 shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
						閉じる
					</button>
				</div>
			</div>
		</>
	);
};

const modalContent = {
	background: "white",
	padding: "10px",
	borderRadius: "3px",
};

const overlay = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0,0,0,0.5)",

	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export default ProductSearchModal;
