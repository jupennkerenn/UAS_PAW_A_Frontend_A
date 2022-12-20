<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Kurir</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'kurir.create' }" class="btn btn-md btn-success">TAMBAH
                            KURIR
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA KURIR</th>
                                    <th scope="col">UMUR KURIR</th>
                                    <th scope="col">JENIS KELAMIN KURIR</th>
                                    <th scope="col">NO TELP KURIR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kurir, id) in kurirs" :key="id">
                                    <td>{{ kurir.nama_kurir }}</td>
                                    <td>{{ kurir.umur_kurir }}</td>
                                    <td>{{ kurir.gender_kurir }}</td>
                                    <td>{{ kurir.telp_kurir }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name:'kurir.update', params: { id: kurir.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml 1" @click="destroy(kurir.id)">DELETE</button>
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
        let kurirs = ref([])
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/kurirs')
                .then(response => {
                    //assign state posts with response data
                    kurirs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })
        function update(id) {
            axios.delete(`http://localhost:8000/api/kurirs/${id}`, 
            {
                }).then(() => {
                    router.push({
                        name: 'kurir.index'
                    })
                }).catch(error => {
                    validation.value = error.response.data
                })
        }
        function destroy(id) {
            
            //delete data post by ID
            axios.delete('http://localhost:8000/api/kurirs/'+id)
            .then(() => {
                notif.error('Data Berhasil Dihapus')
        
                axios.get('http://localhost:8000/api/kurirs')
                .then(response => {
                    //assign state posts with response data
                    kurirs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
            //return
            return {
                kurirs,
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