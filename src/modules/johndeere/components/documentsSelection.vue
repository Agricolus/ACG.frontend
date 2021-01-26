<template>
  <h2>ADAPT Document selection</h2>
  <div class="list">
    <div class="loading" v-if="isLoading">
      <div class="dot-pulse"></div>
    </div>

    <div class="card" v-for="document in documents" :key="document.id">
      <i class="fas fa-check" v-if="document.isRegistered"></i>
      <i v-else></i>
      <div class="card-body">
        <div class="card-info">Document name: {{ document.name }}</div>
        <div class="card-info">Type: {{ document.type }}</div>
        <div class="card-info">Created time: {{ document.createdTime }}</div>
        <div class="card-info">Modified time: {{ document.modifiedTime }}</div>
        <div class="card-info">Status: {{ document.status }}</div>
        <div class="card-info">Archived: {{ document.archived }}</div>
      </div>
      <button
        class="btn btn-outline"
        @click="registerDocument(document)"
        :disabled="document.isRegistered"
      >
        Import
        <i class="fas fa-upload"></i>
      </button>
      <!-- <ul>
        <li><input type="checkbox" @click="registerDocument(document)" /></li>
        <li v-for="(v, k) in document" :key="k">
          <span>{{ k }} : </span>
          <span>{{ v }}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script lang="ts" src="./documentsSelection.ts"></script>