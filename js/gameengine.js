function GameEngine(){
	if( !GameEngine.instance ){
		GameEngine.instance = {
			body : $id("main"),
			oUl : $id("options"),
			level : 0,
			enemes : new Set(), //存放所有敌机 集合
			initMenu : function(){
				//功能实现等级的选择  使用委托实现单击操作
				this.oUl.onclick = function(e){
					var e = e || event;
					var target = e.target || e.srcElement;
					if( target.nodeName.toLowerCase() == "li" ){
						this.level = target.getAttribute("level");
						//记录游戏等级后  菜单消失  logo和动画飞机出场
						this.oUl.remove();
						this.start();
					}
				}.bind(this)
			},
			start : function(){
				//引擎动画开始
				//logo出场 
				var logo = create("div");
				logo.className = "logo";
				this.append( logo );
				//this.body.appendChild(logo);
				//拉线飞机出场
				var loading = create("div");
				loading.className = "loading";
				this.append( loading );
				//this.body.appendChild(loading);
				//定义一个定时器  控制loading的背景图片的改变
				var index = 1;
				var timer = setInterval(function(){
					index++;
					loading.style.backgroundImage = `url(images/loading${index}.png)`;
					if( index == 3 ){
						index = 0;
					}
				}.bind(this),500)
				
				//背景移动  控制背景图片y方向的位置
				var count = 0;
				setInterval( function(){
					this.body.style.backgroundPositionY = count++ + "px";
				}.bind(this),50 )
				
				//一段时间后，logo和loading消失  战斗机出场
				setTimeout( function(){
					clearInterval( timer );
					logo.remove();
					loading.remove();
					this.gameStart();
				}.bind(this),3000 )
			},
			gameStart :function(){
				//游戏开始啦  战斗机出场了
				//alert("游戏开始啦");
				new MyPlane().init().move("mouse").fire();
				//敌机出场了
				this.autoCreateEnemy();
			},
/*			autoCreateEnemy : function(){
				setInterval(function (){
					if( Math.random() > 0.2 ){
						//将move方法的返回值添加到集合
						this.enemes.add( new Enemy("small").init().move() );
						//创建敌机的同时  在将该敌机添加到集合中
						/*var en = new Enemy("small");
						this.enemes.add( en );//将创建的敌机添加到集合中
						en.init().move();*/
					}
				}.bind(this),1000)
				
				setInterval(function (){
					if( Math.random() > 0.5 ){
						this.enemes.add( new Enemy("middle").init().move() );
					}
				}.bind(this),2000)
				
				setInterval(function (){
					if( Math.random()>0.8 ){
						this.enemes.add( new Enemy("large").init().move() );
					}
				}.bind(this),5000)
			},
			width : function(){
				//获取飞机的宽度
				return this.body.offsetWidth;
			},
			height : function(){
				//获取飞机的高度
				return this.body.offsetHeight;
			},
			left : function(val){
				//如果用户传递参数val 说明要设置引擎的left 否则就获取引擎相对于body的offsetLeft值
				if( val || val == 0 ){
					this.body.style.left = val + "px";
				}
				return this.body.offsetLeft;
			},
			top : function(val){
				//如果用户传递参数val 说明要设置引擎的top 否则就获取引擎相对于body的offsetTop值
				if( val || val== 0 ){
					this.body.style.top = val + "px";
				}
				return this.body.offsetTop;
			},
			append : function(obj){
				this.body.appendChild( obj );
			}
		}
	}
	return GameEngine.instance;
}