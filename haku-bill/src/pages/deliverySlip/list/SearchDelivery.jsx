import React, { useState } from "react";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

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
				<div className="flex items-center ml-4">
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
					className="ml-3"
					onChange={handleChangeSearchWords("word")}
				/>
				<Button type="submit" className="ml-3" primal="true">
					検索
				</Button>
			</div>
		</form>
	);
}

export default SearchDelivery;
