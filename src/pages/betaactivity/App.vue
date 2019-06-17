<template>
    <div class="container">
        <article v-if="state==1" class="content hasBtn">
            <header class="header">
                <img class="img_header" :src="config.bgTopImage" alt="">
            </header>
            <main class="main">
                <div class="form">
                    <div class="form-row">
                        <div class="form-input form-single" flex="cross:center">
                            <img class="icon" src="./lib/icon_name.png">
                            <span class="form-placeholder" v-show="!form.name&&isNameFocus==false">姓名</span>
                            <input flex-box="1" class="input-text" @focus="isNameFocus=true" @blur="isNameFocus=false" type="text" maxlength="50" v-model="form.name">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-input form-single" flex="cross:center">
                            <img class="icon" src="./lib/icon_phone.png">
                            <span class="form-placeholder" v-show="!form.phoneNumber&&isNumFocus==false">手机号</span>
                            <input flex-box="1" class="input-text" @focus="isNumFocus=true" @blur="isNumFocus=false" type="tel" maxlength="11" v-model="form.phoneNumber">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-row-area">
                            <div class="form-input-area" flex="cross:center">
                                <img class="icon" src="./lib/icon_address.png">
                                <span class="form-placeholder" v-show="!form.area">省、市、区/县</span>
                                <input flex-box="1" class="input-text" readonly unselectable="on" onfocus="this.blur()" type="text" v-model="form.area" @click="selectArea=true">
                                <div class="arrow-down"></div>
                                <div class="area-border"></div>
                            </div>
                            <div class="form-input-address" flex="cross:center">
                                <img class="icon" src="./lib/icon_address.png" style="visibility: hidden;">
                                <span class="form-placeholder" v-show="!form.address&&isAddFocus==false">详细地址</span>
                                <input flex-box="1" class="input-text" @focus="isAddFocus=true" @blur="isAddFocus=false" type="text" maxlength="50" v-model="form.address">
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <aside class="aside">
                <img class="img_rule" :src="config.bgBottomImage" alt="">
            </aside>
            <footer class="footer" :class="{'isfocus': isFocus}">
                <button class="btn_submit" @click="handleBth" :disabled="isSubmiting" :style="{'background':config.buttonBgColor, 'color': config.buttonFontColor}">
                    <van-loading v-show="isSubmiting" size="16" text-size="16" color="#969799" type="spinner">提交中...</van-loading>
                    <span v-show="!isSubmiting">立即提交</span>
                </button>
            </footer>
        </article>
        <article v-else-if="state==2" class="content content_err">
            <img :src="config.denyImage" alt="">
        </article>
        <article v-else-if="state==3" class="content content_err">
            <img :src="config.endImage" alt="">
        </article>
        <article v-else-if="state==4" class="content content_err">
            <img :src="config.completeImage" alt="">
        </article>
        
        <van-popup v-model="selectArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirmArea" @cancel="onCancelArea"/>
        </van-popup>
    </div>
</template>

