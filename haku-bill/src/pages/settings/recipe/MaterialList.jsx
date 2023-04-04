import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const MaterialList = ({ product, materials, onMaterialUpdate, onMaterialDelete }) => {
	const [editMode, setEditMode] = useState(false);
	const [updatedMaterial, setUpdatedMaterial] = useState(null);
	console.log(materials);

	const handleUpdate = () => {
		onMaterialUpdate(updatedMaterial);
		setEditMode(false);
	};

	const handleEditMode = () => {};

	const handleDelete = (id) => {
		onMaterialDelete(id);
	};
	return (
		<div>
			<h2>{product.name}のレシピ</h2>
			<div>
				{materials.map((material) => (
					<div key={material.material_id} className="flex items-center space-x-4">
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
								<Button
									onClick={() => {
										handleUpdate;
									}}>
									更新
								</Button>
								<Button onClick={() => setEditMode(false)} className="bg-red-500 text-white">
									キャンセル
								</Button>
							</>
						) : (
							<>
								<span className="font-semibold">{material.material.name}</span>
								<span className="text-gray-500">{material.quantity}</span>
								<span className="text-gray-500">{material.material.unit}</span>
								<span className="text-gray-500">{material.material.yield}</span>
								<Button onClick={() => setEditMode(true)}>編集</Button>
								<Button
									onClick={() => {
										handleDelete(material.id);
									}}
									className="bg-red-500 text-white">
									削除
								</Button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default MaterialList;
