<template>

    <div class="content">
        <h1 class="title">Bienvenue sur la Page d'administration de Groupomania.fr</h1>

        <section>
            <div class="user">
                <h3 class="user__title">Nombre d'utilisateur</h3>
                <span class="user__count">{{ users }}</span><br /> 
                <router-link to="/Admin/User">Voir tout les profils</router-link>
            </div>

            <div class="post">
                <h3 class="post__title">Nombre de Message</h3>
                <span class="post__count">{{ messages }}</span><br /> 
                <router-link to="/Admin/Post">Voir tout les Messages</router-link>
            </div>
        </section>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            users: '',
            messages: ''
        };
    },

    methods: {
        async getCountUsers() {
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(
                    `http://localhost:3066/api/admin//Count/Users`,
                    {
                        headers: {
                            'authorization': token
                        }   
                    }
                );
                this.users = response.data;
                console.log(this.users)
            } catch (error) {
                console.log(error);
            }
        },
        
        async getCountMessages() {
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(
                    `http://localhost:3066/api/admin//Count/Messages`,
                    {
                        headers: {
                            'authorization': token
                        }   
                    }
                );
                this.messages = response.data;
                console.log(this.messages)
            } catch (error) {
                console.log(error);
            }
        }
    },

    async created() {
        await this.getCountMessages();
        await this.getCountUsers();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 100%;
}

.title {
    color: red;
    font-style: italic;
}

section {
    display: flex;
    flex: auto;
}

.user, .post {
    margin: 20px;
    width: 45%;
    border: 5px solid #F53008;
    border-radius: 20px;
    padding: 20px;
    &__count {
        font-size: 2rem;
    }
}
</style>