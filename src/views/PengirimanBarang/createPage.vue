<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA BARANG YANG DIKRIM</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Barang</label>
                                <input type="text" class="form-control" v-model="pengiriman_barang.nama_barang"
                                    placeholder="Masukkan nama barang">
                                <!-- validation -->
                                <div v-if="validation.nama_barang" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama_barang[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pengirim</label>
                                <input class="form-control" v-model="pengiriman_barang.nama_pengirim" placeholder="Masukkan Nama Pengirim">
                                <!-- validation -->
                                <div v-if="validation.nama_pengirim" class="mt-2 alert alert-danger">
                                    {{ validation.nama_pengirim[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No Telp Pengirim</label>
                                <input class="form-control" type="number" v-model="pengiriman_barang.telp_pengirim"
                                    placeholder="Masukkan No Telp Pengirim">
                                <!-- validation -->
                                <div v-if="validation.telp_pengirim" class="mt-2 alert alert-danger">
                                    {{
                                            validation.telp_pengirim[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Berat Barang</label>
                                <input class="form-control" type="number" v-model="pengiriman_barang.berat_barang" placeholder="Masukkan Berat Barang">
                                <!-- validation -->
                                <div v-if="validation.berat_barang" class="mt-2 alert alert-danger">
                                    {{ validation.berat_barang[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Barang</label>
                                <select class="form-control" v-model="pengiriman_barang.jenis_barang" placeholder="Masukkan Jenis Barang">
                                    <option disabled value="">Masukkan Jenis Barang</option>
                                    <option>Mudah Pecah</option>
                                    <option>Tidak Mudah Pecah</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jenis_barang" class="mt-2 alert alert-danger">
                                    {{ validation.jenis_barang[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kota Asal</label>
                                <input class="form-control" v-model="pengiriman_barang.kota_asal"
                                    placeholder="Masukkan Kota Asal">
                                <!-- validation -->
                                <div v-if="validation.kota_asal" class="mt-2 alert alert-danger">
                                    {{
                                            validation.kota_asal[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kota Tujuan</label>
                                <input class="form-control" v-model="pengiriman_barang.kota_tujuan"
                                    placeholder="Masukkan Kota Tujuan">
                                <!-- validation -->
                                <div v-if="validation.kota_tujuan" class="mt-2 alert alert-danger">
                                    {{
                                            validation.kota_tujuan[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Estimasi</label>
                                <select class="form-control" v-model="pengiriman_barang.estimasi" placeholder="Masukkan Estimasi">
                                    <option disabled value="">Masukkan Estimasi</option>
                                    <option>1 Hari (OK)</option>
                                    <option>3 Hari (REG)</option>
                                    <option>6 Hari (HMT)</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.estimasi" class="mt-2 alert alert-danger">
                                    {{
                                            validation.estimasi[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Penerima</label>
                                <input class="form-control" v-model="pengiriman_barang.nama_penerima"
                                    placeholder="Masukkan Nama Penerima">
                                <!-- validation -->
                                <div v-if="validation.nama_penerima" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama_penerima[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No Telp Penerima</label>
                                <input class="form-control" type="number" v-model="pengiriman_barang.telp_penerima"
                                    placeholder="Masukkan No Telp Penerima">
                                <!-- validation -->
                                <div v-if="validation.telp_penerima" class="mt-2 alert alert-danger">
                                    {{
                                            validation.telp_penerima[0]
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        const notif = window.toastr
        notif.option = {
            "closeButton": true,
            "timeOut": 1000,
        }
        //state pengiriman barang
        const pengiriman_barang = reactive({
            nama_barang: '',
            nama_pengirim: '',
            telp_pengirim: '',
            berat_barang: '',
            jenis_barang: '',
            kota_asal: '',
            kota_tujuan: '',
            estimasi: '',
            nama_penerima: '',
            telp_penerima: ''
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            let nama_barang = pengiriman_barang.nama_barang
            let nama_pengirim = pengiriman_barang.nama_pengirim
            let telp_pengirim = pengiriman_barang.telp_pengirim
            let berat_barang = pengiriman_barang.berat_barang
            let jenis_barang = pengiriman_barang.jenis_barang
            let kota_asal = pengiriman_barang.kota_asal
            let kota_tujuan = pengiriman_barang.kota_tujuan
            let estimasi = pengiriman_barang.estimasi
            let nama_penerima = pengiriman_barang.nama_penerima
            let telp_penerima = pengiriman_barang.telp_penerima
            axios.post('http://localhost:8000/api/pengiriman_barangs', {
                nama_barang: nama_barang,
                nama_pengirim: nama_pengirim,
                telp_pengirim: telp_pengirim,
                berat_barang: berat_barang,
                jenis_barang: jenis_barang,
                kota_asal: kota_asal,
                kota_tujuan: kota_tujuan,
                estimasi: estimasi,
                nama_penerima: nama_penerima,
                telp_penerima: telp_penerima
            }).then(() => {
                //redirect ke post index
                notif.success('Data Berhasil Disimpan')
                router.push({
                    name: 'pengiriman_barang.index'
                })
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }
        //return
        return {
            pengiriman_barang,
            validation,
            router,
            store
        }
    }
}
</script>
<style>
    .toast-success {
        background-color: #28a745;
    }
</style>
