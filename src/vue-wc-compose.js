/* eslint-disable camelcase */
/* eslint-disable no-invalid-this */

import VueCustomElement from 'vue-custom-element'
import packageJson from '../package.json'

export default (function() {
	let Vue

	const componentNotFound = (name, error) => ({
		name: 'notFound',
		created() {
			console.log(`[vue-composite] Component not found. Error: `, error);
		},
		render(h) {
			return h('div', {
				style: {
					'display': 'flex',
					'justify-content': 'center',
					'align-items': 'center',
					'padding': '16px',
					'border-radius': '4px',
					'font-family': 'monospace',
					'background': '#333',
					'color': 'gray',
				},
			}, [
				h('span', null, [
					h('b', null, `'${name}' not found`),
				]),
			])
		},
	})

	function install(vue, options) {
		if(Vue) {
			throw new Error('Cannot install vue-wc-compose')
		}
		Vue = vue

		Vue.config.ignoredElements = Vue.config.ignoredElements || []
		Vue.use(VueCustomElement)

		options = options || {}
		applyMixin(Vue)
	}

	function applyMixin(vue) {
		let version = Number(Vue.version.split('.')[0]);
		if(version >= 2) {
			let usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
			Vue.mixin(usesInit ? {init: loadComponents} : {beforeCreate: loadComponents})
		} else {
			throw new Error('[vue-wc-compose] is only compatible with Vue >= 2.x')
		}
	}

	async function loadComponents() {
		if(this.$options.compose) {
			/* eslint-disable guard-for-in */
			for(let name in this.$options.compose) {
				Vue.config.ignoredElements.push(name);
				const template = this.$options.compose[name];
				switch(template.type.toLowerCase()) {
					default:
					case 'vc':
						console.log(template)
						Vue.component(name, (resolve) => loadRemoteComponent(name, template.src)
							.then(resolve));
						break;
					case 'wc':
						loadRemoteComponent(name, template.src)
							.then((factoryFn) => factoryFn(name))
						break;
				}
			}
		}
	}

	function loadRemoteComponent(name, src) {
		return new Promise((res, rej) => {
			let scriptName = src.split('/').pop().replace(/(.min)?.js/i, '')
			let scriptId = `wc_${scriptName}`

			let s = document.createElement('script')
			s.setAttribute('id', scriptId)
			document.getElementsByTagName('head')[0].appendChild(s)

			s.addEventListener('load', (a) => {
				res(window[scriptName])
			})
			s.onerror = (e) => res(componentNotFound(name, e))

			s.src = src
		});
	}

	return {
		name: packageJson.name,
		version: packageJson.version,
		install,
	}
})();
