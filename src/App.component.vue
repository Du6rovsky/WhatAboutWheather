<template lang="pug">
  v-app
    geolocation-component
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import GeolocationComponent from "@/app/components/geolocation/geolocation.component.vue";

  @Component({
    name: 'AppComponent',
    components: {
      GeolocationComponent
    }
  })
  export default class AppComponent extends Vue {
  }
</script>

<style lang="scss">
@import "assets/styles/app.scss";
</style>
