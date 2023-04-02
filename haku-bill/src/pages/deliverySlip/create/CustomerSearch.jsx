import React from "react";
import TextInput from "@/components/Atoms/TextInput";

const CustomerSearch = ({
	searchWord,
	displayResult,
	suggestions,
	handleChangeCustomerInput,
	handleClickSuggestion,
}) => {
	return (
		<div>
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
		</div>
	);
};

export default CustomerSearch;