<script>
    import { Dialog, Toast, Loading, Area, Popup } from 'vant';
    import { getQueryString, isvalidatemobile, isvalidatetel, validatenull } from '@/util/util';
    import { getToken, setToken } from '@/util/auth'
    import { getCurrentOne, checkJoinCurrentk, submit } from '@/service/betaactivity';
    import areaList from './lib/area'
    export default {
        data(){
            return {
                state: 0, // 0：初始状态；1：活动进行中；2：无支持设备；3：活动结束；4：名额已满
                form: {
                    activityId: '',
                    name: '',
                    phoneNumber: '',
                    address: '',
                    area: ''
                },
                config: {},
                isSubmiting: false,
                selectArea: false,
                areaList: {},
                isAddFocus: false,
                isNameFocus: false,
                isNumFocus: false,
                errInfo: null,
                originalHeight: 0,
                focusTemp: ''
            }
        },
        components: {
            vanLoading: Loading,
            vanArea: Area,
            vanPopup: Popup
        },
        computed: {
            isFocus() {
                return this.isNameFocus || this.isNumFocus || this.isAddFocus
            }
        },
        mounted(){
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
                duration: 0
            });
            let token = getQueryString('timeline') || getToken();
            if(token) setToken(token);
            this.areaList = areaList;
            this.originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
            window.onresize = () => {
                var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if(resizeHeight-0 < this.originalHeight-0){
                    if(this.isFocus || !this.focusTemp) return;
                    this[this.focusTemp] = true;
                }else{
                    if(!this.isFocus) return;
                    if (this.isNameFocus) { this.focusTemp = 'isNameFocus'; this.isNameFocus = false; }
                    else if (this.isNumFocus) { this.focusTemp = 'isNumFocus'; this.isNumFocus = false; }
                    else if (this.isAddFocus) { this.focusTemp = 'isAddFocus'; this.isAddFocus = false; }
                }
            }
            this.init();
        },
        methods: {
            init(){
                Promise.all([
                    this.getCurrentOne(),
                    checkJoinCurrentk().then(() => {
                        this.state = 1;
                    }).catch(err => {
                        this.errInfo = err;
                        this.initErrPage(err);
                    })
                ]).finally(() => {
                    Toast.clear();
                    if(validatenull(this.config)){
                        let msg = '';
                        if(this.errInfo) msg = this.errInfo.msg;
                        else msg = '网络开小差了，请稍后重试~';
                        Dialog({ 
                            message: msg,
                            confirmButtonColor: '#00c200',
                            className: 'dialog_activity',
                            beforeClose: (action, done) => {
                                try{
                                    // eslint-disable-next-line no-undef
                                    wx.navigateBack();
                                } catch(e) {
                                    // eslint-disable-next-line no-console
                                    console.log(e);
                                }
                                done();
                            }
                        });
                    }
                });
            },
            initErrPage(err){
                let code = err.code;
                if(code == '30001' || code == '30002'){
                    this.state = 3;
                } else if (code == '32003'){
                    this.state = 1;
                } else if (code == '31001'){
                    this.state = 4;
                } else if (code == '32001'){
                    try {
                        // eslint-disable-next-line no-undef
                        wx.redirectTo({
                            url: '/pages/index/index?page=load'
                        });
                    } catch(e) {
                        // eslint-disable-next-line no-console
                        console.log(e);
                    }
                } else if (code == '32002'){
                    try {
                        // eslint-disable-next-line no-undef
                        wx.redirectTo({
                            url: '/pages/oauth/oauth'
                        });
                    } catch(e) {
                        // eslint-disable-next-line no-console
                        console.log(e);
                    }
                } else {
                     Dialog({ 
                        message: err.msg || '网络开小差了，请稍后重试~',
                        confirmButtonColor: '#00c200',
                        className: 'dialog_activity'
                    });
                }
            },

            getCurrentOne() {
                return getCurrentOne().then(res => {
                    if(res.success){
                        document.body.style.backgroundImage = `url(${res.data.bgImage})`;
                        this.config = res.data;
                        this.form.activityId = res.data.id;
                    }
                });
            },
            handleBth(){
                this.submit();
            },
            submit(){
                if(!this.validFormData()) return;
                this.isSubmiting = true;
                let data = JSON.stringify({
                    activityId: this.form.activityId,
                    phoneNumber: this.form.phoneNumber,
                    name: this.form.name,
                    address: this.form.area + this.form.address
                });
                submit(data).then(() => {
                     Dialog({ 
                        message: '您已提交内测申请！参与成功后，我们会尽快与您联系，请耐心等待哦！',
                        messageAlign: 'left',
                        confirmButtonColor: '#00c200',
                        className: 'dialog_activity',
                        beforeClose: (action, done) => {
                            try{
                                // eslint-disable-next-line no-undef
                                wx.navigateBack();
                            } catch(e) {
                                // eslint-disable-next-line no-console
                                console.log(e);
                            }
                            done();
                        }
                    });
                }).catch(err => {
                    this.initErrPage(err);
                }).finally(() => {
                    this.isSubmiting = false;
                });
            },
            validFormData() {
                if(!this.form.name){
                    Toast('请输入姓名~');
                    return false;
                } else if(!this.form.phoneNumber){
                    Toast('请输入手机号~');
                    return false;
                } else if (isvalidatemobile(this.form.phoneNumber)[0] && isvalidatetel(this.form.phoneNumber)[0]) {
                    Toast('手机号码格式不正确~');
                    return false;
                } else if (!this.form.area){
                    Toast('请选择省、市、区/县~');
                    return false;
                } else if (!this.form.address){
                    Toast('请输入地址~');
                    return false;
                }
                return true;
            },
            onConfirmArea(val) {
                if(val && val.length){
                    let area = '';
                    val.forEach(item => {
                        area += item.name
                    })
                    this.form.area = area;
                }
                this.selectArea = false;
            },
            onCancelArea() {
                this.selectArea = false;
            }
        }
    }
