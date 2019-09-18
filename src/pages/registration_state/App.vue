<template>
    <div class="container">
        <article class="content">
            <header class="header">
                <div class="header_main">
                    <img class="img_main" src="./lib/img_main_state.png" alt="">
                </div>
            </header>
            <main class="main "  v-if="state == '0'">
                 <div class="main_item main_form">
                    <div class="main_subtitle">
                        <h2 class="subtitle_title">活动报名</h2>
                        <img class="subtitle_img" src="./lib/img_subtitle.png" alt="">
                    </div>
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="form_content">
                                <div class="form_item form_name">
                                    <img class="icon_name" src="./lib/icon_name.png" alt="">
                                    <input type="text" placeholder="姓名" v-model="form.userName">
                                </div>
                                <div class="form_item form_phone">
                                    <img class="icon_phone" src="./lib/icon_phone.png" alt="">
                                    <input type="tel" placeholder="手机号" v-model="form.userMobile">
                                </div>
                                <div class="form_item form_address">
                                    <img class="icon_address" src="./lib/icon_address.png" alt="">
                                    <input type="text" placeholder="省、市、区/县" v-model="area" @click="selectArea=true">
                                    <img class="icon_arrow" src="./lib/icon_arrow.png" alt="">
                                </div>
                                
                            
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <main class="main main_result" v-else-if="state == '1'">
                <div class="main_item main_result">
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="inner_des">
                                <p class="des_p1"><span class="inner_line line_left"></span><span class="inner_title">提交成功</span><span class="inner_line line_right"></span></p>
                                <p class="des_p2">我们会尽快与您联系，请耐心等待哦！您也可在开业前7天再次点击此链接自行查询结果。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <main class="main main_result" v-else-if="state == '2'">
                <div class="main_item main_result">
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="inner_des">
                                <p class="des_p1"><span class="inner_line line_left"></span><span class="inner_title">恭喜您</span><span class="inner_line line_right"></span></p>
                                <p class="des_p2">恭喜您通过Yeelight青岛金狮旗舰店开业典礼的审核！请于10月19日10点凭此短信入场签到领取伴手礼，地点：青岛市金狮广场一楼北庭。请加工作人员微信（微信号：w_vince），发送“开业”，即可进入开业群交流。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <main class="main main_result" v-else-if="state == '3'">
                <div class="main_item main_result">
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="inner_des">
                                <p class="des_p1"><span class="inner_line line_left"></span><span class="inner_title">很遗憾</span><span class="inner_line line_right"></span></p>
                                <p class="des_p2">很抱歉您的本次报名未通过审核，感谢您的参与！欢迎关注“Yeelight青岛金狮旗舰店”，让我们下期活动再见！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <main class="main main_result" v-else-if="state == '4'">
                <div class="main_item main_result">
                    <div class="main_inner">
                        <div class="inner_box">
                            <div class="inner_des">
                                <p class="des_p1"><span class="inner_line line_left"></span><span class="inner_title">活动结束</span><span class="inner_line line_right"></span></p>
                                <p class="des_p2">亲爱的椰粉，本次活动报名已结束，感谢您的参与！欢迎关注“Yeelight青岛金狮旗舰店”，让我们下期活动再见！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="footer" @click="submitClick" v-if="state == '0'">提交</footer>
        </article>
        <van-popup v-model="selectArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirmArea" @cancel="onCancelArea"/>
        </van-popup>
    </div>
</template>

