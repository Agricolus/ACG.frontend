<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content" :class="{ fullscreen: fullscreen }">
        <iframe :src="producerData.handlerSrc" ref="handler"></iframe>
        <div class="buttons">
          <button @click="open = false"><i class="fas fa-times"></i></button>
          <button @click="fullscreen = !fullscreen">
            <i v-if="!fullscreen" class="fas fa-expand"></i>
            <i v-if="fullscreen" class="fas fa-compress"></i>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" src="./authenticator.ts">
</script>