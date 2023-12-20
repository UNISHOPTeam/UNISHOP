
// eslint-disable-next-line no-unused-vars
import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */'../views/Home.vue'),
  },

  {
    path: "/Rand",
    name: "Rank",
    meta: {
      title: "排行榜",
    },
    component: () =>
      import(/* webpackChunkName: "Rank" */ "../views/Mining/Rank.vue"),
  },
  // {
  //   path: "",
  //   name: "Rank",
  //   meta: {
  //     title: "排行榜",
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "Rank" */ "../views/Mining/Rank.vue"),
  // },
  {
    path: "/chian_apply_common", //  链商申请
    name: "ChianApplyCommon",
    meta: {
      title: "通证商申请",
    },
    component: () =>
      import(
        /* webpackChunkName: "ChianApplyCommon" */ "../views/Mining/ChianApplyCommon.vue"
      ),
  },
  {
    path: "/chian_apply", // 链商申请
    name: "ChianApply",
    meta: {
      title: "链商申请",
    },
    component: () =>
      import(
        /* webpackChunkName: "ChianApply" */ "../views/Mining/ChianApply.vue"
      ),
  },
  {
    path: "/product_management", // 产品管理
    name: "ProductManagement",
    meta: {
      title: "产品管理",
    },
    component: () =>
      import(
        /* webpackChunkName: "ProductManagement" */ "../views/Mining/ProductManagement.vue"
      ),
  },
  {
    path: "/modify_product", // 修改产品
    name: "ModifyProduct",
    meta: {
      title: "修改产品",
    },
    component: () =>
      import(
        /* webpackChunkName: "ModifyProduct" */ "../views/Mining/ModifyProduct.vue"
      ),
  },
  {
    path: "/product_details", //nft 超级管理员
    name: "ProductDetails",
    meta: {
      title: "NFT超级管理员",
    },
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "../views/Mining/ProductDetails.vue"
      ),
  },
  {
    path: "/token_add", // 新token 上线
    name: "TokenAdd",
    meta: {
      title: "Token添加",
    },
    component: () =>
      import(/* webpackChunkName: "TokenAdd" */ "../views/Mining/TokenAdd.vue"),
  },
  {
    path: "/manage_communes", // 管理公社
    name: "ManageCommunes",
    meta: {
      title: "管理公社",
    },
    component: () =>
      import(
        /* webpackChunkName: "ManageCommunes" */ "../views/Mining/ManageCommunes.vue"
      ),
  },
  {
    path: "/commune_details", //
    name: "CommuneDetails",
    meta: {
      title: "公社详情",
    },
    component: () =>
      import(
        /* webpackChunkName: "CommuneDetails" */ "../views/Mining/CommuneDetails.vue"
      ),
  },
  {
    path: "/decompress", // 解压
    name: "decompress",
    meta: {
      title: "解压",
    },
    component: () =>
      import(
        /* webpackChunkName: "decompress" */ "../views/Mining/Decompress.vue"
      ),
  },
  {
    path: "/goods", // 商品
    name: "GoodsPage",
    meta: {
      title: "商品",
    },
    component: () =>
      import(/* webpackChunkName: "GoodsPage" */ "../views/Goods/Goods.vue"),
  },
  {
    path: "/good_detail", // 商品详情
    name: "GoodDetail",
    meta: {
      title: "商品详情",
    },
    component: () =>
      import(
        /* webpackChunkName: "GoodDetailVideo" */ "../views/Goods/GoodDetail.vue"
      ),
  },
  {
    path: "/good_detail_video", // 视频
    name: "GoodDetailVideo",
    meta: {
      title: "商品",
    },
    component: () =>
      import(
        /* webpackChunkName: "GoodDetailVideo" */ "../views/Goods/GoodDetailVideo.vue"
      ),
  },
  {
    path: "/confirm_buy", // 购买商品
    name: "ConfirmBuy",
    meta: {
      title: "购买商品",
    },
    component: () =>
      import(
        /* webpackChunkName: "ConfirmBuy" */ "../views/Goods/ConfirmBuy.vue"
      ),
  },
  {
    path: "/shop_cart", // 购物车
    name: "ShopCart",
    meta: {
      title: "购物车",
    },
    component: () =>
      import(/* webpackChunkName: "ShopCart" */ "../views/Goods/ShopCart.vue"),
  },
  {
    path: "/pe_ratio", //商品-商品市盈率
    name: "PeRatio",
    meta: {
      title: "商品市盈率",
    },
    component: () =>
      import(/* webpackChunkName: "PeRatio" */ "../views/Goods/PeRatio.vue"),
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    meta: {
      title: "Coming Soon",
    },
    component: () =>
        import(/* webpackChunkName: "ShopCart" */ "../views/ComingSoon.vue"),

  },
];
console.log(process.env.BASE_URL);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const defaultTitle = "33公社";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : defaultTitle;
  next();
});

export default router;
