<template>
  <div class="home">
    <Aside/>
    <router-view/>
  </div>
</template>

<script>
import Aside from '@/components/Aside';
export default {
  data () {
    return {

    }
  },
  components: {
    Aside
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%; 
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
}
.asd{
  width: 100%;
}
</style>