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
                        <router-link :to="{ name: 'laporan_keluhan.create' }" class="btn btn-md btn-success">TAMBAH
                            KELUHAN ANDA
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA BARANG</th>
                                    <th scope="col">LAPORAN KELUHAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(laporan_keluhan, id) in laporan_keluhans" :key="id">
                                    <td>{{ laporan_keluhan.pengiriman_barang.nama_barang }}</td>
                                    <td>{{ laporan_keluhan.keluhan }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name:'laporan_keluhan.update', params: { id: laporan_keluhan.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml 1" @click="destroy(laporan_keluhan.id)">DELETE</button>
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
        let laporan_keluhans = ref([])
        //vue router
        const router = useRouter()
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/laporan_keluhans')
                .then(response => {
                    //assign state posts with response data
                    laporan_keluhans.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })
    
        function destroy(id) {
            
            //delete data post by ID
            axios.delete('http://localhost:8000/api/laporan_keluhans/'+id)
            .then(() => {
                notif.error('Data Berhasil Dihapus')
        
                axios.get('http://localhost:8000/api/laporan_keluhans')
                .then(response => {
                    //assign state posts with response data
                    laporan_keluhans.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
            //return
            return {
                laporan_keluhans,
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