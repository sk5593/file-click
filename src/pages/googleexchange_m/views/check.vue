<template>
    <base-layout class="container">
        <section class="section section_text">
            <div class="title">
                <span>Type your Coupon</span>
            </div>
            <div class="describe">
                <span>Please enter the coupon code to get a free
                YEELIGHT smart bulb - MSRP $29.99</span>
            </div>
        </section>
        <section class="section section_form">
            <div class="form_item form_item_coupon">
                <div>
                    <label class="form_item_label" for="">Coupon</label>
                </div>
                <div class="form_item_input form_item_content">
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
            <div class="form_item form_item_captcha">
                <div class="form_item_content">
                    <label class="form_item_label" for="">Captcha</label>
                    <div class="input_box">
                        <label class="label_placeholder" v-show="!form.captcha">Enter your captcha here</label>
                        <input type="text" class="input_text input_text_captcha" autocomplete="off" ref="captcha" v-model="form.captcha">
                        <img class="img_captcha" :src="'data:image/png;base64,'+captchaBase64" alt="captcha">
                        <img class="img_refresh" src="../lib/refresh.png" alt="refresh" @click="handlerChangeCaptcha">
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
                    <span class="condition_text">I have read and agree to the </span>
                    <a class="condition_terms" href="javascript: void(0);">Terms and Conditions</a>
                </div>
            </div>
            <div class="form_item form_item_submit">
                <input type="submit" :disabled="!formReady" class="btn btn_proceed" value="Redeem" @click="handlerSubmitForm">
            </div>
        </section>
    </base-layout>
</template>

<script>
    import baseLayout from './baseLayout';
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
                    this.$refs.coupon.focus()
                } else {
                    alert(err.msg);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        font-size: 2.2rem;
        font-family: NotoSans-Regular;
        color: #000;
        line-height: 3.2rem;
    }
    .describe {
        margin-top: .8rem;
        font-size: 1.4rem;
        font-family: Roboto-Regular;
        color: #000;
        line-height: 2.4rem;
        opacity: 0.8;
    }
    .section_form {
        margin-top: 3.8rem;
    }

    .input_box {
        margin-top: 1rem;
        position: relative;
        display: flex;
        align-items: center;
    }
    .label_placeholder{
        position: absolute;
        top: 50%;
        left: 1rem;
        margin-top: -1rem;
        font-size: 1.4rem;
        font-family:Roboto-Regular;
        color: rgba(0,0,0,.4);
        line-height: 2rem;
    }
    .form_item_label {
        font-size: 1.6rem;
        font-family: Roboto-Regular;
        line-height: 1;
        opacity: 0.8;
    }
    .input_text {
        position: relative;
        z-index: 9;
        width: 100%;
        height: 4.4rem;;
        border: 1px solid rgba(0,0,0,.4);
        border-radius: .4rem;
        background: transparent;
        padding: 0 1rem;
    }

    .form_item_captcha {
        margin-top: 4rem;
    }
    .img_captcha {
        width: 4.8rem;
        height: 2.5rem;
        margin-left: 1.5rem;
    }
    .img_refresh {
        width: 1.8rem;
        height: 1.8rem;
        margin-left: 1.6rem;
    }
    .form_item_condition {
        margin-top: 5.5rem;
    }
    .form_item_submit {
        margin-top: 1.8rem;
    }
    .btn_proceed {
        width: 100%;
        height: 4.5rem;
        background: #2F73E8;
        font-size: 2rem;
        color: #fff;
        border: none;
        &:active {
            opacity: .8;
        }
        &:disabled {
            opacity: .3;
        }
    }
    .form_item_condition_content{
        text-align: justify;
    }
    .img_condition {
        width: 1.4rem;
        height: 1.4rem;
    }
    .condition_text {
        margin-left: .8rem;
        font-size: 1.2rem;
        font-family:Roboto-Regular;
        line-height: 1.4rem;
        vertical-align: middle;
        letter-spacing: -.07rem;
    }
    .condition_terms {
        font-size: 1.2rem;
        font-family:Roboto-Regular;
        line-height: 1.4rem;
        vertical-align: middle;
        color: #2F73E8;
        letter-spacing: -.07rem;
    }
    .form_item_error {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: .4rem;
    }
    .form_item_error_text {
        margin-left: 1rem;
        font-size: 1.3rem;
        font-family: Roboto-Regular;
        opacity:0.6;
        line-height: 1;
        vertical-align: middle;
    }
    .forim_item_error_icon {
        width: 1.3rem;
        height: 1.3rem;

    }
</style>