<template>
  <h2>
    Machine selection
    <button @click="show = !show" class="btn btn-primary">
      <i v-if="show" class="fas fa-eye"></i>
      <i v-else class="fas fa-eye-slash"></i>
    </button>
  </h2>
  <div class="list" v-show="show">
    <loader :loading="isLoading">
      <div v-for="machine in machines" :key="machine.id" class="card">
        <i class="fas fa-check" v-if="machine.isRegistered"></i>
        <i v-else></i>

        <div class="card-body">
          <div class="card-info">{{ machine.name }} - {{ machine.code }}</div>
          <div class="card-info">{{ machine.description }}</div>
          <div class="card-info">{{ machine.otherData.vin }}</div>
          <div class="card-info">{{ machine.producerCommercialName }}</div>
        </div>
        <div class="card-buttons vertical">
          <button
            class="btn btn-outline"
            @click="registerMachine(machine)"
            :disabled="machine.isRegistered"
          >
            Import
            <i class="fas fa-upload"></i>
          </button>
          <br />
          <button
            class="btn btn-outline"
            @click="locationHistory(machine)"
            :disabled="!machine.isRegistered"
          >
            Sync Locations
            <i class="fas fa-sync"></i>
          </button>
        </div>
      </div>
    </loader>
  </div>
</template>
<script lang="ts" src="./machinesSelection.ts">
</script>