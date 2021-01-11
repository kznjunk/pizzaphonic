<template>
  <div class="about">
    <h1>Rules</h1>
    <p>
        <ol>
            <li>Click on a circle</li>
            <li>Listen to the sound</li>
            <li>Type the game name..</li>
            <li>.. and unlock every round</li>
        </ol>
    </p>

    Additional details:
    <ul>
        <li>You have 5 lifes</li>
        <li>You unlock a new round every 3 good answers</li>
        <li>Smaller is a circle, harder is the sound to guess</li>
        <li>There is no memory card. If you leave, your progress is lost</li>
    </ul>

    <router-link class="previous" to="/">
    previous
    </router-link>
  </div>
</template>

<style lang="scss">
ol, ul {
    text-align: center;
    list-style-position: inside;
}
</style>