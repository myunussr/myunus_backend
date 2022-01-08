<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">Add Article</div>
                    <div class="card-body">
                        <form @submit.prevent="ArticleStore">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" class="form-control" v-model="article.title"
                                       placeholder="Masukkan Title">
                            </div>
                            <div class="form-group">
                                <label for="excerpt">Excerpt</label>
                                <textarea class="form-control" id="excerpt" rows="3" v-model="article.excerpt"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="body">Body</label>
                                <textarea class="form-control" id="body" rows="10" v-model="article.body"></textarea>
                                 <div v-if="validation.body">
                                    <div class="alert alert-danger mt-1" role="alert">
                                        {{ validation.body[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
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
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                article: {},
                validation: [],
                token: localStorage.getItem('token')
            }
        },
        methods: {
            ArticleStore() {
                let uri = 'http://localhost:8000/api/articles';
                this.axios.post(uri, this.article)
                    .then((response) => {
                        this.$router.push({
                            name: 'articles'
                        });
                    }).catch(error => {
                         console.log("ERRRR:: ",error.response.data);
                });
            }
        },
        mounted(){
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        }
    }
</script>