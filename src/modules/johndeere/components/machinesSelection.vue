<template>
	<div class="johndeere">
		<div v-for="machine in machines" :key="machine.id" class="card">
			<input
				type="checkbox"
				:disabled="machine.isRegistered"
				:checked="machine.isRegistered"
				@click="registerMachine(machine)"
			/>
			<div class="card-body">
				<div class="card-info">{{machine.name}} - {{machine.code}}</div>
				<div class="card-info">{{machine.description}}</div>
				<div class="card-info">{{machine.producerCommercialName}}</div>
			</div>
			<button @click="centerOnMap(machine)" class="btn btn-primary">
				<i class="fas fa-crosshairs"></i>
			</button>
		</div>
	</div>
</template>
<script lang="ts" src="./machinesSelection.ts">
</script>