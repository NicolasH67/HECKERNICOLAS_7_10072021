<template>

    <div class="content">
        <div class="profil">
            <button class="btn" id="ProfilBtn" @click="profil">
                Modifier mon profil
            </button>
            <h2>Votre profil : </h2>
            <p>Bonjour, <span class="name">{{ user.name }}</span>, <span class="lastname">{{ user.lastname }}</span><br /></p>
                <img v-if="user.picture" :src="user.picture" alt="Photo de profil" class="picture" />
            <h3>Votre bio : </h3>
            <p id="bio">{{ user.bio }} <br /></p>
            <button v-if="user.isAdmin === true" class="btn" @click="isAdmin">Page Admin</button>
        </div>
        <div class="publication">
            <button class="btn" id="btn" @click="post">
                créer une publication
            </button>
            <h2>Vos dernières publications</h2>
            <div v-for="(item) in messages" :key="item.id" class="content__message">
                <div class="message" @click="windowHref(item.id)">
                    <h5><span class="name">{{ user.name }} <span class="lastname">{{ user.lastname }}</span></span></h5>
                    <p class="message__text">{{ item.content }}</p>
                    <img v-if="item.picture" :src="item.picture" alt="ilustration picture" class="picture--message" />
                </div>
                <div class="message__option">
                    <button class="message__option--modify" @click="postModify(item.id)">Modifier ou supprimer la Publication</button>
                    <button class="message__option--comment" @click="windowHref(item.id)">commenter</button>
                    <div class="message__option__lastcomment">
                        <h5>Dernier commentaire : </h5>
                        <p :id="item.id"></p>
                    </div>
                </div>
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
            comment: [],
        };
    },

    methods: {
        post() {
            addEventListener('click', (e) => {
                e.preventDefault()
                window.location.href = "/Post"
            })
        },
        
        isAdmin() {
            addEventListener('click', (e) => {
                e.preventDefault()
                window.location.href = "/Admin"
            })
        },
        
        postModify(id) {
            addEventListener('click', (e) => {
                e.preventDefault()
                window.location.href = `/PostModify/${id}`
            })
        },

    windowHref(id) {
        addEventListener('click', (e) => {
            console.log(id)
            e.preventDefault()
            window.location.href = `/message/${id}`
        })
    },

      profil() {
            addEventListener('click', (e) => {
                e.preventDefault()
                window.location.href = "/ProfilModify"
          })
      },

        async getUser() {
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

    async getMessages() {
        const userId = localStorage.getItem("userId")
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

        async getComment() {
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(
                   `http://localhost:3066/api/admin/comment`,
                   {
                       headers: {
                           'authorization': token
                       }
                   }
                );
                this.comment = response.data;
                console.log(this.comment)
            } catch (error) {
                console.log(error);
            }
        },

        displayComment() {
            this.comment.forEach(comment => {
                let content = comment.content;
                let id = comment.MessageId;
                let item = document.getElementById(`${id}`);
                item.textContent = content;
            })
        }
    },

    async created() {
        await this.getMessages();
        await this.getUser();
        await this.getComment();
        await this.displayComment()
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
    cursor: pointer;
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
    padding: 25px;
    border-radius: 15px 0 0 15px;
    &__option {
        width: 25%;
        border: 5px solid #F53008;
        border-radius: 0 15px 15px 0;
        &--modify {
            margin-bottom: 15px;
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
        &--modif {
            width: 100%;
            height: 10%;
            &:hover {
                background-color: #ffd6d8;
            }
        }
        &__lastcomment {
            padding-bottom: 50px;
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
    &--message {
        width: 100%;
    }
}
</style>
