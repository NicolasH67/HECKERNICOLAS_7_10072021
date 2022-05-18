<template>

    <div class="content">
        <h1>Changer votre mot de passe </h1>
        <form>
            <label for="oldPassword" id="oldPasswordLabel">Votre ancien mot de passe</label><br />
            <input type="password" name="oldPassword" id="oldPassword"><br /><br />
            <label for="newPassword" id="newPasswordLabel">Votre nouveau mot de passe</label><br />
            <input type="password" name="newPassword" id="newPassword"><br />
            <button @click="password()" class="btn">modifier le mot de passe</button>
        </form>
    </div>

</template>

<script>
const axios = require("axios")
export default {
    methods: {
        password() {
            addEventListener('click', (e) => {
                e.preventDefault(); 
                const oldPassword = document.getElementById('oldPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                this.submitted = true; 
                axios.put(`http://localhost:3066/api/auth/profil/password/${userId}`, {oldPassword: oldPassword, newPassword: newPassword }, {
                    headers: {
                        authorization: token
                    }
                })
                .then(function(response) {
                    console.log(response.status); 
                    window.location.href = '/profil';
                })
                .catch(function(error) {
                    console.log(error)
                })
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  margin-right: auto;
  margin-left: auto;
}

.btn {
    margin-top: 20px;
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
</style>
