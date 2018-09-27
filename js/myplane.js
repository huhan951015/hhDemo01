function MyPlane(){
	if( !MyPlane.instance ){
		MyPlane.instance = {
			body : create("div"),
			init : function(){
				//new GameEngine().body.appendChild( this.body );
				new GameEngine().append( this.body );
				this.body.className = "my-warplain";
				this.body.style.bottom = 0;
				//this.body.style.left = (new GameEngine().body.offsetWidth-this.body.offsetWidth)/2 + "px";
				this.left( (new GameEngine().width()-this.width())/2 );
				return this;
			},
			fire : function(){
				//飞机开火  子弹出场
				setInterval( function(){
					new Bullet().init().move();
				}.bind(this) , new GameEngine().level )
			},
			move : function(type){
				switch( type ){
					case "mouse" : {
						//鼠标控制飞机移动
	 					new GameEngine().body.onmousemove = function(e){
	 						var e = e || event;
	 						var _left = e.pageX - new GameEngine().left()-this.width()/2;
	 						var maxL = new GameEngine().width()-this.width();
	 						_left = Math.min(maxL , Math.max(0,_left));
	 						this.left( _left );
	 					}.bind(this)
	 					break;
					}
					case "key" : {
						//键盘控制飞机运动
						document.onkeydown = function(e){
							var e = e || event;
							var code = e.keyCode || e.which;
							switch( code ){
								case 37 : {
									var x1 = this.left()-7;
									x1 = Math.max( 0 , x1 );
									this.left( x1 );
									break;
								}
								case 39 : {
									var x2 = this.left() + 7;
									x2 = Math.min( x2 , new GameEngine().width()-this.width() );
									this.left( x2 );
								}
							}
						}.bind(this)
					}
				}
				return this;
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
				//如果用户传递参数val 说明要设置飞机的left 否则就获取飞机相对于引擎的offsetLeft值
				if( val || val == 0 ){
					this.body.style.left = val + "px";
				}
				return this.body.offsetLeft;
			},
			top : function(val){
				//如果用户传递参数val 说明要设置飞机的top 否则就获取飞机相对于引擎的offsetTop值
				if( val || val == 0){
					this.body.style.top = val + "px";
				}
				return this.body.offsetTop;
			}
		}
	}
	return MyPlane.instance;
}