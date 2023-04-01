import React from "react";
import LinkButton from "@/components/Atoms/LinkButton";
import { BsBox, BsBoxes, BsBuildingDown } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";

const SettingSidebar = () => {
	return (
		<>
			<aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
				<div className="flex flex-col justify-between flex-1 mt-6">
					<nav>
						<LinkButton to={"/setting/product"} text={"商品"} svg={<BsBox />} />
						<LinkButton to={"/setting/category"} text={"商品カテゴリ"} svg={<BsBoxes />} />
						{/* <LinkButton to={"/setting/recipe"} text={"レシピ"} svg={<MdMenuBook />} /> */}
						<LinkButton to={"/setting/fixed_cost"} text={"固定費"} svg={<BsBuildingDown />} />
						<LinkButton
							to={"/setting/customer_product"}
							text={"顧客別商品"}
							svg={
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							}
						/>
					</nav>
				</div>
			</aside>
		</>
	);
};

export default SettingSidebar;
