<template>

    <div class="content">
        <form action="">
            <div class="content__message">
                    <label for="txt" class="txt--label">Votre Message : </label><br />
                    <textarea name="txt" id="txt" cols="100" rows="10"></textarea><br />
                    <label for="picture--option">Voulez vous ajoutez un Image</label><br />
                    <input type="radio" name="picture--option" id="yes" value="Oui"><label for="yes">oui</label><br />
                    <input type="radio" name="picture--option" id="No" value="Non" checked><label for="no">non</label><br />
                    <input type="file" name="picture" id="picture"><br /> <br />
                    <button class="btn">Publiez</button>
            </div>


        </form>
    </div>

</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
#yes:checked ~ #picture {
    display: block;
}
#picture {
    display: none;
    margin-right: auto;
    margin-left: auto;
}
</style>
