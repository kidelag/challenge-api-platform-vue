import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/grid.css";
// import "vuestic-ui/styles/reset.css";
import "vuestic-ui/styles/typography.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const app = createApp(App);

app.use(router);

app.use(createVuestic());
app.mount("#app");
