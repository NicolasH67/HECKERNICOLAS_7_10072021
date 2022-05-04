<template>

    <div class="content">
        <button class="btn" id="btn" @click="post">
            créer une publication
        </button>
        <div v-for="(item) in messages" :key="item.id" class="content__message">
            <div class="message" @click="windowHref(item.id)">
                <h5><span class="name">{{ user.name }} <span class="lastname">{{ user.lastname }}</span></span></h5>
                <p class="message__text">{{ item.content }}</p>
                <img v-if="item.picture" :src="item.picture" alt="ilustration picture" class="picture" />
            </div>
            <div class="message__option">
                <button class="message__option--like">j'aime (0)</button>
                <button class="message__option--dislike">j'aime pas (0)</button>
                <button class="message__option--comment" @click="windowHref(item.id)">commenter</button>
                <div class="message__option__lastcomment">
                    <h5>Dernier commentaire : </h5>
                    <p>nom de la personne</p>
                    <p>le commentaire : </p>
                </div>
            </div>
        </div>
      
    </div>

</template>

<script>
const axios = require("axios")
export default {
    data() {
        return {
            messages: [],
            user: [],
        };
    },

    methods: {
        post() {
          addEventListener('click', (e) => {
              e.preventDefault()
              window.location.href = "/Post"
          })
      },

        async getMessages() {
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(
                   `http://localhost:3066/api/post`,
                   {
                       headers: {
                           'authorization': token
                       }
                   }
                );
                this.messages = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async getUsers() {
            const userId = localStorage.getItem("userId")
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

        windowHref(id) {
            addEventListener('click', (e) => {
                console.log(id)
                e.preventDefault()
                window.location.href = `/message/${id}`
          })
        }
    },

    async created() {
        await this.getMessages();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 100%;
    &__message {
        margin-top: 25px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 60px;
        display: flex;
    }
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
    cursor: pointer;
    border: 5px solid #F53008;
    width: 75%;
    text-align: justify;
    padding: 15px;
    border-radius: 15px 0 0 15px;
    &__option {
        width: 20%;
        border: 5px solid #F53008;
        border-radius: 0 15px 15px 0;
        &--like, &--dislike {
            width: 50%;
            height: 10%;
            cursor: pointer;
            &:hover {
                background-color: #ffd6d8;
            }
        }
        &--comment {
            cursor: pointer;
            width: 100%;
            height: 10%;
            margin-top: 50px;
            &:hover {
                background-color: #ffd6d8;
            }
        }
    }
}
.picture {
    height: 300px;
}
.link {
    width: 100%;
}
</style>
