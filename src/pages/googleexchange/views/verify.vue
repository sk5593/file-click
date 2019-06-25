<template>
  <base-layout>
    <div class="form">
      <div class="form_item form_header">
        <div class="form_title">
          <span>Please enter your address</span>
        </div>
      </div>
      <div class="form_item form_item_name">
        <div class="form_item_header">
          <span>Name</span>
        </div>
        <div class="form_item_content">
          <div class="form_row form_row_name">
            <label class="form_row_label left"
                   for="">*First:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.firstName">Enter your first name here</label>
              <input type="text"
                     class="input_text input_text_firstname"
                     :class="{'error' : errorKey.includes('firstName')}"
                     autocomplete="off"
                     v-model="form.firstName">
            </div>
            <label class="form_row_label right"
                   for="">*Last:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.lastName">Enter your last name here</label>
              <input type="text"
                     class="input_text input_text_lastname"
                     :class="{'error' : errorKey.includes('lastName')}"
                     autocomplete="off"
                     v-model="form.lastName">
            </div>
          </div>
        </div>
      </div>
      <div class="form_item form_item_address">
        <div class="form_item_header">
          <span>Postal Address</span>
        </div>
        <div class="form_item_content">
          <div class="form_row form_row_street">
            <label class="form_row_label left"
                   for="">*Street Address:</label>
            <div class="form_row_input long">
              <label class="label_placeholder"
                     v-show="!form.street">Enter your street adress here</label>
              <input type="text"
                     class="input_text input_text_street"
                     :class="{'error' : errorKey.includes('street')}"
                     autocomplete="off"
                     v-model="form.street">
            </div>
          </div>
          <div class="form_row form_row_addr">
            <label class="form_row_label left"
                   for="">*City:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.city">Select your city here</label>
              <select class="input_text input_text_city select"
                     :class="{'error' : errorKey.includes('city')}"
                      autocomplete="off"
                      @change="handlerCityChange"
                      v-model="form.city">
                <option v-for="item of Australia" :key="'AustraliaCity' + item.code" class="select_item" :value="item.name">{{item.name}}</option>
              </select>
            </div>
            <label class="form_row_label right"
                   for="">*State:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.state">Select your state</label>
              <select class="input_text input_text_state select"
                     :class="{'error' : errorKey.includes('state')}"
                      autocomplete="off"
                      v-model="form.state">
                <option v-for="item of AustraliaState" :key="'AustraliaState' + item" class="select_item">{{item}}</option>
              </select>
            </div>
          </div>
          <div class="form_row form_row_contact">
            <label class="form_row_label left"
                   for="">Phone:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.phone">Enter your phone number here</label>
              <input type="tel"
                     class="input_text input_text_phone"
                     autocomplete="off"
                     v-model="form.phone">
            </div>
            <label class="form_row_label right"
                   for="">*E-mail:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.email">Enter your e-mail here</label>
              <input type="email"
                     class="input_text input_text_email"
                     :class="{'error' : errorKey.includes('email')}"
                     autocomplete="off"
                     required
                     v-model="form.email">
            </div>
          </div>
        </div>
      </div>
      <div class="form_item form_item_submit">
        <input type="submit"
               :disabled="!formReady"
               class="btn btn_submit"
               value="Submit"
               @click="handlerSubmitForm">
      </div>
    </div>
  </base-layout>
</template>

