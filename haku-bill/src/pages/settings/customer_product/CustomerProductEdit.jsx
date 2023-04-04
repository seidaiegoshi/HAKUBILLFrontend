import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import Button from "@/components/Atoms/Button";

const CustomerProductEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [customerPrice, setCustomerPrice] = useState({
		customer_id: "",
		customers: { name: "" },
		product_id: "",
		products: { name: "" },
		product_name: "",
		price: "",
	});

	const fetchFixedCosts = () => {
		const requestUrl = `/customer_price/${id}}`;

		axios
			.get(requestUrl)
			.then((response) => {
				console.log(response.data);
				setCustomerPrice(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchFixedCosts();
	}, []);

	const handleChange = (key, value) => {
		const newCustomerPrice = { ...customerPrice };
		newCustomerPrice[key] = value;
		setCustomerPrice(newCustomerPrice);
	};

	const patchFixedCost = () => {
		const requestUrl = `/customer_price/${id}`;
		axios
			.patch(requestUrl, {
				price: customerPrice.price,
			})
			.then((response) => {
				console.log(response.data);
				navigate("/setting/customer_product");
			})
			.catch((e) => {
				console.log(e);
			})
			.finally();
	};

	return (
		<>
			<Header />
			<div className="flex flex-row">
				<div className="flex-none">
					<SettingSidebar />
				</div>
				<div className="flex flex-auto justify-start p-12">
					<div className="ml-0 w-full max-w-[550px]">
						<div className="mb-5">
							<label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
								顧客名
							</label>
							<p className="mb-3 block text-base font-medium">{customerPrice.customers.name}</p>
						</div>
						<div className="mb-5">
							<label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
								商品名
							</label>
							<p className="mb-3 block text-base font-medium">{customerPrice.products.name}</p>
						</div>

						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								金額
							</label>
							<input
								type="number"
								name="price"
								id="price"
								value={customerPrice.price}
								placeholder="金額"
								onChange={(e) => handleChange("price", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div>
							<Button onClick={patchFixedCost}>更新</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CustomerProductEdit;
