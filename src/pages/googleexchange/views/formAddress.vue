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
                     autocomplete="off"
                     v-model="form.firstName">
              <!-- <div class="form_item_error" v-show="firstNameError.flag">
                                <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                <span class="form_item_error_text">{{couponError.msg}}</span>
                            </div> -->
            </div>
            <label class="form_row_label right"
                   for="">*Last:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.lastName">Enter your last name here</label>
              <input type="text"
                     class="input_text input_text_lastname"
                     autocomplete="off"
                     v-model="form.lastName">
              <!-- <div class="form_item_error" v-show="firstNameError.flag">
                                <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                <span class="form_item_error_text">{{couponError.msg}}</span>
                            </div> -->
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
                     :class="{'error': errorKey.includes('street')}"
                     autocomplete="off"
                     v-model="form.street">
              <!-- <div class="form_item_error" v-show="firstNameError.flag">
                                <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                <span class="form_item_error_text">{{couponError.msg}}</span>
                            </div> -->
            </div>
          </div>
          <div class="form_row form_row_addr">
            <label class="form_row_label left"
                   for="">*City:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.city">Select your city here</label>
              <select class="input_text input_text_city select"
                      autocomplete="off"
                      v-model="form.city">
                <option v-for="item of Australia" :key="'AustraliaCity' + item.code" class="select_item">{{item.name}}</option>
              </select>
              <!-- <div class="select_dropdown_panel" v-show="">
                <ul class="select_dropdown_list">
                  <li v-for="item of Australia" :key="'AustraliaCity' + item.code" class="select_item"><span>{{item.name}}</span></li>
                </ul>
              </div> -->
            </div>
            <label class="form_row_label right"
                   for="">*State:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.state">Select your state</label>
              <select class="input_text input_text_state select"
                      autocomplete="off"
                      v-model="form.state">
                <option v-for="item of Australia" :key="'AustraliaCity' + item.code" class="select_item">{{item.name}}</option>
              </select>
              <!-- <div class="form_item_error" v-show="firstNameError.flag">
                                <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                <span class="form_item_error_text">{{couponError.msg}}</span>
                            </div> -->
            </div>
          </div>
          <div class="form_row form_row_contact">
            <label class="form_row_label left"
                   for="">Phone:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.phone">Enter your phone number here</label>
              <input type="text"
                     class="input_text input_text_phone"
                     autocomplete="off"
                     v-model="form.phone">
              <!-- <div class="form_item_error" v-show="firstNameError.flag">
                                <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                <span class="form_item_error_text">{{couponError.msg}}</span>
                            </div> -->
            </div>
            <label class="form_row_label right"
                   for="">*E-mail:</label>
            <div class="form_row_input">
              <label class="label_placeholder"
                     v-show="!form.email">Enter your e-mail here</label>
              <input type="text"
                     class="input_text input_text_email"
                     autocomplete="off"
                     v-model="form.email">
              <!-- <div class="form_item_error" v-show="firstNameError.flag">
                                <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                <span class="form_item_error_text">{{couponError.msg}}</span>
                            </div> -->
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
      errorKey: [],
      Australia: Australia,
      AustraliaState: []
    };
  },
  components: {
    baseLayout
  },
  watch: {
    form: {
      deep: true,
      handler: function(newVal) {
        this.formReady = Object.keys(newVal).every(key => {
          if (key == "phone") return true;
          else if (key == "email" && !isEmail(newVal[key])) return false;
          else return newVal[key];
        });
      }
    },
    conditionAgree(val) {
      if (val) {
        if (this.form.captcha && this.form.coupon) {
          this.formReady = true;
          return;
        }
      }
      this.formReady = false;
    }
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
    },
    forEachFormData(data) {
      Object.keys(data).forEach(key => {
        if (!data[key]) this.errorKey.push(key);
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
      verify(this.form)
        .then(() => {
          this.$router.push({path: '/formSuccess'});
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
        this.$router.push({path: '/formCoupon'});
      } else {
        alert(err.msg);
      }
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