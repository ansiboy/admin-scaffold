$(function(){
    //模拟弹窗
    $("button.chart").click(function (e) {
        e.stopPropagation();

        $("#myModal2").show(0, function () {
            $(".modal.fade").addClass("in");
            var chartDom = document.getElementById('chartDom2');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                            trigger: 'axis'
                        },
                xAxis: {
                    type: 'category',
            
                },
                yAxis: {
                    type: 'value',
                },
             
                series: [
                    {
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#1890ff',
                            width: 2
                        },
                        areaStyle: {color: '#dde9f5'},
                        data: [
                            ['2019-10-10', 0],
                            ['2019-10-11', 1000],
                            ['2019-10-12', 2000],
                            ['2019-10-13', 3000],
                            ['2019-10-14', 3500],
                            ['2019-10-15', 3000],
                            ['2019-10-16', 2000],
                            ['2019-10-17', 1000],
                            ['2019-10-18', 900],
                            ['2019-10-19', 200],
                            ['2019-10-20', 900],
                        ]
                    }
                ]
            };
            if (option && typeof option === 'object') {
                myChart.setOption(option);
                setTimeout(() => {
                    jQuery(window).resize(function () {
                        myChart.resize();
                    });
                }, 200)
            }
        });
        $("body").append(`<div class="modal-backdrop fade in"></div>`);
        setTimeout(()=>{
            $(".modal-footer .btn-default").click(function(){
                $(".modal.fade").removeClass("in");
                $(".modal.fade").hide();
                $(".modal-backdrop").remove();
            })
        },100)

    })
})