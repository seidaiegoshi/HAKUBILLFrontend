import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	// 自動的にブラウザ開く
	server: {
		open: true,
	},
	// パスエイリアスの設定
	// src以下を@で記載できる
	// 定義へ飛べなくなるので、一旦削除
	// resolve: {
	// 	alias: {
	// 		"@/": `${__dirname}/src/`,
	// 	},
	// },
	plugins: [react()],
});
