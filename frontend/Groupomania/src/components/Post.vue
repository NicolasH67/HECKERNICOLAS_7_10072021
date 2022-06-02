<template>

    <div class="content">
      <h2>Votre Message : </h2>
        <form class="form" @submit.prevent="postMessage">
            <div class="content__message">
              <textarea
                name="txt"
                id="message"
                class="txt"
                rows="10"
                cols="75">
              </textarea><br />
              <label for="picture--option">Voulez-vous ajoutez une Image</label><br />
              <input type="radio" name="picture--option" id="yes" value="Oui"><label for="yes">oui</label><br />
              <input type="radio" name="picture--option" id="No" value="Non" checked><label for="no">non</label><br />
              <input
                type="file"
                id="file"
                name="file"
                ref="file"
                v-on:change="handleFileUpload()"
                accept="image/png, image/jpeg, image/jpg"/><br /> <br />
              <button class="btn">Publier</button>
            </div>


        </form>
    </div>

</template>

<script>
const axios = require('axios');
export default {
  date() {
    return {
      user: [],
      file: ''
    };
  },

  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    async getUser() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      console.log('userId is ', userId);
      try {
        const response = await axios.get(
          `http://localhost:3066/api/auth/profil/${userId}`,
          {
            headers: {
              authorization: token
            }
          }
        );
        this.user = response.data;
        console.log(this.user);
      } catch (error) {
        console.log(error);
      }
    },

    async postMessage() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const content = document.getElementById('message').value; 
        const picture = this.file;
        console.log(picture)

        const formData = new FormData(); 
        formData.append('idUSERS', userId); 
        formData.append('picture', picture); 
        formData.append('content', content); 
        formData.append('name', this.user.name); 
        formData.append('lastname', this.user.lastname); 

        this.submitted = true;
        axios
          .post(`http://localhost:3066/api/post`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: token
            }
          })
          .then(function(response) {
            console.log(response.status);
            window.location.href = '/home';
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      } 
    }
  }, 

  async created() {
        await this.getUser();
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  margin-right: auto;
  margin-left: auto;
}
#txt {
    border-radius: 20px;
    padding: 20px;
}
.txt--label {
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
}

.btn {
    color: #000000;
    font-weight: bold;
    background: linear-gradient(0deg, rgba(245,48,8,1) 0%, rgba(255,174,158,1) 45%);
    padding: 15px 30px 15px 30px;
    border-radius: 40px;
    transform: scale(1);
    transition-property: transform;
    transition-duration: 500ms;
    &:hover {
      transform: scale(1.15);
    }
}
#yes:checked ~ #file {
    display: block;
}
#file {
    display: none;
    margin-right: auto;
    margin-left: auto;
}

#message {
  width: 100%;
}
</style>
