<template>
    <div>
    
      <form action="" class="form">
    
        <div class="form__group">
    
          <label for="mail">Votre e-mail professionnel</label><br />
          <input type="email" name="mail" id="mail">
    
        </div>

        <div class="form__group">
    
          <label for="password">Votre mots de passe</label><br />
          <input type="password" name="password" id="password">
    
        </div>
    
        <input type="submit" value="Connexion" class="form__btn">

        <br/><br/><a href="#" class="form__login">Créer un compte</a>
      </form>
    
    </div>
</template>

<script>

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
