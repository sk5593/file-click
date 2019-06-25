<template>
  <base-layout>
      <section class="section">
        <div class="title">
            <span>Check your Order</span>
        </div>
        <div class="text">
            <span>Please check the status of delivery<br>after {{this.form.shipTime}}</span>
        </div>
        <div class="block_box">
          <div class="block_item">
            <div class="block_item_header">
              <div class="header_item_name">Order</div>
              <div v-if="used==1" class="header_item_btn">
                <img class="img_edit" src="../lib/edit.png" alt="" @click="handlerEdit">
              </div>
            </div>
            <div class="block_item_content">
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
          <div class="block_item">
            <div class="block_item_header">
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
            <div v-else-if="used==3" class="block_item_content trace_content">
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
      </section>
  </base-layout>
</template>

<script>
  import baseLayout from "./baseLayout";
  import { formatTime } from "@/util/util";
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
          trackerNo: "",
          shipTime: ''
        },
        used: 0,
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
        let checkForm = sessionStorage.getItem("googleexchange_checkform");
        if (checkForm) {
          checkForm = JSON.parse(checkForm);
          this.checkForm.coupon = checkForm.coupon;
          this.checkForm.captcha = checkForm.captcha;
          this.checkForm.captchaToken = checkForm.captchaToken;
        } else {
          // alert('unknown error');
          // this.$router.replace({path: '/'});
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
          this.form.shipTime = formatTime(data.shipTime);
        }).catch(err => {
          if(err.code == '13004') {
            this.$router.push({
              path: 'check'
            })
          }
        });
      },
      handlerEdit () {
        this.$router.push({
          path: '/verify',
          query: {isEdit: true}
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
    .section {
      font-family:Roboto-Regular;
    }
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
    .block_box {
        margin-top: 6.2rem;
    }
    .block_item {
      box-shadow:1px 10px 24px 0px rgba(0, 0, 0, 0.04);
      border-radius:2px;
    }
    .block_item + .block_item {
      margin-top: 4.6rem;
    }
    .block_item_header {
      position: relative;
      background:rgba(47,115,232,.6);
    }
    .header_item_name {
      padding-left: 2.8rem;
      line-height: 2.9rem;
      font-size: 1.4rem;
      color: #fff;
      font-family:Roboto-Regular;
    }
    .header_item_btn {
      position: absolute;
      top: 50%;
      right: 1.5rem;
      transform: translateY(-50%);
    }
    .img_edit {
      width: 1.6rem;
      height: 1.6rem;
    }
    .block_item_content {
      padding: 1.5rem 2.8rem;
    }
    .pageage_content {
      min-height: 15.4rem;
      text-align: center;
    }
    .trace_content {
      min-height: 15.4rem;
    }
    .content_row {
      display: flex;
    }
    .content_label {
      font-size: 1.2rem;
      line-height: 2.5rem;
      opacity:0.9;
      &.left {
        width: 8.8rem;
        flex-shrink: 0;
      }
      &.right {
        margin-left: 2.5rem; 
      }
    }

    .track_icon {
      padding-top: 4.5rem;
    }
    .track_text {
      margin-top: 1.8rem;
      font-size: 1.2rem;
      color: #000;
      line-height: 1;
      opacity:0.3;
    }
    .img_trach {
      width: 4.75rem;
      height: 4.5rem;
    }
</style>
