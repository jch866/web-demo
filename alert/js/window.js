define(['widget','jquery','jqueryUI'],function(widget,$,$ui){
	function Window(){
		this.cfg={
			content:'welcome',
			width:300,
			height:200,
			handler4AlertBtn:function(){
				alert("you click the button");
			},
			head:'提示',
			text4btn:"OK",
			hasCloseBtn:true,
			handler4CloseBtn:null,
			skinClass:'win_box_a',
			hasMask:true,//modal
			isDraggable:true,
			dragHandle:null,

			text4ConfirmBtn:'确定',
			text4CancelBtn:'取消',
			handler4ConfirmBtn:null,
			handler4CancelBtn:null,

			text4PromptBtn:'确定',
			handler4PromptBtn:null,
			isPromptInputPwd:false,
			defaultValue4PromptInput:'can you type something?',
			//placeholder 更好一些
			maxlength4PromptInput:10,


		}
		// this.handlers = {}

	}
	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI: function() { //dom操作的都放在这里
			var footCon = '';
			switch(this.cfg.winType){
				case 'alert':
					footCon = "<input type='button' class='alertBtn' value = " + this.cfg.text4btn + ">";
				break;
				case 'confirm':
					footCon = "<input type='button' class = 'win_confirmBtn' value = " + this.cfg.text4ConfirmBtn + ">"+
					"<input type='button' class = 'win_cancelBtn' value = " + this.cfg.text4CancelBtn + ">";
				break;
				case 'prompt':
					this.cfg.content +="<p><input class='prompt_input' type='"+(this.cfg.isPromptInputPwd?'password':'text')+"' maxlength = '"+this.cfg.maxlength4PromptInput+"' placeholder = '"+this.cfg.defaultValue4PromptInput+"' /></p>";
					console.log(this.cfg.content);
					footCon = "<input type='button' class = 'win_promptBtn' value = " + this.cfg.text4PromptBtn + ">"+
					"<input type='button' class = 'win_cancelBtn' value = " + this.cfg.text4CancelBtn + ">";
				break;
				 
			}
			//主结构 
		    this.bBox = $('<div class="win_box">' +
		        // '<div class="win_head">' + this.cfg.head + '</div>' +
		        '<div class="win_body">' + this.cfg.content + '</div>' +
		        // '<div class="win_footer">'+ footCon +'</div>' +
		        '</div>');
		    if(this.cfg.winType !='common'){
		    	this.bBox.prepend('<div class="win_head">' + this.cfg.head + '</div>');
		    	this.bBox.append('<div class="win_footer">'+ footCon +'</div>');
		    }
		    this._promptInput = this.bBox.find('.prompt_input');
		    //有无关闭按钮
		    if (this.cfg.hasCloseBtn) {
		        var closeBtn = $('<div class="close_btn">X</div>');
		        //this.bBox.find('.win_head').append(closeBtn);
		        this.bBox.append(closeBtn);//common弹窗没有head
		    }
		    //是否模态
		    if (this.cfg.hasMask) {
		        this._mask = $('<div class="win_mask"></div>');
		        this._mask.appendTo('body');
		    }
		    this.bBox.appendTo(document.body);
		},

		bindUI:function(){
			var that = this;
			//绑定DOM事件
			this.bBox.on("click",'.alertBtn',function(){
				that.fire('alert');
				that.destroy();
			}).on('click','.close_btn',function(){
				that.fire('close');
				that.destroy();
			}).on('click','.win_confirmBtn',function(){
				that.fire('confirm');
				that.destroy();
			}).on('click','.win_cancelBtn',function(){
				that.fire('cancel');
				that.destroy();
			}).on('click','.win_promptBtn',function(){
				that.fire('prompt',that._promptInput.val());
				that.destroy();
			})
			//绑定自定义事件
			if(this.cfg.handler4CloseBtn){
					this.on('close',this.cfg.handler4CloseBtn)//自定义事件
			}
			if(this.cfg.handler4AlertBtn){
					this.on('alert',this.cfg.handler4AlertBtn)
			}
			if(this.cfg.handler4ConfirmBtn){
					this.on('confirm',this.cfg.handler4ConfirmBtn)
			}
			if(this.cfg.handler4CancelBtn){
					this.on('cancel',this.cfg.handler4CancelBtn)
			}
			if(this.cfg.handler4PromptBtn){
					this.on('prompt',this.cfg.handler4PromptBtn)
			}
		},
		syncUI:function(){//dom其它一些属性，如设置长宽，换肤,可拖动等
			this.bBox.css({
				width:this.cfg.width,
				height:this.cfg.height,
				left:(this.cfg.x||(window.innerWidth - this.cfg.width)/2),
				top:(this.cfg.y||(window.innerHeight - this.cfg.Height)/2),
			})
			if(this.cfg.skinClass){
				this.bBox.addClass(this.cfg.skinClass);
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.bBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.bBox.draggable();
				}
			}
		},
		destructor:function(){ //组件销毁时要做的处理
			this._mask && this._mask.remove();
		},
		//改造后
		alert :function(cfg){
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;	
		},
		prompt:function(cfg){
			$.extend(this.cfg,cfg,{winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common:function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			return this;
		},
		//改造前
		// alert :function(cfg){
		// 	var that = this;
		// 	var CFG=$.extend(this.cfg,cfg);
			
		// 	var mask = null;
		// 	if(CFG.hasMask){
		// 		mask = $('<div class="win_mask"></div>');
		// 		mask.appendTo('body');
		// 	}
		// 	var bBox = $(	'<div class="win_box">'+
		// 						'<div class="win_head">'+CFG.head+'</div>'+
		// 						'<div class="win_body">'+CFG.content+'</div>'+
		// 						'<div class="win_footer"><input type="button" value = '+CFG.text4btn+'></div>'+
		// 					'</div>');
		// 	bBox.appendTo('body');
		// 	var btn = bBox.find('.win_footer input');
		// 	btn.on('click',function(){
		// 		//CFG.handler4AlertBtn && CFG.handler4AlertBtn();
		// 		that.fire('alert')
		// 		bBox.remove();
		// 		mask && mask.remove();

		// 	})
			
		// 	bBox.css({
		// 		width:CFG.width,
		// 		height:CFG.height,
		// 		left:(CFG.x||(window.innerWidth - CFG.width)/2),
		// 		top:(CFG.y||(window.innerHeight - CFG.Height)/2),
		// 	})
		// 	if(CFG.hasCloseBtn){
		// 		var closeBtn = $('<div class="close_btn">X</div>');
		// 		closeBtn.appendTo('.win_head');
		// 		closeBtn.on('click',function(){
		// 			//CFG.handler4CloseBtn && CFG.handler4CloseBtn();
		// 			that.fire('close');
		// 			bBox.remove();
		// 			mask && mask.remove();

		// 		})
		// 	}
		// 	if(CFG.skinClass){
		// 		bBox.addClass(CFG.skinClass);
		// 	}
		// 	if(CFG.isDraggable){
		// 		if(CFG.dragHandle){
		// 			bBox.draggable({handler:CFG.dragHandle});
		// 		}else{
		// 			bBox.draggable();
		// 		}
		// 	}
		// 	if(CFG.handler4CloseBtn){
		// 			this.on('close',CFG.handler4CloseBtn)//自定义事件
		// 	}
		// 	if(CFG.handler4AlertBtn){
		// 			this.on('alert',CFG.handler4AlertBtn)
		// 	}
		// },
	})
	//Window.prototype = {
	// 	on:function(type,handler){
	// 		if(typeof this.handlers[type] == 'undefined'){
	// 			this.handlers[type] =[];
	// 		}
	// 		this.handlers[type].push(handler);
	// 		return this;
	// 	},
	// 	fire:function(type,data){
	// 		if(this.handlers[type] instanceof Array){
	// 			var handlers = this.handlers[type];
	// 			for(var i=0,len = handlers.length;i<len;i++){
	// 				handlers[i](data);
	// 			}
	// 		}
	// 		return this;
	// 	},
	// 	alert :function(cfg){
	// 		var that = this;
	// 		var CFG=$.extend(this.cfg,cfg);
			
	// 		var mask = null;
	// 		if(CFG.hasMask){
	// 			mask = $('<div class="win_mask"></div>');
	// 			mask.appendTo('body');
	// 		}
	// 		var bBox = $(	'<div class="win_box">'+
	// 							'<div class="win_head">'+CFG.head+'</div>'+
	// 							'<div class="win_body">'+CFG.content+'</div>'+
	// 							'<div class="win_footer"><input type="button" value = '+CFG.text4btn+'></div>'+
	// 						'</div>');
	// 		bBox.appendTo('body');
	// 		var btn = bBox.find('.win_footer input');
	// 		btn.on('click',function(){
	// 			//CFG.handler4AlertBtn && CFG.handler4AlertBtn();
	// 			that.fire('alert')
	// 			bBox.remove();
	// 			mask && mask.remove();

	// 		})
			
	// 		bBox.css({
	// 			width:CFG.width,
	// 			height:CFG.height,
	// 			left:(CFG.x||(window.innerWidth - CFG.width)/2),
	// 			top:(CFG.y||(window.innerHeight - CFG.Height)/2),
	// 		})
	// 		if(CFG.hasCloseBtn){
	// 			var closeBtn = $('<div class="close_btn">X</div>');
	// 			closeBtn.appendTo('.win_head');
	// 			closeBtn.on('click',function(){
	// 				//CFG.handler4CloseBtn && CFG.handler4CloseBtn();
	// 				that.fire('close');
	// 				bBox.remove();
	// 				mask && mask.remove();

	// 			})
	// 		}
	// 		if(CFG.skinClass){
	// 			bBox.addClass(CFG.skinClass);
	// 		}
	// 		if(CFG.isDraggable){
	// 			if(CFG.dragHandle){
	// 				bBox.draggable({handler:CFG.dragHandle});
	// 			}else{
	// 				bBox.draggable();
	// 			}
	// 		}
	// 		if(CFG.handler4CloseBtn){
	// 				this.on('close',CFG.handler4CloseBtn)//自定义事件
	// 		}
	// 		if(CFG.handler4AlertBtn){
	// 				this.on('alert',CFG.handler4AlertBtn)
	// 		}
	// 	},
	// 	confirm:function(){},
	// 	prompt:function(){}
	// }
	return {
		Window:Window
	}
})