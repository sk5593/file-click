<template>
  <base-layout>
      <section class="section">
          <div class="title">
              <span>Thank you for your support</span>
          </div>
        <div class="text">
          <div class="text_row">we will send the giveaway after close</div>
          <div class="text_row">of this event.You are able to change</div>
          <div class="text_row">the address before the date of XXX</div>
        </div>
        <div class="icon">
          <img class="img_package"
               src="../lib/package.png"
               alt="">
        </div>
        <div class="btn_box">
          <input type="button"
                 class="btn btn_submit"
                 value="OK"
                 @click="handlerSubmitForm">
        </div>
      </section>
  </base-layout>
</template>

<script>
import baseLayout from "./baseLayout";
export default {
  data() {
    return {};
  },
  components: {
    baseLayout
  },
  mounted() {},
  methods: {
    handlerSubmitForm() {
      this.$router.push({ path: "/track" });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2.2rem;
  line-height: 1;
}
.text {
    margin-top: 1.6rem;
    font-size: 1.6rem;
    font-family: NotoSans-Regular;
    color: #000;
    line-height:2.4rem;
    opacity: .8;
}
.icon {
  margin-top: 7.9rem;
  text-align: center;
}
.img_package {
    width: 10.9rem;
    height: 10.35rem;
}
.btn_box {
  margin-top: 9.2rem;
}
.btn_submit {
    width: 100%;
    height: 4.5rem;
  background: #2F73E8;
  box-shadow: 0px 5px 8px 0px rgba(15, 34, 63, 0.13);
  border-radius: 2px;
  font-size: 2rem;
  font-family: Roboto-Regular;
  color: #fff;
  border: none;
}
</style>