<template>
    <div class="container">
        <article class="content">
            <section class="section section_header">
                <img class="img_bg" :src="IMGPrefix+'bg_header.png'" alt="">
                <img class="img_header_logo" src="../lib/logo.png" alt="">
                <div class="head_text">
                    <div class="header_title">
                        <span>Google & Yeelight Giveaway Time</span>
                    </div>
                    <div class="header_describe">
                        <span>Try with free Yeelight smart bulb given by Google!</span>
                    </div>
                </div>
            </section>
            <section class="section section_form">
                <div class="form">
                    <div class="form_item form_header">
                        <div class="form_title">
                            <span>Type your Coupon</span>
                        </div>
                        <div class="form_describe">
                            <span>Please enter the coupon code to get a free YEELIGHT smart bulb - MSRP</span>
                        </div>
                    </div>
                    <div class="form_item form_item_input form_item_coupon">
                        <div class="form_item_content">
                            <label class="form_item_label" for="">Coupon :</label>
                            <div class="input_box">
                                <label class="label_placeholder" v-show="!form.coupon">Enter your code here</label>
                                <input type="text" class="input_text input_text_coupon" autocomplete="off" v-model="form.coupon">
                                <div class="form_item_error" v-show="couponError">
                                    <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                    <span class="form_item_error_text">The coupon code has expired</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_item form_item_input form_item_captcha">
                        <div class="form_item_content">
                            <label class="form_item_label" for="">Captcha :</label>
                            <div class="input_box">
                                <label class="label_placeholder" v-show="!form.captcha">Enter your captcha here</label>
                                <input type="text" class="input_text input_text_captcha" autocomplete="off" v-model="form.captcha">
                                <img class="img_captcha" src="../lib/captcha.png" alt="">
                                <button class="btn_changecaptcha" @click="handlerChangeCaptcha">change</button>
                                <div class="form_item_error" v-show="captchaError">
                                    <img class="forim_item_error_icon" src="../lib/error.png" alt="">
                                    <span class="form_item_error_text">Type your correct captcha</span>
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
                        <input type="submit" :disabled="!formReady" class="btn btn_proceed" value="Proceed" @click="handlerSubmitForm">
                    </div>
                </div>
            </section>
            <section class="section">
                <img class="img_bg" :src="IMGPrefix+'bg_color.png'" alt="">
                <div class="color_text">
                    <div class="color_text_title">Yeelight</div>
                    <div class="color_text_title color_text_title_vice">Smart LED Bulb (Color)</div>
                    <div class="color_text_describe">Have a Light Bulb Moment</div>
                </div>
            </section>
            <section class="section">
                <div class="function_box">
                    <div class="function_item">
                        <div class="function_icon"><img class="img_function" src="../lib/wifi.png" alt=""></div>
                        <div class="function_text">Wifi Support</div>
                    </div>
                    <div class="function_item">
                        <div class="function_icon"><img class="img_function" src="../lib/voice.png" alt=""></div>
                        <div class="function_text">Voice Control</div>
                    </div>
                    <div class="function_item">
                        <div class="function_icon"><img class="img_function" src="../lib/app.png" alt=""></div>
                        <div class="function_text">App Control</div>
                    </div>
                    <div class="function_item">
                        <div class="function_icon"><img class="img_function" src="../lib/syncmusic.png" alt=""></div>
                        <div class="function_text">Sync with Music</div>
                    </div>
                </div>
                <div class="function_line horizontal"></div>
                <div class="function_line vertical"></div>
            </section>
            <section class="section">
                <img class="img_bg" :src="IMGPrefix+'bg_dialogue.png'" alt="">
            </section>
            <section class="section">
                <header class="steps_header">Installation steps</header>
                <div class="steps_box">
                    <div class="steps_item">
                        <div class="steps_icon">
                            <img class="img_steps" src="../lib/steps1.png" alt="">
                        </div>
                        <div class="steps_text">
                            1. Download the Google Home<br> 
                            app to set up your<br> 
                            Google Home
                        </div>
                    </div>
                    <div class="steps_item">
                        <div class="steps_icon">
                            <img class="img_steps" src="../lib/steps2.png" alt="">
                        </div>
                        <div class="steps_text">
                            2. Screw in your Yeelight<br>
                            smart bulb
                        </div>
                    </div>
                    <div class="steps_item">
                        <div class="steps_icon">
                            <img class="img_steps" src="../lib/steps3.png" alt="">
                        </div>
                        <div class="steps_text">
                            3. Download the Yeelight app<br>
                            to set up your smart bulb
                        </div>
                    </div>
                    <div class="steps_item">
                        <div class="steps_icon">
                            <img class="img_steps" src="../lib/steps4.png" alt="">
                        </div>
                        <div class="steps_text">
                            4. Link Yeelight service<br>
                            following the instructions<br>
                            in Google Home app
                        </div>
                    </div>
                </div>
            </section>
            <section class="section section_specifications">
                <header class="specifications_header">Specifications</header>
                <div class="specifications_label">
                    <div class="specifications_label_item left">
                        Product Name<br>
                        Size<br>
                        Shape<br>
                        Color<br>
                        Product Dimensions<br>
                        Material<br>
                        Power Source<br>
                        Voltage<br>
                        Wattage<br>
                        Item Package Quantity<br>
                        Type of Bulb<br>
                        Lumnious Flux<br>
                        Model<br>
                        MSRP<br>          
                    </div>
                    <div class="specifications_label_item right">
                        Yeelight Smart Bulb Color<br>
                        60W Equivalent Bulb<br>
                        A19 E27 Fitting<br>
                        Dynamic - Multiple color options<br>
                        65x65x130mm<br>
                        Plastic<br>
                        AC<br>
                        220-240 Volts<br>
                        10W<br>
                        1<br>
                        LED<br>
                        800lm<br>
                        No. YLDP06YL<br>
                        USD 29.99<br> 
                    </div>
                </div>
                <div class="specifications_footer">
                    <button class="btn btn_specifications">Learn more</button>
                </div>
            </section>
            <section class="section section_footer">
                <div class="footer_box">
                    <span class="footer_descript">If you have any further questions,<br>please contact </span>
                    <a class="footer_mail" href="mailto:giveaway@yeelight.com">giveaway@yeelight.com</a>
                </div>
            </section>
        </article>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // eslint-disable-next-line no-undef
                IMGPrefix: IMGPrefix,
                form: {
                    coupon: '',
                    captcha: ''
                },
                couponError: false,
                captchaError: false,
                conditionAgree: false,
                formReady: false
            }
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
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    $maxWidth: 1440px;
    $minWidth: 1200px;
    $inputWidth: 4.12rem;
    $inputHeight: .72rem;
    .container {
        color: #333333;
    }
    .content {
        width: 100%;
        max-width: $maxWidth;
        min-width: $minWidth;
        margin: 0 auto;
    }
    .section {
        position: relative;
    }
    .section_form {
        padding: .5rem 0;
    }
    .section_specifications{
        background: #F4F4F4;
        padding: .6rem 0;
    }
    .img_bg {
        width: 100%;
        z-index: 1;
    }
    .img_header_logo {
        position: absolute;
        top: .36rem;
        right: .57rem;
        z-index: 2;
    }
    .head_text {
        position: absolute;
        top: 1.65rem;
        left: 0;
        width: 100%;
        text-align: center;
    }
    .header_title{
        font-size: .42rem;
        font-family: NotoSans-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 1;
    }
    .header_describe{
        margin-top: .28rem; 
        font-size: .2rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 1;
    }

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
        line-height: .36rem;
        opacity: 0.9;
    }
    .form_item {
        position: relative;
    }
    .form_item_coupon{
        margin-top: .49rem;
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
    }
    .btn_proceed{
        width: $inputWidth;
        height: $inputHeight;
        background:rgba(0,114,240,1);
        box-shadow: 0px 5px 8px 0px rgba(15,34,63,0.13);
        border-radius:2px;  
        font-size: .3rem;
        font-family:Roboto-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: .5rem;
        border: none;
        &:disabled {
            opacity:0.3;
        }
    }

    .color_text {
        position: absolute;
        top: 1.76rem;
        left: .94rem;
        z-index: 2;
    }
    .color_text_title {
        font-size: .36rem;
        font-family: NotoSans-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 1;
    }
    .color_text_title_vice {
        margin-top: .12rem;
    }
    .color_text_describe {
        margin-top: .26rem;
        font-size: .2rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 1;
        opacity: 0.8;
    }

    .footer_box {
        text-align: center;
        padding: .67rem 0 .72rem;
        font-size: .2rem;
        font-family: NotoSans-Regular;
        font-weight: 400;
        line-height: .36rem;
    }
    .footer_descript{
        color: #000;
    }
    .footer_mail{
        color: #529BF8;
    }

    .function_box {
        overflow: hidden;
    }
    .function_item {
        float: left;
        width: 50%;
        height: 2.16rem;
        text-align: center;
    }
    .img_function { 
        width: .6rem;
        height: .6rem;
    }
    .function_icon {
        margin-top: .67rem;
    }
    .function_text {
        margin-top: .1rem;
        font-size: .1rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 1;
    }
    .function_line {
        position: absolute;
        top: 50%;
        left: 50%;
        background: rgba(0, 0, 0, .1);
        &.vertical {
            height: 3.44rem;
            width: 1px;
            margin-top: -1.72rem;
            transform: translateX(-50%);
        }
        &.horizontal {
            height: 1px;
            width: 12.72rem;
            margin-left: -6.86rem;
            transform: translateY(-50%);
        }
    }

    .steps_header{
        margin-top: .6rem;
        font-size: .36rem;
        font-family: NotoSans-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 1;
        text-align: center;
    }
    .steps_box {
        overflow: hidden;
        padding: .7rem .46rem .66rem;
    }
    .steps_item {
        float: left;
        width: 25%;
        text-align: center
    }
    .img_steps {
        width: 1.55rem;
        height: 1.54rem;
        opacity: .35;
    }
    .steps_text {
        margin-top: .4rem;
        font-size: .2rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #333333;
        line-height: .24rem;
    }

    .specifications_header {
        font-size: .36rem;
        font-family: NotoSans-Regular;
        font-weight: 400;
        color:#333333;
        line-height: 1;
        text-align: center;
    }
    .specifications_label {
        margin-top: .67rem;
        font-size: .2rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #333333;
        line-height: .36rem;
        text-align: center;
    }
    .specifications_label_item {
        display: inline-block;
        text-align: left;
        &.right {
            margin-left: 1.5rem;
        }
    }
    .specifications_footer {
        margin-top: .65rem;
        text-align: center;
    }
    .btn_specifications {
        width: 1.16rem;
        height: .36rem;
        border: 2px solid rgba(51,51,51,.4);
        font-size: .16rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color:rgba(51,51,51,.8);
        background: transparent;
        border-radius: 2px;
    }
</style>
