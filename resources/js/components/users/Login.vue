<template>
    <div class="login">
        <div class="container" style="margin-top:100px">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div v-if="loginFailed" class="alert alert-danger">
                       Your email or password is wrong. don't forget just Author can login.
                    </div>
                    <div class="card" data-aos="zoom-in" data-aos-delay="400">
                        <div class="card-body">
                            Login
                            <hr>
                            <form @submit.prevent="login">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="user.email"
                                        placeholder="Masukkan Email" autofocus> 
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        Masukkan Email
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" v-model="user.password"
                                        placeholder="Masukkan Password">
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        Masukkan Password
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                                <router-link :to="{ name: 'register' }" class="btn btn-md btn-light">Sign up</router-link>
                                <router-link :to="{ name: 'forgot' }" class="btn btn-md btn-link">Forgot password?</router-link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                loggedIn: localStorage.getItem('loggedIn'),
                token: localStorage.getItem('token'),
                user: [],
                validation: [],
                loginFailed: null
            }
        },
        methods: {
            login() {
                if (this.user.email && this.user.password) {
                    axios.get('http://localhost:8000/sanctum/csrf-cookie')
                        .then(response => {
                            axios.post('http://localhost:8000/api/login', {
                                email: this.user.email,
                                password: this.user.password
                            }).then(res => {
                                if (res.data.success) {
                                    localStorage.setItem("loggedIn", "true")
                                    localStorage.setItem("token", res.data.token)
                                    this.loggedIn = true
                                    return this.$router.push({ name: 'articles' })
                                } else {
                                    this.loginFailed = true
                                }
                            }).catch(error => {
                                  Vue.toasted.show('I am sorry you are cannot login, because you are not Author!', {
                                        theme: "toasted-primary", 
                                        position: "top-center", 
                                        duration : 3000
                                  });
                            })

                        })
                }
                this.validation = []
                if (!this.user.email) {
                    this.validation.email = true
                }
                if (!this.user.password) {
                    this.validation.password = true
                }

            }
        },
        mounted() {
            if (this.loggedIn) {
                return this.$router.push({ name: 'articles' })
            }
        },
    }
</script>
