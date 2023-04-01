import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";

const Material = ({ material, onMaterialUpdate, onMaterialDelete }) => {
	const [editMode, setEditMode] = useState(false);
	const [updatedMaterial, setUpdatedMaterial] = useState(material);

	const handleUpdate = () => {
		onMaterialUpdate(updatedMaterial);
		setEditMode(false);
	};

	const handleDelete = () => {
		onMaterialDelete(material.id);
	};

	return (
		<div className="flex items-center space-x-4">
			{editMode ? (
				<>
					<TextInput
						type="text"
						value={updatedMaterial.name}
						onChange={(e) => setUpdatedMaterial({ ...updatedMaterial, name: e.target.value })}
					/>
					<TextInput
						type="number"
						value={updatedMaterial.quantity}
						onChange={(e) =>
							setUpdatedMaterial({
								...updatedMaterial,
								quantity: parseFloat(e.target.value),
							})
						}
					/>
					<button onClick={handleUpdate} className="bg-blue-500 text-white rounded p-2">
						更新
					</button>
					<button onClick={() => setEditMode(false)} className="bg-red-500 text-white rounded p-2">
						キャンセル
					</button>
				</>
			) : (
				<>
					<span className="font-semibold">{material.material.name}</span>
					<span className="text-gray-500">{material.quantity}</span>
					<span className="text-gray-500">{material.material.unit}</span>
					<span className="text-gray-500">{material.material.yield}</span>
					<button onClick={() => setEditMode(true)} className="bg-gray-200 rounded p-2">
						編集
					</button>
					<button onClick={handleDelete} className="bg-red-500 text-white rounded p-2">
						削除
					</button>
				</>
			)}
		</div>
	);
};

export default Material;
