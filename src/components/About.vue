<template>
  <section>
    <div class="about">
        <div class="info-wrap">
          <div class="img-wrap">
            <img src="../assets/img/main.jpg"></img>
          </div>
          <div>
            <h1>Info</h1>
            <p>
              Hi! I’m Lisa, a software developer based in Los Angeles.<br>
              I enjoy coding, problem solving and learning new skills.<br><br>
              I work with Vue, .NET, JavaScript, Ruby on Rails, HTML, CSS,<br>
              and I especially enjoy building websites and helpful tools <br>
              that make everyday life a bit better. 
            </p>
          </div>
        </div>
        <div>
          <h1>Contact</h1>
          <ul>
            <li><a href="https://t.me/beathebird" target="_blank">Telegram</a></li>
            <li><a href="mailto:liza.uchaneva@outlook.com">Email</a></li>
            <li><a href="https://linkedin.com/in/elizaveta-uchaneva-526466312" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h1>Follow</h1>
          <ul>
            <li><a href="https://instagram.com/lizaturkins" target="_blank">Instagram</a></li>
            <li><a href="https://github.com/liza-uchaneva" target="_blank">GitHub</a></li>
          </ul>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style scoped>
</style>