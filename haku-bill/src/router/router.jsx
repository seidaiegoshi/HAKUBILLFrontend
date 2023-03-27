import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import DeliverySlip from "../pages/DeliverySlip";
import Settings from "../pages/Settings";
import Products from "../pages/settings/product/Products";
import ProductAdd from "../pages/settings/product/ProductAdd";
import Analysis from "../pages/analysis/Analysis";
import FixedCosts from "../pages/settings/fixed_cost/FixedCosts";
import FixedCostAdd from "../pages/settings/fixed_cost/FixedCostAdd";
import ProductCategory from "../pages/settings/category/Category";
import CategoryAdd from "../pages/settings/category/CategoryAdd";
import ProductEdit from "../pages/settings/product/ProductEdit";
import CategoryEdit from "../pages/settings/category/CategoryEdit";
import FixedCostEdit from "../pages/settings/fixed_cost/FixedCostEdit";

const createRoutes = (element) => createBrowserRouter(createRoutesFromElements(element));

const routes = createRoutes(
	<Route path="/" errorElement={<div>error</div>}>
		<Route index element={<Home />} />

		<Route path="/delivery-slip" element={<DeliverySlip />} />

		<Route path="/analysis" element={<Analysis />} />
		<Route path="/setting" element={<Settings />} />
		<Route path="/setting/product" element={<Products />} />
		<Route path="/setting/product/new" element={<ProductAdd />} />
		<Route path="/setting/product/:id/edit" element={<ProductEdit />} />
		<Route path="/setting/category" element={<ProductCategory />} />
		<Route path="/setting/category/new" element={<CategoryAdd />} />
		<Route path="/setting/category/:id/edit" element={<CategoryEdit />} />
		<Route path="/setting/fixed_cost" element={<FixedCosts />} />
		<Route path="/setting/fixed_cost/new" element={<FixedCostAdd />} />
		<Route path="/setting/fixed_cost/:id/edit" element={<FixedCostEdit />} />
	</Route>
);

const Router = () => <RouterProvider router={routes} />;

export default Router;
