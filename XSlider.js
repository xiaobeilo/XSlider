var XSlider = null;
!function(){
    XSlider = function(id,option){
        if(id.slice(0,1)!=='#'){
            id = '#' + id;
        }
        this.slider = document.querySelector(id);
        this.bUl = document.querySelector(id+ ' .banner');
        this.bLi = document.querySelectorAll(id+' .banner li');
        this.iUl = document.querySelector(id+' .idxs');
        this.iLi = document.querySelectorAll(id+' .idxs li');
        this.left = document.querySelector(id+' .left');
        this.right= document.querySelector(id+' .right');
        this.WIDTH=1920;
        this.HEIGHT=600;
        this.scale=0;
        this.type = 'js';
        this.trigger = 'mouseover';
        this.timing = 'linear';
        this.ctrScale = false;
        this.autoPlay = true;
        this.timer = null;
        this.stepDur = 500;
        this.step = 50;
        this.duration = 3000;
        if(option){for(var v in option){if(v) this[v] = option[v];}}
        this.stepinter = this.stepDur/this.step;
        this.init();
        this.autoPlay && this.autoPlayNext();
    }
    XSlider.prototype.init = function(){
        var me = this;
        !function(){
            var w = parseFloat(getStyle(me.slider,'width'));
            var h = parseFloat(getStyle(me.slider,'height'));
            me.scale = h/w;
        }();
        this.resize();
        addEvent(window,'resize',this.resize.bind(this));
        for(var i=0;i<this.bLi.length;i++){
            dataset(this.bLi[i],'i',i);
            dataset(this.iLi[i],'i',i);
        }
        this.bUl.insertBefore(this.bLi[this.bLi.length-1],this.bLi[0]);
        if(this.right && this.left){
            if(this.type === 'css'){
                addEvent(this.right,this.trigger,this.animate.bind(this,1,1,1));
                addEvent(this.left,this.trigger,this.animate.bind(this,-1,1,1));
            }else{
                addEvent(this.right,this.trigger,this.move.bind(this,1,1,1));
                addEvent(this.left,this.trigger,this.move.bind(this,-1,1,1));
            }
        }
        addEvent(this.iUl,this.trigger,function(event){
            if(me.isRun()) return false;
            var target = event.target || event.srcElement;
            if(target['nodeName'?'nodeName':'tagName'] === 'LI' && target.className !== 'on'){
                for(var i=0;i<me.iLi.length;i++){
                    if(me.iLi[i].className === 'on'){
                        var preI = me.iLi[i].getAttribute('data-i');
                        me.iLi[i].className = '';
                        break;
                    }
                }
                target.className='on';
                var count = target.getAttribute('data-i') - preI;
                var dir = 0;
                if(count>0){
                    dir = 1;
                }else{
                    count = Math.abs(count);
                    dir = -1;
                }
                var _count = count;
                if(me.type==='css'){
                    me.animate(dir,count,_count);
                }else{
                    me.move(dir,count,_count);
                }
            }
        });
    };
    XSlider.prototype.animate = function(dir,count,_count){
        // getComputedStyle(this.bUl).transition.match(/(\d?\.?\d+)(s|ms)/i);
        getStyle(this.bUl,'transition').match(/(\d?\.?\d+)(s|ms)/i);
        if(parseFloat(RegExp.$1) > 0) return false;
        var me = this;
        transition(this.bUl,'transform '+this.stepDur/_count+'ms '+this.timing);
        transform(this.bUl,'translateX('+(-this.WIDTH -dir*me.WIDTH)+'px)');
        addEvent(this.bUl,'transitionend',function(){
            transform(me.bUl,'translateX('+-me.WIDTH+'px)');
            transition(me.bUl,'transform 0ms');
            this.removeEventListener('transitionend',arguments.callee);
            me.checkOver(dir,count,_count);
        })
    };
    XSlider.prototype.move = function(dir,count,_count){
        if(this.timer) return false;
        var me = this;
        var moved = 0;
        this.timer = setInterval(function(){
            var curPos = parseFloat(getStyle(me.bUl,'left'));
            me.bUl.style.left = curPos - dir*me.step + 'px';
            var n = me.WIDTH - moved;
            if(n <= me.step){
                clearInterval(me.timer);
                me.timer = null;
                me.bUl.style.left = curPos - n +'px';
                me.checkOver(dir,count,_count);
                me.bUl.style.left = -me.WIDTH + 'px';
            }
            moved += me.step;
        },this.stepinter/_count);
    };
    XSlider.prototype.resize = function(){
        this.WIDTH = window.innerWidth;
        this.HEIGHT = this.WIDTH*this.scale;
        this.slider.style.width = this.WIDTH + 'px';
        this.slider.style.height = this.HEIGHT + 'px';
        this.bUl.style.width  = this.WIDTH * this.bLi.length + 'px';
        this.bUl.style.height  = this.bLi.HEIGHT + 'px';
        if(this.type === 'js'){
            this.bUl.style.left = -this.WIDTH + 'px';

        }else{
            transform(this.bUl,'translateX('+-this.WIDTH+'px)')
        }
        for(var i=0;i<this.bLi.length;i++){
            this.bLi[i].style.width = this.WIDTH + 'px';
            this.bLi[i].style.height = this.HEIGHT + 'px';
        }
        if(this.ctrScale){//页面控制元素是否需要缩放?
            this.left.style.width = aWidth * this.scale + 'px';
            this.right.style.width = aWidth * this.scale + 'px';
        }
    };
    XSlider.prototype.checkOver = function(dir,count,_count){
        this.bLi = this.bUl.children;
        if(dir === 1){
            this.bUl.appendChild(this.bLi[0]);
        }else{
            this.bUl.insertBefore(this.bLi[this.bLi.length-1],this.bLi[0]);
        }
        var idx = parseInt(this.bLi[1].getAttribute('data-i'));
        count--;
        if(count>0){
            if(this.type==='js'){
                this.move(dir,count,_count);
            }else{
                this.animate(dir,count,_count);
            }
        }else if(count===0 && _count===1){
            for(var i=0;i<this.iLi.length;i++){
                if(this.iLi[i].className === 'on'){
                    this.iLi[i].className = '';
                    break;
                }
            }
            this.iLi[idx].className = 'on';
        }
    };
    XSlider.prototype.isRun = function(){
        if(this.type === 'css'){
            getStyle(this.bUl,'transition').match(/(\d?\.?\d+)(s|ms)/i);
            if(parseFloat(RegExp.$1) > 0){
                return true;
            }else{
                return false;
            }
        }else{
            if(this.timer){
                return true;
            }else{
                return false;
            }

        }

    };
    XSlider.prototype.autoPlayNext = function(){
        var me = this;
        var h = null;
        addEvent(this.slider,'mouseover',function(){clearTimeout(h); })
        addEvent(this.slider,'mouseout',function(){repeat();})
        function repeat(){
            h = setInterval(function(){
                if(me.type === 'css'){me.animate(1,1,1);
                }else{me.move(1,1,1);}
            },me.duration)
        }
        repeat();
    };
    function transform(ele,prop){
        var arr = ['transform','WebKitTransform','MozTransform','OTransform','MsTransform'];
        for(var i=0;i<4;i++){
            ele.style[arr[i]] = prop;
        }
    }
    function transition(ele,prop){
        var arr = ['transition','WebKitTransition','MozTransition','OTransition','MsTransition'];
        for(var i=0;i<4;i++){
            ele.style[arr[i]] = prop;
        }
    }
    function addEvent (ele,evt,fn){
        if(ele.attachEvent){
            ele.attachEvent('on'+evt,fn);
        }else{
            ele.addEventListener(evt,fn,false);
        }
    }
    function getStyle(ele,attr){
        if(window.getComputedStyle){
            return getComputedStyle(ele)[attr];
        }else{
            return ele.currentStyle[attr];
        }
    }
    function dataset(ele,attr,val){
        if(ele.dataset){
            ele.dataset[attr] = val;
        }else{
            // ele['data-'+attr] = val;
            ele.setAttribute('data-'+attr,val);
        }
    }
}();