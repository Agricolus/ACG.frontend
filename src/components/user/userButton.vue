<template>
  <div class="user-button">
    {{ user?.username }}<img :src="user?.image" />
    v
  </div>
</template>
<script lang="ts" src="./userButton.ts"></script>