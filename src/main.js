import Vue from 'vue'
import routes from './routes'

import clipboard from 'clipboard'
Vue.prototype.clipboard = clipboard;

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import { MessageBox, Message } from 'element-ui';
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute];
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
});
