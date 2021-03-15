<template>
  <h2>ADAPT Document selection</h2>
  <div class="list">
    <loader :loading="isLoading">
      <div class="card" v-for="document in documents" :key="document.id">
        <i class="fas fa-check" v-if="document.status == 'PROCESSED'"></i>
        <i v-else></i>
        <div class="card-body">
          <div class="card-info">Document name: {{ document.name }}</div>
          <div class="card-info">Type: {{ document.type }}</div>
          <div class="card-info">Machine source: {{ document.source }}</div>
          <div class="card-info">Created time: {{ document.createdTime }}</div>
          <div class="card-info">
            Modified time: {{ document.modifiedTime }}
          </div>
          <div class="card-info">Status: {{ document.status }}</div>
          <div class="card-info">Archived: {{ document.archived }}</div>
        </div>
        <div class="card-buttons">
          <button
            class="btn btn-outline"
            @click="registerDocument(document)"
            :disabled="document.status == 'PROCESSED'"
          >
            Import
            <i class="fas fa-upload"></i>
          </button>
        </div>
      </div>
    </loader>
  </div>
</template>
<script lang="ts" src="./documentsSelection.ts"></script>