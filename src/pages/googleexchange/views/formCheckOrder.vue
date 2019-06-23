<template>
  <base-layout>
    <div class="form">
      <div class="form_item form_header">
        <div class="form_title">
            <span>Check your Order</span>
        </div>
        <div class="form_describe">
            <span>Please check the status of delivery after XX XX XX</span>
        </div>
      </div>
      <div class="form_item form_block">
        <div class="form_block_box">
          <div class="form_item_block">
            <div class="form_item_block_header">
              <div class="header_item_name">Order</div>
              <div v-if="state==1" class="header_item_btn">
                <img class="img_edit" src="../lib/edit.png" alt="" @click="handlerEdit">
              </div>
            </div>
            <div class="form_item_block_content">
              <div class="content_row">
                <div class="content_label left">
                  <span>Name:</span>
                </div>
                <div class="content_label right">
                  <span>Kit Harington</span>
                </div>
              </div>
              <div class="content_row">
                <div class="content_label left">
                  <span>Postal Address:</span>
                </div>
                <div class="content_label right">
                  <span>15 Coronation Drive, Yarralumla, ACT 2600</span>
                </div>
              </div>
              <div class="content_row">
                <div class="content_label left">
                    <span>E-mail:</span>
                  </div>
                  <div class="content_label right">
                    <span>Harington@yeelight</span>
                  </div>
              </div>
              <div class="content_row">
                <div class="content_label left">
                  <span>Phone:</span>
                </div>
                <div class="content_label right">
                  <span>13210801818</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form_item_block">
            <div class="form_item_block_header">
               <div class="header_item_name">TRACK & TRACE</div>
            </div>
            <div v-if="state==1" class="pageage_content">
              <div class="track_icon">
                <img class="img_trach" src="../lib/track.png" alt="">
              </div>
              <div class="track_text">
                Not yet shipped
              </div>
            </div>
            <div v-else-if="state==2" class="form_item_block_content">
              <div class="content_row">
                 <div class="content_label left">
                  <span>Carrier:</span>
                </div>
                <div class="content_label right">
                  <span>TNT</span>
                </div>
              </div>
              <div class="content_row">
                 <div class="content_label left">
                  <span>Order number:</span>
                </div>
                <div class="content_label right">
                  <span>#12345678</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
  import baseLayout from "./baseLayout";
  import { verify } from "@/service/googleexchange";
  export default {
    data() {
      return {
        form: {
          country: "Australia",
          state: "",
          city: "",
          street: "",
          email: "",
          phone: "",
          firstName: "",
          lastName: "",
          coupon: "",
          captcha: "",
          captchaToken: ""
        },
        couponError: {
          flag: false,
          msg: ""
        },
        captchaError: {
          flag: false,
          msg: ""
        },
        conditionAgree: false,
        formReady: false,
        state: 2
      };
    },
    components: {
      baseLayout
    },
    watch: {

    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let couponForm = sessionStorage.getItem("googleexchange_formcoupon");
        if (couponForm) {
          couponForm = JSON.parse(couponForm);
          this.form.coupon = couponForm.coupon;
          this.form.captcha = couponForm.captcha;
          this.form.captchaToken = couponForm.captchaToken;
        } else {
          // alert('unknown error');
          // this.$router.replace({path: '/'});
        }
        this.verify();
      },
      verify () {
        verify().then(res => {
          if(res.data.state) {
            this.state = 1;
          } else {
            this.state = 2;
          }
        });
      },
      handlerEdit () {
        this.$router.push({
          path: '/formAddress',
          query: {isEdit: true}
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

    .form_header {
        text-align: center;
    }
    .form_title {
        font-size: .36rem;
        font-family: NotoSans-Regular;
        font-weight: 400;
        color: rgba(0,0,0,1);
        line-height: .54rem;
    }
    .form_describe {
        font-size: .2rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: rgba(0,0,0,1);
        line-height: .4rem;
        opacity: 0.9;
    }
    .form_block{
      margin-top: .77rem;
      margin-bottom: .5rem;
    }
    .form_block_box{
      text-align: center;
    }
    .form_item_block{
      display: inline-block;
      width: 6.13rem;
      height: 2.88rem;
      border-radius:2px;
      box-shadow:1px 10px 24px 0px rgba(0, 0, 0, .04);
      vertical-align: top;
    }
    .form_item_block + .form_item_block {
      margin-left: .5rem;
    }
    .form_item_block_header {
      position: relative;
      height: .63rem;
      background: #0072F0;
      opacity:0.6;
    }
    .form_item_block_content {
        padding: .25rem .47rem 0;
    }
    .content_row{
      line-height: .44rem;
    }
    .content_label{
      display: inline-block;
      line-height: .24rem;
      font-size: .16rem;
      font-family: Roboto-Regular;
      color: #000000;
      opacity: .9;
      text-align: left;
      &.left {
        width: 37%;
      }
      &.right {
        width: 63%;
      }
    }

    .header_item_name {
      padding-left: .46rem;
      font-size: .2rem;
      font-family: Roboto-Regular;
      color: #fff;
      line-height: .63rem;
      text-align: left;
    }
    .header_item_btn {
      position: absolute;
      right: .55rem;
      top: 50%;
      margin-top: -.12rem;
    }
    .img_edit {
      width: .24rem;
      height: .24rem;
    }
    .track_icon {
      margin-top: .49rem;
    }
    .img_trach {
      width: .95rem;
      height: .9;
    }
    .track_text {
      margin-top: .24rem; 
      font-size: .16rem;
      font-family: Roboto-Regular;
      color: #000000;
      line-height: 1;
      opacity:0.6;
    }
</style>
