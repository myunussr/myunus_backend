<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-7">
                 <div v-if="authenticated">
                    <router-link :to="{ name: 'create' }" class="btn btn-md btn-light">Add Article</router-link>
                 </div>
                 <div v-else>
                    <router-link :to="{ name: 'login' }" class="btn btn-md btn-light">Create Article</router-link>
                 </div>
            </div>
            <div class="col-auto">
                <div v-if="authenticated">
                    <router-link :to="{ name: 'logout' }" class="btn btn-md btn-light">Logout</router-link>
                    <!-- <router-link :to="{ name: 'register' }" class="btn btn-md btn-light">Register</router-link> -->
                </div>
            </div>
            <div class="row">
                <div class="col-auto d-flex flex-wrap align-items-center">
                    <div class="card m-2" style="width: 50rem;" v-for="(article, index) in articles" :key="article.id">
                        <div class="card-body" >
                            <h5 class="card-title">{{ article.title }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ article.user.name }}</h6>
                            <p class="card-text">{{ article.excerpt }}</p>
                            <div v-if="authenticated">
                                <router-link :to="{name: 'edit', params: { id: article.id }}"  class="btn btn-sm btn-primary">Edit</router-link>
                                <button @click.prevent="ArticleDelete(article.id, index)" class="btn btn-sm btn-light">Remove</button>
                            </div>
                        </div>
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
                articles: [],
                token: localStorage.getItem('token'),
                authenticated: localStorage.getItem('loggedIn'),
            }
        },
        created() {
            let uri = `http://localhost:8000/api/articles`;
            this.axios.get(uri).then(response => {
                this.articles = response.data.data;
            });
        },
        methods: {
            ArticleDelete(id, index)
            {
                this.axios.delete(`http://localhost:8000/api/articles/${id}`)
                    .then(response => {
                        this.articles.splice(index, 1);
                    }).catch(error => {
                   console.log("ERRRR:: ",error.response.data);
                });
     
        }
        },
         mounted(){
            //    this.user = || false;
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        }
    }
</script>