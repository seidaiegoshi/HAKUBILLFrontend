import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";

function SearchForm(props) {
	const [customer, setCustomer] = useState("");
	const [product, setProduct] = useState("");

	const handleChangeCustomer = (value) => {
		setCustomer(value);
		const SearchWords = { customer: customer, product: product };
		props.setSearchWords(SearchWords);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.search({ customer, product });
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				取引先名:
				<TextInput
					type="text"
					value={customer}
					onChange={(event) => {
						setCustomer(event.target.value);
					}}
				/>
			</label>
			<label>
				商品名:
				<TextInput
					type="text"
					value={product}
					onChange={(event) => {
						setProduct(event.target.value);
					}}
				/>
			</label>
			<button
				type="submit"
				className="block uppercase mx-auto mt-3 shadow bg-gray-100 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-base  py-3 px-10 rounded">
				検索
			</button>
		</form>
	);
}

export default SearchForm;
