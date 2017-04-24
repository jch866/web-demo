$(function() {
    var goods = $("#goodsList");
    var checkedGoods = $("#checkedGoods");
    var clearAll = $("#clearAll>button");
    var result = $("#result");
    var product = $("#product");
    var data = {
            1: wemData,
            2: swgData,
            3: testData
        };
    var currentDate;
    function showGoods(garray) {
            $.each(garray, function(index, item) {
                addGoods(item);
            })
            bindAddEvent();
        }
    function addGoods(item){
        var str = '<li>' +
                    '<div class="gName">' + item.name + '</div>' +
                    '<div class="gPrice">' + item.value + '</div>' +
                    '<div class="btn"><button>添加</button><span class="hide">' + item.idx + '</span></div>' +
                    '</li>';
                goods.append($(str));
                bindAddEvent();
    }
    function bindAddEvent(){
        goods.find(".btn").each(function(idx, item) {
            $(item).off("click")
            $(item).on("click",function(){
                // console.log($(this));
                var that = $(this),parent=that.parent();
                var data = {
                    'name':parent.find(".gName").text(),
                    'value':parent.find(".gPrice").text(),
                    'idx':parent.find(".hide").text()
                }
                //console.log(data);
                addGood2Check(data);
                calu();
                that.parent().hide('slow');
                //bindDelEvent();
            })
        });
    }
    function bindDelEvent(){
        checkedGoods.find(".btn").each(function(idx,item){
            $(item).off("click");
            $(item).on("click",function(){
                $(this).parent().remove();
                //获取idx值以确定恢复是哪一条
                // debugger;
                inx = $(this).find('.hide').text()-0;
                restoreItem(inx);
                calu();
            })
        })
    }
    function restoreItem(index){
        $.each(currentDate,function(i,item){
            if(item.idx == index){
                addGoods(item);
                return;
            }
        })
    }
    product.on("click",function(){
        $("body").find("table.tab").remove();
        var data = getMData();
        var tab = $("<table  class='tab'><tr><th>名称</th><th>单价</th><th>数量</th><th>总价</th></tr></table>");
        for(var i = 0; i<data.length;i++){
            tab.append("<tr><td>"+data[i].name+"</td><td>"+data[i].price+"</td><td>"+data[i].amount+"</td><td>"+data[i].total+"</td></tr>")
        }

        $("body").append(tab);
        $('html,body').animate({scrollTop:$('.tab').offset().top}, 800);
    })
    function getMData(){
        var as = checkedGoods.find("li");
        var allCheckData = [];
        $.each(as,function(index,item){
            var singleData= {
                name:$(item).find(".gName").text(),
                price:$(item).find(".gPrice").text(),
                total:$(item).find(".gTotal").text(),
                amount:$(item).find("em").text()
            }
            allCheckData.push(singleData);
        })
        return allCheckData;
    }
    function addGood2Check(data){
        var str = '<li>' +
                '<div class="gName">' + data.name + '</div>' +
                '<div class="gPrice">' + data.value + '</div>' +
                '<div class="gAmount"><span class="reduce" style="display:none">-</span><em>1</em><span class="add">+</span></div>' +
                '<div class="gTotal">' + data.value + '</div>' +
                '<div class="btn"><button>删除</button><span class="hide">' + data.idx + '</span></div>' +
                '</li>';
        checkedGoods.append($(str));
        //绑定删除事件
        bindDelEvent();
        amountEvent("add");
        amountEvent("reduce");
    }
    function amountEvent(clazz){
        var operateSpan = checkedGoods.find("span."+clazz);
        operateSpan.off("click");
        operateSpan.on("click",function(){
            var iVal=$(this).siblings('em');
            var currentLi = $(this).parents('li');
            var price =currentLi.find('.gPrice').text()-0;
            var total = currentLi.find('.gTotal');
            var number = iVal.text()-0;
            console.log(number);
            (clazz === "add")?number++ : number--;
            (number == 1 )?$(this).fadeOut("300"):$(this).siblings('.reduce').fadeIn("300");
            //数字限制
            // if(number<1) number = 1
            iVal.text(number);
            total.text(number*price);
            calu();
        })
    };
    
    //计算合计函数
    function calu(){
        var num = 0;
        var priceArray = checkedGoods.find("li>div.gTotal");
        // console.log(priceArray.length);
        $.each(priceArray,function(idx,item){
           var n =  $(item).text()-0;
           if(typeof n != "number"){
            alert("商品价格写错了,非数字！");
            return;
           }
           num+=n;
        })
        result.html(num)
    }

    $("input[name='name']").on('change', function() {
        resetRes()
        choiceItem();
    })
    function choiceItem(){
        var n = $("input[name='name']:checked").val();
        // goods.find('li').remove();
        goods.html('');
        currentDate = data[n];
        showGoods(data[n]);
    };
    choiceItem();

    clearAll.on('click',function(){
        resetRes()
        choiceItem();
    })
    function resetRes(){
        checkedGoods.html('');
        result.html(0);
        var tab = $("body").find("table.tab");
        tab&&tab.remove();
    }
})
