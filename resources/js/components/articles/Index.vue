<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-9">
                 <div v-if="authenticated">
                    <router-link :to="{ name: 'create' }" class="btn btn-md btn-light" data-aos="fade-in" data-aos-delay="100">Add Article</router-link>
                 </div>
                 <div v-else>
                    <router-link :to="{ name: 'login' }" class="btn btn-md btn-light" >Create Article</router-link>
                 </div>
            </div>
            <div class="col-auto">
                <div v-if="authenticated">
                    <li v-on:click="logout" class="btn btn-md btn-light ml-5" data-aos="fade-in" data-aos-delay="100">Logout</li>
                </div>
            </div>
            <div class="row">
                <div class="col-auto d-flex flex-wrap align-items-center mt-4" v-for="(article, index) in articles" :key="article.id">
                    <div class="card h-100" style="width: 20rem;" data-aos="fade-up" :data-aos-delay="article.id * 50">
                        <div class="card-body">
                            <h5 class="card-title">{{ article.title }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ article.user.name }}</h6>
                            <p class="card-text">{{ article.excerpt }}</p>
                            <div v-if="article.user_id === user">
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
                user: [],
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
             logout() {
                axios.get('http://localhost:8000/api/logout')
                .then(() => {
                    Vue.toasted.show('Logout successfuly!', 
                    {
                        theme: "toasted-primary", 
                        position: "top-center", 
                        duration : 3000
                    });
                    localStorage.removeItem("loggedIn")    
                    return this.$router.push({ name: 'login' })
                })
            },
            getUser() {
                axios.get('http://127.0.0.1:8000/api/profile')
                .then((response) => {
                     this.user = response.data.id;
                })
            },
            ArticleDelete(id, index)
            {
                this.axios.delete(`http://localhost:8000/api/articles/${id}`)
                    .then(response => {
                        this.articles.splice(index, 1);
                        Vue.toasted.show('Remove Article successfully!', 
                        {
                            theme: "toasted-primary", 
                            position: "top-center", 
                            duration : 5000
                       });
                    }).catch(error => {
                   console.log("ERRRR:: ",error.response.data);
                });
            }
        },
         mounted(){
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            this.getUser();
        }
    }
</script>