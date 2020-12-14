<template>
  <div class="container">
    <header>
      <label> import machine from producer </label>
    </header>
    <section>
      <select v-model="producer">
        <option :value="null"></option>
        <option :value="k" v-for="(p, k) in producers" :key="k">{{ p.commercialName }}</option>
      </select>
      <div class="text-right">
        <button :disabled="!producer" @click="selectProducer" class="btn btn-primary">START
          IMPORT</button>
      </div>
      <router-view> </router-view>

    </section>
    <footer>
      <button class="btn btn-outline">CANCEL</button>
    </footer>
    <!-- <authenticator v-if="shwoAutheticator" v-model="shwoAutheticator" :producer-data="producers[producer]"></authenticator> -->
    <component v-if="shwoAutheticator" :is="producerAuthenticator"  v-model="shwoAutheticator" @authenticated="authenticated"></component>
  </div>
</template>
<script lang="ts" src="./producers.ts"></script>