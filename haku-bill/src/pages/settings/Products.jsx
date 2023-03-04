import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";

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
		<div>
			<p>Products Page</p>
			{/* {products.map((product) => (
				<p key={product.id}>{product.body}</p>
			))} */}
		</div>
	);
};

export default Products;
