<template>
  <div class="about">
    <div>
        <div>
            <input id="pseudo" type="pseudo" name="pseudo" placeholder="Your pseudo" class="subscribeInput"/><br/><br/>
            <input d="email" type="email" name="email" placeholder="Your email" class="subscribeInput"/><br/><br/>
            <MenusButton
                text="PGM MODE"
                target="/play"
                color="red"
            />
        </div>
        <div>OR</div>
        <div>
            <MenusButton
                text="GUEST MODE"
                target="/play"
                color="red"
            />
        </div>
    </div>
  </div>
</template>

<script>
import MenusButton from "@/components/Buttons/MenusButton.vue"

export default {
  components: {
    MenusButton
  }
}
</script>
