<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Pengiriman Barang</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'pengiriman_barang.create' }" class="btn btn-md btn-success">TAMBAH
                            BARANG YANG INGIN DIKIRIM
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA BARANG</th>
                                    <th scope="col">NAMA PENGIRIM</th>
                                    <th scope="col">NO TELP PENGIRIM</th>
                                    <th scope="col">BERAT BARANG</th>
                                    <th scope="col">JENIS BARANG</th>
                                    <th scope="col">KOTA ASAL</th>
                                    <th scope="col">KOTA TUJUAN</th>
                                    <th scope="col">ESTIMASI</th>
                                    <th scope="col">NAMA PENERIMA</th>
                                    <th scope="col">NO TELP PENERIMA</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pengiriman_barang, id) in pengiriman_barangs" :key="id">
                                    <td>{{ pengiriman_barang.nama_barang }}</td>
                                    <td>{{ pengiriman_barang.nama_pengirim }}</td>
                                    <td>{{ pengiriman_barang.telp_pengirim }}</td>
                                    <td>{{ pengiriman_barang.berat_barang }}</td>
                                    <td>{{ pengiriman_barang.jenis_barang }}</td>
                                    <td>{{ pengiriman_barang.kota_asal }}</td>
                                    <td>{{ pengiriman_barang.kota_tujuan }}</td>
                                    <td>{{ pengiriman_barang.estimasi }}</td>
                                    <td>{{ pengiriman_barang.nama_penerima }}</td>
                                    <td>{{ pengiriman_barang.telp_penerima }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name:'pengiriman_barang.update', params: { id: pengiriman_barang.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml 1" @click="destroy(pengiriman_barang.id)">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const notif = window.toastr
        notif.option = {
            "closeButton": true,
            "timeOut": 1000,
        }
        //reactive state
        let pengiriman_barangs = ref([])
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.get('https://brg.jalanskuy.com/jasa_kirim_barang/public/api/pengiriman_barangs')
                .then(response => {
                    //assign state posts with response data
                    pengiriman_barangs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })
        function update(id) {
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.delete(`https://brg.jalanskuy.com/jasa_kirim_barang/public/api/pengiriman_barangs/${id}`, 
            {
                }).then(() => {
                    router.push({
                        name: 'pengiriman_barang.index'
                    })
                }).catch(error => {
                    validation.value = error.response.data
                })
        }
        function destroy(id) {
            
            //delete data post by ID
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.delete('https://brg.jalanskuy.com/jasa_kirim_barang/public/api/pengiriman_barangs/'+id)
            .then(() => {
                notif.error('Data Berhasil Dihapus')
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
                axios.get('https://brg.jalanskuy.com/jasa_kirim_barang/public/api/pengiriman_barangs')
                .then(response => {
                    //assign state posts with response data
                    pengiriman_barangs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
            //return
            return {
                pengiriman_barangs,
                update,
                destroy,
                router
            }
    }
}
</script>
<style>
 .toast-success {
        background-color: #28a745;
    }
    .toast-error {
        background-color: #dc3545;
    }
</style>