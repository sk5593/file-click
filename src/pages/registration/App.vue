<template>
    <div class="container">
        <article class="content">
            <header class="header">
                <div class="header_title">
                    <img class="img_header" src="./lib/img_title.png" alt="">
                </div>
                <div class="header_main">
                    <img class="img_main" src="./lib/img_main.png" alt="">
                    <img class="img_arrow" src="./lib/img_arrow.png" alt="">
                </div>
            </header>
            <main class="main">
                <div class="main_item main_introduce">
                    <div class="main_subtitle">
                        <h2 class="subtitle_title">活动介绍</h2>
                        <img class="subtitle_img" src="./lib/img_subtitle.png" alt="">
                    </div>
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="inner_des">
                                <p class="des_p1">各位椰粉大家好！</p>
                                <p class="des_p2">夏季的炎热还未完全散去，Yeelight青岛金狮旗舰店又将火热开启。我们诚邀青岛及周边的椰粉们在10月19日这一天齐聚青岛金狮广场1楼北庭，诚邀您与我们一同见证Yeelight这一重要时刻。</p>
                            </div>
                            <div class="inner_infor inner_surprise">
                                <p class="infor_title">现场活动亮点揭秘</p>
                                <p class="infor_des">1.智能体验--旗舰店配有最新最全的智能照明互动体验区，满足你对未来智能家居的憧憬。</p>
                                <p class="infor_des">2.抽奖/礼品--除了精美伴手礼，你想要的Yeelight智能产品，我们这次抽奖送给你。</p>
                            </div>
                            <div class="inner_infor">
                                <p class="infor_title">开业时间</p>
                                <p class="infor_des">2019-10-19 10:00</p>
                            </div>
                            <div class="inner_infor">
                                <p class="infor_title">活动类型</p>
                                <p class="infor_des">线下活动</p>
                            </div>
                            <div class="inner_infor">
                                <p class="infor_title">活动地点</p>
                                <p class="infor_des">山东省青岛市崂山区香港东路195号乙金狮广场 1楼北庭</p>
                            </div>
                            <div class="inner_infor">
                                <p class="infor_title">报名截止</p>
                                <p class="infor_des">2019-10-13 00:00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_item main_interior">
                    <div class="main_subtitle">
                        <h2 class="subtitle_title">店铺内景</h2>
                        <img class="subtitle_img" src="./lib/img_subtitle.png" alt="">
                    </div>
                    <div class="main_inner">
                        <div class="inner_box">
                            <img class="interior_img" src="./lib/img_scene01.png" alt="">
                            <img class="interior_img" src="./lib/img_scene02.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="main_item main_join">
                    <div class="main_subtitle">
                        <h2 class="subtitle_title">入群方式</h2>
                        <img class="subtitle_img" src="./lib/img_subtitle.png" alt="">
                    </div>
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="inner_des">
                                <p class="des_p1">扫描二维码或搜索“w_vince”添加小助理微信号，添加成功后发送进群关键词“开业”，小助理会将大家拉进群哦。</p>
                            </div>
                            <div class="inner_QRCode">
                                <img class="QRCode_img" src="./lib/qr_code.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="footer"  @click="statePage">{{this.state == 0 ? "立即报名" : "结果查询" }}</footer>
        </article>
    </div>
</template>

<script>
    import { activityHome, activityInfor, autoCookie } from '@/service/registration';
    export default {
        data() {
            return {
                state: 0,//0未报名；1报名成功；2恭喜你； 3很遗憾；4活动结束
                end: false,  
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.activityHome();
            },
            activityHome() {
                return activityHome().then(res => {
                    var activeData = res.data;
                    this.end = activeData.end;
                    this.activityInfor();
                }, rej => {
                    if(rej.status == '401') {
                        location.href = autoCookie(location.href);
                    }
                })
            },
            activityInfor() {
                return activityInfor().then(res => {
                    var personData = res.data;
                    var state = personData.state;
                    if(state == 11) {//审核通过
                        this.state = 2;
                    }else if(state == 10) {
                        if(this.end) {//很遗憾
                            this.state = 3;
                        }else {//报名成功
                            this.state = 1;
                        }
                    }else if(state == undefined) {
                        if(this.end) {//活动截止
                            this.state = 4;
                        }else {//未报名
                            this.state = 0;
                        }
                    }
                })
            },
            statePage() {
                location.href = './registration_state.html'
            }
        }
    }
