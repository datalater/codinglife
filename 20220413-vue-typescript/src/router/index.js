import VueCompositionAPI, { computed, reactive } from "@vue/composition-api";
import Vue from "vue";
import VueRouter, { RawLocation, Route } from "vue-router";
import NotFound from "./NotFound";
import Home from "./Home";

Vue.use(VueCompositionAPI);
Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
  },
];

// type ErrorHandler = (err: Error) => void;
// type Args = [RawLocation, Function?, ErrorHandler?];

// const { push, replace } = VueRouter.prototype;

// VueRouter.prototype.push = function (...args: Args) {
//   return catchNavigationError(push, args, this);
// };

// VueRouter.prototype.replace = function (...args: Args) {
//   return catchNavigationError(replace, args, this);
// };

// const catchNavigationError = (
//   method: Function,
//   args: Args,
//   thisArg: VueRouter
// ) =>
//   Promise.resolve(method?.apply(thisArg, args)).catch((error: Error) => {
//     if (error.name !== "NavigationDuplicated") throw error;
//   });

export const router = new VueRouter({
  mode: "history",
  routes: [
    ...routes,
    {
      path: "/404",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

// export const route = reactive({ ...router.currentRoute });
// const routeData = reactive<Pick<Route, "params" | "query">>({
//   params: {},
//   query: {},
// });

// router.afterEach((to) => {
//   Object.assign(route, to);
//   routeData.params = route.params;
//   routeData.query = route.query;
// });

const currentPage = computed(() => Number(routeData.query?.page || 1));

export const useRouter = () => router;
export const useRoute = () => route;
export const usePage = () => currentPage;
