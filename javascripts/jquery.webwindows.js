/*!
 * jQuery webwindows | create windows ui in web
 * Author: @roxxypoxxy & @xtranophilist
 * Uses DragResize v1.0 by Angus Turnbull - http://www.twinhelix.com.
 * Github: https://github.com/RohitRox/webwindows
 */

/*
USAGE: 

$(document).ready(function() {
    $('div#some_id').webwindows();
});
// Binds an click event to div#some_id to fire a webwindow and put there its inner html , webwindows's title is set by the title of div#some_id

PROGRAMMATICAL CONTROL:

// fire up webwindow anywhere from the code
$.webwindows({ title: 'my title', content: 'be gud do gud'});

// fire up throw in the content of some div
$.webwindows({ title: 'my title', div: '#mydiv'});
$.webwindows({ title: 'my title', div: '.mydiv'});


// close the latest webwindow
$.closewebwindows();

HOOKS:

//TODO
$.webwindows({ title: 'my title', content: 'be gud do gud', afterclose: alert('gr8')});

*/


//Global

 var POS = new Array();
 var N_POS = new Array();
 var CZ = 0;
 
 ;(function($){

     $.webwindows = function(window_settings){
        $.webwindows.open_pane(window_settings);
    };

    $.closewebwindows = function(){
        pos = $('.drsElement').length;
        console.log(pos);
        $(document.getElementById('pane'+pos)).remove();
        $(document.getElementById('min_win'+pos)).remove();
        POS[pos]=0;

    };

    $.extend($.webwindows, {
        settings : {
             title : 'webwindows',
             content : 'Loading...',
             l: 75, //left
             t: 100,  //top
             w: 385,  //width
             h: 280 //height
        },
        init : function(){
            if($('.webwin_min_bar').length < 1){
                $('body').append('<div class="webwin_min_bar webwindows_buttons"></div>');
                $('.webwindows_buttons .min').live('click',function(){ $this = $(this); $.webwindows.minimize($this.attr('title'),$this.attr('rel'));  });
                $('.webwindows_buttons .close').live('click',function(){ $.webwindows.close_pane($(this).attr('rel'));  });
                $('.webwindows_buttons .max').live('click',function(){ $.webwindows.maximize($(this).attr('rel'));  });
            }
        },
        open_pane : function(window_settings){
            $.webwindows.init();
            var options = $.extend({}, $.webwindows.settings, window_settings);
            var pos = $.webwindows.get_pos(POS)[0];
            $.webwindows.build_window(pos,options);
            $.webwindows.init_drag_resize(options);
        },
        get_pos : function(v) {
            var i=1;
            while (1){
            if(!v[i]) {
                 v[i]=1;
                 v[0]=i;//index 0 gives current latest value
                 break;
                }
               i++;
            }
            return v;
        },
        build_window : function(pos, cfg){
            cntr = document.createElement('div');

            cntr.className='drsElement';
            cntr.id='pane'+pos;
            cntr.setAttribute('style', 'left: '+pos*cfg['l']+'px; top: '+pos*cfg['t']+'px; width: '+cfg['w']+'px; height: '+(cfg['h']+20)+'px; text-align: center;z-index:'+(++CZ)+';');
            cntr.setAttribute('onmouseover', "document.activeMouse="+pos);
            //set newly opened box as active for key listeners
            document.activeBox = pos;

            //Create content
            cntnt=document.createElement('div');
            cntnt.className='paneContent';
            cntnt.id='paneContent'+pos;

            if (cfg['div']!=undefined)
            {
            cntnt.innerHTML=$(cfg['div']).html();
            }else{
            cntnt.innerHTML=cfg['content'];
            }

            //Create title bar
            ttl = document.createElement('div');
            ttl.className='drsMoveHandle';
            title = cfg['title'];
            ttl.innerHTML=title;
            ttl.innerHTML+='<div class="webwindows_buttons"><a class="button min" href="#" title="'+title+'" rel="'+pos+'"><u><b>_</b></u></a>'+
            '<a class="button close" href="#" title="Close" rel="'+pos+'"">X</a></div>';
            //Append title to the container
            cntr.appendChild(ttl);
            cntr.appendChild(cntnt);

            document.body.appendChild(cntr);

         },

        init_drag_resize : function(cfg){

            var dragresize = new DragResize('dragresize', cfg);
            dragresize.isElement = function(elm)
            {
            if (elm.className && elm.className.indexOf('drsElement') > -1) return true;
            };
            dragresize.isHandle = function(elm)
            {
            if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
            };
            dragresize.ondragfocus = function() { };
            dragresize.ondragstart = function(isResize) { };
            dragresize.ondragmove = function(isResize) { };
            dragresize.ondragend = function(isResize) { };
            dragresize.ondragblur = function() { };
            dragresize.apply(document);

        },
        minimize : function(str,id){
            //Find next position for the div
            n_pos = $.webwindows.get_pos(N_POS)[0];
            //Dont display it
            document.getElementById('pane'+id).style.visibility='hidden';
            //Create minimise bar
            tnode=document.createElement('div');
            tnode.id='min_win'+id;
            //
            tnode.setAttribute("onmouseover", "document.activeMind="+n_pos+";");
            tnode.className='mind';
            //tnode.style.left=(258*n_pos)-250+'px';
            //which is infact
            //tnode.style.left=(mc[0]-1)*250+(8*mc[0])+'px';
            min_str = '<span>'+str+'</span><a href="#" class="max" rel="'+id+'">[]</a><a href="#" class="close" rel="'+id+'">X</a>';
            tnode.innerHTML=min_str;
            console.log(tnode);
            $('.webwin_min_bar').append(tnode);
        },
        maximize : function(webwindow){
            tmp=document.getElementById('pane'+webwindow);
            //unhide the division
            tmp.style.visibility='visible';
            //set on top
            tmp.setAttribute('style', tmp.getAttribute('style')+";z-index:"+(++CZ)+";");
            $(document.getElementById('min_win'+webwindow)).remove();
            N_POS[document.activeMind]=0;
        },
        close_pane : function(webwindow){
             $(document.getElementById('pane'+webwindow)).remove();
             $(document.getElementById('min_win'+webwindow)).remove();
             //empty the pane id
             POS[webwindow]=0;
        }
    });

     $.fn.webwindows = function(custom_options) {

         //  private ;
         var webwindows = this;

         // init;
         var intialize = function() {
           webwindows.each(function(){
            $(this).bind('click', function(){ $.webwindows({ title: $(this).attr('title'), content: $(this).html() });  })
           });
         };
         
         var open_window = function(options){
           var opt = this.options;
         };

         // PUBLIC functions
         
         this.close_all = function() {
             // change Tab
             console.log('close');
         };

         return intialize();
     }


 })(jQuery);

 // *** DRAG/RESIZE CODE ***

