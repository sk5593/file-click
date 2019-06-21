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
            <div class="form_item_block_header"></div>
            <div class="form_item_block_content"></div>
          </div>
          <div class="form_item_block">
            <div class="form_item_block_header"></div>
            <div class="form_item_block_content"></div>
          </div>
        </div>
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
            this.formStep = 2;
          })
          .catch(err => {
            this.initError(err);
          })
          .finally(() => {
            this.formReady = true;
          });
      },
      initError(err) {
        if (err.code == "13004") {
          this.captchaError.flag = true;
          this.captchaError.msg = err.msg;
          this.getCaptcha();
          this.form.coupon = "";
        } else if (err.code == "13002") {
          this.couponError.flag = true;
          this.couponError.msg = err.msg;
          this.getCaptcha();
          this.form.captcha = "";
        } else {
          alert(err.msg);
        }
      }
    }
  };
</script>
