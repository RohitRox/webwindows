var vd= new Array();
var mc= new Array();
var cz=0;

function tester(str){
    document.getElementById('tester').innerHTML=str;
}


function init(){
document.body.setAttribute('onkeydown',document.body.getAttribute('onkeydown')+';boxesKey(event);');
}

function boxesKey(e){
        //if esc key is pressed and if a box is active, close the box
            if(e.keyCode==27 && document.activeBox){
            closePane(document.activeBox);
            document.activeBox=0;
        }
}


function openPane(title,config){
//openPane('About',{minWidth:100, minHeight:65, minLeft:0, maxLeft:999, minTop:0, maxTop:999, t: 100, l:100, h:100, w:100}

//The pane id counter
vd=doNext(vd);

//Prevents error when nothing is passed as config array
if(!config) config={};

//Default configuration when config is not
var cfg={
    l: 75,//left
    t: 100,//top
    w: 385,//width
    h: 280//height
    }

for (var p in cfg)
  cfg[p] = (typeof config[p] == 'undefined') ? cfg[p] : config[p];
//Create the whole pane container
cntr = document.createElement('div');
cntr.className='drsElement';
cntr.id='pane'+vd[0];
cntr.setAttribute('style', 'left: '+vd[0]*cfg['l']+'px; top: '+vd[0]*cfg['t']+'px; width: '+cfg['w']+'px; height: '+(cfg['h']+20)+'px; text-align: center;z-index:'+(++cz)+';');
cntr.setAttribute('onmouseover', "document.activeMouse="+vd[0]);
//set newly opened box as active for key listeners
document.activeBox=vd[0];

//Create content
cntnt=document.createElement('div');
cntnt.className='paneContent';
cntnt.id='paneContent'+vd[0];

cntnt.innerHTML='Loading.......';





//Create title bar
ttl = document.createElement('div');
ttl.className='drsMoveHandle';
ttl.innerHTML=title;
ttl.innerHTML+='<span class="buttons"><span class="button min"><a href="#" title="Minimize '+title+'!" onClick="minimize(\''+title+'\','+vd[0]+')"><u><b>_</b></u></a></span><span class="button close"><a href="#" title="Close" onClick="closePane('+vd[0]+')">X</a></span></span>'
//Append title to the container
cntr.appendChild(ttl);
cntr.appendChild(cntnt);

document.body.appendChild(cntr);

    var dragresize = new DragResize('dragresize',
 config);

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
return vd[0];

}

 function minimize(str,id){
       //Find next position for the div
mc=doNext(mc);
//Dont display it
document.getElementById('pane'+id).style.visibility='hidden';
//Create minimise bar
tnode=document.createElement('div');
tnode.id='mind'+id;
//
tnode.setAttribute("onmouseover", "document.activeMind="+mc[0]+";");
tnode.className='mind';
tnode.style.left=(258*mc[0])-250+'px';
//which is infact
//tnode.style.left=(mc[0]-1)*250+(8*mc[0])+'px';
tnode.innerHTML='<a href="#" onClick="javascript:maximize('+id+');" title="Maximize '+str+'">'+str+'</a><span class="buttons"><span class="button min"><a href="#" title="Maxiimize '+str+'!" onClick="maximize('+id+')"><b>[]</b></a></span><span class="button close"><a href="#" title="Close" onClick="closeMind('+id+')">X</a></span></span>';
document.body.appendChild(tnode);
}

function delNode(tnode){
    tnode.parentNode.removeChild(tnode);
}

function maximize(id){
    tmp=document.getElementById('pane'+id);
    //unhide the division
    tmp.style.visibility='visible';
    //set on top
    tmp.setAttribute('style', tmp.getAttribute('style')+";z-index:"+(++cz)+";");
    delNode(document.getElementById('mind'+id));
    mc[document.activeMind]=0;
}


   function closePane(id){
       delNode(document.getElementById('pane'+id));
       //empty the pane id
       vd[id]=0;


               }

   function closeMind(id)
   {
       //delete pane and the minimised bar
       delNode(document.getElementById('pane'+id));
       delNode(document.getElementById('mind'+id));
       //empty the pane id
       vd[id]=0;
       //and finally the position of the minimised bar
       mc[document.activeMind]=0;
               }


// *** DRAG/RESIZE CODE ***

function DragResize(myName, config)
{
  var props = {
  myName: myName,                  // Name of the object.
  enabled: true,                   // Global toggle of drag/resize.
  handles: ['tl', 'tm', 'tr',
   'ml', 'mr', 'bl', 'bm', 'br'], // Array of drag handles: top/mid/bot/right.
  isElement: null,                 // Function ref to test for an element.
  isHandle: null,                  // Function ref to test for move handle.
  element: null,                   // The currently selected element.
  handle: null,                  // Active handle reference of the element.
  minWidth: 100, minHeight: 65,     // Minimum pixel size of elements.
  minLeft: 0, maxLeft: 9999,       // Bounding box area, in pixels.
  minTop: 0, maxTop: 9999,
  zIndex: 0,                       // The highest Z-Index yet allocated.
  mouseX: 0, mouseY: 0,            // Current mouse position, recorded live.
  lastMouseX: 0, lastMouseY: 0,    // Last processed mouse positions.
  mOffX: 0, mOffY: 0,              // A known offset between position & mouse.
  elmX: 0, elmY: 0,                // Element position.
  elmW: 0, elmH: 0,                // Element size.
  allowBlur: true,                 // Whether to allow automatic blur onclick.
  ondragfocus: null,               // Event handler functions.
  ondragstart: null,
  ondragmove: null,
  ondragend: null,
  ondragblur: null
 };

 for (var p in props)
  this[p] = (typeof config[p] == 'undefined') ? props[p] : config[p];

}


