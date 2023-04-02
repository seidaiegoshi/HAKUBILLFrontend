import React from "react";
import Button from "@/components/Atoms/Button";

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
						<Button className="bg-red-500 hover:bg-red-600 text-white" onClick={props.onDelete}>
							削除
						</Button>
						<Button onClick={props.onClose}>キャンセル</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDeleteModal;
