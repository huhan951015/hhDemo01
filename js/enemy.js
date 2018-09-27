function Enemy(type){
	this.body = create("div");
	this.init = function(){
		switch( type ){
			case "small":{
				new GameEngine().body.appendChild( this.body );
				this.body.className = "enemy-small";
				//设置敌机第初始位置   随机的
				this.left( rand(0, new GameEngine().width()-this.width() ) );
				this.top( -this.height() );
				this.speed = 7;
				this.hp = 1;
				this.imgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];//数组用于存放爆炸的敌机图片
				break;
			}
			case "middle":{
				new GameEngine().append( this.body );
				this.body.className = "enemy-middle";
				//设置敌机第初始位置   随机的
				this.left( rand(0, new GameEngine().width()-this.width() ) );
				this.top( -this.height() );
				this.speed = 5;
				this.hp = 3;
				this.imgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];//数组用于存放爆炸的敌机图片
				break;
			}
			case "large" : {
				new GameEngine().append( this.body );
				this.body.className = "enemy-large";
				//设置敌机第初始位置   随机的
				this.left( rand(0, new GameEngine().width()-this.width() ) );
				this.top( -this.height() );
				this.speed = 2;
				this.hp = 7;
				this.imgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];//数组用于存放爆炸的敌机图片
				break;
			}
		}
		return this;
	}
	this.move = function(){
		this.timer = setInterval( function(){
			this.top( this.top() + this.speed );
			if( this.top() > new GameEngine().height() ){
				clearInterval( this.timer );
				this.body.remove();
				//如果敌机运动的过程中没有被销毁  将这个敌机从集合中删除
				new GameEngine().enemes.delete( this );
			}
		}.bind(this),30 )
		
		return this;//move方法 返回当前创建的敌机
	}
	this.hurt = function(){
		//敌机受伤
		//敌机如果受伤，血值 减少 当血值减少到0 时   敌机会发生爆炸 然后销毁		
		--this.hp == 0 ? this.explode() : "";
	}
	this.explode = function(){
		//如果敌机发生爆炸  爆炸的敌机不在和子弹发生碰撞检测  
		//从集合中将敌机删除  就不会继续发生碰撞了
		new GameEngine().enemes.delete( this );
		//如果敌机发生爆炸  意味着敌机已经销毁不存在了  停止当前运动的敌机
		clearInterval( this.timer );
		//shift()  删除数组中的第一个数  并返回这个数  （改变原数组）
		//定义一个定时器 控制敌机爆炸后的图片切换效果
		var timer = setInterval( function(){
			if( this.imgs.length == 0 ){
				clearInterval(timer);
				this.body.remove();
			}
			this.body.style.backgroundImage = `url(images/${ this.imgs.shift() })`;
		}.bind(this) , 300 )
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
	this.left = function(val){
		if( val || val == 0 ){
			this.body.style.left  = val + "px";
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		if( val || val == 0 ){
			this.body.style.top = val + "px";
		}
		return this.body.offsetTop;
	}
}

