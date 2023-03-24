import React from "react";

const ConfirmDeleteModal = (props) => {
	if (!props.isOpen) {
		return null;
	}
	return (
		<div className="fixed inset-0 z-10 overflow-y-auto">
			<div className="fixed inset-0 bg-black opacity-30" onClick={props.onClose}></div>
			<div className="flex items-center justify-center min-h-screen px-4 text-left">
				<div className="inline-block bg-white shadow rounded p-6 z-20">
					<h2 className="text-xl font-bold">削除確認</h2>
					<p className="mt-2">本当に削除しますか？</p>
					<div className="mt-4">
						<button
							className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
							onClick={props.onDelete}>
							削除
						</button>
						<button
							className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
							onClick={props.onClose}>
							キャンセル
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDeleteModal;
