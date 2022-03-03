/// <reference types="@sveltejs/kit" />

declare module 'plotly.js-dist' {
	import Plotly from 'plotly.js';
	export default Plotly;
	export * from 'plotly.js';
}