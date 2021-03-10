<template>
  <div id="banner" @mouseover="timerStop" @mouseout="timerStart">
      <ul class="banner-box">
        <li v-for="(item, index) in bannerImg" :class="activeBanner(index)" :style="bannerAni(index)" @click="bannerClick(index)">
          <a href="##"><img :src='item.pic' alt=""></a>
        </li>
      </ul>
    <!--    <button :class='{"leftac": leftActive,"left": true}' @mouseover="leftActive = !leftActive"></button>
        <button :class='{"rightac": rightActive,"right": true}' @mouseover="rightActive = !rightActive"></button>-->
    <button class="right" @click="rightClick"></button>
    <button class="left" @click="leftClick"></button>
  </div>
</template>

<script>
import {banner} from "@/network/request";
var timer =null;
export default {
  name: "Banner",
  created() {
    banner({
      params: {
        /* 0: pc

         1: android

         2: iphone

         3: ipad*/
        type: 2
      }
    })
    .then(res => {
      this.bannerImg = res.data.banners;
      this.bannerTimer();
    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      bannerImg: '',
      ulWidth1: '',
      leftActive: false,
      rightActive: false,
      initial: 0
    }
  },
  computed: {
    activeBanner() {
      return function (index) {
        let initial = this.initial;
            //  保证每张图片索引合法
        if(index === initial) {
          return 'active'
        }
      }
    }
  },
  methods: {
    bannerTimer() {
        timer = setInterval(() => {
        if(this.initial === this.bannerImg.length - 1){
          this.initial = 0;
        }else{
          this.initial += 1;
        }
      },4000)
    },
    timerStop() {
      clearInterval(timer)
    },
    timerStart() {
      this.bannerTimer()
    },
    bannerAni(index) {
      let length = this.bannerImg.length;
      let initial = this.initial,
          //  保证每张图片索引合法
          // temp1 = initial - 2,
          temp2 = initial - 1,
          temp3 = initial,
          temp4 = initial +1,
          // temp5 = initial +2,
          style = '',
          zIndex = 13;
      // temp1 < 0 ? (temp1 = length + temp1) : null;
      temp2 < 0 ? (temp2 = length + temp2) : null;
      temp4 >= length ? (temp4 = temp4 - length) : null;
      // temp5 >=length ? temp5 - length : null;
      switch (index) {
        case temp3:
          style = `translateX(0) scale(1)`;
          zIndex = 13;
          break
       /* case temp1:
          style = `translateX(-100%) scale(0.7)`;
          zIndex = 11;
          break*/
        case temp2:
          style = `translateX(-50%) scale(0.85)`;
          zIndex = 12;
          break
        case temp4:
          style = `translateX(50%) scale(0.85)`;
          zIndex = 12;
          break
        /*case temp5:
          style = `translateX(100%) scale(0.7)`;
          zIndex = 11;
          break*/
        default:
          style = style = `translateX(0) scale(0.55)`;
          zIndex = 9;
      }
      console.log(length)
      return {'transform': style,'zIndex':zIndex}
    },
    rightClick() {
      if(this.initial === this.bannerImg.length - 1){
        this.initial = 0;
      }else{
        this.initial += 1;
      }
    },
    leftClick() {
      if(this.initial === 0) {
        this.initial = this.bannerImg.length - 1
      }else{
        this.initial -= 1
      }

    },
    bannerClick(index) {
      this.initial = index
    }
  }
}
</script>

<style scoped>
/*banner*/
#banner{
  width: 100%;
  height: 292px;
  margin: 0 auto;
  position: relative;
}
#banner .banner-box{
  width: 750px;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

#banner ul li{
  list-style: none;
  position: absolute;
  width: 750px;
  height: 292px;
  z-index: 5;
  transition: all .3s;
  cursor: pointer;
  /*filter: blur(2px);*/
}
#banner ul li.active {
  z-index: 13;
  /*filter: blur(0);*/
}
#banner ul li a img{
  width: 100%;
  height: 100%;
}

#banner button{
  height: 73px;
  width: 73px;
  position: absolute;
  top: 50%;
  z-index: 15;
  transform: translateY(-50%);
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: all .3s;
}

#banner button.right{
  right: 10%;
  background: url("~assets/images/right.png") no-repeat;
  background-size: cover;
}
#banner button.right:hover{
  background: url("~assets/images/rightactive.png") no-repeat;
  background-size: cover;
}
#banner button.left{
  left: 10%;
  background: url("~assets/images/left.png") no-repeat;
  background-size: cover;
}
#banner button.left:hover{
  background: url("~assets/images/leftactive.png") no-repeat;
  background-size: cover;
}
#banner:hover button {
  opacity: 1;
}
#banner:hover button.left{
  left: 15%;
}

#banner:hover button.right{
  right: 15%;
}

</style>