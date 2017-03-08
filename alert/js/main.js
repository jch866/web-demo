require.config({
	paths:{
		jquery:'jquery-3.1.1.min',//jquery映射
		jqueryUI:'http://code.jquery.com/ui/1.12.0/jquery-ui.min'
	}
})
require(['window','jquery'],function(w,$){
	//var win = new w.Window(); //注意只要new一次，否则就是两个实例对象
	//console.dir(win);
	$("#b").click(function(){
		new w.Window().confirm({
			content:'do you want delete this file?',
			text4ConfirmBtn:'是',
			text4CancelBtn:'否',
			hasCloseBtn:false,
			handler4AlertBtn:false,
			handler4ConfirmBtn:function(){alert('this.is.a.confirmBtn')},
			handler4CancelBtn:null,
		}).on('confirm',function(){
			alert('confirm1')
		}).on('confirm',function(){
			alert('confirm2')
		}).on('confirm',function(){
			alert('confirm3')
		}).on('cancel',function(){
			alert('cancel1')
		}).on('cancel',function(){
			alert('cancel2')
		}).on('cancel',function(){
			alert('cancel3')
		})
	})

	$("#c").click(function(){
		new w.Window().prompt({
			content:'we\'ll keep your password safe' ,
			title:"please input your password",
			text4PromptBtn:'确定',
			handler4PromptBtn:function(val){
				alert("your pwd:"+val)
			},
			isPromptInputPwd:false,
			defaultValue4PromptInput:"hello world?",// 注意单双引号 打印值出来看看，是否有引号问题
			maxlength4PromptInput:10,
			hasCloseBtn:false,
			
		}).on('prompt',function(){
			alert('prompt1')
		}).on('cancel',function(){
			alert('cancel1')
		})
	})
	$("#d").click(function(){
		new w.Window().common({
			width:600,
			height:100,
			y:10,
			content:'通用弹窗', //没有头和尾
			hasCloseBtn:true,
		}).on('prompt',function(){
			alert('prompt1')
		}).on('cancel',function(){
			alert('cancel1')
		})
	})
	 $("#a").click(function(){
	 	var win = new w.Window(); //注意只要new一次，否则就是两个实例对象
		 win.alert({
		 	// handler4CloseBtn:function(){alert('close')},
		 	// handler4AlertBtn:function(){alert('alert')},
		 	skinClass:'win_box_a',
		 	hasMask:true,
		 	dragHandle:'.win_head'
		 });

		//也可以把回调方法直接绑定在win.on上面
		// win.on('close',function(){alert('colse')});
		// win.on('close',function(){alert('colse2')});
		// win.on('close',function(){alert('colse3')});
		// win.on('alert',function(){alert('alert')});
		// win.on('alert',function(){alert('alert2')});
		// win.on('alert',function(){alert('alert3')})
		//连缀语法
		win.on('close',function(){alert('colse')})
		.on('close',function(){alert('colse2')})
		.on('close',function(){alert('colse3')})
		.on('alert',function(){alert('alert')})
		.on('alert',function(){alert('alert2')})
		.on('alert',function(){alert('alert3')});
		console.dir(win);
	})	
}) 



//注意点start：
//原生confirm方法.        堵塞
// if(confirm("are you sure?")){
// 	fn1()
// }else{
// 	fn2()
// }
// fn3()
//封装组件confirm方法    回调
// new w.Window.confirm({
// 	content:"are you sure?",
// 	handler4ConfirmBtn:function(){
// 		fn1();
// 		fn3();
// 	},
// 	handler4CancelBtn:function(){
// 		fn2();
// 		fn3();
// 	}
// })
//注意点end：






















