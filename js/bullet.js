function Bullet(){
	this.body = create("div");
	this.init = function(){
		//将子弹添加到引擎中
		//new GameEngine().body.appendChild( this.body );
		new GameEngine().append( this.body );
		this.body.className = "bullet";
		//设置子弹的初始位置
		var mp = new MyPlane();
		this.left( mp.left()+mp.width()/2-this.width()/2+2 );
		this.top( mp.top() - this.height() );
		return this;
	}
	this.move = function(){
		this.timer = setInterval( function(){
			this.top( this.top() - 5 );
			if( this.top() < -this.height() ){
				//当前子弹没有和任何敌机发生碰撞 
				clearInterval( this.timer );
				this.body.remove();
				return;//一旦子弹没有和敌机发生碰撞 后面代码不需要执行
			}
			
			//在子弹移动的定时器中  检测当前运动的子弹和哪些敌机发生碰撞，有碰撞 子弹消失
			//问题来了 ： 如何找到所有的敌机？？
			var enemes = new GameEngine().enemes;
			//遍历所有的敌机 检测当前运动的子弹和哪一个敌机发生碰撞
			for( var en of enemes ){
				if( pz( this.body,en.body ) ){
					//如果碰上了  子弹销毁   敌机受伤
					clearInterval( this.timer );
					this.explode();//子弹销毁
					en.hurt();//敌机受伤了
				}
			}
		}.bind(this),30 )
	}
	this.explode = function(){
		//子弹爆炸销毁
		this.body.className = "bullet_die";
		setTimeout( function(){
			//继续更换下一张图片
			this.body.className = "bullet_die2";
			setTimeout(function(){
				this.body.remove();
			}.bind(this),200)
		}.bind(this),200 )
	}
	this.left = function(val){
		//设置或获取子弹的left值
		if( val || val == 0 ){
			this.body.style.left = val + "px";
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		//设置或获取子弹的top值
		if( val || val == 0 ){
			this.body.style.top = val + "px";
		}
		return this.body.offsetTop;
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
}