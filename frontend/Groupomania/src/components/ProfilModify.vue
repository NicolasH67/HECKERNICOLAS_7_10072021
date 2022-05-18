<template>
  <div class="content">
    <h2>Modifier votre profil</h2>
    <form class="form" @submit.prevent="updateprofil">
      <div class="content__message">
        <label for="name" class="label">Votre Nom : </label><br />
        <input
          type="text"
          name="name"
          id="name"
          :value="user.name"
        /><br /><br />
        <label for="lastname" class="label">Votre Prénom : </label><br />
        <input
          type="text"
          name="lastname"
          id="lastname"
          :value="user.lastname"/>
          <br /><br />
        <label for="picture" class="label">Votre Photo de Profil : <br />
          <img
            v-if="user.picture"
            :src="user.picture"
            alt="Photo de profil"
            class="picture"/>
        </label><br />
        <input
          type="file"
          id="file"
          name="file"
          ref="file"
          v-on:change="handleFileUpload()"
          accept="image/png, image/jpeg, image/jpg"/>
        <br /><br />
        <label for="bio" class="label">Votre Bio : </label><br />
        <textarea
          name="txt"
          id="bio"
          class="txt"
          cols="50"
          rows="5"
          :value="user.bio">
        </textarea><br />
        <button class="btn modifyBtn">Modifier</button>
        <button class="btn deleteBtn" @click="password()">
          Moddifer votre mot de passe
        </button>
      </div>
    </form>
    <br />
    <button class="btn deleteBtn" @click="deleteUser()">
      Supprimer le Profil
    </button>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
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

    async updateprofil() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastname').value;
        const bio = document.getElementById('bio').value;
        const picture = this.file;
        console.log(picture)
        
        const formData = new FormData();
        formData.append('picture', picture);
        formData.append('lastname', lastName);
        formData.append('name', name);
        formData.append('bio', bio);

        this.submitted = true;
        axios
          .put(`http://localhost:3066/api/auth/profil/${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: token
            }
          })
          .then(function(response) {
            console.log(response.status);
            window.location.href = '/profil';
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }, 

    deleteUser() {
      addEventListener('click', (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        try {
          axios
            .delete(`http://localhost:3066/api/auth/profil/${userId}`, {
              headers: {
                authorization: token
              }
            })
            .then(function(response) {
              console.log(response.status);
              localStorage.clear();
              window.location.href = "/"
            })
            .catch(function(error) {
              console.log(error)
            })
        } catch (error) {
          console.log(error)
        }
      })
    }, 

    password() {
      addEventListener('click', (e) => {
        e.preventDefault(); 
        window.location.href = "/password"
      })
    }
  },

  created() {
    this.getUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  margin-right: auto;
  margin-left: auto;
}
.txt {
  border-radius: 20px;
  padding: 20px;
}
.txt--label {
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
}
.btn {
  margin-right: 20px;
  color: #000000;
  font-weight: bold;
  background: linear-gradient(
    0deg,
    rgba(245, 48, 8, 1) 0%,
    rgba(255, 174, 158, 1) 45%
  );
  padding: 15px 30px 15px 30px;
  border-radius: 40px;
  transform: scale(1);
  transition-property: transform;
  transition-duration: 500ms;
  &:hover {
    transform: scale(1.15);
  }
}
.picture {
  width: 100px;
  height: 100px;
}
</style>