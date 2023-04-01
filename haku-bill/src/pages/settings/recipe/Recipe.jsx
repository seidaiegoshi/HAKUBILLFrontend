import MaterialList from "./MaterialList";

const Recipe = ({ product, materials, onMaterialUpdate, onMaterialDelete }) => {
	return (
		<div>
			<h2>{product.name}のレシピ</h2>
			<MaterialList
				materials={materials}
				onMaterialUpdate={onMaterialUpdate}
				onMaterialDelete={onMaterialDelete}
			/>
		</div>
	);
};

export default Recipe;
