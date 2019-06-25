<template>
    <base-layout>
         <div class="form">   
            <div class="form_item form_header">
                <div class="form_title">
                    <span>Type your Coupon</span>
                </div>
                <div class="form_describe">
                    <span>Please enter the coupon code to get a free YEELIGHT smart bulb - MSRP $29.99</span>
                </div>
            </div>
            <div class="form_item form_item_input form_item_coupon">
                <div class="form_item_content">
                    <label class="form_item_label" for="">Coupon :</label>
                    <div class="input_box">
                        <label class="label_placeholder" v-show="!form.coupon">Enter your code here</label>
                        <input type="text" class="input_text input_text_coupon" autocomplete="off" ref="coupon" v-model="form.coupon">
                        <div class="form_item_error" v-show="couponError.flag">
                            <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                            <span class="form_item_error_text">{{couponError.msg}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form_item form_item_input form_item_captcha">
                <div class="form_item_content">
                    <label class="form_item_label" for="">Captcha :</label>
                    <div class="input_box">
                        <label class="label_placeholder" v-show="!form.captcha">Enter your captcha here</label>
                        <input type="text" class="input_text input_text_captcha" autocomplete="off" ref="captcha" v-model="form.captcha">
                        <img class="img_captcha" :src="'data:image/png;base64,'+captchaBase64" alt="captcha">
                        <button class="btn_changecaptcha" @click="handlerChangeCaptcha">change</button>
                        <div class="form_item_error" v-show="captchaError.flag">
                            <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                            <span class="form_item_error_text">{{captchaError.msg}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form_item form_item_condition">
                <div class="form_item_condition_content">
                    <img v-show="!conditionAgree" class="img_condition" src="../lib/check.png" alt="" @click="conditionAgree=!conditionAgree">
                    <img v-show="conditionAgree" class="img_condition" src="../lib/check_ok.png" alt="" @click="conditionAgree=!conditionAgree">
                    <span class="condition_text" @click="conditionAgree=!conditionAgree">I have read and agree to the </span>
                    <a class="condition_terms" href="javascript: void(0);">Terms and Conditions</a>
                </div>
            </div>
            <div class="form_item form_item_submit">
                <input type="submit" :disabled="!formReady" class="btn btn_proceed" value="Proceed" @click="handlerSubmitForm">
            </div>
        </div>
    </base-layout>
</template>

<script>
    import baseLayout from './baseLayout'
    import { check, getCaptcha } from '@/service/googleexchange';
    export default {
        data() {
            return {
                form: {
                    coupon: '',
                    captcha: '',
                    captchaToken: ''
                },
                couponError: {
                    flag: false,
                    msg: ''
                },
                captchaError: {
                    flag: false,
                    msg: ''
                },
                conditionAgree: false,
                formReady: false,
                captchaBase64: ''
            }
        },
        components: {
            baseLayout
        },
        watch: {
            'form.coupon'(val) {
                if(val) {
                    if(this.form.captcha&&this.conditionAgree) {
                        this.formReady = true;
                        return;
                    }
                }
                this.formReady = false;
            },
            'form.captcha'(val) {
                if(val) {
                    if(this.form.coupon&&this.conditionAgree) {
                        this.formReady = true;
                        return;
                    }
                }
                this.formReady = false;
            },
            conditionAgree(val) {
                if(val) {
                    if(this.form.captcha && this.form.coupon) {
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
            init () {
                this.getCaptcha();
            },
            getCaptcha () {
                getCaptcha().then((res) => {
                    this.form.captchaToken = res.data.captchaToken;
                    this.captchaBase64 = res.data.captchaBase64;
                });
            },
            handlerChangeCaptcha () {
                this.form.captcha = '';
                this.getCaptcha();
            },
            handlerSubmitForm () {
                this.resetError();
                this.formReady = false;
                check(this.form).then(res => {
                    sessionStorage.setItem('googleexchange_checkform', JSON.stringify(this.form));
                    if(res.data) {
                        let used = res.data.used;
                        if (used != 0) {
                            this.$router.push({path: '/track'});
                            return;
                        }
                    }
                    this.$router.push({path: '/verify'});
                }).catch(err => {
                    this.initError(err);
                }).finally(() => {
                    this.formReady = true;
                });
            },
            resetError () {
                this.captchaError.flag = false;
                this.captchaError.msg = '';
                this.couponError.flag = false;
                this.couponError.msg = '';
            },
            initError (err) {
                if(err.code == '13004') {
                    this.captchaError.flag = true;
                    this.captchaError.msg = err.msg;
                    this.getCaptcha();
                    this.form.captcha = '';
                    this.$refs.captcha.focus()
                    
                } else if(err.code == '13002') {
                    this.couponError.flag = true;
                    this.couponError.msg = err.msg;
                    this.getCaptcha();
                    this.form.coupon = '';
                    this.form.captcha = '';
                    this.$refs.coupon.focus()
                } else {
                    alert(err.msg);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $inputWidth: 4.12rem;
    $inputHeight: .72rem;
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
    .form_item {
        position: relative;
    }
    .form_item_coupon{
        margin-top: .47rem;
    }
    .form_item_content {
        position: relative;
        width: $inputWidth;
        margin: 0 auto;
    }
    .form_item_captcha{
        margin-top: .71rem;
    }
    .form_item_condition{
        margin-top: .4rem;
        padding: .07rem 0;
    }
    .form_item_submit{
        margin-top: .1rem;
        text-align: center;
    }
    .input_box {
        position: relative;
    }
    .label_placeholder{
        position: absolute;
        top: 50%;
        left: .3rem;
        margin-top: -.2rem;
        font-size: .16rem;
        font-family:Roboto-Regular;
        font-weight:400;
        color:rgba(0,0,0,.4);
        line-height: .4rem;
    }
    .form_item_label {
        position: absolute;
        right: 100%;
        top: 50%;
        width: 1rem;
        line-height: .4rem;
        margin-top: -.20rem;
        margin-right: .31rem;
        font-size: .16rem;
        font-family:Roboto-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        opacity:0.6;
        text-align: right;
    }
    .input_text{
        height: .72rem;
        border: 1px solid rgba(51,51,51,.2);
        border-radius: 2px;
        padding: 0 .3rem;
        box-sizing: border-box;
        font-size: .36rem;
        font-family:Roboto-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        opacity:0.8;
    }
    .input_text_coupon{
        width: $inputWidth;
    }
    .input_text_captcha{
        width: 2.62rem;
        vertical-align: middle;
    }
    .img_captcha {
        width: 1.3rem;
        height: .65rem;
        margin-left: .19rem;
    }
    .btn_changecaptcha {
        position: absolute;
        left: 100%;
        top: 50%;
        line-height: .2rem;
        margin-top: -.1rem;
        margin-left: .38rem;
        padding: 0;
        background: transparent;
        color: #0072F0;
        font-size: .16rem;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
    }
    .form_item_error {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: .1rem;
    }
    .form_item_error_text {
        margin-left: .09rem;
        font-size: .16rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: rgba(0,0,0,.4);
        line-height: 1;
        vertical-align: middle;
    }
    .form_item_condition_content{
        width: $inputWidth;
        margin: 0 auto;
        white-space: nowrap;
        cursor: pointer;
    }
    .img_condition{
        width: .18rem;
        height: .18rem;
    }
    .condition_text{
        margin-left: .1rem;
        font-size: .16rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #000000;
        line-height: .18rem;
        vertical-align: middle;
    }
    .condition_terms {
        font-size: .16rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #0072F0;
        line-height: .18rem;
        vertical-align: middle;
        text-decoration: none;
    }
    .btn_proceed{
        width: $inputWidth;
        height: $inputHeight;
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