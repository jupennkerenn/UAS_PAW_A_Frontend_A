//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
const routes = [
    {
        path: '/',
        name: 'beranda',
        component: () => import('@/components/DashboardLayout.vue'),
        children: [
            {
                path: "/pengiriman_barang",
                name: "pengiriman_barang.index",
                component: () =>
                    import('@/views/PengirimanBarang/indexPage.vue'),
            },
            {
                path: "/pengiriman_barang/create",
                name: "pengiriman_barang.create",
                component: () =>
                    import('@/views/PengirimanBarang/createPage.vue'),
            },
            {
                path: "/pengiriman_barang/update/:id",
                name: "pengiriman_barang.update",
                component: () =>
                    import('@/views/PengirimanBarang/editPage.vue'),
            },
            {
                path: "/pengiriman_barang/delete/:id",
                name: "pengiriman_barang.delete",
                component: () =>
                    import('@/views/PengirimanBarang/indexPage.vue'),
            },

            {
                path: "/laporan_keluhan",
                name: "laporan_keluhan.index",
                component: () =>
                    import('@/views/LaporanKeluhan/indexPage.vue'),
            },
            {
                path: "/laporan_keluhan/create",
                name: "laporan_keluhan.create",
                component: () =>
                    import('@/views/LaporanKeluhan/createPage.vue'),
            },
            {
                path: "/laporan_keluhan/update/:id",
                name: "laporan_keluhan.update",
                component: () =>
                    import('@/views/PengirimanBarang/editPage.vue'),
            },
            {
                path: "/laporan_keluhan/delete/:id",
                name: "laporan_keluhan.delete",
                component: () =>
                    import('@/views/PengirimanBarang/indexPage.vue'),
            },
        ],
    },
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;
