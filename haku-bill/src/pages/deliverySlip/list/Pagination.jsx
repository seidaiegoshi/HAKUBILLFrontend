import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const middlePage = Math.max(2, Math.min(totalPages - 1, currentPage));
	const pages = [1, middlePage, totalPages].filter((page, i, arr) => arr.indexOf(page) === i);

	return (
		<nav className="flex justify-center my-4">
			<ul className="flex list-none">
				<li className="mx-1">
					<button
						className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-800"
						onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
						&lt;
					</button>
				</li>
				{pages.map((page) => (
					<li key={page} className="mx-1">
						<button
							className={`px-3 py-2 border border-gray-300 rounded ${
								currentPage === page ? "bg-gray-800 text-white" : "bg-white text-gray-800"
							}`}
							onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
				<li className="mx-1">
					<button
						className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-800"
						onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
						&gt;
					</button>
				</li>
			</ul>
		</nav>
	);
};
export default Pagination;
