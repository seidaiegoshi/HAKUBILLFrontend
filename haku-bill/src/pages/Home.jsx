import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HomeMenu from "@/pages/home/HomeMenu";

const Home = () => {
	return (
		<div>
			<Header>HOME(Header Title)</Header>
			<Sidebar />
			<HomeMenu />
		</div>
	);
};

export default Home;
