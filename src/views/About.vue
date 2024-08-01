<template>
    <div class="d-flex flex-column align-items-center justify-content-center">
        <h1>About</h1>
        <p>This web was created by <a href="https://github.com/hereforhomework">Nguyen Duy Anh</a> for the HD task of COS30043</p>
        <p>Made possible by using <a href="https://vuejs.org/">VueJs</a>, <a href="https://getbootstrap.com/">Boostrap 5</a> and <a href="https://fakeapi.platzi.com/">Platzi fake store</a></p>
        <img src="@/components/icons/vue.png" alt="VueJs logo">
        <img src="@/components/icons/boostrap.png" alt="Boostrap logo">
    </div>
</template>

<style scoped>
.flex-column {
    flex-direction: column;

    margin-top: 5rem;
}

img{
    width: 8.813rem;
    height: 6.813rem;   
    margin-top: 2rem;
    margin-bottom: 2rem;
}

</style>