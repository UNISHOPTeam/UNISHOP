import { createApp } from 'vue'
import App from './App.vue' 

import { Uploader,Checkbox,Toast,Icon,ActionSheet,Dialog,Stepper,Overlay,Slider, Cell, CellGroup, Field, Button, Swipe, SwipeItem, Popup,Popover, Tag } from 'vant';
import { createPinia } from 'pinia'
import './index.css'
import router from './router';


const app =createApp(App).use(createPinia()).use(router)
app.use(Button)
app.use(Popup)
app.use(Tag)
app.use(Swipe)
app.use(SwipeItem)
app.use(Field)
app.use(Cell)
app.use(CellGroup)
app.use(Uploader)
app.use(Checkbox)
app.use(Dialog)
app.use(Icon)
app.use(ActionSheet)
app.use(Stepper);
app.use(Toast)
app.use(Overlay)
app.use(Popover);
app.use(Slider);  

// app.use(ConfigProvider)
app.mount('#app')
