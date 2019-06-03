import Vue from 'vue';
import { AxiosStatic } from 'axios';
import element from 'element-ui';
import lodash from 'lodash';
import router from 'vue-router';
import vuex from 'vuex';

declare module 'vue/types/vue' {
	interface Vue {
		$http: AxiosStatic;
		$httpErrorHandle(vm: Vue, error: any): void;
		$log: Console;
		$regRules: Object;
		$qiniuConfig: {
			action: String;
			domain: String;
		};
		$qiniuUpload(callback: Function): void;
		$qiniuToken(): String;
		$qiniuImageUrl(key: String): String;
	}
	// interface VueConstructor<V extends Vue = Vue> {
	//   _: typeof lodash;
	// }
}

// declare global {
//   const _: lodash.LoDashStatic;
// }
