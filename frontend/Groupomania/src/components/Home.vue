<template>

    <div class="content">
        <button class="btn" id="btn" @click="post">
            créer une publication
        </button>
        <div class="content__message">
            <div class="message">
                <p class="message__text">Superatis Tauri montis verticibus qui ad solis ortum sublimius attolluntur, Cilicia spatiis porrigitur late distentis dives bonis omnibus terra, eiusque lateri dextro adnexa Isauria, pari sorte uberi palmite viget et frugibus minutis, quam mediam navigabile flumen Calycadnus interscindit.<br /><br />Sed quid est quod in hac causa maxime homines admirentur et reprehendant meum consilium, cum ego idem antea multa decreverim, que magis ad hominis dignitatem quam ad rei publicae necessitatem pertinerent? Supplicationem quindecim dierum decrevi sententia mea. Rei publicae satis erat tot dierum quot C. Mario ; dis immortalibus non erat exigua eadem gratulatio quae ex maximis bellis. Ergo ille cumulus dierum hominis est dignitati tributus.<br /><br />Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.</p>
            </div>
            <div class="messag__option">
                <div class="message__option--like">j'aime</div>
                <div class="message__option--dislike"> j'aime pas</div>
                <div class="message__option--comment">commenter</div>
            </div>
        </div>
      
    </div>

</template>

<script>
export default {
  methods: {
      post() {
          const btnPost = document.getElementById('btn'); 

          btnPost.addEventListener('click', (e) => {
              e.preventDefault()
              window.location.href = "/Post"
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 75%;
    &__message {
        margin-top: 25px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 60px;
    }
}
.btn {
    width: 75%;
    border-radius: 15px;
    height: 50px;
    background-color: #ffd6d8;
}

.message {
    border: 5px solid #F53008;
    width: 75%;
    text-align: justify;
    padding: 15px;
    border-radius: 15px 0 0 15px;
    &__option {
        display: flex;
        width: 100%;
        border: 3px solid #F53008;
        border-radius: 0 15px 15px 0;
    }
}
</style>