</script>

<style>
    body{
        /* background: #121525; */
        font-family: -apple-system,Helvetica,sans-serif;
    }
    .dialog_activity{
        width: 14rem;
        /* height: 8.45rem; */
        color: #999999;
    }
    .dialog_activity .van-dialog__message{
        padding-left: 2.1rem; 
        padding-right: 2.1rem;
    }
</style>

<style lang="scss" scoped>
    $pageWidthMaxPx: 750px;
    $pageWidthMaxRem: 18.75rem;
    $mainFontColor: #333333;
    $footerBtnHeight: 50px;
    .container{
        position: relative;
        max-width: $pageWidthMaxPx;
        margin: 0 auto;
        color: $mainFontColor;
        min-height: 100vh;
        padding-bottom: env(safe-area-inset-bottom);
    }
    .content{
        padding-top: 1.8rem;
    }
    .content.hasBtn{
        padding-bottom: $footerBtnHeight;
    }
    .content_err > img{
        width: 100%;
    }
    .header{
        z-index: 1;
    }

    .img_header, .img_rule{
        width: 100%;
    }

    .form{
        position: relative;
        margin-top: .1rem;
        margin-bottom: 0.95rem;
        z-index: 9;
    }
    
    .aside{
        padding-bottom: 1.225rem;
    }

    .form-row + .form-row{
        margin-top: .5rem;
    }
    .form-input{
        position: relative;
        width: 16.25rem;
        height: 2.2rem;;
        margin: 0 auto;
        background:rgba(213,213,221,1);
        border: 1px solid rgba(213,213,221,1);
        border-radius: .1rem;
        padding: 0 .675rem;
    }
    .form-row-area{
        position: relative;
        width: 16.25rem;
        margin: 0 auto;
        background:rgba(213,213,221,1);
        border: 1px solid rgba(213,213,221,1);
        border-radius: .1rem;
    }
    .form-input-area{
        position: relative;
        height: 2.2rem;;
        padding: 0 .675rem;
    }
    .area-border{
        position: absolute;
        top: 100%;
        left: 1.8rem;
        right: .675rem;
        height: 1px;
        background: #b9bac8;
    }
    .form-input-address{
        position: relative;
        margin-top: 1px; 
        height: 2.2rem;;
        padding: 0 .675rem;
    }
    .arrow-down{
        width: .4rem;
        height: .4rem;
        margin-top: -.4rem;
        border-left: 1px solid rgba(120,125,152,1);
        border-bottom: 1px solid rgba(120,125,152,1);
        transform: rotate(-45deg);
    }

    .icon{
        width: 0.75rem;
        height: 0.75rem;
    }
    
    .form-placeholder{
        position: absolute;
        left: 1.8rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: .7rem;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(120,125,152,1);
        z-index: 3;
        line-height: 1;
    }

    .input-text{
        position: relative;
        margin-left: .375rem;
        padding: 0;
        border: none;
        background: transparent;
        outline: none;
        font-size: .7rem;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color:rgba(57,63,90,1);
        z-index: 11;
        line-height: 1;
    }
    
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        z-index: 9;
        &.isfocus{
            position: absolute;
        }
    }
    .btn_submit{
        width: 100%;
        max-width: $pageWidthMaxPx;
        line-height: $footerBtnHeight;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        // color: rgba(42,47,78,1);
        // background:rgba(217,196,179,1);
        padding-bottom: env(safe-area-inset-bottom);
        touch-action: manipulation;
        &:active{
            opacity: .9;
            
        }
    }
</style>