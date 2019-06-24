<template>
  <div class="container">
    <div class="content">
      <form-header></form-header>
      <section class="section section_header">
        <div class="title">
          <span>Please enter your address</span>
        </div>
      </section>
      <section class="section section_form">
        <div class="form_group">
          <div class="form_item">
            <div class="form_item_label">
              <span>*First Name</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.firstName">Enter your first name here</label>
                <input type="text"
                       class="input_text input_text_firstname"
                       autocomplete="off"
                       v-model="form.firstName">
              </div>
            </div>
          </div>
          <div class="form_item">
            <div class="form_item_label">
              <span>*Last Name</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.lastName">Enter your last name here</label>
                <input type="text"
                       class="input_text input_text_firstname"
                       autocomplete="off"
                       v-model="form.lastName">
              </div>
            </div>
          </div>
          <div class="form_item">
            <div class="form_item_label">
              <span>*Street Address</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.street">Enter your street adress here</label>
                <input type="text"
                       class="input_text input_text_firstname"
                       autocomplete="off"
                       v-model="form.street">
              </div>
            </div>
          </div>
        </div>
        <div class="form_group form_group_addr">
          <div class="form_item">
            <div class="form_item_label">
              <span>*City</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.city">Select your city here</label>
                <select class="input_text input_text_firstname"
                        autocomplete="off"
                        @change="handlerCityChange"
                        v-model="form.city">
                  <option v-for="item of Australia"
                          :key="'AustraliaCity' + item.code"
                          class="select_item"
                          :value="item.name">{{item.name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form_item">
            <div class="form_item_label">
              <span>*State</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.state">Select your state</label>
                <select class="input_text input_text_firstname"
                        autocomplete="off"
                        v-model="form.state">
                  <option v-for="item of AustraliaState"
                          :key="'AustraliaState' + item"
                          class="select_item">{{item}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form_item">
            <div class="form_item_label">
              <span>*E-mail</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.email">Enter your e-mail here</label>
                <input type="text"
                       class="input_text input_text_firstname"
                       autocomplete="off"
                       v-model="form.email">
              </div>
            </div>
          </div>
          <div class="form_item">
            <div class="form_item_label">
              <span>Phone</span>
            </div>
            <div class="form_item_content">
              <div class="form_row_input">
                <label class="label_placeholder"
                       v-show="!form.phone">Enter your phone number here</label>
                <input type="tel"
                       class="input_text input_text_firstname"
                       autocomplete="off"
                       v-model="form.phone">
              </div>
            </div>
          </div>
        </div>
        <div class="form_group_submit">
          <input type="submit"
                 :disabled="!formReady"
                 class="btn btn_submit"
                 value="Save"
                 @click="handlerSubmitForm">
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import formHeader from "./formHeader";
import { isEmail } from "@/util/util";
import Australia from "../lib/Australia";
import { verify } from "@/service/googleexchange";
export default {
  data() {
    return {
      // eslint-disable-next-line no-undef
      IMGPrefix: IMGPrefix,
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
      AustraliaState: [],
      isEdit: null
    };
  },
  components: {
    formHeader
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
      verify(this.form, this.isEdit)
        .then(() => {
          this.$router.push({ path: "/formSuccess" });
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
        this.$router.push({ path: "/formCoupon" });
      } else if (err.code == "13001") {
        this.$router.push({ path: "/formSuccess" });
      } else {
        alert(err.msg);
      }
    },
    handlerCityChange() {
      this.form.state = "";
      this.Australia.some(item => {
        if (item.name == this.form.city) {
          if (!this.AustraliaState.length)
            this.AustraliaState.push(...item.cities);
          else
            this.AustraliaState.splice(
              0,
              this.AustraliaState.length,
              ...item.cities
            );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.img_header {
  width: 100%;
}
.section {
  padding: 0 4.5rem;
}
.section_header {
  margin-top: -4.5rem;
}
.title {
  font-size: 2.2rem;
  font-family: NotoSans-Regular;
  color: #000;
  line-height: 3.2rem;
}
.section_form {
  margin-top: 3rem;
}
.form_group + .form_group {
  margin-top: 5rem;
}
.form_group_addr {
  border-top: 1px solid rgba(170, 170, 170, 0.5);
  padding-top: 1.9rem;
}
.form_item + .form_item {
  margin-top: 1.9rem;
}
.form_item_address {
  margin-top: 0.38rem;
}
.form_item_content {
  margin-top: 0.8rem;
}
.form_item_label {
  font-size: 1.6rem;
  font-family: Roboto-Regular;
  line-height: 1;
  opacity: 0.8;
}
.form_row_input {
  position: relative;
}
.label_placeholder {
  position: absolute;
  top: 50%;
  left: 1rem;
  line-height: 2rem;
  margin-top: -1rem;
  font-size: 1.5rem;
  font-family: Roboto-Regular;
  opacity: 0.2;
}
.input_text {
  position: relative;
  width: 100%;
  line-height: 1.5rem;
  border: none;
  border-bottom: 1px solid rgba(170, 170, 170, 0.5);
  padding: 1.1rem 1rem;
  background: transparent;
  z-index: 9;
  &:focus {
    outline: none;
  }
}
.form_group_submit {
  margin-top: 6rem;
  padding-bottom: 3.5rem;
  text-align: center;
}
.btn_submit {
  width: 100%;
  height: 4.5rem;
  background: #2f73e8;
  box-shadow: 0px 5px 8px 0px rgba(19, 34, 61, 0.13);
  border-radius: 2px;
  font-size: 2rem;
  font-family: Roboto-Regular;
  color: #fff;
  border: none;
  &:active {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.3;
  }
}
</style>