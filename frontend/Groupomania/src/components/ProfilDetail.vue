<template>

    <div class="content">
        <div class="profil">
            <h2>Votre profil : </h2>
            <p>Bonjour, <span class="name">{{ user.name }}</span>, <span class="lastname">{{ user.lastname }}</span><br /></p>
                <img v-if="user.picture" :src="user.picture" alt="Photo de profil" class="picture" />
            <h3>Votre bio : </h3>
            <p id="bio">{{ user.bio }} <br /></p>

        </div>
        <div class="publication">
            <h2>Vos dernières publications</h2>
            <div v-for="(item) in messages" :key="item.id">
                <router-link :to="{ path: `/message/${item.id}`}" class="content__message">
                    <div class="message">
                        <h5><span class="name">{{ user.name }} <span class="lastname">{{ user.lastname }}</span></span></h5>
                        <p class="message__text">{{ item.content }}</p>
                    </div>
                    <div class="message__option">
                        <button class="message__option--like">j'aime (0)</button>
                        <button class="message__option--dislike">j'aime pas (0)</button>
                        <button class="message__option--comment">commenter</button>
                        <div class="message__option__lastcomment">
                            <h5>Dernier commentaire : </h5>
                            <p>nom de la personne</p>
                            <p>le commentaire : </p>
                        </div>
                    </div>
                </router-link>
            </div>  
        </div>

    </div>

</template>

<script>
const axios = require("axios"); 
export default {
    data() {
        return {
            user: [],
            messages: [],
            id: ''
        };
    },

    methods: {
        post() {
          addEventListener('click', (e) => {
              e.preventDefault()
              window.location.href = "/Post"
          })
      },

      profil() {
            addEventListener('click', (e) => {
                e.preventDefault()
                window.location.href = "/ProfilModify"
          })
      },

        async getUser() {
            const userId = this.id
            const token = localStorage.getItem("token")
            console.log("userId is ", userId)
            try {
                const response = await axios.get(
                    `http://localhost:3066/api/auth/profil/${userId}`,
                    {
                        headers: {
                            'authorization': token
                        }   
                    }
                );
                this.user = response.data;
                console.log(this.user)
            } catch (error) {
                console.log(error);
            }
        },

    async getMessages() {
        const userId = this.id
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get(
                   `http://localhost:3066/api/post/profil/${userId}`,
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
        },
    },

    created() {
        this.id = this.$route.params.id;
        this.getMessages();
        this.getUser();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 100%;
    display: flex;
    &__message {
        margin-top: 25px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 60px;
        display: flex;
    }
}
.publication {
    width: 70%;
}
.profil {
    width: 30%;
}
.btn {
    width: 75%;
    border-radius: 15px;
    height: 50px;
    background-color: #ffd6d8;
    transform: scale(1);
    transition-property: transform;
    transition-duration: 500ms;
    &:hover {
      transform: scale(1.15);
    }
}

.message {
    border: 5px solid #F53008;
    width: 75%;
    text-align: justify;
    padding: 25px;
    border-radius: 15px 0 0 15px;
    &__option {
        width: 20%;
        border: 5px solid #F53008;
        border-radius: 0 15px 15px 0;
        &--like, &--dislike {
            width: 50%;
            height: 10%;
            &:hover {
                background-color: #ffd6d8;
            }
        }
        &--comment {
            width: 100%;
            height: 10%;
            margin-top: 50px;
            &:hover {
                background-color: #ffd6d8;
            }
        }
        &--modif {
            width: 100%;
            height: 10%;
            &:hover {
                background-color: #ffd6d8;
            }
        }
    }
}
.name {
    text-transform: uppercase;
}

.lastname {
    text-transform: capitalize; 
}
.picture {
    width: 100px; 
    height: 100px;
}
</style>
