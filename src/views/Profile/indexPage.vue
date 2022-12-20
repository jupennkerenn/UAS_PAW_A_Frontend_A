<template>
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0"><img class="avatar avatar-lg p-1"
                        src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png" alt="Jassa Rich"></div>
                <div class="flex-grow-1 ps-3">
                    <h4>Jassa Rich</h4>
                    <p class="text-muted mb-0">Coder</p>
                </div>
            </div>
        </div>
    </div>

    <form class="card mb-4">
        <h4 class="card-heading">Edit Profile</h4>
        <div class="card-body">
            <div class="row">
                <div class="col-md-5">
                    <div class="mb-4">
                        <label class="form-label">Username</label>
                        <input class="form-control" type="text" placeholder="Company" value="Jassa Rich">
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="mb-4">
                        <label class="form-label">Password</label>
                        <input class="form-control" type="text" placeholder="Username" value="Jassa">
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <button class="btn btn-primary" type="submit">Update Profile</button>
        </div>
    </form>
</template>
<script>
  import axios from "axios";
  import { useRoute  } from 'vue-router'
  import { onMounted, reactive } from "vue";
  export default {
    setup() {
      //reactive state
      const users = reactive({
        name: '',
        email: '',
      })
      //vue route
      const route = useRoute()

      onMounted(() => {
        //get API from Laravel Backend
        axios.get(`http://localhost:8000/api/users/${route.params.id}`)
          .then((response) => {
            //assign state posts with response data
            users.name = response.data.data.name,
            users.email = response.data.data.email
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });

      return{
            users,
            route
      }
    }
  }
</script>