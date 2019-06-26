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
                <slot></slot>
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
                    <button class="btn btn_specifications" @click="handlerLearnMore">Learn more</button>
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
                IMGPrefix: IMGPrefix
            }
        },
        
        mounted() {
            
        },
        methods: {
            
            handlerLearnMore () {
                window.open('https://yeelight.com/en');
            },
        }
    }
</script>

<style lang="scss" scoped>
    $maxWidth: 1440px;
    $minWidth: 1200px;
    .container {
        font-size: 14px;
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
        font-family: NotoSans-Medium inherit;
        font-weight: 500;
        color: #333333;
        line-height: 1;
    }
    .header_describe{
        margin-top: .28rem; 
        font-size: .2rem;
        font-family: Roboto-Regular inherit;
        font-weight: 400;
        color: #333333;
        line-height: 1;
    }


    .color_text {
        position: absolute;
        top: 1.76rem;
        left: .94rem;
        z-index: 2;
    }
    .color_text_title {
        font-size: .36rem;
        font-family: NotoSans-Regular inherit;
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
        font-family: Roboto-Regular inherit;
        font-weight: 400;
        color: #333333;
        line-height: 1;
        opacity: 0.8;
    }

    .footer_box {
        text-align: center;
        padding: .67rem 0 .72rem;
        font-size: .2rem;
        font-family: NotoSans-Regular inherit;
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
        font-size: .2rem;
        font-family: Roboto-Regular inherit;
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
        font-family: NotoSans-Regular inherit;
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
        font-family: Roboto-Regular inherit;
        font-weight: 400;
        color: #333333;
        line-height: .24rem;
    }

    .specifications_header {
        font-size: .36rem;
        font-family: NotoSans-Regular inherit;
        font-weight: 400;
        color:#333333;
        line-height: 1;
        text-align: center;
    }
    .specifications_label {
        margin-top: .67rem;
        font-size: .2rem;
        font-family: Roboto-Regular inherit;
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
        font-family: Roboto-Regular inherit;
        font-weight: 400;
        color:rgba(51,51,51,.8);
        background: transparent;
        border-radius: 2px;
    }
</style>
