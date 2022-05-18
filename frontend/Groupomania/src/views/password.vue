<template>
  <div class="profil">
      <nav class="profil__nav">
        <button id="logout" @click="logout()">
          Déconnexion
        </button>
        <img alt="Logo Groupomania" src="../assets/icon.png" class="profil__nav__img">
        <router-link to="/Home" class="profil__nav__link">Accueil</router-link>
        <router-link to="/Profil" class="profil__nav__link">Votre Profil</router-link>
      </nav>
    <Password/>
  </div>
</template>

<script>
// @ is an alias to /src
import Password from '@/components/password.vue'

export default {
  name: 'About',
  components: {
    Password
  }, 
  methods: {
    logout() {
      addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/"
      })
    },
  }
}
</script>

<style scoped lang="scss">
#logout {
  margin: 20px;
  cursor: pointer;
}
.profil {
    display: flex;
    &__nav {
        width: 200px;
        height: 100%;
        margin-left: -10px;
        margin-top: -10px;
        margin-right: 25px;
        padding-bottom: 100%;
        background-color: #ffd6d8;
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 768px) {
            flex-direction: row;
            width: 100%;
            margin-right: 0px;
            height: auto;
        }
        &__img {
            width: 150px;
            margin: auto;
            display: block;
            border-radius: 150px;
            @media screen and (max-width: 768px) {
                width: 50px;
                margin: 10px;
            }
        }
        &__link {
            width: 125px;
            font-size: 1.25rem;
            text-decoration: none;
            font-style: italic;
            margin: 15px auto auto auto;
            &:hover {
                  font-weight: bold;
                  border: 3px solid #F53008;
                  border-radius: 10px;
                  box-shadow: 0px 0px 15px #F53008;
            }
        }
    }
}
.active {
    font-weight: bold;
    border: 3px solid #F53008;
    border-radius: 10px;
    box-shadow: 0px 0px 15px #F53008;
}
</style>
