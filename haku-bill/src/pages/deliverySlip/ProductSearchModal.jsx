import React, { useEffect, useState } from "react";
import ListBox from "./ListBlock";
import axios from "./../../libs/axios.js";

const ProductSearchModal = (props) => {
	const [categories, setCategories] = useState([]);

	const [showProducts, setsShowProducts] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState();

	const handleClickCategory = (index) => {
		setsShowProducts(true);
		setSelectedCategory(index);
	};

	const closeModal = () => {
		props.setModal(false);
	};

	const handleClickProduct = (index) => {
		props.setProduct(props.rowIndex, {
			product_id: categories[selectedCategory].products[index].id,
			product_name: categories[selectedCategory].products[index].name,
			unit: categories[selectedCategory].products[index].unit,
			price: categories[selectedCategory].products[index].price,
			cost: categories[selectedCategory].products[index].cost,
		});
		closeModal();
	};

	const fetchProducts = () => {
		const requestUrl = "/product/groupByCategories";
		axios
			.get(requestUrl)
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (!props.showFlag) return <></>;
	return (
		<>
			<div
				id="overlay"
				className="fixed h-screen w-screen flex justify-center items-center top-0 left-0  bg-slate-900/50 z-50">
				<div id="modalContent" className="bg-white p-5 rounded-sm">
					<div className="flex justify-end w-full">
						<button
							onClick={closeModal}
							className=" uppercase m-2 shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
							閉じる
						</button>
					</div>
					<div className="p-5">
						<div className="container flex flex-col items-center justify-center w-full mx-auto">
							カテゴリ
							<div>
								<ul className="grid grid-cols-3 gap-4">
									{categories.map((category, index) => {
										return (
											<li
												key={category.id}
												onClick={() => {
													handleClickCategory(index);
												}}
												className="flex flex-row mb-2 border-gray-400">
												<ListBox>{category.name}</ListBox>
											</li>
										);
									})}
								</ul>
							</div>
							<div>
								<ul>
									{showProducts ? (
										<>
											<table className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
												<thead>
													<tr>
														<th>商品名</th>
														<th>単位</th>
													</tr>
												</thead>
												<tbody>
													{categories[selectedCategory].products.map((product, index) => {
														return (
															<tr key={product.id}>
																<td
																	onClick={() => {
																		handleClickProduct(index);
																	}}
																	className="w-full px-4 py-2 cursor-pointer border-b border-gray-200 rounded-t-lg ">
																	{product.name}
																</td>
																<td className="w-full px-4 py-2 cursor-pointer border-b border-gray-200 rounded-t-lg ">
																	{product.unit}
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</>
									) : (
										<></>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSearchModal;
