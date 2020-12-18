<template>
  <h2>Machine selection</h2>
  <div class="list">
    <div class="loading" v-if="isLoading">
      <div class="dot-pulse"></div>
    </div>
    <div v-for="machine in machines" :key="machine.id" class="card">
      <i class="fas fa-check" v-if="machine.isRegistered"></i>
      <i v-else></i>

      <div class="card-body">
        <div class="card-info">{{ machine.name }} - {{ machine.code }}</div>
        <div class="card-info">{{ machine.description }}</div>
        <div class="card-info">{{ machine.producerCommercialName }}</div>
      </div>
      <button
        class="btn btn-outline"
        @click="registerMachine(machine)"
        :disabled="machine.isRegistered"
      >
        Import
        <i class="fas fa-upload"></i>
      </button>
      <button
        class="btn btn-outline"
        @click="locationHistory(machine)"
      >
        Locations
        <i class="fas fa-sync"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts" src="./machinesSelection.ts">
</script>