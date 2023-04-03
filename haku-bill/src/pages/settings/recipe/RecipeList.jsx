import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import AddMaterial from "./AddMaterial";
import MaterialList from "./MaterialList";

import {
	fetchProducts,
	fetchMaterials,
	updateMaterial,
	createMaterial,
	deleteMaterial,
} from "@/pages/settings/recipe/MaterialApi";

const RecipeList = () => {
	const [materials, setMaterials] = useState([]);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState("");

	const handleMaterialCreate = async (newMaterial) => {
		const createdMaterial = await createMaterial(product.id, newMaterial);
		setMaterials([...materials, createdMaterial]);
	};

	const handleMaterialUpdate = async (updatedMaterial) => {
		const newMaterial = await updateMaterial(product.id, updatedMaterial);
		setMaterials(materials.map((material) => (material.id === newMaterial.id ? newMaterial : material)));
	};

	const handleMaterialDelete = async (materialId) => {
		console.log("test");
		await deleteMaterial(product.id, materialId);
		setMaterials(materials.filter((material) => material.id !== materialId));
	};

	useEffect(() => {
		const fetchData = async () => {
			const productsData = await fetchProducts();
			const materialsData = await fetchMaterials(productsData[0].id);
			console.log(materialsData);
			setProduct(productsData[0]);
			setProducts(productsData);
			setMaterials(materialsData);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const materialsData = await fetchMaterials(product.id);
			setMaterials(materialsData);
		};
		fetchData();
	}, [product]);

	return (
		<>
			<Header />

			<div className="flex flex-row">
				<div className="flex-none">
					<SettingSidebar />
				</div>
				<div className="flex-initial w-full ">
					<div className="flex">
						<div className="flex-none  border-1">
							<ul className="mt-3 p-3 space-y-2 h-screen overflow-y-auto">
								{products.map((product) => (
									<li
										key={product.id}
										className="mb-2 w-[200px]"
										onClick={() => {
											setProduct(product);
										}}>
										<div className="bg-white py-1 px-3 rounded shadow border-1 cursor-pointer text-xs">
											<p className="font-bold">{product.name}</p>
											<p>重量:{product.weight}g</p>
											<p>原価:{product.total_cost}円</p>
											<p>原価/1g:{product.cost_per_gram}円</p>
											<p>単位:{product.unit}</p>
											<p>販売価格:{product.price}円</p>
										</div>
									</li>
								))}
							</ul>
						</div>
						<div>
							<div className="m-4">
								<MaterialList
									product={product}
									materials={materials}
									onMaterialUpdate={handleMaterialUpdate}
									onMaterialDelete={handleMaterialDelete}
								/>
								<AddMaterial onMaterialCreate={handleMaterialCreate} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecipeList;
