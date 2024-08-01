import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import likeButtonDirective from './directives/likeButton'; 


const app = createApp(App);

app.use(bootstrap);
app.use(router);
app.use(store); 
app.directive('like-button', likeButtonDirective);


app.mount('#app');
