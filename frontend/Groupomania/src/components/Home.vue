<template>

    <div class="content">
        <div class="post">

            <form class="post__form"  @submit.prevent="submit">
                <textarea id="story" name="story" rows="5" cols="33" class="post__form__message"></textarea>
                <input type="submit" name="submit" class="post__form__btn" value="Poster">
            </form>
        
        </div>

        <div class="content--message">
            <div class="message">
                <p class="message__text">Superatis Tauri montis verticibus qui ad solis ortum sublimius attolluntur, Cilicia spatiis porrigitur late distentis dives bonis omnibus terra, eiusque lateri dextro adnexa Isauria, pari sorte uberi palmite viget et frugibus minutis, quam mediam navigabile flumen Calycadnus interscindit.<br /><br />Sed quid est quod in hac causa maxime homines admirentur et reprehendant meum consilium, cum ego idem antea multa decreverim, que magis ad hominis dignitatem quam ad rei publicae necessitatem pertinerent? Supplicationem quindecim dierum decrevi sententia mea. Rei publicae satis erat tot dierum quot C. Mario ; dis immortalibus non erat exigua eadem gratulatio quae ex maximis bellis. Ergo ille cumulus dierum hominis est dignitati tributus.<br /><br />Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.</p>
            </div>
            <div class="message--option">
                <div class="message__option__divlike">
                    <div class="message__option__divlike--like">j'aime</div>
                    <div class="message__option__divlike--dislike"> j'aime pas</div>
                </div>
                <div class="message__option--comment">commenter</div>
            </div>
        </div>
      
    </div>

</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 100%;
    &--message {
        margin-top: 25px;
        padding-right: 60px;
        display: flex;
    }
}
.post {
    width: 100%;
    height: auto;
    &__form {
        display: flex;
        width: 100%;
        height: 75px;
        &__message {
            width: 75%;
            border-radius: 15px 0 0 15px;
            padding: 10px;
        }
        &__btn {
            width: 25%;
            border-radius: 0 15px 15px 0;
            background-color: #ffd6d8;
        }
    }
}

.message {
    border: 5px solid #F53008;
    width: 75%;
    text-align: justify;
    padding: 15px;
    border-radius: 15px 0 0 15px;
    &--option {
        width: 30%;
        border: 3px solid #F53008;
        border-radius: 0 15px 15px 0;
        &__divlike {
            display: flex;
            &--like, &--dislike {
                width: 50%;
            }
        }

    }
}
</style>
