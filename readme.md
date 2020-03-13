# vue-wc-compose
> A tool for building and distributing vue components as vue and web components for easy sharing between teams.

## Dependencies
1. Document Register Element Polyfill
> For IE 9+ compatibility only
```html
	<script src="https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js"></script>
```
2. Webpack >= 4.x - only for building web components

## Getting Started
All components start as regular Vue components.

```html
<!-- SampleComponent.vue -->
<template>
	<div>Hello {{username}}</div>
</template>

<script>
export default {
	name: 'sample-component',
	props: {
		username: String,
	}
}
</script>
```

### 1. Build a Shareable Vue component
Shareable Vue components are built to a single JS file and are composed as async components.

You are responsible for providing an appropriate webpack base configuration which can handle all the modules referenced by your component and bundle them into a single output JS file. Future releases may include a sample webpack configuration for you to use as a template.

The build process will duplicate this configuration for each component passed to the build function.

```javascript
// build-components.js
const path = require('path')
const baseWebpackConfig = require('./webpack.config.js')
const BuildTools = require('vue-wc-compose/src/BuildTools.js')

BuildTools.build(webpackConfig, [
	{name: 'SampleComponent', path: path.resolve(__dirname, '/path/to/SampleComponent.vue')}
])
```

```bash
# Build your vue components by executing the script
node build-components.js
```

### 2. Build a Web Component
Unlike shareable Vue components, web components can run on any site, not only those with Vue running.
In order to build one, we need to wrap our Sample Component in a web component.

```javascript
// SampleComponent.wrapper.js
import Vue from 'vue'
import SampleComponent from './SampleComponent.vue'
import ComponentWrappers from 'vue-wc-compose/src/ComponentWrappers.js'

export default ComponentWrappers.webComponentWrapper(Vue, DemoCards)
```

Now, we can augment the build-components.js script to use the wrapper as the build entry point (SampleComponent.wrapper.js)

```javascript
// build-components.js
const baseWebpackConfig = require('./webpack.config.js')
const BuildTools = require('vue-wc-compose/src/BuildTools.js')

BuildTools.build(webpackConfig, [
	{name: 'SampleComponent', path: 'relative/path/to/SampleComponent.wrapper.js'}
])
```

```bash
# Build your web components
node build-components.js
```

### 3. Use a component from another vue application

Install the vue-wc-compose Plugin

```javascript
import Vue from 'vue'
import VueCompose from 'vue-wc-compose'

Vue.use(VueCompose)
```

The plugin will expand the capabilities of your vue components. Let's compose the SampleComponent we just built using the new 'compose' syntax:

```javascript
// MyClientComponent.vue > <script>

export default {
	name: 'my-client-component',
	compose: {
		'sample-component': {type: 'vc', src: '/server/path/to/built/SampleComponent.js'},
	},
}
```

#### Compose Property Options:
1. **type**: ('vc' | 'wc') This indicates whether or not we are composing a vue component or a web component.
2. **src**: (String) The path to your component. If the component is being served by another domain, typical browser CORS rules apply.

Once the component has been referenced, we can use it in our component templates:

```html
<!-- MyClientComponent.vue > <template> -->
<template>
	<div class="my-client-component">
		...
		<sample-component username="my-username"/>
		...
	</div>
</template>
```

## Troubleshooting
Testing web components in an isolated scope can be difficult. The demo application allows you to easily test web components from this repository and others.

```bash
# build the demo components
npm run demo:build

# run the demo application
npm run demo
```

Edit the index.html file to request and render the components of your choosing.