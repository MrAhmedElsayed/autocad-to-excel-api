import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ImportToCad from "@/views/ImportToCad";
import ExportFromCad from "@/views/ExportFromCad";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/import",
    name: "import",
    component: ImportToCad,
  },
  {
    path: "/import",
    name: "import",
    component: ExportFromCad,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
