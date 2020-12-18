<template>
  <div class="sidebar">
    <header>
      <div class="title">ACG</div>
    </header>
    <section>
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="{ name: 'machines' }" class="nav-link">
            <i class="fas fa-tractor nav-item-icon"></i>
            Machines
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'customers' }" class="nav-link">
            <i class="fas fa-user nav-item-icon"></i>
            Customers
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'import' }" class="nav-link">

            <i class="fas fa-download nav-item-icon"></i>
            Import 
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