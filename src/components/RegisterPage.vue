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
                                        <h4 class="mt-1 mb-5 pb-1">Join The Kirang GO!</h4>
                                    </div>

                                    <form @submit.prevent="register">
                                        <p>Please Sign Up</p>

                                        <div class="form-outline">
                                            <input v-model="user.name" type="text" id="typeNameX" class="form-control"
                                                placeholder="Insert Your Name" />
                                            <label class="form-label" for="form2Example11"></label>
                                        </div>
                                        <div v-if="validation.name" class="mt-2 alert alert-danger">
                                            {{ validation.name[0] }}
                                        </div>

                                        <div class="form-outline">
                                            <input v-model="user.email" type="text" id="typeEmailX" class="form-control"
                                                placeholder="Insert Your Email" />
                                            <label class="form-label" for="form2Example11"></label>
                                        </div>
                                        <div v-if="validation.email" class="mt-2 alert alert-danger">
                                            {{ validation.email[0] }}
                                        </div>

                                        <div class="form-outline">
                                            <input v-model="user.password" type="password" id="typePasswordX"
                                                class="form-control" placeholder="Insert Your Password" />
                                            <label class="form-label" for="form2Example22"></label>
                                        </div>
                                        <div v-if="validation.password" class="mt-2 alert alert-danger">
                                            {{ validation.password[0] }}
                                        </div>

                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                type="submit">Register</button>
                                        </div>

                                    </form>

                                    <div class="d-flex align-items-center justify-content-center pb-4">
                                        <p class="mb-0 me-2">Already have an account?</p>
                                        <router-link :to="{ name: 'Intro' }" class="btn btn-outline-danger">Login
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">Yuk Daftar dan kirimkan barang anda dengan cepat!</h4>
                                    <p class="small mb-0">Dijamin cepat dan tepat!</p>
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
      name: "",
      email: "",
      password: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //method register
    function register() {
      let name = user.name;
      let email = user.email;
      let password = user.password;
      axios
        .post("https://brg.jalanskuy.com/jasa_kirim_barang/public/api/register", {
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "Intro",
          });
          notif.success("Berhasil Register!");
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
      register,
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
    /* fallback for old browsers */
    background: #fccb90;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
   