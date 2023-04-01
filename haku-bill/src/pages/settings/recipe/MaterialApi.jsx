import axios from "@/libs/axios";

export const fetchProducts = async () => {
	const requestUrl = `/product`;

	try {
		const response = await axios.get(requestUrl);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchMaterials = async (productId) => {
	const requestUrl = `/product/${productId}/materials`;

	try {
		const response = await axios.get(requestUrl);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateMaterial = async (productId, material) => {
	const requestUrl = `/product/${productId}/materials/${material.id}`;

	try {
		const response = await axios.patch(requestUrl, material);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createMaterial = async (productId, material) => {
	const requestUrl = `/product/${productId}/materials`;

	try {
		const response = await axios.post(requestUrl, material);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteMaterial = async (productId, materialId) => {
	const requestUrl = `/product/${productId}/materials/${materialId}`;

	try {
		await axios.delete(requestUrl);
	} catch (error) {
		console.log(error);
	}
};
