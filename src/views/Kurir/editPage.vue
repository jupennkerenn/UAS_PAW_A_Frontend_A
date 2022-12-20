<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>EDIT BARANG</h4>
            <hr />
            <form @submit.prevent="update">
              <div class="form-group mb-3">
                <label class="form-label">Nama Kurir</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="kurir.nama_kurir"
                  placeholder="Masukkan Nama Kurir"
                />
                <!-- validation -->
                <div
                  v-if="validation.nama_kurir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.nama_kurir[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Umur Kurir</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="kurir.umur_kurir"
                  placeholder="Masukkan Umur Kurir"
                />
                <!-- validation -->
                <div
                  v-if="validation.umur_kurir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.umur_kurir[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">No Telp Kurir</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="kurir.telp_kurir"
                  placeholder="Masukkan No Telp Kurir"
                />
                <!-- validation -->
                <div
                  v-if="validation.telp_kurir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.telp_kurir[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Gender Kurir</label>
                <select
                  class="form-control"
                  v-model="kurir.gender_kurir"
                  placeholder="Pilih Gender"
                >
                  <option disabled value="">Pilih Gender</option>
                  <option>Pria</option>
                  <option>Wanita</option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.gender_kurir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.gender_kurir[0] }}
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
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const notif = window.toastr;
    notif.option = {
      closeButton: true,
      timeOut: 1000,
    };
    //state Kurir
    const kurir = reactive({
      nama_kurir: "",
      umur_kurir: "",
      telp_kurir: "",
      gender_kurir: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();

    const route = useRoute();

    onMounted(() => {
      //get API from Backend
      axios
        .get(`http://localhost:8000/api/kurirs/${route.params.id}`)
        .then((response) => {
          //assign state posts with response data
          kurir.nama_kurir = response.data.data.nama_kurir;
          kurir.umur_kurir = response.data.data.umur_kurir;
          kurir.telp_kurir = response.data.data.telp_kurir;
          kurir.gender_kurir = response.data.data.gender_kurir;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let nama_kurir = kurir.nama_kurir;
      let umur_kurir = kurir.umur_kurir;
      let telp_kurir = kurir.telp_kurir;
      let gender_kurir = kurir.gender_kurir;
      axios
        .put(`http://localhost:8000/api/kurirs/${route.params.id}`, {
          nama_kurir: nama_kurir,
          umur_kurir: umur_kurir,
          telp_kurir: telp_kurir,
          gender_kurir: gender_kurir,
        })
        .then(() => {
          //redirect ke post index
          notif.success("Data Berhasil Diedit");
          router.push({
            name: "kurir.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }
    //return
    return {
      kurir,
      validation,
      router,
      update,
    };
  },
};
</script>
<style>
.toast-success {
  background-color: #28a745;
}
</style>
