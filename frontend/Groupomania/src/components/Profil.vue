<template>
    
    <div class="content">
        <div class="profil" v-for="user in user" v-bind:key="user.id">
            <button class="btn" id="btn">
                Modifier mon profil
            </button>
            
            <h2>Votre profil : </h2>
            <p>Bonjour, {{ user.name }} {{ user.lastname }} <br /></p>
            <img src={{ user.picture }} alt="Votre photo" id="picture"><br />
            <h3>Votre bio : </h3>
            <p id="bio">{{ user.bio }}<br /></p>

        </div>
        <div class="publication">
            <button class="btn" id="btn" @click="post">
                créer une publication
            </button>
            <h2>Vos dernières publications</h2>
            <div class="content__message">
                <div class="message">
                    <h5>nom de la personne</h5>
                    <p class="message__text">Superatis Tauri montis verticibus qui ad solis ortum sublimius attolluntur, Cilicia spatiis porrigitur late distentis dives bonis omnibus terra, eiusque lateri dextro adnexa Isauria, pari sorte uberi palmite viget et frugibus minutis, quam mediam navigabile flumen Calycadnus interscindit.<br /><br />Sed quid est quod in hac causa maxime homines admirentur et reprehendant meum consilium, cum ego idem antea multa decreverim, que magis ad hominis dignitatem quam ad rei publicae necessitatem pertinerent? Supplicationem quindecim dierum decrevi sententia mea. Rei publicae satis erat tot dierum quot C. Mario ; dis immortalibus non erat exigua eadem gratulatio quae ex maximis bellis. Ergo ille cumulus dierum hominis est dignitati tributus.<br /><br />Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.</p>
                </div>
                <div class="message__option">
                    <button class="message__option--like">j'aime</button>
                    <button class="message__option--dislike"> j'aime pas</button>
                    <button class="message__option--comment">commenter</button>
                    <div class="message__option__lastcomment">
                        <h5>Dernier commentaire : </h5>
                        <p>nom de la personne</p>
                        <p>le commentaire aozijerozpa i reoij poijrzopji roiazjr poa jiro pzaijr rojizaoijrepo ijazor ijporei jaoper ijaopr ijzeop rijza ropijzeop erij roiezjezpor iajezr opjopijre zopi rzr</p>
                    </div>
                    <button class="message__option--modif">modifier la publication</button>
                </div>
            </div>
        </div>
      
    </div>

</template>

<script>
export default {
    data() {
        return {
            user: [],
        };
    }, 

    methods: {
        async getUser() {
            console.log("fonction start")
            try {
                const response = await this.$http.get(
                    "http://localhost:3066/api/auth/profil"
                ); 
                this.user = response.data; 
            } catch (error) {
                console.log(error);
            }
        }, 
    },

    created() {
        this.getUser();
    }
}; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 100%;
    display: flex;
    &__message {
        margin-top: 25px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 60px;
        display: flex;
    }
}
.publication {
    width: 70%;
}
.profil {
    width: 30%;
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
    padding: 25px;
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
        &--modif {
            width: 100%;
            height: 10%;
            &:hover {
                background-color: #ffd6d8;
            }
        }
    }
}
</style>