DragResize.prototype.apply = function(node)
{
 // Adds object event handlers to the specified DOM node.

 var obj = this;
 addEvent(node, 'mousedown', function(e) {obj.mouseDown(e)} );
 addEvent(node, 'mousemove', function(e) {obj.mouseMove(e)} );
 addEvent(node, 'mouseup', function(e) {obj.mouseUp(e)} );
};


DragResize.prototype.select = function(newElement) {with (this)
{
 // Selects an element for dragging.

 if (!document.getElementById || !enabled) return;

 // Activate and record our new dragging element.
 if (newElement && (newElement != element) && enabled)
 {
  element = newElement;
  // Elevate it and give it resize handles.
  element.style.zIndex = ++cz;
  if (this.resizeHandleSet) this.resizeHandleSet(element, true);
  // Record element attributes for mouseMove().
  elmX = parseInt(element.style.left);
  elmY = parseInt(element.style.top);
  elmW = element.offsetWidth;
  elmH = element.offsetHeight;
  if (ondragfocus) this.ondragfocus();
 }
}};


DragResize.prototype.deselect = function(delHandles) {with (this)
{
   
 // Immediately stops dragging an element. If 'delHandles' is true, this
 // remove the handles from the element and clears the element flag,
 // completely resetting the .
 




 if (!document.getElementById || !enabled) return;
 if (delHandles)
 {
  if (ondragblur) this.ondragblur();
  if (this.resizeHandleSet) this.resizeHandleSet(element, false);
  element = null;
 }

 handle = null;
 mOffX = 0;
 mOffY = 0;
}};


DragResize.prototype.mouseDown = function(e) {with (this)
{
 // Suitable elements are selected for drag/resize on mousedown.
 // We also initialise the resize boxes, and drag parameters like mouse position etc.
 if (!document.getElementById || !enabled) return true;

 var elm = e.target || e.srcElement,
  newElement = null,
  newHandle = null,
  hRE = new RegExp(myName + '-([trmbl]{2})', '');

 while (elm)
 {
  // Loop up the DOM looking for matching elements. Remember one if found.
  if (elm.className)
  {
   if (!newHandle && (hRE.test(elm.className) || isHandle(elm))) newHandle = elm;
   if (isElement(elm)) {newElement = elm;break}
  }
  elm = elm.parentNode;
 }

 // If this isn't on the last dragged element, call deselect(),
 // which will hide its handles and clear element.
 if (element && (element != newElement) && allowBlur) deselect(true);

 // If we have a new matching element, call select().
 if (newElement && (!element || (newElement == element)))
 {
  // Stop mouse selections if we're dragging a handle.
  if (newHandle) cancelEvent(e);
  select(newElement, newHandle);
  handle = newHandle;
  if (handle && ondragstart) this.ondragstart(hRE.test(handle.className));
 }
}};


DragResize.prototype.mouseMove = function(e) {with (this)
{
 // This continually offsets the dragged element by the difference between the
 // last recorded mouse position (mouseX/Y) and the current mouse position.
 if (!document.getElementById || !enabled) return true;

 // We always record the current mouse position.
 mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
 mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;
 // Record the relative mouse movement, in case we're dragging.
 // Add any previously stored & ignored offset to the calculations.
 var diffX = mouseX - lastMouseX + mOffX;
 var diffY = mouseY - lastMouseY + mOffY;
 mOffX = mOffY = 0;
 // Update last processed mouse positions.
 lastMouseX = mouseX;
 lastMouseY = mouseY;

 // That's all we do if we're not dragging anything.
 if (!handle) return true;

 // If included in the script, run the resize handle drag routine.
 // Let it create an object representing the drag offsets.
 var isResize = false;
 if (this.resizeHandleDrag && this.resizeHandleDrag(diffX, diffY))
 {
  isResize = true;
 }
 else
 {
  // If the resize drag handler isn't set or returns fase (to indicate the drag was
  // not on a resize handle), we must be dragging the whole element, so move that.
  // Bounds check left-right...
  var dX = diffX, dY = diffY;
  if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
  else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
  // ...and up-down.
  if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
  else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
  elmX += diffX;
  elmY += diffY;
 }

 // Assign new info back to the element, with minimum dimensions.
 with (element.style)
 {
  left =   elmX + 'px';
  width =  elmW + 'px';
  top =    elmY + 'px';
  height = elmH + 'px';
 }

 // Evil, dirty, hackish Opera select-as-you-drag fix.
 var oDF;
 if (window.opera && document.documentElement)
 {
  oDF = document.getElementById('op-drag-fix');
  if (!oDF)
  {
   oDF = document.createElement('input');
   oDF.id = 'op-drag-fix';
   oDF.style.display = 'none';
   document.body.appendChild(oDF);
  }
  oDF.focus();
 }

 if (ondragmove) this.ondragmove(isResize);

 // Stop a normal drag event.
 cancelEvent(e);
}};


