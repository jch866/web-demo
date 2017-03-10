(function(){
	var Util = (function(){
		var prefix = 'reader_'
		function LSgetter(key){
			return localStorage.getItem(prefix+key);
		}
		function LSsetter(key,val){
			return localStorage.setItem(prefix+key,val);
		}
		return {
			lsSet:LSsetter,
			lsGet:LSgetter
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
        initBg = Util.lsGet("bg_color") || 'F7EEE5',
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
	function main(){
        bindEvent()
	}
	function renderUI(){

	}
	function bindEvent(){
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
        $("#btm_night").click(function(){

        }) 
        $("#btm_catalog").click(function(){

        })
        $("#changeBg").on('click','li',function(e){
            var color = '';
            changeCurrentBg();
            $(this).addClass('activeBg');
            color = $(this).attr('data-bg');
            changeParaBg(color);
            console.dir(this);
        })
        function changeCurrentBg(){
            Dom.changeBgLi.hasClass('activeBg') && Dom.changeBgLi.removeClass('activeBg') 
        }
        function changeParaBg(color){
            Dom.fiction.css('background','#'+color);
            Util.lsSet('bg_color',color);
        }

	}
	function getData(){
		
	}
	main();
})()