<script>
    import { Dialog, Toast, Loading, Area, Popup } from 'vant';
    import { activityHome, activityInfor, submit, address } from '@/service/registration';
    import areaList from './lib/area';
    export default {
        data(){
            return {
                state: '',//0未报名；1报名成功；2恭喜你； 3很遗憾；4活动结束
                end: false,
                selectArea: false,
                area: '',
                form: {
                    activityId: '',
                    activityName: '',
                    userName: '',
                    userMobile: '',
                    userProvinceId: '',
                    userProvinceName: '',
                    userCityId: '',
                    userCityName:'',
                    userRegionId: '',
                    userRegionName: ''
                },
                areaList: {}
            }
        },
        components: {
            vanArea: Area,
            vanPopup: Popup
        },
        mounted() {
            this.init();
            this.areaList = areaList;
        },
        methods: {
            init() {
                this.activityHome();
            },
            activityHome() {
                return activityHome().then(res => {
                    var activeData = res.data;
                    this.end = activeData.end;
                    this.form.activityId = activeData.id;
                    this.activityInfor();
                }, rej => {
                    if(rej.code == '401002') {
                        location.href = 'http://test.yeelight.com/apis/c/wx/r/redirect?redirect=' + location.href;
                    }
                })
            },
            activityInfor() {
                return activityInfor().then(res => {
                    var personData = res.data;
                    var state = personData.state;
                    this.form.activityName = personData.activityName
                    
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
                            this.address()
                        }
                    }
                })
            },
            onConfirmArea(val) {
                if(val && val.length){
                    this.form.userProvinceId = val[0].code;
                    this.form.userProvinceName = val[0].name;
                    this.form.userCityId = val[1].code;
                    this.form.userCityName = val[1].name;
                    this.form.userRegionId = val[2].code;
                    this.form.userRegionName = val[2].name;
                    this.area = this.form.userProvinceName + '、' + this.form.userCityName + '、' + this.form.userRegionName;
                }
                this.selectArea = false;
            },
            onCancelArea() {
                this.selectArea = false;
            },
            submitClick() {
                this.submit(this.form);
            },
            submit(data) {
                if(!this.validFormData()) return;
                this.isSubmiting = true;
                submit(data).then(res => {
                    this.state = 1;
                }, rej => {
                    Dialog({
                        message: rej.msg
                    })
                })
            },
            validFormData() {
                if(!this.form.userName) {
                    Toast('请输入姓名');
                    return false;
                }else if(!this.form.userMobile) {
                    Toast('请输入电话')
                    return false;
                }else if(this.form.userMobile.length != 11){
                    Toast('请输入正确的手机号')
                    return false;
                }else if(!this.form.userProvinceId){
                    Toast('请输入地址')
                    return false;
                }
                return true;
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
    $footerBtnHeight: 2.5rem;
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
        padding-top: 1.05rem;
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
    .main{
        margin-top: -6.1rem;
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
        border-radius: .1rem;
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
    .inner_box{
        padding-top: 2.25rem;
        padding-left: .75rem;
        padding-right: .75rem;
        padding-bottom: 1.7rem;
    }
    .form_item{
        position: relative;
        margin-bottom: .5rem;
        border: 1px solid #ECC2C7;
    }
    .form_item:last-child{
        margin-bottom: 0;
    }
    .form_item img{
        position: absolute;
        top: 50%;
        left: .7rem;
        transform: translateY(-50%);
        width: .75rem;
    }
    .form_item .icon_arrow{
        left: inherit;
        right: .7rem;
    }
    .inner_box input{
        padding: .7rem 2.05rem;
        width: 100%;
        font-size: .7rem;
        background-color: transparent;
        outline: none;
        border: none;
        color: $mainConColor;
    }
    .inner_box input::placeholder{
        color: #B58181;
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
    .main_result .main_inner{
        border: 1px solid #E04654; 
        margin: .35rem .4rem; 
    }
    
    .main_result .inner_box{
        padding: 2.6rem 1.3rem 2.75rem;
        text-align: center;   
    }
    .main_result .des_p1{
        position: relative;
        display: inline-block;
        margin-bottom: 1.75rem;
        font-size: .8rem;
    }
    .main_result .des_p2{
        font-size: .7rem;
        text-align: justify;
        line-height: 1.1rem;
    }
    .main_result span{
        display: inline-block;
    }
    .main_result .inner_title{
        padding: 0 .5rem;
    }
    .main_result .inner_line{
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -1px;
        width: 1.15rem;
        height: .1rem;
        background: $mainConColor;
    }
    .main_result .line_left{
        left: -1.15rem;
    }
    .main_result .line_right{
        left: inherit;
        right: -1.15rem;
    }

</style>