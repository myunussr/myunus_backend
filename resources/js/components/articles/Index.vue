<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Articles</div>
                    <div class="card-body">
                        <router-link :to="{ name: 'create' }" class="btn btn-md btn-success">Add Article</router-link>
                        <div class="row">
                            <div class="col-auto d-flex flex-wrap align-items-center">
                                <div class="card m-3" style="width: 18rem;" v-for="(article, index) in articles" :key="article.id">
                                    <div class="card-body" >
                                        <h5 class="card-title">{{ article.title }}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{{ article.title }}</h6>
                                        <p class="card-text">{{ article.excerpt }}</p>
                                        <a href="#" class="card-link">Detail</a>
                                        <a href="#" class="card-link">Remove</a>
                                    </div>
                                </div>
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
                articles: []
            }
        },
        created() {
            let uri = `http://localhost:8000/api/articles`;
            this.axios.get(uri).then(response => {
                this.articles = response.data.data;
            });
        }
    }
</script>