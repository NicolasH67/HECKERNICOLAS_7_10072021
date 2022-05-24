<template>

    <div class="content">
        
        <div class="content__message">
            <div class="message">
                <h5><router-link :to="{ path: `/profil/${user.id}`}"><span class="name">{{ user.name }} <span class="lastname">{{ user.lastname }}</span></span></router-link></h5>
                <p class="message__text">{{ message.content }}</p>
                <img v-if="message.picture" :src="message.picture" alt="ilustration" class="picture" />
            </div>
        </div>

        <form class="form" @submit.prevent="postComments">
            <br />
            <textarea name="commentaire" id="comment" cols="100" rows="1"></textarea><button>publiez</button>
        </form>

        <div v-for="(item) in comments" :key="item.id">
            <div class="comment">
                <h5><span class="name">nom <span class="lastname">prenom</span></span></h5>
                <p class="message__text">{{ item.content }}</p>
            </div>
        </div>
    </div>

</template>

<script>
const axios = require("axios")
export default {
    data() {
        return {
            message: [],
            user: [],
            comments: [],
            id: '',
        };
    },

    methods: {
        post() {
          addEventListener('click', (e) => {
              e.preventDefault()
              window.location.href = "/Post"
          })
      },
      
      async postComments() {
          const messageId = this.id;
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token');
            try {
                const content = document.getElementById('comment').value;

                this.submitted = true;
                axios.post(`http://localhost:3066/api/comment`, 
                {
                    UserId: userId, 
                    MessageId: messageId, 
                    content: content
                }, {
                    headers: {
                        authorization: token
                    }
                })
                .then(function(response) {
                    console.log(response.status);
                    window.location.href = `/message/${messageId}`;
                })
                .catch(function(error) {
                    console.log(error);
                });
                } catch (error) {
                    console.log(error);
                } 
      },

      async getUser() {
            const userId = this.message.UserId;
            console.log(userId)
            const token = localStorage.getItem("token")
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
            } catch (error) {
                console.log(error);
            }
        },

        async getMessages() {
            const token = localStorage.getItem("token")
            const idMessage = this.id;
            console.log(this.id)
            try {
                const response = await axios.get(
                   `http://localhost:3066/api/post/${idMessage}`,
                   {
                       headers: {
                           'authorization': token
                       }
                   }
                );
                this.message = response.data;
                console.log(this.message)
            } catch (error) {
                console.log(error);
            }
        },

        async getComment() {
            const token = localStorage.getItem("token")
            const idMessage = this.id;
            try {
                const response = await axios.get(
                   `http://localhost:3066/api/comment/${idMessage}`,
                   {
                       headers: {
                           'authorization': token
                       }
                   }
                );
                this.comments = response.data;
                console.log(this.comments)
            } catch (error) {
                console.log(error);
            }
        },
        
    },

    async created() {
        this.id = this.$route.params.id;
        await this.getMessages();
        this.getUser();
        await this.getComment();
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

.message {
    border: 5px solid #F53008;
    width: 100%;
    text-align: justify;
    padding: 15px;
    border-radius: 15px;
}

.name {
    text-transform: uppercase;
}

.lastname {
    text-transform: capitalize; 
}
.picture {
    height: 300px;
}

.comment {
    margin-top: 20px;
    border: 5px solid #F53008;
    width: 90%;
    text-align: justify;
    padding: 15px;
    border-radius: 15px;
}
</style>
