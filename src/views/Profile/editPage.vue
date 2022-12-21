<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
                <h3>EDIT PROFILE</h3>
              <hr />
              <form @submit.prevent="update">
                <div class="form-group mb-3">
                  <label class="form-label">Nama Pengguna</label>
                  <input type="text" class="form-control" v-model="user.name" placeholder="Masukkan nama pengguna" />
                  <!-- validation -->
                  <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">Email</label>
                  <input class="form-control" v-model="user.email" placeholder="Masukkan Email" />
                  <!-- validation -->
                  <div v-if="validation.email" class="mt-2 alert alert-danger">
                    {{ validation.email[0] }}
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
  import { reactive, ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  export default {
    setup() {
      const notif = window.toastr
        notif.option = {
            "closeButton": true,
            "timeOut": 1000,
        }
      //state user
      const user = reactive({
        id: "",
        name: "",
        email: "",
      });
      //state validation
      const validation = ref([]);
      //vue router
      const router = useRouter();
      onMounted(() => {
        user.id = localStorage.getItem("id");
        user.name = localStorage.getItem("name");
        user.email = localStorage.getItem("email");
      });
      //method store
      function update() {
        let name = user.name;
        let email = user.email;
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
        axios
          .post(
            `http://localhost:8000/api/user/${user.id}`,
            {
              name: name,
              email: email,
            }
          )
          .then((response) => {
            localStorage.setItem("name", response.data.data.name);
            localStorage.setItem("email", response.data.data.email);
            //redirect ke post index
            notif.success("Berhasil Edit Profile!")
            router.push({
              name: "profile.index",
            });
          })
          .catch((error) => {
            //assign state validation with error
            validation.value = error.response.data;
          });
      }
      //return
      return {
        user,
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
  