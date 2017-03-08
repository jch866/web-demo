// define(function(){
// 	function Widget(){
// 		this.handlers = {}
// 	}
// 	Widget.prototype = {
// 		on:function(type,handler){
// 			if(typeof this.handlers[type] == 'undefined'){
// 				this.handlers[type] =[];
// 			}
// 			this.handlers[type].push(handler);
// 			return this;
// 		},
// 		fire:function(type,data){
// 			if(this.handlers[type] instanceof Array){
// 				var handlers = this.handlers[type];
// 				for(var i=0,len = handlers.length;i<len;i++){
// 					handlers[i](data);
// 				}
// 			}
// 			return this;
// 		},
// 	}
// 	return {
// 		Widget:Widget
// 	}
// })
//、、为这个类添加统一的生命周期.创建 渲染，绑定方法，销毁
//widget内部提供_create,_init和_destory自动调用的私有方法吧
//http://www.jb51.net/article/31611.htm

define(['jquery'],function($){
	function Widget(){
		this.bBox = null; //属性：最外层容器
	}
	Widget.prototype = {
		on:function(type,handler){
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] =[];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0,len = handlers.length;i<len;i++){
					handlers[i](data);
				}
			}
			return this;
		},
		//新增加
		renderUI:function(){},//接口：添加dom节点
		bindUI:function(){},//接口：监听事件
		syncUI:function(){},//接口：初始化组件属性，一般根据config来设置
		destructor:function(){},//接口：销毁前的处理函数
		render:function(container){//方法：渲染组件
			this.renderUI();
			//单独拿出来，window.prototype中，在弹窗销毁时handlers还在内存中，
			//remove弹窗时，并没有把handlers取消，这里重置为空可以解决
			this.handlers={};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.bBox);
		},
		destroy:function(){//方法：销毁组件
			this.destructor();
			this.bBox.off();
			this.bBox.remove();
		},
	}
	return {
		Widget:Widget
	}
})