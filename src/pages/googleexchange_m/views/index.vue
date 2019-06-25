<template>
    <div class="container">
        <article class="content">
            <section class="section section_header">
                <img class="img_bg" :src="IMGPrefix+'bg_header_m.png'" alt="">
                <div class="header_content">
                    <img class="img_header_logo" src="../lib/logo.png" alt="">
                    <div class="head_text">
                        <div class="header_title">
                            <span>Google & Yeelight Giveaway Time</span>
                        </div>
                        <div class="header_describe">
                            <span>Try with free Yeelight smart bulb<br>given by Google!</span>
                        </div>
                    </div>
                </div>
                
            </section>
            
            <section class="section">
                <img class="img_bg" :src="IMGPrefix+'bg_color_m.png'" alt="">
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
                <img class="img_bg" :src="IMGPrefix+'bg_dialogue_m.png'" alt="">
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
        <footer class="footer">
             <button class="btn_proceed" @click="handlerProceed">Proceed</button>
        </footer>
    </div>
</template>

<script>
    import { config } from '@/service/googleexchange';
    export default {
        data() {
            return {
                // eslint-disable-next-line no-undef
                IMGPrefix: IMGPrefix
            }
        },
        
        mounted() {
            config().then(res => {
                if(res.data && res.data.valid) {
                    sessionStorage.setItem('googleexchange_config', JSON.stringify(res.data));
                } else {
                    alert('The activity is over.');
                }
            }).catch(err => {
                alert(err.msg)
            });
        },
        methods: {
            handlerLearnMore () {
                window.open('https://yeelight.com/en');
            },

            handlerProceed () {
                this.$router.push({
                    path: '/check'
                });
            } 
        }
    }
</script>

<style lang="scss" scoped>
    $maxWidth: 750px;
    $minWidth: 320px;
    .container {
        color: #333333;
    }
    .content {
        width: 100%;
        max-width: $maxWidth;
        min-width: $minWidth;
        margin: 0 auto;
        padding-bottom: 6rem;
    }
    .section {
        position: relative;
    }
    // .section_form {
    //     padding: .5rem 0;
    // }
    .section_specifications{
        background: #F4F4F4;
        padding: 5rem 0 2.75rem;
    }
    .img_bg {
        width: 100%;
        z-index: 1;
    }
    .header_content{
        position: absolute;
        top: 6.5rem;
        left: 0;
        width: 100%;
        text-align: center;
        z-index: 2;
    }
    .img_header_logo {
        width: 17rem;
    }
    .head_text {
        margin-top: 3.7rem; 
    }
    .header_title{
        font-size: 2rem;
        font-family: NotoSans-Medium;
        font-weight: 500;
        line-height: 1;
    }
    .header_describe{
        margin-top: 1.65rem; 
        font-size: 1.6rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 2.1rem;
    }

    .footer_box {
        text-align: center;
        padding: 2.25rem 7rem 3.25rem;
        font-size: 1.2rem;
        font-family: NotoSans-Regular;
        line-height: 2.5rem;
    }
    .footer_descript{
        color: #000;
    }
    .footer_mail{
        color: #529BF8;
    }

    .function_box {
        overflow: hidden;
        padding: 1.9rem 2.2rem;
    }
    .function_item {
        float: left;
        width: 50%;
        height: 9.25rem;
        text-align: center;
    }
    .img_function { 
        width: 3rem;
        height: 3rem;
    }
    .function_icon {
        margin-top: 1.9rem;
    }
    .function_text {
        margin-top: 1.5rem;
        font-size: 1.2rem;
        font-family: Roboto-Regular;
        line-height: 1;
    }
    .function_line {
        position: absolute;
        top: 50%;
        left: 50%;
        background: rgba(0, 0, 0, .1);
        &.vertical {
            height: 12rem;
            width: 1px;
            margin-top: -6rem;
            transform: translateX(-50%);
        }
        &.horizontal {
            height: 1px;
            width: 33rem;
            margin-left: -16.5rem;
            transform: translateY(-50%);
        }
    }

    .steps_header{
        margin-top: 5rem;
        font-size: 1.4rem;
        font-family: NotoSans-Regular;
        line-height: 1;
        text-align: center;
    }
    .steps_box {
        // overflow: hidden;
        padding: 1.5rem .8rem 3.5rem;
        display: flex;
        flex-wrap: wrap;
    }
    .steps_item {
        // float: left;
        width: 50%;
        text-align: center;
        flex-shrink: 0;
    }
    .img_steps {
        margin-top: 2.5rem;
        width: 5.4rem;
        height: 5.4rem;
        // opacity: .35;
    }
    .steps_text {
        margin-top: 0.9rem;
        font-size: 1.2rem;
        font-family: Roboto-Regular;
        line-height: 1.45rem;
    }

    .specifications_header {
        font-size: 1.4rem;
        font-family: NotoSans-Regular;
        line-height: 1;
        text-align: center;
    }
    .specifications_label {
        margin-top: 2.9rem;
        font-size: 1.2rem;
        font-family: Roboto-Regular;
        line-height: 2.5rem;
        text-align: center;
        white-space: normal;
    }
    .specifications_label_item {
        display: inline-block;
        text-align: left;
        &.left {
            padding-left: 3rem;
        }
        &.right {
            margin-left: 1.6rem;
        }
    }
    .specifications_footer {
        margin-top: 3.1rem;
        text-align: center;
    }
    .btn_specifications {
        width: 9.5rem;
        line-height: 2.2rem;
        border: 1px solid rgba(51,51,51,.4);
        font-size: 1.4rem;
        font-family: Roboto-Regular;
        color:rgba(51,51,51,.8);
        background: transparent;
        border-radius: 2px;
        padding: 0;
    }
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        z-index: 99;
    }
    .btn_proceed {
        width: 100%;
        max-width: $maxWidth;
        height: 6rem;
        background: #2F73E8;
        font-size: 2rem;
        font-family:NotoSans-Medium;
        font-weight:500;
        color: #FFFFFF;
    }
</style>
