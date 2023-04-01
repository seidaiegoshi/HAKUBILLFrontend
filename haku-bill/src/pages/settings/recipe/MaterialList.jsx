import React from "react";
import Material from "./Material";

const MaterialList = ({ materials, onMaterialUpdate, onMaterialDelete }) => {
	return (
		<div>
			{materials.map((material) => (
				<Material
					key={material.id}
					material={material}
					onMaterialUpdate={onMaterialUpdate}
					onMaterialDelete={onMaterialDelete}
				/>
			))}
		</div>
	);
};

export default MaterialList;
