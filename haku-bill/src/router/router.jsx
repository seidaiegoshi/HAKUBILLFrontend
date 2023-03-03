import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Products from "@/pages/Products";
import Home from "@/pages/Home";

const createRoutes = (element) => createBrowserRouter(createRoutesFromElements(element));

const routes = createRoutes(
	<Route path="/" errorElement={<div>error</div>}>
		{/* <Route index element={<Hoge />} /> */}
		<Route path="/" element={<Home />} />
		<Route path="/product" element={<Products />} />
	</Route>
);

const Router = () => <RouterProvider router={routes} />;

export default Router;
