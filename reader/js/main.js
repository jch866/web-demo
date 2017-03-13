(function(){
	var Util = (function(){
		var prefix = 'reader_'
		function LSgetter(key){
			return localStorage.getItem(prefix+key);
		}
		function LSsetter(key,val){
			return localStorage.setItem(prefix+key,val);
		}
        function LSremove(key){
            return localStorage.removeItem(prefix+key);
        }
        function getJSONP(url,callback){
             return $.jsonp({
                url:url,
                cache:true,
                callback:'duokan_fiction_chapter', //此CB非传过来的CB 对应的是JSONP的CB
                success:function(res){
                    var data = $.base64.decode(res);//解码
                    //decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
                    var json = decodeURIComponent(escape(data));
                    callback(json);
                }
             })
        }
		return {
			lsSet:LSsetter,
			lsGet:LSgetter,
            lsRm:LSremove,
            getJSONP:getJSONP
		}
	})()
    var Dom = {
        topNav:$("#top-nav"),
        bottomNav:$("#bottom-nav"),
        setFG : $("#set_font_bg"),
        btmFont:$("#btm_font"),
        btmNight:$("#btm_night"),
        btmCat:$("#btm_catalog"),
        fiction:$('#fiction_container'),
        bigFont:$("#big_font"),
        smallFont:$("#small_font"),
        changeBgLi:$("#changeBg>li"),
    };
    var win = $(window),
        initFontSize = parseInt(Util.lsGet("font_size")) || 14,
        dayColor = 'F7EEE5',
        initBg = Util.lsGet("bg_color") || dayColor,
        dayClass = Util.lsGet("dayClass"),
        doc = $(document);

      Dom.fiction.css({
            "fontSize":initFontSize,
            "background":'#'+initBg
      })  

      $.each(Dom.changeBgLi,function(index,item){
            if($(item).attr('data-bg')===initBg){
                $(item).addClass('activeBg');
                return;
            }
      })

    dayClass  &&  Dom.btmNight.addClass(dayClass).text('白天');

	function main(){//入口函数
        var readModel = getData();
        // var domSet = renderUI(Dom.fiction);
        readModel.init(function(data){
            renderUI(Dom.fiction,data);
        });
        bindEvent();
	}
	function renderUI(container,data){
        //得到数据，了解数据结构再渲染UI结构
        // function getDom(data){
        //     var str = JSON.parse(data);
        //     var html = '<h4>'+str.t+'</h4>';
        //     for (var i =  0;i<str.p.length;i++){
        //         html+='<p>'+str.p[i]+'</p>'
        //     }
        //     return html;
        // }

        // return function(container){
        //     container.html(getDom(data));
        // }
        var str = JSON.parse(data);
            var html = '<h4>'+str.t+'</h4>';
            for (var i =  0;i<str.p.length;i++){
                html+='<p>'+str.p[i]+'</p>'
            }
        container.html(html);
	}
	function bindEvent(){//绑定事件
        $("#mid_area").click(function(){
            if(Dom.topNav.css("display") === "none"){
                Dom.topNav.show();
                Dom.bottomNav.show();
            }else{
                Dom.topNav.hide();
                Dom.bottomNav.hide();
                Dom.setFG.hide();
                Dom.btmFont.removeClass('current')
            }
        })
        win.scroll(function(){
            Dom.topNav.hide();
            Dom.bottomNav.hide();
            Dom.setFG.hide();
            Dom.btmFont.removeClass('current');
        })

        Dom.btmFont.click(function(){
            if(Dom.setFG.css('display') === 'none'){
                Dom.setFG.show();
                Dom.btmFont.addClass('current');
            }else{
                Dom.setFG.hide();
                Dom.btmFont.removeClass('current');
            }
        })
        Dom.bigFont.click(function(){
            Dom.bigFont.addClass("fontBg");
            setTimeout(function(){Dom.bigFont.removeClass("fontBg");},50)
            if(initFontSize>20) return;
            initFontSize+=1;
            Dom.fiction.css('fontSize',initFontSize);
            Util.lsSet('font_size',initFontSize);
        }) 
        Dom.smallFont.click(function(){
            Dom.smallFont.addClass("fontBg");
            setTimeout(function(){Dom.smallFont.removeClass("fontBg");},50)
            if(initFontSize<12) return;
            initFontSize-=1;
            Dom.fiction.css('fontSize',initFontSize);
            Util.lsSet('font_size',initFontSize);
        }) 
        $("#btm_catalog").click(function(){

        })
        $("#changeBg").on('click','li',function(e){
            var color = '';
            changeCurrentBg();
            $(this).addClass('activeBg');
            color = $(this).attr('data-bg');
            changeParaBg(color);
        })
        Dom.btmNight.on('click',function(){
            Dom.setFG.hide();
            Dom.btmFont.removeClass('current');
            if($(this).hasClass('dayStyle')){
                changeParaBg(dayColor);
                $(this).removeClass('dayStyle').text('黑夜');
                Util.lsRm('dayClass');
            }else{
                changeParaBg($("li[data-bg='283548']").attr('data-bg'));
                $(this).addClass('dayStyle').text('白天');
                Util.lsSet('dayClass','dayStyle');
            }

        })
        function changeCurrentBg(){
            Dom.changeBgLi.hasClass('activeBg') && Dom.changeBgLi.removeClass('activeBg') 
        }
        function changeParaBg(color){
            Dom.fiction.css('background','#'+color);
            // data-font-color='ffffff'
            //Dom.fiction.css({'background':'#'+color,'color':color});//可以同时更换字体的颜色
            Util.lsSet('bg_color',color);
        }

	}
    
	function getData(){
        var chapter_id;
        function init(UIcb){
            getFictionInfo(function(){
                getChapterContent(chapter_id,function(data){
                    UIcb && UIcb(data);  
                })
            })
        }
        function getFictionInfo(callback){
            $.get('data/chapter.json',function(data){//获取章节信息
            //获取章节信息之后的回调
                chapter_id = data.chapters[2].chapter_id;
                callback && callback(data);
            },'json')
        }
        //根据ID取章节内容
        function getChapterContent(id,callback){
            $.get('data/data'+id+'.json',function(res){
                if(res.result ===0 ){
                    var url = res.jsonp;
                    Util.getJSONP(url,function(data){
                        callback && callback(data);
                    })
                }  
            },'json')
        }
        return {
            init :init
        }
	}
	main();
})()