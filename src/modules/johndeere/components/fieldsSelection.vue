<template>
  <h2>
    Fields & Clients selection
    <button @click="show = !show" class="btn btn-primary">
      <i v-if="show" class="fas fa-eye"></i>
      <i v-else class="fas fa-eye-slash"></i>
    </button>
  </h2>
  <div class="list" v-show="show">
    <loader :loading="isLoading">
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
          <div class="card-info">
            Last modified: {{ field.modificationTime }}
          </div>
          <div class="card-info">Client: {{ fieldClient(field).name }}</div>
        </div>
        <button
          class="btn btn-outline"
          @click="registerField(field)"
          :disabled="field.isRegistered"
        >
          Import
          <i class="fas fa-upload"></i>
        </button>
      </div>
    </loader>
  </div>
</template>
<script lang="ts" src="./fieldsSelection.ts"></script>