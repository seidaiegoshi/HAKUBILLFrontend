import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import DeliverySlip from "../pages/DeliverySlip";
import Settings from "../pages/Settings";
import Products from "../pages/settings/Products";
import ProductAdd from "../pages/settings/ProductAdd";

const createRoutes = (element) => createBrowserRouter(createRoutesFromElements(element));

const routes = createRoutes(
	<Route path="/" errorElement={<div>error</div>}>
		<Route index element={<Home />} />

		<Route path="/delivery-slip" element={<DeliverySlip />} />

		<Route path="/setting" element={<Settings />} />
		<Route path="/setting/product" element={<Products />} />
		<Route path="/setting/product/new" element={<ProductAdd />} />
	</Route>
);

const Router = () => <RouterProvider router={routes} />;

export default Router;