if(typeof addEvent!='function'){var addEvent=function(o,t,f,l){var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;if(o[d]&&!l)return o[d](t,f,false);if(!o._evts)o._evts={};if(!o._evts[t]){o._evts[t]=o[n]?{b:o[n]}:{};o[n]=new Function('e','var r=true,o=this,a=o._evts["'+t+'"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');if(t!='unload')addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL)})}if(!f._i)f._i=addEvent._i++;o._evts[t][f._i]=f};addEvent._i=1;var removeEvent=function(o,t,f,l){var d='removeEventListener';if(o[d]&&!l)return o[d](t,f,false);if(o._evts&&o._evts[t]&&f._i)delete o._evts[t][f._i]}}function cancelEvent(e,c){e.returnValue=false;if(e.preventDefault)e.preventDefault();if(c){e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()}};function DragResize(myName,config){var props={myName:myName,enabled:true,handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,minWidth:10,minHeight:10,minLeft:0,maxLeft:9999,minTop:0,maxTop:9999,zIndex:1,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mOffX:0,mOffY:0,elmX:0,elmY:0,elmW:0,elmH:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null};for(var p in props)this[p]=(typeof config[p]=='undefined')?props[p]:config[p]};DragResize.prototype.apply=function(node){var obj=this;addEvent(node,'mousedown',function(e){obj.mouseDown(e)});addEvent(node,'mousemove',function(e){obj.mouseMove(e)});addEvent(node,'mouseup',function(e){obj.mouseUp(e)})};DragResize.prototype.select=function(newElement){with(this){if(!document.getElementById||!enabled)return;if(newElement&&(newElement!=element)&&enabled){element=newElement;element.style.zIndex=++zIndex;if(this.resizeHandleSet)this.resizeHandleSet(element,true);elmX=parseInt(element.style.left);elmY=parseInt(element.style.top);elmW=element.offsetWidth;elmH=element.offsetHeight;if(ondragfocus)this.ondragfocus()}}};DragResize.prototype.deselect=function(delHandles){with(this){if(!document.getElementById||!enabled)return;if(delHandles){if(ondragblur)this.ondragblur();if(this.resizeHandleSet)this.resizeHandleSet(element,false);element=null}handle=null;mOffX=0;mOffY=0}};DragResize.prototype.mouseDown=function(e){with(this){if(!document.getElementById||!enabled)return true;var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(myName+'-([trmbl]{2})','');while(elm){if(elm.className){if(!newHandle&&(hRE.test(elm.className)||isHandle(elm)))newHandle=elm;if(isElement(elm)){newElement=elm;break}}elm=elm.parentNode}if(element&&(element!=newElement)&&allowBlur)deselect(true);if(newElement&&(!element||(newElement==element))){if(newHandle)cancelEvent(e);select(newElement,newHandle);handle=newHandle;if(handle&&ondragstart)this.ondragstart(hRE.test(handle.className))}}};DragResize.prototype.mouseMove=function(e){with(this){if(!document.getElementById||!enabled)return true;mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;var diffX=mouseX-lastMouseX+mOffX;var diffY=mouseY-lastMouseY+mOffY;mOffX=mOffY=0;lastMouseX=mouseX;lastMouseY=mouseY;if(!handle)return true;var isResize=false;if(this.resizeHandleDrag&&this.resizeHandleDrag(diffX,diffY)){isResize=true}else{var dX=diffX,dY=diffY;if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmX+=diffX;elmY+=diffY}with(element.style){left=elmX+'px';width=elmW+'px';top=elmY+'px';height=elmH+'px'}if(window.opera&&document.documentElement){var oDF=document.getElementById('op-drag-fix');if(!oDF){var oDF=document.createElement('input');oDF.id='op-drag-fix';oDF.style.display='none';document.body.appendChild(oDF)}oDF.focus()}if(ondragmove)this.ondragmove(isResize);cancelEvent(e)}};DragResize.prototype.mouseUp=function(e){with(this){if(!document.getElementById||!enabled)return;var hRE=new RegExp(myName+'-([trmbl]{2})','');if(handle&&ondragend)this.ondragend(hRE.test(handle.className));deselect(false)}};DragResize.prototype.resizeHandleSet=function(elm,show){with(this){if(!elm._handle_tr){for(var h=0;h<handles.length;h++){var hDiv=document.createElement('div');hDiv.className=myName+' '+myName+'-'+handles[h];elm['_handle_'+handles[h]]=elm.appendChild(hDiv)}}for(var h=0;h<handles.length;h++){elm['_handle_'+handles[h]].style.visibility=show?'inherit':'hidden'}}};DragResize.prototype.resizeHandleDrag=function(diffX,diffY){with(this){var hClass=handle&&handle.className&&handle.className.match(new RegExp(myName+'-([tmblr]{2})'))?RegExp.$1:'';var dY=diffY,dX=diffX,processed=false;if(hClass.indexOf('t')>=0){rs=1;if(elmH-dY<minHeight)mOffY=(dY-(diffY=elmH-minHeight));else if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));elmY+=diffY;elmH-=diffY;processed=true}if(hClass.indexOf('b')>=0){rs=1;if(elmH+dY<minHeight)mOffY=(dY-(diffY=minHeight-elmH));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmH+=diffY;processed=true}if(hClass.indexOf('l')>=0){rs=1;if(elmW-dX<minWidth)mOffX=(dX-(diffX=elmW-minWidth));else if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));elmX+=diffX;elmW-=diffX;processed=true}if(hClass.indexOf('r')>=0){rs=1;if(elmW+dX<minWidth)mOffX=(dX-(diffX=minWidth-elmW));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));elmW+=diffX;processed=true}return processed}};