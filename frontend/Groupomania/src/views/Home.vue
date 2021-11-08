<template>
  <div class="home">
      <nav class="home__nav">
        <img alt="Logo Groupomania" src="../assets/icon.png" class="home__nav__img">
        <router-link to="/Home" class="home__nav__link active">Accueil</router-link>
        <router-link to="/Profil" class="home__nav__link">Votre Profil</router-link>
      </nav>
    <Home/>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'About',
  components: {
    Home
  }
}
</script>

<style scoped lang="scss">
.home {
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
            width: 106%;
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
