<template>
  <div class="app">
    <div class="app-body">
      <sidebar />
      <div class="main">
        <header>
          <label class="title">Agri Contractor Gateway</label>
          <user-button></user-button>
        </header>
        <div class="app-content">
          <router-view></router-view>
          <router-view name="rightPane" v-slot="{ Component }">
            <div class="right-pane">
              <component class="map-cover" :is="Component" />
              <mainmap></mainmap>
            </div>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./fullLayout.ts" lang="ts"/>