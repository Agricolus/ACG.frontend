<template>
  <div class="container">
    <header>
      <label>Machines</label>
    </header>
    <section class="scrollable">
      <machine-card v-for="machine in machines" :key="machine.id" :machine="machine"/>
    </section>
  </div>
</template>
<script lang="ts" src="./main.ts"></script>