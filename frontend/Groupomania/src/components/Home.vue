<template>

    <div class="content">
        <button class="btn" id="btn" @click="post">
            créer une publication
        </button>
        <div v-for="(item) in messages" :key="item.id" class="content__message">
            <div class="message" @click="windowHref(item.id)">
                <h5><span class="name">{{ item.name }} <span class="lastname">{{ item.lastname }}</span></span></h5>
                <p class="message__text">{{ item.content }}</p>
                <img v-if="item.picture" :src="item.picture" alt="ilustration picture" class="picture" />
            </div>
            <div class="message__option">
                <button class="message__option--comment" @click="windowHref(item.id)">commenter</button>
                <div class="message__option__lastcomment">
                    <h5>Dernier commentaire : </h5>
                    <p :id='item.id'></p>
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
                console.log(this.messages)
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
        await this.getComment();
        await this.displayComment();
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
        &--comment {
            cursor: pointer;
            width: 100%;
            height: 30px;
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

.name {
    text-transform: uppercase;
}

.lastname {
    text-transform: capitalize; 
}
</style>
