<template>
    <div>
        <div>
            <div style="font-size: 30px;font-weight: bold">小米、天猫、京东缺货数据</div>
            <br>
            <br>
            <el-row>
                <!--                <el-col :span=8><div id="productNameChart" style="width: 500px;height:400px;"></div></el-col>-->
                <!--                <el-col :span=8><div id="sourceChart" style="width: 400px;height:400px;"></div></el-col>-->
                <el-col :span=12><div id="chart" style="width: 800px;height:700px;"></div></el-col>
                <el-col :span=8><div id="areaTree" style="width: 800px;height:700px;"></div></el-col>
            </el-row>
        </div>
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
            <template slot="menuLeft">

            </template>
        </avue-crud>
    </div>
</template>

<script>
import {getList, getName, getArea,search,selectProductOutOfStockRatio,selectSourceOutOfStockRatio,selectOutOfStockRatio} from '@/service/stockFeishu'
import {getUserInfo} from '@/service/feishu'
let echarts = require('echarts');
export default {
    name: 'index',
    data() {
        return {
            stockAppId:'cli_9d7d8766e8759107',
            stockAppSecret:'PfjFJ4oSbjyNtQJ2OHQBucJUhZNVVece',
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
                refreshBtn: false,
                searchBtn: false,
                columnBtn: false,
                menu: false,
                addBtn: false,
                // title: '小米、天猫、京东库存数据',
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
                            console.log(res.data.list)
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
                getUserInfo(code,this.stockAppId,this.stockAppSecret).then(res=>{
                    if (res.code==="000"){
                        localStorage.clear()
                        localStorage.setItem("stock_token",res.data)
                        localStorage.setItem('code',code)
                        this.onLoad(this.page)
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
        selectChange: function (value) {
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
        getQueryVariable(variable)
        {
            let query = window.location.search.substring(1);
            let vars = query.split("&");
            for (let i=0;i<vars.length;i++) {
                let pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return null;
        },
        processStockData(dataArr){
            for (let i of dataArr){

            }
        }
    },
    mounted() {
        selectOutOfStockRatio().then(res=>{
            let sourceData = []
            let productData = []
            let NameArr = []
            let areaJson = {
                name:'地区详情',
                children:[]
            }
            // let areaData = []
            let sourceNum = res['sourceNum']
            let productNum = res['productNum']
            for (let i of sourceNum){
                for(let j in i){
                    let tempObj = {
                        value:i[j],
                        name:j
                    }
                    sourceData.push(tempObj)
                }

            }
            for (let i of productNum){
                for(let j in i){
                    let tempObj = {
                        value:i[j].length,
                        name:j
                    }
                    NameArr.push(j)
                    let children = []

                    for(let n in i[j]){
                        let childrenTemp = {
                            name:i[j][n]['area'],
                            value:1
                        }
                        children.push(childrenTemp)
                    }
                    let areaTempObj = {
                        name:j,
                        children:children
                    }
                    areaJson.children.push(areaTempObj)
                    //
                    productData.push(tempObj)
                }
            }
            let chart = echarts.init(document.getElementById('chart'));
            chart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:NameArr
                },
                series: [
                    {
                        name:'缺货平台',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:sourceData
                    },
                    {
                        name:'产品缺货地区',
                        type:'pie',
                        radius: ['40%', '55%'],
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        data:productData
                    },
                ]
            })
            let areaTree = echarts.init(document.getElementById('areaTree'));
            areaTree.setOption({
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'tree',

                        data: [areaJson],

                        top: '1%',
                        left: '7%',
                        bottom: '1%',
                        right: '20%',

                        symbolSize: 7,

                        label: {
                            normal: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 9
                            }
                        },

                        leaves: {
                            label: {
                                normal: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            }
                        },

                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750
                    }
                ]
            })
        })
    }
}
</script>

<style>
.avue-crud__left{
    width: 100%;
}
</style>
