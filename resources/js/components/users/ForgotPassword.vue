<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12" data-aos="zoom-out" data-aos-delay="100">
                <div class="card card-default">
                    <div class="card-header">Reset Password</div>
                    <div class="card-body">
                        <form @submit.prevent="ForgotPassword">
                            <div class="form-group">
                                <label for="email"> Email Address</label>
                                <input type="email" v-model="forgot.email" class="form-control" name="email" placeholder="Email Address">
                            </div>
                            <div class="form-group mt-4">
                                <button type="submit" class="btn btn-md btn-primary">Send</button>
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
                forgot: {},
                validation: []
            }
        },
        methods: {
            ForgotPassword() {
                let uri = 'http://localhost:8000/api/forgot-password';
                this.axios.post(uri, this.forgot)
                    .then((response) => {
                        this.$router.push({
                            name: 'login'
                        });
                         Vue.toasted.show('Please check your email!', 
                         {
                            theme: "toasted-primary", 
                            position: "top-center", 
                            duration : 5000
                       });
                    }).catch(error => {
                    this.validation = error.response.data.data;
                });
            }
        }
    }
</script>