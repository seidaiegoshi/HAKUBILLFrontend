import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const AddMaterial = ({ onMaterialCreate }) => {
	const [newMaterial, setNewMaterial] = useState({ name: "", quantity: 0 });

	const handleSubmit = (e) => {
		e.preventDefault();
		onMaterialCreate(newMaterial);
		setNewMaterial({ name: "", quantity: 0 });
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextInput
				type="text"
				placeholder="材料名"
				value={newMaterial.name}
				onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
				required
			/>
			<TextInput
				type="number"
				placeholder="使用量"
				value={newMaterial.quantity}
				onChange={(e) => setNewMaterial({ ...newMaterial, quantity: parseFloat(e.target.value) })}
				required
			/>
			<Button type="submit">材料を追加</Button>
		</form>
	);
};

export default AddMaterial;
