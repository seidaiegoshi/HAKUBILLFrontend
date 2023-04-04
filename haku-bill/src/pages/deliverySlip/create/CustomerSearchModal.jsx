import React from "react";
import Button from "@/components/Atoms/Button";

const CustomerSearchModal = ({
	searchWord,
	suggestions,
	handleChangeCustomerInput,
	handleClickSuggestion,
	showFlag,
	setModal,
}) => {
	if (!showFlag) {
		return null;
	}

	const closeModal = () => {
		setModal(false);
	};

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8">
					<h3 className="text-lg mb-4">取引先選択</h3>
					<input
						type="text"
						value={searchWord}
						onChange={handleChangeCustomerInput}
						className="border border-gray-400 p-2 rounded w-full"
						placeholder="取引先名を入力"
					/>
					<ul className="mt-4">
						{suggestions.map((customer) => (
							<li
								key={customer.id}
								onClick={() => handleClickSuggestion(customer)}
								className="cursor-pointer hover:bg-gray-200 p-2 rounded">
								{customer.name}
							</li>
						))}
					</ul>
					<Button onClick={closeModal} className="mt-4">
						キャンセル
					</Button>
				</div>
			</div>
			<div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeModal}></div>

			{/* <div>
				<label htmlFor="customer" className="mb-3 block text-base font-medium text-[#07074D]">
					取引先名
				</label>
				<TextInput id="customer" type="text" value={searchWord} onChange={handleChangeCustomerInput} />
				{displayResult && (
					<ul className="absolute bg-white ">
						{suggestions.map((item) => (
							<li key={item.id} onClick={() => handleClickSuggestion(item)}>
								{item.name}
							</li>
						))}
					</ul>
				)}
			</div> */}
		</>
	);
};

export default CustomerSearchModal;
