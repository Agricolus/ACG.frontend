<template>
  <h2>
    Fields & Clients selection
    <button class="btn btn-outline" @click="registerFields">
      Import All
      <i class="fas fa-upload"></i>
    </button>
  </h2>
  <div class="list">
    <div class="loading" v-if="isLoading">
      <div class="dot-pulse"></div>
    </div>
    <div
      class="card"
      v-for="field in fields"
      :key="field.id"
      @mouseenter="highlight(field, true)"
      @mouseleave="highlight(field, false)"
    >
      <i class="fas fa-check" v-if="field.isRegistered"></i>
      <i v-else></i>
      <div class="card-body">
        <div class="card-info">Field name: {{ field.name }}</div>
        <div class="card-info">
          Field area: {{ field.area.toFixed(2) }} hA
        </div>
        <!-- <div class="card-info">Last modified: {{ field.lastModifiedTime }}</div> -->
        <!-- <div class="card-info">Client: {{ field.clients.clients[0].name }}</div> -->
      </div>
      <button class="btn btn-outline" @click="registerField(field)">
        Import
        <i class="fas fa-upload"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts" src="./fieldsSelection.ts"></script>