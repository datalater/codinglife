# 20220412-vue

## History

```bash
# Vue CLI 설치
npm install -g @vue/cli

# Vue 프로젝트 생성
vue create 20220412-vue

# Vue2 plugin for Composition API 플러그인 설치 (https://github.com/vuejs/composition-api)
yarn add @vue/composition-api
```

`Vue.use(vueCompositionApi)`:

```js
import vueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(vueCompositionApi);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

```bash
yarn add vue-router@4
```

<details markdown="1">
<summary><strong>Project setup</strong></summary>

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

</details>
