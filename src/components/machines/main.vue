<template>
	<div class="container">
		<header>
			<label>Machines</label>
		</header>
		<section class="scrollable">
			<div v-for="machine in machines" :key="machine.id" class="card">
				<div class="card-icon">
					<img src="@/assets/img/tractor.svg" />
				</div>
				<div class="card-body">
					<div class="card-info">{{machine.name}} - {{machine.code}}</div>
					<div class="card-info">{{machine.description}}</div>
					<div class="card-info">{{machine.producerCommercialName}}</div>
				</div>
				<button @click="centerOnMap(machine)" class="btn btn-primary">
					<i class="fas fa-crosshairs"></i>
				</button>
			</div>
		</section>
		<footer>
			<button class="btn btn-primary" @click="startImport">IMPORT MACHINE FROM PRODUCER</button>
		</footer>
	</div>
</template>
<script lang="ts" src="./main.ts"></script>