<template>
  <base-layout>
    <div class="form">
      <div class="form_item form_header">
        <img class="img_package" src="../lib/package.png" alt="">
      </div>
      <div class="form_item form_item_text">
          <div class="form_item_text_row">Thank you for your support,</div>
          <div class="form_item_text_row">we will send the giveaway after close of this event.</div>
          <div class="form_item_text_row">You are able to change the address before the date of XXX</div>
      </div>
      <div class="form_item form_item_submit">
        <input type="submit"
               class="btn btn_submit"
               value="OK"
               @click="handlerSubmitForm">
      </div>
    </div>
  </base-layout>
</template>

<script>
  import baseLayout from "./baseLayout";
  export default {
    data() {
      return {
          
      };
    },
    components: {
      baseLayout
    },
    mounted() {
        
    },
    methods: {
      handlerSubmitForm() {
          this.$router.push({path: '/track'});
      }
    }
  };
</script>

<style lang="scss" scoped>
    $inputWidth: 4.12rem;
    $inputHeight: 0.72rem;
    .form_header {
        text-align: center;
        margin-top: .47rem;
    }
    .img_package{
        width: 1.96rem;
        height: 1.86rem;
    }
    .form_item_text {
        margin-top: 0.46rem;
    }
    .form_item_text_row{
        text-align: center;
        font-size: .2rem;
        font-family: NotoSans-Regular;
        font-weight: 400;
        color: #000000;
        line-height: .3rem;
    }
    .form_item_submit {
        margin-top: 0.67rem;
        text-align: center;
    }
    .btn_submit {
        width: $inputWidth;
        height: $inputHeight;
        background: #0072f0;
        box-shadow: 0px 5px 8px 0px rgba(15, 34, 63, 0.13);
        border-radius: 2px;
        font-size: 0.3rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.5rem;
        border: none;
    }
</style>