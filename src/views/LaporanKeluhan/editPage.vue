<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT KELUHAN</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Barang</label>
                                <select class="form-control" v-model="laporan_keluhan.id_barang"
                                    placeholder="Masukkan barang Anda">
                                    <option disabled value="">Masukkan Nama Barang</option>
                                    <option v-for="(pengiriman_barang, id) in pengiriman_barangs" :key="id"
                                        v-bind:value="pengiriman_barang.id">
                                        {{ pengiriman_barang.nama_barang }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_barang" class="mt-2 alert alert-danger">
                                    {{
                                            validation.id_barang[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Laporan Keluhan</label>
                                <input type="text-area" class="form-control" v-model="laporan_keluhan.keluhan"
                                    placeholder="Masukkan Keluhan Anda!">
                                <!-- validation -->
                                <div v-if="validation.keluhan" class="mt-2 alert alert-danger">
                                    {{
        validation.keluhan[0]
                                    }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        const notif = window.toastr
        notif.option = {
            "closeButton": true,
            "timeOut": 1000,
        }
        let pengiriman_barangs = ref([])
        //state laporan_keluhan
        const laporan_keluhan = reactive({
            id_barang: '',
            keluhan: ''
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        const route = useRoute()

        onMounted(() => {
            //get API from Laravel Backend
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.get('http://localhost:8000/api/pengiriman_barangs')
                .then(response => {
                    //assign state posts with response data
                    pengiriman_barangs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.get(`http://localhost:8000/api/laporan_keluhans/${route.params.id}`)
                .then(response => {
                    //assign state posts with response data
                    laporan_keluhan.id_barang = response.data.data.id_barang
                    laporan_keluhan.keluhan = response.data.data.keluhan
                }).catch(error => {
                    console.log(error.response.data)
                })
        })
        //method store
        function update() {
            let id_barang = laporan_keluhan.id_barang
            let keluhan = laporan_keluhan.keluhan
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.put(`http://localhost:8000/api/laporan_keluhans/${route.params.id}`, {
                id_barang: id_barang,
                keluhan: keluhan
            }).then(() => {
                //redirect ke post index
                notif.success('Data Berhasil Disimpan')
                router.push({
                    name: 'laporan_keluhan.index'
                })
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }
        //return
        return {
            laporan_keluhan,
            pengiriman_barangs,
            validation,
            router,
            update
        }
    }
}
</script>
<style>
.toast-success {
    background-color: #28a745;
}
</style>
