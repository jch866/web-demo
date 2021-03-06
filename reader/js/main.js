(function(){
    'use strict' //es6必须声明
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
        doc = $(document),
        readModel;

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
        readModel = getData();
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
        
        $("#prev_btn").click(function(){
            //获得章节的翻页数据，然后再渲染出来
            readModel.prevC(function(data){
                renderUI(Dom.fiction,data);
            })
        })
        $("#next_btn").click(function(){
            readModel.nextC(function(data){
                renderUI(Dom.fiction,data);
            })
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
        var chapter_id,chapter_len;
        function init(UIcb){
            /*promise改造前
            getFictionInfo(function(){
                getChapterContent(chapter_id,function(data){
                    UIcb && UIcb(data);  
                })
            })
            */
           /*promise改造后*/ //也可以通过es6的generator？
           getFictionInfoPromise().then(function(data){//成功回调
               return getChapterContentPromise();
           },function(err){//失败回调
                console.log(err)
           }).then(function(data){
                UIcb && UIcb(data);
           })
            
        }
        /*
        正常模式下，回调通过层层嵌套，不易阅读
        */
        function getFictionInfo(callback){
            $.get('data/chapter.json',function(data){//获取章节信息
            //获取章节信息之后的回调
                chapter_len = data.chapters.length;
                chapter_id = Util.lsGet('last_chapter_id');
                if(chapter_id == null){
                    chapter_id = data.chapters[1].chapter_id;
                }//不用else
                callback && callback(data);
            },'json')
        }
        
        /**
         * 通过调用promise对象来进行改造，使代码更易阅读和理解
         * @return {promise} 返回promise才能调用than方法
         */
        var getFictionInfoPromise = function() {
                return new Promise(function(resolve, reject) {
                    $.get('data/chapter.json', function(data) { //获取章节信息
                        //获取章节信息之后的回调
                        if (data.result == 0) {
                            chapter_len = data.chapters.length;
                            chapter_id = Util.lsGet('last_chapter_id');
                            if (chapter_id == null) {
                                chapter_id = data.chapters[1].chapter_id;
                            }
                            resolve()
                        } else {
                            reject({error:'error000000'})
                        }
                    }, 'json')
                })
            }


        /*
        正常模式下，回调通过层层嵌套，不易阅读
        */
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
               /**
         * 通过调用promise对象来进行改造，使代码更易阅读和理解
         * @return {promise} 返回promise才能调用than方法
         */
        var getChapterContentPromise = function() {
                return new Promise(function(resolve, reject) {
                    $.get('data/data' + chapter_id + '.json', function(res) {
                        if (res.result === 0) {
                            var url = res.jsonp;
                            Util.getJSONP(url, function(data) {
                                resolve(data);
                            })
                        } else {
                            reject({ msg: 'error' })
                        }
                    }, 'json')
                })
            }

        var prevChapter = function(UIcb){//chapter_id参数在这个getData内是全局的，所以可以不传，直接用
            chapter_id = parseInt(chapter_id,10);//这是转换整形严谨的写法
            if(chapter_id === 0 ){
                return;
            }
            chapter_id -= 1;
            getChapterContent(chapter_id,UIcb);
            // 处理翻页后刷新重新回到第一页 
            if(chapter_id == 0){chapter_id =1} //只有4个章节
            Util.lsSet("last_chapter_id",chapter_id);
        }
        var nextChapter = function(UIcb){
            chapter_id = parseInt(chapter_id,10);
            if(chapter_id === chapter_len ){
                return;
            }
            chapter_id +=1;
            getChapterContent(chapter_id,UIcb); 
            if(chapter_id >4){chapter_id=4}
            Util.lsSet("last_chapter_id",chapter_id);
        }
        return {
            init :init,
            prevC :prevChapter,
            nextC:nextChapter
        }
	}
	main();
})()