<template>
    <div>
        <avue-crud @search-reset="searchReset" @search-change="searchChange" :page="page" @on-load="onLoad" :data="data" :option="option" v-model="obj">
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
            <template slot="menuLeft">
                <el-row>
                    <el-col :span="8"><div style="font-size: 20px;font-weight:bold">平台缺货比例</div></el-col>
                    <el-col :span="8"><div style="font-size: 20px;font-weight:bold">产品缺货比例</div></el-col>
                    <el-col :span="8"><div style="font-size: 20px;font-weight:bold">地区缺货比例</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span=8><div id="chart" style="width: 400px;height:400px;"></div></el-col>
                    <el-col :span=8><div id="chart2" style="width: 400px;height:400px;"></div></el-col>
                    <el-col :span=8><div id="areaChart" style="width: 400px;height:400px;"></div></el-col>
                </el-row>
            </template>
        </avue-crud>
    </div>
</template>

<script>
import {getList, getName, getArea,search,selectOutOfStockRatio} from '@/service/stockFeishu'
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
            nameOptions: [],
            areaOptions: [],
            option: {

                selectClearBtn:false,
                refreshBtn: false,
                searchBtn: false,
                columnBtn: false,
                menu: false,
                addBtn: false,
                title: '小米、天猫、京东缺货数据',
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
                getUserInfo(code,this.stockAppId,this.stockAppSecret).then(res=>{
                    if (res.code==="000"){
                        localStorage.clear()
                        localStorage.setItem("stock_token",res.data)
                        localStorage.setItem('code',code)
                        this.onLoad(this.page)
                    }else{
                        alert("登录失败")
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
        searchReset(){
            this.sourceSelectValue = []
            this.nameSelectValue = []
            this.areaSelectValue = []
        }
    },
    mounted() {
        selectOutOfStockRatio().then(res=>{
            let productNameAreaArr = []
            let sourceNameArr = []
            let areaNameArr = []
            let sourceAreaData = []
            let sourceName = res['sourceName']
            let sourceAreaNum = res['sourceAreaNum']
            let areaRatio = res['areaRatio']
            let productNameArea = res['productNameArea']
            for(let i in sourceName){
                let t = []
                for(let n in sourceName[i]){
                    t.push('\n'+sourceName[i][n])
                }
                let tempObj = {
                    value:sourceName[i].length,
                    name:i,
                }
                sourceNameArr.push(tempObj)
            }
            for (let i of sourceAreaNum){
                for(let j in i){
                    let tempObj = {
                        value:i[j],
                        name:j
                    }
                    sourceAreaData.push(tempObj)
                }
            }
            for (let i in areaRatio){
                let temp = {
                    name:i,
                    value:areaRatio[i]
                }
                areaNameArr.push(temp)
            }
            for (let i in productNameArea){
                let tempObj = {
                    value:productNameArea[i].length,
                    name:i
                }
                productNameAreaArr.push(tempObj)
            }
            let chart = echarts.init(document.getElementById('chart'));
            chart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name:'缺货平台',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],
                        data:sourceNameArr
                    }
                ]
            })
            let chart2 = echarts.init(document.getElementById('chart2'));
            chart2.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name:'缺货产品',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],
                        data:productNameAreaArr
                    }
                ]
            })
            let areaChart = echarts.init(document.getElementById('areaChart'));
            areaChart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    height:'500px',
                    type: 'scroll',
                    orient: 'vertical',
                    x: 'left',
                    data:areaNameArr
                },
                series: [
                    {
                        name:'缺货平台',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],

                        label: {
                            normal: {
                                position: 'outer'
                            }
                        },
                        data:sourceAreaData
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
