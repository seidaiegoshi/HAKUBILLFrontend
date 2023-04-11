import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

function SearchForm(props) {
	const [customer, setCustomer] = useState("");
	const [product, setProduct] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		props.search({ customer, product });
	};

	return (
		<form onSubmit={handleSubmit} className="border-b-2 pb-2">
			<div className="flex">
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
				<Button type="submit" className="bg-blue-500  hover:bg-blue-600 text-white ml-3">
					検索
				</Button>
			</div>
		</form>
	);
}

export default SearchForm;
