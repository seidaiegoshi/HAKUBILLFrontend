import React from "react";
import Header from "../../components/Header";

const Analysis = () => {
	const [products, setProducts] = useState([]);

	const fetchProducts = () => {
		const requestUrl = "/product";
		axios
			.get(requestUrl)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<Header />

			<div>Analysis</div>
		</>
	);
};

export default Analysis;
