

import { condition } from '@/service/worldScatter';

let dom = document.getElementById("container");
// eslint-disable-next-line no-undef
let myChart = echarts.init(dom);

let chartdata = [];
const countrty = ['Norway','Denmark','Sweden','Germany','France','United Kingdom', 'Italy','Poland','Ukraine','Romania','Austria','Hungary','Spain','Portugal','Luxembourg','Switzerland','Czechia','Romania','Serbia','Bulgaria','Greece','Bulgaria','Slovakia','Croatia','Macedonia','Moldova', 'Republic of', 'Netherlands','Belgium', 'Slovenia', 'Ireland'];

function init () {
    getData();
    initOptions();
}

function getData () {
    condition().then(res => {
        if(res.success) {
            formatData(res.data);
        }
    })
}

function formatData (data) {
    let countryList = {}
    data.forEach(item => {
        if(item.metric > 0){
            if(countrty.includes(item.region)) {
                if (!countryList[item.region]) {
                    countryList[item.region] = 1
                } else if (countryList[item.region] < 100) {
                    countryList[item.region]++
                } else {
                    return;
                }
            }
            chartdata.push({
                // name: item.region,
                value: [item.longitude, item.latitude, item.metric]
            });
        }
    });
    myChart.appendData({
        seriesIndex: 0,
        data: chartdata
    });
}

function initOptions() {

    var option = {
        backgroundColor: '#000',
        title: {
            show: false,
            text: 'Yeelight设备全球分布',
                left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            show: false,
            min: 0,
            // max: 100000000,
            // splitNumber: 1000,
            inRange: {
                color: ['#44FCF7','#08E4DE','#44FCF7','#08E4DE']
            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'world',
            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: 'Yeelight设备全球分布',
            type: 'scatterGL',
            progressive: 1e6,
            // pointSize: 1, // 设置 热力图 点 的大小
            // blurSize: 0, // 设置点的 阴影半径
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize:(rawValue, params) => {
                let val = 1;
                let rval = rawValue[2];
                if(rval > 10000) {
                    val = 7;
                } else if(rval > 1000) {
                    val = 5;
                } else if(rval > 100) {
                    val = 4;
                } else if(rval > 10) {
                    val = 3;
                } else if(rval > 1) {
                    val = 2;
                }
                params.symbolSize = val
                return params.symbolSize
            },
            // symbolSize: 10,
            zoomScale: 0.002,
            blendMode: 'lighter',
            // large: true,
            itemStyle: {
                color: 'rgb(20, 15, 2)',
            },
            postEffect: {
                enable: true
            },
            silent: true,
            dimensions: ['lng', 'lat', 'value'],
            data: chartdata
        }]
    };
    
    myChart.setOption(option, true);
}

init();