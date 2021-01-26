<template>
  <div class="container">
    <header>
      <label>Machine Movements</label>
      <div class="date-interval-selection">
        <button @click="prevInterval" class="btn btn-primary">
          <i class="fas fa-chevron-circle-left"></i>
        </button>
        <label>
          <span>start date</span>
          <date-picker
            v-model="startDate"
            @update:model-value="fetchDataFormService"
            :upperLimit="endDate"
          ></date-picker>
        </label>
        <label>
          <span>end date</span>
          <date-picker
            v-model="endDate"
            @update:model-value="fetchDataFormService"
            :upperLimit="new Date()"
            :lowerLimit="startDate"
          ></date-picker>
        </label>
        <button
          @click="nextInterval"
          class="btn btn-primary"
          :disabled="!canClickNextInterval"
        >
          <i class="fas fa-chevron-circle-right"></i>
        </button>
      </div>
    </header>
    <section class="scrollable">
      <machine-card :machine="machine" />
      <div class="card" v-for="(movements, day) in days" :key="day">
        <div></div>
        <div class="card-body">
          day: {{ day }}
          <div
            class="card-body-section"
            v-for="movement in movements"
            :key="movement.start"
          >
            <input type="checkbox" v-model="selectedPaths" :value="movement.start" :disabled="dayshown != day"/>
            from {{ hoursminutes(movement.start) }} to {{ hoursminutes(movement.end) }} <br />
            operation: {{ movement.operation || "no operation" }}
          </div>
        </div>
        <div class="card-buttons top">
          <button @click="draw(movements, day)" class="btn btn-primary">
            <i class="fas fa-crosshairs"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" src="./movements.ts"></script>