<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                  <div class="text-center">
                    <h4 class="mt-1 mb-5 pb-1">We are The Kirang GO! Team</h4>
                  </div>

                  <form @submit.prevent="login">
                    <p>Please login to your account</p>

                    <div class="form-outline">
                      <input v-model="user.email" type="email" id="typeEmailX" class="form-control"
                        placeholder="Email" />
                      <label class="form-label" for="form2Example11"></label>
                    </div>
                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                      {{ validation.email[0] }}
                    </div>

                    <div class="form-outline">
                      <input v-model="user.password" type="password" id="typePasswordX" class="form-control"
                        placeholder="Password" />
                      <label class="form-label" for="form2Example22"></label>
                    </div>
                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                      {{ validation.password[0] }}
                    </div>

                    <div class="text-center pt-1 mb-5 pb-1">
                      <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="submit">Login</button>
                    </div>

                  </form>
                  <div v-if="loginFailed" class="alert alert-danger">Email/Password Incorrect.</div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <router-link :to="{ name: 'Register' }" class="btn btn-outline-danger">Sign Up </router-link>
                  </div>

                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">Bersama Kirang, Kirim Barang Jadi Gampang!</h4>
                  <p class="small mb-0">Bagi kamu yang mau barangnya cepat sampai dan mulus sampai tujuan UHUY!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const notif = window.toastr;
    notif.option = {
            closeButton: true,
            timeOut: 1000,
        };
    //state user
    const user = reactive({
      email: "",
      password: "",
    });
    //state validation
    const validation = ref([]);
    //state login failed
    const loginFailed = ref(null);
    //vue router
    const router = useRouter();
    //method store
    function login() {
      let email = user.email;
      let password = user.password;
      axios
        .post("https://brg.jalanskuy.com/jasa_kirim_barang/public/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("token", response.data.access_token);
          //redirect ke post index
          router.push({
            name: "beranda",
          })
          notif.success("Berhasil Login!");
        })
        .catch(() => {
          //assign state validation with error
          // validation.value = error.response.user;
          loginFailed.value = true;
        });
    }
    //return
    return {
      user,
      validation,
      loginFailed,
      router,
      login,
    };
  },
};
</script>
<style>
.toast-success {
  background-color: #28a745;
}
</style>
<style scoped>
.gradient-custom-2 {

  background: #fccb90;

  background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

  background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}

@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
}
</style>
  