<script>
import baseLayout from "./baseLayout";
import { isEmail } from "@/util/util";
import Australia from "../lib/Australia";
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
      formReady: true,
      errorKey: [],
      Australia: Australia,
      AustraliaState: [],
      isEdit: null
    };
  },
  components: {
    baseLayout
  },
  watch: {
    // form: {
    //   deep: true,
    //   handler: function(newVal) {
    //     this.formReady = Object.keys(newVal).every(key => {
    //       if (key == "phone") return true;
    //       else if (key == "email" && !isEmail(newVal[key])) return false;
    //       else return newVal[key];
    //     });
    //   }
    // }
  },
  mounted() {
    this.isEdit = this.$route.query.isEdit;
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
    },
    forEachFormData(data) {
      Object.keys(data).forEach(key => {
         if (key == "phone") return true;
         else if (key == "email" && !isEmail(data[key])) this.errorKey.push(key);
         else if (!data[key]) this.errorKey.push(key);
      });
    },
    handlerChangeCaptcha() {
      this.getCaptcha();
    },
    handlerSubmitForm() {
      if (this.errorKey.length) this.errorKey.splice(0, this.errorKey.length);
      this.forEachFormData(this.form);
      if (this.errorKey.length) return;
      this.formReady = false;
      verify(this.form, this.isEdit)
        .then(() => {
          this.$router.push({path: '/success'});
        })
        .catch(err => {
          this.initError(err);
        })
        .finally(() => {
          this.formReady = true;
        });
    },
    initError(err) {
      if (err.code == "13004" || err.code == "13002") {
        sessionStorage.removeItem("googleexchange_formcoupon");
        this.$router.push({path: '/check'});
      } else if (err.code == '13001') {
        this.$router.push({path: '/success'});
      } else {
        alert(err.msg);
      }
    },
    handlerCityChange() {
      this.form.state = '';
      this.Australia.some(item => {
        if(item.name == this.form.city){
          if(!this.AustraliaState.length) this.AustraliaState.push(...item.cities);
          else this.AustraliaState.splice(0, this.AustraliaState.length, ...item.cities);
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  $inputWidth: 4.12rem;
    $inputHeight: .35rem;
    .form_header {
        text-align: center;
    }
    .form_title {
        font-size: .36rem;
        font-family: NotoSans-Regular;
        color: #000000;
        line-height: .54rem;
    }
    .form_item_name {
      margin-top: .41rem;
    }
    .form_item_address {
      margin-top: .38rem;
    }
    .form_item_header {
      margin-left: 2.84rem;
      font-size: .2rem;
      font-family: Roboto-Regular;
      color: #000;
      line-height: 1;
      opacity: 0.9;
    }
    .form_item_content {
      margin-top: .16rem;
    }
    .form_row {
      overflow: hidden;
    }
    .form_row_label {
      float: left;
      font-size: .16rem;
      font-family: Roboto-Regular;
      color: #000000;
      line-height: $inputHeight;
      opacity: 0.6;
      padding-right: .16rem;
      text-align: right;
      &.left{
        width: 2.84rem;
      }
      &.right {
        width: .95rem;
      }
    }
    .form_row_input {
      position: relative;
      float: left;
      width: $inputWidth;
      &.long {
        width: 9.19rem;
      }
    }
    .label_placeholder {
      position: absolute;
      top: 50%;
      left: .23rem;
      line-height: .2rem;
      margin-top: -.1rem;
      font-size: .14rem;
      font-family: Roboto-Regular;
      color: #000000;
      opacity:0.4;
    }
    .input_text{
      position: relative;
      width: 100%;
      height: $inputHeight;
      border:1px solid rgba(51,51,51,.2);
      border-radius:2px;
      padding: 0 .23rem;
      background: transparent;
      opacity:0.8;
      z-index: 9;
      &.error {
        border-color: #f56c6c;
      }
    }
    .form_row_addr {
      margin-top: .25rem;
    }
    .form_row_contact {
      margin-top: .2rem;
    }

    .form_item_submit{
      margin-top: .52rem;
      text-align: center;
    }
    .btn_submit{
        width: $inputWidth;
        height: .72rem;
        background: #0072F0;
        box-shadow: 0px 5px 8px 0px rgba(15,34,63,0.13);
        border-radius:2px;  
        font-size: .3rem;
        font-family:Roboto-Regular;
        font-weight:400;
        color: #FFFFFF;
        line-height: .5rem;
        border: none;
        &:disabled {
            opacity:0.3;
        }
    }
</style>