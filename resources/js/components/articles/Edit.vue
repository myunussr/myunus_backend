<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">Edit Article</div>
                    <div class="card-body">
                        <form @submit.prevent="ArticleUpdate">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" class="form-control" v-model="article.title"
                                       placeholder="Masukkan Title">
                                <div v-if="validation.title">
                                    <div class="alert alert-danger mt-1" role="alert">
                                        {{ validation.title[0] }}
                                    </div>
                                </div>
                            </div>
                             <div class="form-group">
                                <label for="excerpt">Excerpt</label>
                                <textarea class="form-control" id="excerpt" rows="3" v-model="article.excerpt"></textarea>
                                 <div v-if="validation.excerpt">
                                    <div class="alert alert-danger mt-1" role="alert">
                                        {{ validation.excerpt[0] }}
                                    </div>
                                </div>
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
                article: {},
                validation: [],
                token: localStorage.getItem('token')
            }
        },
        created() {
            let uri = `http://localhost:8000/api/articles/${this.$route.params.id}`;
            this.axios.get(uri).then((response) => {
                this.article = response.data.data;
            });
        },
        methods: {
            ArticleUpdate() {
                let uri = `http://localhost:8000/api/articles/${this.$route.params.id}`;
                this.axios.put(uri, this.article)
                    .then((response) => {
                        this.$router.push({name: 'articles'});
                         Vue.toasted.show('Updated article successfuly!', 
                            {
                                theme: "toasted-primary", 
                                position: "top-center", 
                                duration : 3000
                        });
                    }).catch(error => {
                    this.validation = error.response.data.data;
                });
            }
        },
        mounted(){
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        }
    }
</script>