<template>
  <div class="container mt-4 mb-4 p-3 d-flex justify-content-center gradient-custom-2">
    <div class="card p-4 ">
      <div class=" image d-flex flex-column justify-content-center align-items-center "> <button
          class="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button>
        <span class="name mt-3">{{ user.name }}</span> <span class="idd">{{ user.email }}</span>
        <div class="d-flex flex-row justify-content-center align-items-center mt-3"> <span class="number"><span
              class="follow">User</span></span> </div>
        <div class=" d-flex mt-2"> 
          <router-link :to="{ name: 'profile.update' }" class="btn btn-outline-danger">EditProfile</router-link> 
        </div>
        <div class="text mt-3"> <span>Terima kasih telah mendaftar dan menjadi bagian dari Kirang GO!<br><br>Terus tetap
            menggunakan jasa kami karena dengan Kirang GO!, Kirim Barang jadi Gampang!!!</span> </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const user = reactive({
      name: "",
      email: "",
    });
    //mounted
    onMounted(() => {
      user.name = localStorage.getItem("name");
      user.email = localStorage.getItem("email");
    });
    //return
    return {
      user,
    };
  },
};
</script>