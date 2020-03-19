import VueCustomElement from 'vue-custom-element'

/**
 * Wraps a vue component in a custom element factory function
 * @param {Function} Vue the vue instance
 * @param {Object} component Vue Component definition
 * @return {FUnction} a factory function
 */
function webComponentWrapper(Vue, component) {
	return function(name) {
		Vue.use(VueCustomElement)
		Vue.customElement(name, component)
	}
}

export default {
	webComponentWrapper: webComponentWrapper,
};