DragResize.prototype.mouseUp = function(e) {with (this)
{
 // On mouseup, stop dragging, but don't reset handler visibility.
 if (!document.getElementById || !enabled) return;

 var hRE = new RegExp(myName + '-([trmbl]{2})', '');
 if (handle && ondragend) this.ondragend(hRE.test(handle.className));
 deselect(false);
}};



/* Resize Code -- can be deleted if you're not using it. */

DragResize.prototype.resizeHandleSet = function(elm, show) {with (this)
{
 // Either creates, shows or hides the resize handles within an element.

 // If we're showing them, and no handles have been created, create 4 new ones.
 if (!elm._handle_tr)
 {
  for (var h = 0; h < handles.length; h++)
  {
   // Create 4 news divs, assign each a generic + specific class.
   var hDiv = document.createElement('div');
   hDiv.className = myName + ' ' +  myName + '-' + handles[h];
   elm['_handle_' + handles[h]] = elm.appendChild(hDiv);
  }
 }
show?document.activeBox=document.activeMouse:document.activeBox=0;


 // We now have handles. Find them all and show/hide.
 for (var h = 0; h < handles.length; h++)
 {
  elm['_handle_' + handles[h]].style.visibility = show ? 'inherit' : 'hidden';
 }
}};


DragResize.prototype.resizeHandleDrag = function(diffX, diffY) {with (this)
{
 // Passed the mouse movement amounts. This function checks to see whether the
 // drag is from a resize handle created above; if so, it changes the stored
 // elm* dimensions and mOffX/Y.

//make the height of paneContent equal to the height of pane, so that when resizing, it doesn't extend out.
document.getElementById('paneContent'+vd[0]).style.height=document.getElementById('pane'+vd[0]).style.height;

 var hClass = handle && handle.className &&
  handle.className.match(new RegExp(myName + '-([tmblr]{2})')) ? RegExp.$1 : '';

 // If the hClass is one of the resize handles, resize one or two dimensions.
 // Bounds checking is the hard bit -- basically for each edge, check that the
 // element doesn't go under minimum size, and doesn't go beyond its boundary.
 var dY = diffY, dX = diffX, processed = false;
 if (hClass.indexOf('t') >= 0)
 {
  rs = 1;
  if (elmH - dY < minHeight) mOffY = (dY - (diffY = elmH - minHeight));
  else if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
  elmY += diffY;
  elmH -= diffY;
  processed = true;
 }
 if (hClass.indexOf('b') >= 0)
 {
  rs = 1;
  if (elmH + dY < minHeight) mOffY = (dY - (diffY = minHeight - elmH));
  else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
  elmH += diffY;
  processed = true;
 }
 if (hClass.indexOf('l') >= 0)
 {
  rs = 1;
  if (elmW - dX < minWidth) mOffX = (dX - (diffX = elmW - minWidth));
  else if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
  elmX += diffX;
  elmW -= diffX;
  processed = true;
 }
 if (hClass.indexOf('r') >= 0)
 {
  rs = 1;
  if (elmW + dX < minWidth) mOffX = (dX - (diffX = minWidth - elmW));
  else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
  elmW += diffX;
  processed = true;
 }

 return processed;
}};

if (typeof addEvent != 'function')
{
 var addEvent = function(o, t, f, l)
 {
  var d = 'addEventListener', n = 'on' + t, rO = o, rT = t, rF = f, rL = l;
  if (o[d] && !l) return o[d](t, f, false);
  if (!o._evts) o._evts = {};
  if (!o._evts[t])
  {
   o._evts[t] = o[n] ? {b: o[n]} : {};
   o[n] = new Function('e',
    'var r = true, o = this, a = o._evts["' + t + '"], i; for (i in a) {' +
     'o._f = a[i]; r = o._f(e||window.event) != false && r; o._f = null;' +
     '} return r');
   if (t != 'unload') addEvent(window, 'unload', function() {
    removeEvent(rO, rT, rF, rL);
   });
  }
  if (!f._i) f._i = addEvent._i++;
  o._evts[t][f._i] = f;
 };
 addEvent._i = 1;
 var removeEvent = function(o, t, f, l)
 {
  var d = 'removeEventListener';
  if (o[d] && !l) return o[d](t, f, false);
  if (o._evts && o._evts[t] && f._i) delete o._evts[t][f._i];
 };
}

function doNext(v){
    //Algorithm to return the first empty position
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
             }


function cancelEvent(e, c)
{
 e.returnValue = false;
 if (e.preventDefault) e.preventDefault();
 if (c)
 {
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
 }
}