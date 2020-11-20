<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <iframe :src="producerData.handlerSrc" ref="handler"></iframe>
        <button @click="open = false">close</button>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" src="./authenticator.ts">
</script>