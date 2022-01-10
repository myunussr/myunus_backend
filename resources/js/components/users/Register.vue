<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12" data-aos="zoom-in" data-aos-delay="200">
                <div class="card card-default">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form @submit.prevent="RegisterStore">
                            <div class="form-group">
                                <label for="name"> First Name</label>
                                <input type="text" v-model="register.name" class="form-control" name="name" placeholder="First name">
                                 <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        Masukkan Nama
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email"> Email Address</label>
                                <input type="email" v-model="register.email" class="form-control" name="email" placeholder="Email Address">
                                  <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        Masukkan Email
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password"> Password</label>
                                <input type="password" v-model="register.password" class="form-control" name="password" placeholder="Password">
                                  <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        Masukkan Password
                                </div>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="visitor" name="roles" class="custom-control-input" v-model="register.roles"  v-bind:value="'VISITOR'" checked>
                                <label class="custom-control-label" for="visitor">Visitor</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="author" name="roles" class="custom-control-input" v-model="register.roles" v-bind:value="'AUTHOR'">
                                <label class="custom-control-label" for="author">Author</label>
                            </div>
                            <div class="form-group mt-4">
                                <button type="submit" class="btn btn-md btn-primary">Save</button>
                                <router-link :to="{ name: 'articles' }" class="btn btn-md btn-light">Back</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                register: {},
                validation: []
            }
        },
        methods: {
            RegisterStore() {
                let uri = 'http://localhost:8000/api/register';
                this.axios.post(uri, this.register)
                    .then((response) => {
                        this.$router.push({
                            name: 'login'
                        });
                        Vue.toasted.show('Created account successfuly!', 
                        {
                            theme: "toasted-primary", 
                            position: "top-center", 
                            duration : 3000
                        });
                    }).catch(error => {
                    this.validation = error.response.data.data;
                    this.$alert(error.response.data.errors.email[0])
                });
                this.validation = []
                if (!this.register.name) {
                    this.validation.name = true
                }
                if (!this.register.email) {
                    this.validation.email = true
                }
                if (!this.register.password) {
                    this.validation.password = true
                }
            }
        }
    }
</script>