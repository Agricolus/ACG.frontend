<template>
	<div class="user-button" v-if="user">
		{{ user.username }}
		<img v-if="user.image" :src="user.image" />
	</div>
</template>
<script lang="ts" src="./userButton.ts"></script>