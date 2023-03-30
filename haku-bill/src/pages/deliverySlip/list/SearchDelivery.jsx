import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";

function SearchDelivery(props) {
	const [searchWords, setSearchWords] = useState(props.searchWords);

	const handleChangeSearchWords = (key) => (event) => {
		const newSearchWords = { ...searchWords, [key]: event.target.value };
		setSearchWords(newSearchWords);
		props.setSearchWords(newSearchWords);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.search(searchWords);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex">
				<div className="flex">
					<span>期間</span>
					<TextInput
						type="date"
						value={searchWords.dateFrom}
						onChange={handleChangeSearchWords("dateFrom")}
					/>
					<span>~</span>
					<TextInput type="date" value={searchWords.dateTo} onChange={handleChangeSearchWords("dateTo")} />
				</div>
				<TextInput
					type="text"
					value={searchWords.word}
					placeholder={"取引先名"}
					onChange={handleChangeSearchWords("word")}
				/>
				<button
					type="submit"
					className="block uppercase mx-4 shadow bg-gray-100 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-base  py-3 px-10 rounded">
					検索
				</button>
			</div>
		</form>
	);
}

export default SearchDelivery;
