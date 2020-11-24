<template>
  <div>
    <div class="producer-select">
      <select v-model="producer">
          <option :value="null"></option>
          <option :value="k" v-for="(p, k) in producers" :key="k">{{ p.commercialName }}</option>
      </select>
      <button :disabled="!producer" @click="selectProducer">START IMPORT</button>
    </div>
    <div class="bottom">
      <button>CANCEL</button>
    </div>
    <!-- <authenticator v-if="shwoAutheticator" v-model="shwoAutheticator" :producer-data="producers[producer]"></authenticator> -->
    <component v-if="shwoAutheticator" :is="producerAuthenticator"  v-model="shwoAutheticator" :producer-data="producers[producer]"></component>
  </div>
</template>
<script lang="ts" src="./producers.ts"></script>