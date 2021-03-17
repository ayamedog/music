<template>
  <div class="loading"  id="loading">
    <img src="~assets/images/loading.png" alt="">
  </div>
</template>

<script>
export default {
  name: "loading"
}
</script>

<style scoped>
.loading{
  width: 100%;
  height: 400px;
  position: relative;
  margin: 0 auto;
}
.loading img{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%) rotate(0deg);
  margin: 0 auto;
  animation: loading-rotate 3s linear infinite;
}
@keyframes loading-rotate {
  0%{
    transform: translate(-50%,-50%) rotate(0deg);
  }
  100%{
    transform: translate(-50%,-50%) rotate(360deg);
  }
}
</style>