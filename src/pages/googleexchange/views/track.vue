<template>
  <base-layout>
    <div class="form">
      <div class="form_item form_header">
        <div class="form_title">
            <span>Check your Order</span>
        </div>
        <div class="form_describe">
            <span>Please check the status of delivery after {{this.trackDate}}</span>
        </div>
      </div>
      <div class="form_item form_block">
        <div class="form_block_box">
          <div class="form_item_block">
            <div class="form_item_block_header">
              <div class="header_item_name">Order</div>
              <div v-if="used==1" class="header_item_btn">
                <img class="img_edit" src="../lib/edit.png" alt="" @click="handlerEdit">
              </div>
            </div>
            <div class="form_item_block_content">
              <div class="content_row">
                <div class="content_label left">Name:</div>
                <div class="content_label right">{{form.lastName+' '+form.firstName}}</div>
              </div>
              <div class="content_row">
                <div class="content_label left">Postal Address:</div>
                <div class="content_label right" :title="form.street+' '+form.state+' '+form.city+' '+form.country">{{form.street+' '+form.state+' '+form.city+' '+form.country}}</div>
              </div>
              <div class="content_row">
                <div class="content_label left">E-mail:</div>
                  <div class="content_label right">{{form.email}}</div>
              </div>
              <div class="content_row">
                <div class="content_label left">Phone:</div>
                <div class="content_label right">{{form.phone}}</div>
              </div>
            </div>
          </div>
          <div class="form_item_block">
            <div class="form_item_block_header">
               <div class="header_item_name">TRACK & TRACE</div>
            </div>
            <div v-if="used==1||used==2" class="pageage_content">
              <div class="track_icon">
                <img class="img_trach" src="../lib/track.png" alt="">
              </div>
              <div class="track_text">
                Not yet shipped
              </div>
            </div>
            <div v-else-if="used==3" class="form_item_block_content">
              <div class="content_row">
                 <div class="content_label left">Carrier:</div>
                <div class="content_label right">{{form.carrier}}</div>
              </div>
              <div class="content_row">
                 <div class="content_label left">Order number:</div>
                <div class="content_label right">{{form.trackerNo}}</div>
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
  // import { formatTime } from "@/util/util";
  import { check } from "@/service/googleexchange";
  export default {
    data() {
      return {
        checkForm: {
          coupon: '',
          captcha: '',
          captchaToken: ''
        },
        form: {
          country: "Australia",
          state: "",
          city: "",
          street: "",
          email: "",
          phone: "",
          firstName: "",
          lastName: "",
          carrier: "",
          trackerNo: ""
        },
        used: 0,
        trackDate: ''
      };
    },
    components: {
      baseLayout
    },
    watch: {

    },
    mounted() {
        let config = sessionStorage.getItem("googleexchange_config");
        if(config) {
          config = JSON.parse(config);
          this.trackDate = config.trackDate;
        }
      this.init();
    },
    methods: {
      init() {
        let checkForm = sessionStorage.getItem("googleexchange_checkform");
        if (checkForm) {
          checkForm = JSON.parse(checkForm);
          this.checkForm.coupon = checkForm.coupon;
          this.checkForm.captcha = checkForm.captcha;
          this.checkForm.captchaToken = checkForm.captchaToken;
        } else {
          this.$router.replace({path: '/'});
        }
        this.check();
      },
      check () {
        check(this.checkForm).then(res => {
          let data = res.data;
          this.used = data.used;
          this.form.firstName = data.firstName;
          this.form.lastName = data.lastName;
          this.form.country = data.country;
          this.form.city = data.city;
          this.form.state = data.state;
          this.form.street = data.street;
          this.form.email = data.email;
          this.form.phone = data.phone;
          this.form.carrier = data.carrier;
          this.form.trackerNo = data.trackerNo;
        }).catch(err => {
          if(err.code == '13004') {
            this.$router.push({
              path: 'check'
            });
          }
        });
      },
      handlerEdit () {
        this.$router.push({
          path: '/verify'
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
      vertical-align: middle;
      &.left {
        width: 37%;
      }
      &.right {
        width: 63%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      cursor: pointer;
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
