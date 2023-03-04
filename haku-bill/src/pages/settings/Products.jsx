import axios from "./../../libs/axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

const Products = () => {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const response = await axios.get("/products");
		setProducts(response.data);
		console.log(response.data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<div className="flex">
				<div className="flex-none">
					<Sidebar />
				</div>
				<div className="flex-initial">
					{products.map((value) => (
						<p key={value.id}>{value.name}</p>
					))}
				</div>
			</div>
		</>
	);
};

export default Products;
