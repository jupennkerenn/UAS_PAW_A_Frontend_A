<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow gradient-custom-2">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">KIRANG GO!</a>
        <button class="navbar-toggler position-absolute d-md-none 
    collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria controls="sidebarMenu"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </header>
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{
                                name:
                                    'pengiriman_barang.index'
                            }" class="nav-link">Pengiriman Barang</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{
                                name:
                                    'laporan_keluhan.index'
                            }" class="nav-link">Laporan Keluhan</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{
                                name:
                                    'kurir.index'
                            }" class="nav-link">Register Kurir</router-link>
                        </li>
                        <div class="dropdown show">
                            <a class="d-flex align-items-center px-3 text-white text-decoration-none dropdown-toggle btn btn-secondary dropdown-toggle gradient-custom-2" href="#" role="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            More Menu
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow gradient-custom-2" aria-labelledby="dropdownUser">
                                <li>
                                    <router-link :to="{
                                        name:
                                            'profile.index'
                                    }" class="dropdown-item">Profile</router-link>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li @click.prevent="logout"><a class="dropdown-item" href="#">Log out</a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </nav>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <!-- View Route -->
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>
<script>
import { useRouter } from "vue-router";
import axios from "axios";
export default {
    setup() {
        const notif = window.toastr;
        notif.option = {
            closeButton: true,
            timeOut: 1000,
        };
        //inisialisasi vue router on Composition API
        const router = useRouter();

        //method logout
        function logout() {
            //logout

            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios
                .post("https://brg.jalanskuy.com/jasa_kirim_barang/public/api/logout")
                .then((response) => {
                    if (response.data.success) {
                        //remove localStorage
                        localStorage.removeItem("token");

                        //redirect ke halaman login
                        notif.success("Berhasil Logout!");
                        router
                            .push({
                                name: "Intro",
                            })
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        return {
            logout,
        };
    },
};
</script>
<style>
body {
    font-size: .875rem;
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

.gradient-custom-2 {

background: #fccb90;

background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

/*
* Sidebar
*/
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
}

.sidebar .nav-link.active {
    color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
}

/*
* Navbar
*/
.navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
    top: .25rem;
    right: 1rem;
}

.navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
}

.form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>
    