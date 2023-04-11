import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const Company = () => {
	const companyId = 1;
	const [company, setCompany] = useState({
		name: "",
		post_code: "",
		address: "",
		telephone_number: "",
		fax_number: "",
		invoice_number: "",
	});

	const [message, setMessage] = useState("");

	const fetchCompany = () => {
		const requestUrl = `/company/${companyId}`;
		axios
			.get(requestUrl)
			.then((response) => {
				const data = response.data;
				const sanitizedData = {
					name: data.name || "",
					post_code: data.post_code || "",
					address: data.address || "",
					telephone_number: data.telephone_number || "",
					fax_number: data.fax_number || "",
					invoice_number: data.invoice_number || "",
				};
				setCompany(sanitizedData);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCompany();
	}, []);

	const handleChange = (key, value) => {
		const newCompany = { ...company };
		newCompany[key] = value;
		setCompany(newCompany);
		setMessage("");
	};

	const postCompany = () => {
		const requestUrl = `/company/${companyId}`;
		const params = {
			name: company.name,
			post_code: company.post_code,
			address: company.address,
			telephone_number: company.telephone_number,
			fax_number: company.fax_number,
			invoice_number: company.invoice_number,
		};
		console.log(params);
		axios
			.patch(requestUrl, params)
			.then((response) => {
				console.log(response);
				setMessage("更新しました。");
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
								会社名
							</label>
							<TextInput
								type="text"
								name="name"
								id="name"
								placeholder="会社名"
								value={company.name}
								onChange={(e) => handleChange("name", e.target.value)}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="post_code" className="mb-3 block text-base font-medium text-[#07074D]">
								郵便番号
							</label>
							<TextInput
								type="text"
								name="post_code"
								id="post_code"
								placeholder="郵便番号"
								value={company.post_code}
								onChange={(e) => handleChange("post_code", e.target.value)}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
								住所
							</label>
							<TextInput
								type="text"
								name="address"
								id="address"
								value={company.address}
								onChange={(e) => handleChange("address", e.target.value)}
								placeholder="住所"
								className="w-full"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="telephone_number" className="mb-3 block text-base font-medium text-[#07074D]">
								電話番号
							</label>
							<TextInput
								type="text"
								name="telephone_number"
								id="telephone_number"
								value={company.telephone_number}
								placeholder="電話番号"
								onChange={(e) => handleChange("telephone_number", e.target.value)}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="fax_number" className="mb-3 block text-base font-medium text-[#07074D]">
								FAX番号
							</label>
							<TextInput
								type="text"
								name="fax_number"
								id="fax_number"
								value={company.fax_number}
								placeholder="FAX番号"
								onChange={(e) => handleChange("fax_number", e.target.value)}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="invoice_number" className="mb-3 block text-base font-medium text-[#07074D]">
								インボイス制度登録番号
							</label>
							<TextInput
								type="text"
								name="invoice_number"
								id="invoice_number"
								value={company.invoice_number}
								placeholder="登録番号"
								onChange={(e) => handleChange("invoice_number", e.target.value)}
							/>
						</div>

						<div>
							<Button onClick={postCompany} primal="true">
								会社情報を更新
							</Button>
						</div>
						{message && <div>{message}</div>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Company;
