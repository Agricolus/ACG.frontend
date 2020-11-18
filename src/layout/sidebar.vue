<template>
  <div class="sidebar">
    <header>
      <div class="title">ACG</div>
    </header>
    <section>
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="{ name: 'machines' }" class="nav-link">
            <i class="fas fa-home nav-item-icon"></i>
            Machines
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'customers' }" class="nav-link">
            <i class="fas fa-th-list nav-item-icon"></i>
            Customers
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'settings' }" class="nav-link">
            <i class="fas fa-th-list nav-item-icon"></i>
            Settings
          </router-link>
        </li>
      </ul>
    </section>
    <footer>
      <img src="../assets/img/powered_by_fiware.png" />
    </footer>
  </div>
</template>
<script src="./sidebar.ts" lang="ts"/>