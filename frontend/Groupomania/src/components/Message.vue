<template>

    <div class="content">
        <div class="content__message">
            <div class="message">
                <h5>nom de la personne</h5>
                <p class="message__text">{{ message.content }}</p>
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
        </div>
      
    </div>

</template>

<script>
const axios = require("axios")
export default {
    data() {
        return {
            messages: [],
            id:'',
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
    }
}
</style>
