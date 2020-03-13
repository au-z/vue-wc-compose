import Vue from 'vue';
import ComponentWrappers from '../../src/ComponentWrappers.js'
import WcTest from './wc-test.vue';

const wrapper = ComponentWrappers.webComponentWrapper(Vue, WcTest);
export default wrapper;