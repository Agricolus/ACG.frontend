<template>
  <div class="container">
    <header>
      <label>Machine Movements</label>
    </header>
    <section class="scrollable">
      <machine-card :machine="machine" />
      <div
        class="card"
        v-for="movement in inFieldMovements"
        :key="movement.field.id"
      >
        <div></div>
        <div class="card-body">
          field name: {{ movement.field.name }}
          <div v-for="(points, i) in movement.points" :key="i" @mouseenter="highlights(points, true)" @mouseleave="highlights(points, false)">
            movement details: <br/>
            strat: {{ dateOf(points) }}<br/>
            end: {{ points[points.length - 1].time}}<br/>
            points: {{ points.length }}
          </div>
        </div>
      </div>
      <div
        class="card"
        v-for="(points, i) in outFieldMovementsPoints"
        :key="i"
      >
        <div></div>
        <div class="card-body" @mouseenter="highlights(points, true)" @mouseleave="highlights(points, false)">movement date: {{ dateOf(points) }}</div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" src="./movements.ts"></script>