<template>
    <avue-crud @search-change="searchChange" :page="page" @on-load="onLoad" :data="data" :option="option" v-model="obj">
        <template slot-scope="scope" slot="sourceSearch">
            <el-select @change="selectChange" v-model="sourceSelectValue" multiple placeholder="请选择">
                <el-option
                        v-for="item in sourceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </template>
        <template slot='productNameSearch'>
            <el-select v-model="nameSelectValue" multiple placeholder="请选择">
                <el-option
                        v-for="item in nameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </template>
        <template slot='areaSearch'>
            <el-select v-model="areaSelectValue" multiple placeholder="请选择">
                <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </template>
        <template slot="stockSearch">
            <el-select v-model="stockSelectValue" placeholder="请选择">
                <el-option
                        v-for="item in stockOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </template>
    </avue-crud>
</template>

<script>
    import {getList, getName, getArea,search,getUserInfo,clearToken} from '@/service/stockFeishu'

    export default {
        name: 'index',
        data() {
            return {
                searchObj:{},
                isSearch:false,
                page: {
                    pageSize: 50,
                    currentPage: 1,
                    total: 10,
                },
                obj: {},
                data: [],
                sourceSelectValue: [],
                nameSelectValue: [],
                areaSelectValue: [],
                sourceOptions: [{
                    value: '小米商城',
                    label: '小米商城'
                }, {
                    value: '小米京东',
                    label: '小米京东'
                }, {
                    value: '小米天猫',
                    label: '小米天猫'
                }],
                stockOptions: [{
                    value: '有货',
                    label: '有货'
                }, {
                    value: '缺货',
                    label: '缺货'
                }],
                nameOptions: [],
                areaOptions: [],
                stockSelectValue: '',
                option: {
                    menu: false,
                    addBtn: false,
                    title: '小米、天猫、京东库存数据',
                    page: false,
                    align: 'center',
                    menuAlign: 'center',
                    column: [
                        {
                            label: '平台',
                            prop: 'source',
                            search: true,
                            searchslot: true,
                        },
                        {
                            label: '产品名称',
                            prop: 'productName',
                            search: true,
                            searchslot: true,
                        }, {
                            label: '地区',
                            prop: 'area',
                            search: true,
                            searchslot: true,
                        }, {
                            label: '库存',
                            prop: 'stock',
                            search: true,
                            searchslot: true,
                        }, {
                            label: "日期",
                            prop: "createTime",
                            type: "date",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",
                        }
                    ]
                }
            }
        },
        methods: {
            onLoad(page, params = {}) {
                let code = this.getQueryVariable('code')
                if (code==null||code==localStorage.getItem('code')){
                    if (this.isSearch){
                        search(page.currentPage,page.pageSize,this.searchObj).then(res=>{
                            this.page.total = res.total
                            this.page.currentPage = res.pageNum
                            this.page.pageSize = res.pageSize
                            this.data = res.list
                        })
                    }else{
                        getList(page.currentPage, page.pageSize).then(
                            res => {
                                this.page.total = res.data.total
                                this.page.currentPage = res.data.pageNum
                                this.page.pageSize = res.data.pageSize
                                this.data = res.data.list
                            }
                        )
                        if (this.nameOptions.length == 0) {
                            getName(null).then(res => {
                                let tempArr = []
                                for (let x = 0; x < res.length; x++) {
                                    let temp = {
                                        value: '',
                                        label: ''
                                    }
                                    temp.value = res[x]
                                    temp.label = res[x]
                                    tempArr.push(temp)
                                }
                                this.nameOptions = tempArr
                            })
                        }
                        if (this.areaOptions.length == 0) {
                            getArea(null).then(res => {
                                let tempArr = []
                                for (let x = 0; x < res.length; x++) {
                                    let temp = {
                                        value: '',
                                        label: ''
                                    }
                                    temp.value = res[x]
                                    temp.label = res[x]
                                    tempArr.push(temp)
                                }
                                this.areaOptions = tempArr
                            })
                        }
                    }
                }else{
                    getUserInfo(code).then(res=>{
                        if (res.code==="000"){
                            localStorage.clear()
                            localStorage.setItem("stock_token",res.data)
                            localStorage.setItem('code',code)
                            location.reload()
                        }else{
                            alert("登陆失败")
                            return
                        }
                    })
                }
            },
            searchChange(params, done) {
                this.isSearch = true
                this.searchObj = {
                    source:this.sourceSelectValue,
                    productName:this.nameSelectValue,
                    area:this.areaSelectValue,
                    stock:this.stockSelectValue
                }
                search(this.page.currentPage,this.page.pageSize,this.searchObj).then(res=>{
                    this.page.total = res.total
                    this.page.currentPage = res.pageNum
                    this.page.pageSize = res.pageSize
                    this.data = res.list
                    done()
                })
            },
            selectChange(value) {
                getName(value).then(res => {
                    let tempArr = []
                    for (let x = 0; x < res.length; x++) {
                        let temp = {
                            value: '',
                            label: ''
                        }
                        temp.value = res[x]
                        temp.label = res[x]
                        tempArr.push(temp)
                    }
                    this.nameOptions = tempArr
                })
                getArea(value).then(res => {
                    let tempArr = []
                    let temp = {
                        value: '',
                        label: ''
                    }
                    for (let x = 0; x < res.length; x++) {
                        let temp = {
                            value: '',
                            label: ''
                        }
                        temp.value = res[x]
                        temp.label = res[x]
                        tempArr.push(temp)
                    }
                    this.areaOptions = tempArr
                })
            },
            getCookie(cookieName) {
                let strCookie = document.cookie;
                let arrCookie = strCookie.split("; ");
                for (let i = 0; i < arrCookie.length; i++) {
                    let arr = arrCookie[i].split("=");
                    if (cookieName == arr[0]) {
                        return arr[1];
                    }
                }
                return "";
            },
                getQueryVariable(variable)
                {
                    let query = window.location.search.substring(1);
                    let vars = query.split("&");
                    for (let i=0;i<vars.length;i++) {
                        let pair = vars[i].split("=");
                        if(pair[0] == variable){return pair[1];}
                    }
                    return null;
                }
        },
        created(){
            // clearToken().then(res=>{
            //     alert(res)
            //     localStorage.setItem("stock_token",res.data)
            // })

        }
    }
</script>

<style scoped>

</style>
