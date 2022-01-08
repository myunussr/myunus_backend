<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">Reset Password</div>
                    <div class="card-body">
                        <form @submit.prevent="ResetPassword">
                            <div class="form-group">
                                <label for="email"> Email Address</label>
                                <input type="email" v-model="reset.email" class="form-control" name="email" placeholder="Email Address">
                            </div>
                            <div class="form-group">
                                <label for="password"> Password</label>
                                <input type="password" v-model="reset.password" class="form-control" name="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <label for="password">Password Confirmation</label>
                                <input type="password" v-model="reset.password_confirmation" class="form-control" name="password_confirmation" placeholder="Password">
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
                reset: {
                      token: this.$route.query.token,
                },
                validation: []
            }
        },
        methods: {
            ResetPassword() {
                let uri = `http://localhost:8000/api/reset-password`;
                this.axios.post(uri, this.reset)
                    .then((response) => {
                        this.$router.push({
                            name: 'login'
                        });
                    }).catch(error => {
                    this.validation = error.response.data.data;
                });
            }
        }
    }
</script>