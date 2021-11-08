<template>

    <div>
    
      <form class="form"  @submit.prevent="submit">
    
        <div class="form__group">
    
          <label for="mail">Votre e-mail prefessionnel</label><br />
          <input type="text" name="mail" id="mail">
    
        </div>

        <div class="form__group">
    
          <label for="password">Votre mots de passe</label><br />
          <input type="password" name="password" id="password">
    
        </div>
    
        <button class="form__btn" id="btn--connect">Connexion</button>

        <br /><div id="message--error"></div>
        
        <br /><br /><router-link to="/Signup">Créer un compte</router-link>
      </form>
      

    
    </div>

</template>

<script>
const axios = require('axios')
export default {
  methods: {
    submit() {
      const mail = document.getElementById('mail').value;
      const password = document.getElementById('password').value;
      console.log(mail, password)
      this.submitted = true; 
      axios.post("localhost:3066/api/auth/login", {email : mail, password: password })
      .then(function (response) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userId", response.data.userId)
        window.location.href="/Home"
      })
      .catch(function(error) {
        const errorCode = error.message.split("code ")[1]
        let messageError = ""
        switch (errorCode){
          case "401": messageError = "Mot de passe erroné";break
          case "404": messageError = "User not found";break
        }
        const sectionMessage = document.getElementById('message--error'); 
        sectionMessage.textContent = messageError;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  font-size: 1.17rem;
}
.form {
  border: 15px double #F53008;
  border-radius: 20px;
  width: 80%;
  margin: auto;
  padding: 20px 0 20px 0;
  &__group {
    margin-bottom: 20px;
  }
  &__login {
    color: #F53008;
    
  }
  &__btn {
    color: #000000;
    font-weight: bold;
    background: linear-gradient(0deg, rgba(245,48,8,1) 0%, rgba(255,174,158,1) 45%);
    padding: 15px;
    border-radius: 40px;
    transform: scale(1);
    transition-property: transform;
    transition-duration: 500ms;
    &:hover {
      transform: scale(1.15);
    }
  }
  @media screen and (min-width: 768px) {
    width: 400px;
  }
}
</style>
