<template>
  <base-layout>
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
                     :class="{'error' : errorKey.includes('firstName')}"
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
                     :class="{'error' : errorKey.includes('lastName')}"
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
                     :class="{'error' : errorKey.includes('street')}"
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
                     :class="{'error' : errorKey.includes('city')}"
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
                     :class="{'error' : errorKey.includes('state')}"
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
                <input type="email"
                       class="input_text input_text_firstname"
                     :class="{'error' : errorKey.includes('email')}"
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
  </base-layout>
</template>

<script>
import baseLayout from "./baseLayout";
import { isEmail } from "@/util/util";
import Australia from "../lib/Australia";
import { check, verify } from "@/service/googleexchange";
export default {
  data() {
    return {
      checkForm: {
        coupon: "",
        captcha: "",
        captchaToken: ""
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
      },
      formReady: true,
      errorKey: [],
      Australia: Australia,
      AustraliaState: []
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
    this.init();
  },
  methods: {
    async init() {
      let checkForm = sessionStorage.getItem("googleexchange_checkform");
      if (checkForm) {
        checkForm = JSON.parse(checkForm);
        this.checkForm.coupon = checkForm.coupon;
        this.checkForm.captcha = checkForm.captcha;
        this.checkForm.captchaToken = checkForm.captchaToken;
        this.formReady = false;
        await this.check();
        this.formReady = true;
      } else {
        // alert('unknown error');
        // this.$router.replace({path: '/'});
      }
    },
    check () {
      return check(this.checkForm).then(res => {
        let data = res.data;
        this.form.used = data.used;
        this.form.firstName = data.firstName;
        this.form.lastName = data.lastName;
        this.form.country = data.country;
        this.form.city = data.city;
        if(data.city) this.handlerCityChange();
        this.form.state = data.state;
        this.form.street = data.street;
        this.form.email = data.email;
        this.form.phone = data.phone;
      }).catch(err => {
        if(err.code == '13004') {
          this.$router.push({
            path: 'check'
          })
        }
      });
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
      let form = Object.assign(this.form, this.checkForm);
      verify(form)
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
        sessionStorage.removeItem("googleexchange_checkform");
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
  &.error {
    border-color: #f56c6c;
  }
}
.form_group_submit {
  margin-top: 6rem;
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