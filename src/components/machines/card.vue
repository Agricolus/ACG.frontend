<template>
  <div class="card">
    <div class="card-icon">
      <img src="@/assets/img/tractor.svg" />
    </div>
    <div class="card-body">
      <div class="card-info">{{ machine.name }} - {{ machine.code }}</div>
      <div class="card-info">{{ machine.description }}</div>
      <div class="card-info">{{ machine.producerCommercialName }}</div>
    </div>
    <div class="card-buttons">
      <button @click="centerOnMap(machine)" class="btn btn-primary">
        <i class="fas fa-crosshairs"></i>
      </button>
      <button @click="movements(machine)" class="btn btn-primary">
        <i class="fas fa-route"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts" src="./card.ts"></script>