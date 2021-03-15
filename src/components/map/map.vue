

<template>
  <div class="map" id="map"></div>
  <svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <pattern
        id="diagonalHatch"
        patternUnits="userSpaceOnUse"
        width="15"
        height="15"
        patternTransform="rotate(45)"
      >
		<rect width="3" height="15" transform="translate(0,0)"></rect>
		<rect width="15" height="3" transform="translate(0,0)"></rect>
      </pattern>
    </defs>
  </svg>
</template>
<script src="./map.ts" lang="ts"/>