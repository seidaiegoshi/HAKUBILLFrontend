import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const CustomerEdit = () => {
	const navigate = useNavigate();
	const { customerId } = useParams();
	const [customer, setCustomer] = useState({
		name: "",
		honorific: "",
		post_code: "",
		address: "",
		telephone_number: "",
		fax_number: "",
	});

	const fetchCustomers = () => {
		const requestUrl = `/customer/${customerId}`;
		axios
			.get(requestUrl)
			.then((response) => {
				console.log(response.data);
				setCustomer(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

	const handleChange = (key, value) => {
		const newCustomer = { ...customer };
		newCustomer[key] = value;
		setCustomer(newCustomer);
	};

	const postCustomer = () => {
		const requestUrl = `/customer/${customerId}`;
		const params = {
			name: customer.name,
			honorific: customer.honorific,
			post_code: customer.post_code,
			address: customer.address,
			telephone_number: customer.telephone_number,
			fax_number: customer.fax_number,
		};
		axios
			.patch(requestUrl, params)
			.then((response) => {
				navigate("/setting/customer");
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
					<div className="ml-0 w-full max-w-[600px]">
						<div className="flex">
							<div className="mb-5 flex-grow">
								<label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
									取引先名
								</label>
								<TextInput
									type="text"
									name="name"
									id="name"
									placeholder="取引先名"
									value={customer.name}
									onChange={(e) => handleChange("name", e.target.value)}
									className="w-full"
								/>
							</div>
							<div className="mb-5 ml-4">
								<label htmlFor="honorific" className="mb-3 block text-base font-medium text-[#07074D]">
									敬称
								</label>
								<TextInput
									type="text"
									name="honorific"
									id="honorific"
									placeholder="敬称"
									value={customer.honorific}
									onChange={(e) => handleChange("honorific", e.target.value)}
								/>
							</div>
						</div>
						<div className="flex">
							<div className="mb-5">
								<label htmlFor="post_code" className="mb-3 block text-base font-medium text-[#07074D]">
									郵便番号
								</label>
								<TextInput
									type="text"
									name="post_code"
									id="post_code"
									value={customer.post_code}
									onChange={(e) => handleChange("post_code", e.target.value)}
									placeholder="郵便番号"
								/>
							</div>
							<div className="mb-5 ml-4 flex-grow">
								<label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
									住所
								</label>
								<TextInput
									type="text"
									name="address"
									id="address"
									value={customer.address}
									placeholder="販売価格(デフォルト)"
									onChange={(e) => handleChange("address", e.target.value)}
									className="w-full"
								/>
							</div>
						</div>
						<div className="flex">
							<div className="mb-5">
								<label htmlFor="telephone_number" className="mb-3 block text-base font-medium text-[#07074D]">
									電話番号
								</label>
								<TextInput
									type="text"
									name="telephone_number"
									id="telephone_number"
									value={customer.telephone_number}
									placeholder="電話番号"
									onChange={(e) => handleChange("telephone_number", e.target.value)}
								/>
							</div>
							<div className="mb-5 ml-4">
								<label htmlFor="fax_number" className="mb-3 block text-base font-medium text-[#07074D]">
									FAX番号
								</label>
								<TextInput
									type="text"
									name="fax_number"
									id="fax_number"
									value={customer.fax_number}
									placeholder="FAX番号"
									onChange={(e) => handleChange("fax_number", e.target.value)}
								/>
							</div>
						</div>

						<div>
							<Button onClick={postCustomer}> 取引先情報を更新</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CustomerEdit;