</script>

<style>
    body{
        font-family: -apple-system, Helvetica, sans-serif;
    }
</style>

<style lang="scss" scoped>
    $pageWidthMaxPx: 750px;
    $pageWidthMaxRem: 18.75rem;
    $mainConColor: #6B0914;
    $mainTitleColor: #fff;
    $footerBtnHeight: 50px;
    $borderColor: #E04654;
    .container{
        position: relative;
        max-width: $pageWidthMaxPx;
        margin: 0 auto;
        color: $mainConColor;
        min-height: 100vh;
        padding-bottom: env(safe-area-inset-bottom);
    }
    .content{
        position: relative;
        padding-top: 1.8rem;
        padding-bottom: 3rem;
        background: #B94A48;
        min-height: 100vh;
    }
    .header{
        z-index: 1;
    }
    .header_main{
        position: relative;
        margin-top: .65rem;
    }
    .header_title img, .header_main .img_main{
        width: 100%;
    }
    .header_main .img_arrow{
        position: absolute;
        bottom: 2.1rem;
        left: 50%;
        width: 2rem;
        margin-left: -1rem;
    }
    .main{
        margin-top: -0.7rem;
    }
    .main_item{
        position: relative;
        width: 17.25rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1.85rem; 
        background: linear-gradient(to bottom, #FFFFFF, #FFF8EA);
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        border-radius: 2px;
    }
    .main_item:last-child{
        margin-bottom: 0;
    }
    .main_subtitle{
        position: absolute;
        top: -0.67rem;
        left: 0rem;
        width: 6.75rem;
        text-align: center;
        
    }
    .subtitle_title{
        position: absolute;
        top: 50%;
        margin-left: 1.3rem;
        transform: translate(0%, -50%);
        font-size: .8rem;
        color: $mainTitleColor;
    }
    .subtitle_img{
        width: 100%;
    }
    .main_inner{
        border: 1px solid $borderColor; 
        margin: .35rem .4rem;     
    }
    .inner_box{
        padding-top: 2rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }
    .inner_des{
        margin-bottom: 1rem;
        font-size: .7rem;
        color: $mainConColor;
        line-height: 1.25rem; 
    }
    .infor_title{
        display: inline-block;
        padding-left: .65rem;
        padding-right: .65rem;
        height: 1.1rem;
        font-size: .7rem;
        line-height: 1.1rem;
        text-align: center;
        background: #DA9C6C;
        color: $mainTitleColor;
        margin-bottom: .4rem;
    }
    .infor_des{
        font-size: .7rem;
        // font-weight: lighter;
        color: $mainConColor;
        margin-bottom: 0.65rem;
        text-align: justify;
    }
    .main_introduce .inner_box{
        padding-bottom: .65rem;
    }
    .main_interior .inner_box{
        padding-bottom: 1.9rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .main_interior .interior_img{
        margin-bottom: 1.55rem;
        width: 100%;
    }
    .main_interior .interior_img:last-child{
        margin-bottom: 0;
    }
    .main_join .inner_box{
        padding-bottom: .85rem;
    }
    .main_join .inner_QRCode{
        margin: 2rem;
    }
    .main_join .QRCode_img{
        width: 100%;
    }
    .footer{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2.5rem;
        margin-top: .5rem;
        text-align: center;
        line-height: 2.5rem;
        font-size: .8rem;
        font-weight: Medium;
        background: #F7DDAA;
        color: $mainConColor;
    }   
</style>