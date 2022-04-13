<template>
  <section>
    <h1>404 Page Not Found!</h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NotFound',
});
</script>


<style lang="scss" scoped>
section {
  padding: 100px 0 200px;
  text-align: center;
  h1 {
    font-size: 60px;
    font-weight: 700;
  }
}
</style>
