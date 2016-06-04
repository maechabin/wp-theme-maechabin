/**
 * meltdown3.js
 * Copyright (c) 2009 KAZUMiX
 * http://d.hatena.ne.jp/KAZUMiX/20090421/meltdown3
 * 
 * 譖ｴ譁ｰ螻･豁ｴ
 * 2009/05/01 noCacheQuery縺ｮ縺ｨ縺薙！E縺�縺ｨ縺､縺ｭ縺ｫ繧ｭ繝｣繝�す繝･縺輔ｌ縺ｪ縺�ｈ縺�↓縺励↑縺�→謖吝虚荳榊ｯｩ縺ｫ縺ｪ繧九ｈ縺�↑縺ｮ縺ｧ菫ｮ豁｣
 * 2009/04/29 Flash(AS3)蛛ｴ縺ｧ隱ｭ縺ｿ霎ｼ繧逕ｻ蜒上�繧ｿ繧､繝�繧｢繧ｦ繝医ｒ險ｭ螳�
 * 2009/04/26 繧ｳ繝｡繝ｳ繝郁ｿｽ蜉�
 * 2009/04/21 蜈ｬ髢�
 */

(function(){
   var noCacheQuery = '?ver=1.0.' + (new Date).getTime();
   //var noCacheQuery = '?ver=1.0.1';
   
   // 蛻晄悄險ｭ螳�
   var thisScriptName = 'meltdown3.js';
   var meltdownFlashName = 'meltdown3.swf' + noCacheQuery;
   var meltdownFlashName2 = 'meltdown3end.swf' + noCacheQuery;
   var flashId = 'externalMeltdown3';
   
   var d = document;
   
   // 繝�く繧ｹ繝医ｒ1譁�ｭ励★縺､蝗ｲ縺�◆繧√↓菴ｿ縺�ち繧ｰ
   // span 縺ｨ縺� div 縺ｧ縺ｯ縺ｪ縺上√が繝ｪ繧ｸ繝翫Ν縺ｪ繧ｪ繝ｬ繧ｪ繝ｬ繧ｿ繧ｰ縺ｫ縺励※縺翫￥
   // CSS縺ｮ蠖ｱ髻ｿ繧貞女縺代↑縺�◆繧��蜷医′繧医＞
   // document.createElement縺ｧ莉ｻ諢上�繧ｿ繧ｰ繧ょ撫鬘檎┌縺冗函謌仙庄閭ｽ
   var tag = 'KZM'; // 繧ｪ繝ｬ繧ｪ繝ｬ繧ｿ繧ｰ
   
   // 陦ｨ遉ｺ菴咲ｽｮ繧剃ｿ晏ｭ�
   var initScrollX = d.documentElement.scrollLeft||d.body.scrollLeft;
   var initScrollY = d.documentElement.scrollTop||d.body.scrollTop;

   // HTML隕∫ｴ�縺ｮ蠎ｧ讓吶ｒ蜿門ｾ励☆繧九◆繧√�髢｢謨ｰ
   var getPoint = function(elm){
     var x=0,y=0;
     while(elm){
       x += elm.offsetLeft;
       y += elm.offsetTop;
       elm = elm.offsetParent;
     }
     return {x:x, y:y};
   };
   
   // 隕∫ｴ�縺ｮ繧ｹ繧ｿ繧､繝ｫ繧貞叙蠕励☆繧九◆繧√�髢｢謨ｰ
   // IE縺�縺代�迚ｹ谿翫↑縺ｮ縺ｧ縺薙％縺ｧ蛻､蛻･縺励※縺翫￥
   var isIE = false;
   var computedStyle = function(){
     if(window.getComputedStyle){ //繝｢繝繝ｳ繝悶Λ繧ｦ繧ｶ
       return function(elm,prop){return window.getComputedStyle(elm,null)[prop];};
     }else if(d.body.currentStyle){ //IE
       isIE = true;
       return function(elm,prop){if(!elm.currentStyle){return '';};return elm.currentStyle[prop];};
     }
     return null;
   }();

   // 繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ繝代せ繧貞叙蠕励☆繧矩未謨ｰ�磯←蠖難ｼ�
   var getScriptPath = function(scriptName){
     var re = new RegExp('/'+scriptName + '\\b');
     var scripts = d.getElementsByTagName('script');
     for (var i = 0, len = scripts.length; i < len; i++) {
       var script = scripts[i];
       if (re.test(script.src)) {
         var splitPath = script.src.split(scriptName);
         return splitPath[0];
       }
     }
     return '';
   };

   // 迴ｾ蝨ｨ縺ｮ繧ｦ繧｣繝ｳ繝峨え繧ｵ繧､繧ｺ縺ｧ縺ｮHTML縺ｮ譁�ｫ�縺ｮ繧ｵ繧､繧ｺ繧貞ｾ励ｋ髢｢謨ｰ
   var getDocumentSize = function(){
     return {width:Math.max(d.body.scrollWidth, d.documentElement.scrollWidth), height:Math.max(d.body.scrollHeight, d.documentElement.scrollHeight)};
   };

   // 繧ｳ繝ｳ繝�Φ繝�ｒ陦ｨ遉ｺ縺吶ｋ繧ｦ繧｣繝ｳ繝峨え繧ｵ繧､繧ｺ繧貞ｾ励ｋ髢｢謨ｰ
   var getWindowSize = function(){
     var result = {};
     if(window.innerWidth){
       var box = d.createElement('div');
       with(box.style){
         position = 'absolute';
         top = '0px';
         left = '0px';
         width = '100%';
         height = '100%';
         margin = '0px';
         padding = '0px';
         border = 'none';
         visibility = 'hidden';
       }
       d.body.appendChild(box);
       var width = box.offsetWidth;
       var height = box.offsetHeight;
       d.body.removeChild(box);
       result = {width:width, height:height};
     }else{
       result = {width:d.documentElement.clientWidth || d.body.clientWidth, height:d.documentElement.clientHeight || d.body.clientHeight};
     }
     return result;
   };
   
   // Flash縺ｫ蛻ｶ蠕｡繧堤ｧｻ縺吶→縺阪↓蜻ｼ縺ｶ
   var addFlash = function(){
     var url = meltdown3.path + meltdownFlashName;
     var overlayBox = d.createElement('div');
     overlayBox.id = flashId + 'Container';
     with(overlayBox.style){
       position = 'absolute';
       top = initScrollY + 'px';
       left = initScrollX + 'px';
       width = windowSize.width + 'px';
       height = windowSize.height + 'px';
       overflow = 'hidden';
       zIndex = '2001';
     }
     overlayBox.innerHTML = '<object width="100%" height="100%" id="' + flashId + '" align="middle" data="' + url + '" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always" /><param name="movie" value="' + url + '" /><param name="quality" value="low" /><param name="wmode" value="transparent" /><param name="scale" value="noscale" /><param name="salign" value="lt" /><param name="menu" value="false" /></object>';
     d.body.appendChild(overlayBox);
   };

   //
   // 縺薙％繧芽ｾｺ縺九ｉ譛ｬ逡ｪ
   //
   
   // AS3縺ｮExternalInterface.call()縺ｧ蜻ｼ縺ｳ蜃ｺ縺吶◆繧√↓繧ｰ繝ｭ繝ｼ繝舌Ν螟画焚繧堤畑諢上＠縺ｦ縺翫￥
   window.KAZUMiXmeltdown3 = {};
   var meltdown3 = window.KAZUMiXmeltdown3;
   meltdown3.path = getScriptPath(thisScriptName);
   meltdown3.endSwf = meltdown3.path + meltdownFlashName2;
   meltdown3.isIE = isIE;
   
   // AS3縺九ｉ蜻ｼ縺ｳ蜃ｺ縺礼畑
   // 荳翫�譁ｹ縺ｧ菫晏ｭ倥＆繧後◆繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ菴咲ｽｮ遘ｻ蜍輔＆縺帙ｋ縺溘ａ縺ｮ髢｢謨ｰ
   // setTimeout縺ｧ繧�▲縺溘⊇縺�′縺�＞繧医≧縺ｪ縺昴≧縺ｧ縺ｪ縺��縺ｪ縺ｨ縺�≧霑ｷ縺�′縺ゅ▲縺�
   // 邨仙ｱsetTimeout縺ｯ繧�ａ縺�
   meltdown3.setScrollPosition = function(){
     var currentScrollPosition = function(){
       scrollTo(initScrollX, initScrollY);
     };
     return function(){
       //setTimeout(currentScrollPosition, 0);
       currentScrollPosition();
     };
   }();
   
   // 譛蠕後�貍泌�縺ｧ繧ｿ繧ｰ縺ｮ邨ｱ險域ュ蝣ｱ繧定｡ｨ遉ｺ縺吶ｋ縺溘ａ縺ｮ驟榊�
   meltdown3.tagInfos = function(){
     var result = [];
     var elms = d.getElementsByTagName('*');
     for(var i=0,len=elms.length; i<len; i++){
       var elm = elms[i];
       if(elm.id=='KM3' || (elm.tagName.indexOf('!') != -1)){
         continue;
       }
       // 縺ｪ縺懊°繧ｿ繧ｰ縺ｮid縺ｫ蛻･繝弱�繝峨�蜿ら�縺悟�縺｣縺ｦ縺�ｋ縺薙→縺後≠繧九◆繧∵枚蟄怜�縺九←縺�°繝√ぉ繝�け
       var elmId = elm.id;
       if(typeof(elm.id) != 'string'){
         elmId = '';
       }
       result.push({tagName:elm.tagName, id:elmId});
     }
     return result;
   }();
   
   // 荳願ｨ倬�蛻励ｒAS3縺ｫ縺昴�縺ｾ縺ｾ貂｡縺帙ｌ縺ｰ蝠城｡檎┌縺九▲縺溘�縺�縺代←縲�
   // 驟榊�縺悟､ｧ縺阪＞縺ｨ螟ｱ謨励☆繧九％縺ｨ縺後≠繧九◆繧√↓菴懊▲縺滉ｸ縺､縺壹▽貂｡縺咎未謨ｰ
   meltdown3.getTagInfo = function(){
     var tagInfos = meltdown3.tagInfos;
     var counter = 0;
     var maxCounter = tagInfos.length;
     return function(){
       if(counter >= maxCounter){
         return null;
       }
       return tagInfos[counter++];
     };
   }();
   
   // 譛蠕後�貍泌�譎ゅ↓髫�縺吝ｯｾ雎｡縺ｮ隕∫ｴ�
   // Flash縺ｮ陬上↓濶ｲ縲�≠繧九→Firefox縺ｮ謠冗判縺梧ｪ縺励￥縺ｪ繧九�縺ｧ髫�縺�
   var allHideTargets = function(){
     var result = [];
     for(var i=0,len=d.body.childNodes.length; i<len; i++){
       var node = d.body.childNodes[i];
       if(node.nodeType == 1){
         result.push(node);
       }
     }
     return result;
   }();
   
   // 竊代ｒ髫�縺吶◆繧√↓蜻ｼ縺ｶ
   meltdown3.hideAll = function(){
     for(var i=0,len=allHideTargets.length; i<len; i++){
       allHideTargets[i].style.visibility = 'hidden';
     }
   };
   
   var windowSize = getWindowSize();
   
   // 繧ｦ繧｣繝ｳ繝峨え蜀�↓陦ｨ遉ｺ縺輔ｌ縺ｦ縺�ｋ隕∫ｴ�縺九メ繧ｧ繝�け縺吶ｋ縺溘ａ縺ｮ髢｢謨ｰ
   var isTargetInViewPort = function(elm){
     var point = getPoint(elm);
     elm._point = point;
     if(point.y > windowSize.height+initScrollY || point.y+elm.offsetHeight < initScrollY){
       return false;
     }
     return true;
   };

   // 蟇ｾ雎｡縺ｮ繝�く繧ｹ繝医ヮ繝ｼ繝峨∫判蜒上↑縺ｩ繧帝�蛻励↓菫晏ｭ倥☆繧�
   var targetTextNodes = [];
   //var notTargetTextNodes = [];
   var targetImages = [];
   var embedObjects = [];
   var setTargetTextNodes  = function(){
     var windowSize = getWindowSize();
     var exceptionTag = /^(?:script|noscript|param|link|select|input)$/i;
     var exceptionText = /^\s+$/;
     var visible = function(elm){
       if(computedStyle(elm, 'display') == 'none'){
         return false;
       }
       if(computedStyle(elm, 'visibility') == 'hidden'){
         return false;
       }
       if( (elm.offsetWidth == 0 || elm.offsetHeight == 0) && computedStyle(elm, 'overflow') == 'hidden'){
         return false;
       }
       if(parseInt(computedStyle(elm, 'textIndent'),10) < -100){
         return false;
       }
       return true;
     };
     var getTextNodes = function(node){
       node._textNodeScaned = true;
       // 竊践TML縺後お繝ｩ繝ｼ縺�繧峨￠縺�縺ｨIE縺ｧ辟｡髯舌Ν繝ｼ繝励☆繧九％縺ｨ縺後≠繧九�縺ｧ繝√ぉ繝�け縺励◆縺九←縺�°菫晏ｭ�
       for (var i = 0, len = node.childNodes.length; i < len; i++) {
         var childNode = node.childNodes[i];
         if (childNode.nodeType == 3 && !exceptionText.test(childNode.data)) {
           if(isTargetInViewPort(node)){
             targetTextNodes.push(childNode);
           }else{
             //notTargetTextNodes.push(childNode);
           }
           //console.log(childNode.parentNode, childNode);
         }
         else 
           if (/^img$/i.test(childNode.tagName) && visible(childNode) && isTargetInViewPort(childNode)){
             targetImages.push(childNode);
             //console.log(childNode);
           }
         else 
           if (/^(embed|object|iframe)$/i.test(childNode.tagName) && visible(childNode) && isTargetInViewPort(childNode)){
             embedObjects.push(childNode);
             //console.log(childNode);
           }
         else
           if (childNode.nodeType == 1 && !childNode._textNodeScaned && !exceptionTag.test(childNode.tagName) && visible(childNode)) {
             getTextNodes(childNode);
           }
       }
     };
     getTextNodes(d.body);
   }();
   
   // 1譁�ｭ励★縺､繧ｿ繧ｰ縺ｧ蝗ｲ縺ｿ縲��蛻励↓菫晏ｭ倥☆繧�
   var targetCharas = function(){
     var result = [];
     var wrapperBase = d.createElement(tag);
     var wrappersBase = d.createElement(tag+tag);
     var breakForSafari = d.createElement(tag);
     breakForSafari.style.visibility = 'hidden';
     var isSafari = function(){
       if(navigator.userAgent.indexOf('WebKit') != -1){
         return true;
       }
       return false;
     }();
     for (var i = 0, len = targetTextNodes.length; i < len; i++) {
       var textNode = targetTextNodes[i];
       if(!textNode.parentNode){
         // 隕ｪ縺後↑縺九▲縺溘ｉHTML縺ｮ繧ｨ繝ｩ繝ｼ縺ｪ縺ｮ縺ｧ辟｡隕悶☆繧具ｼ�IE縺ｧ縺ゅｊ縺�ｋ��
         continue;
       }
       var wrappers = wrappersBase.cloneNode(false);
       for (var j = 0, lenJ = textNode.data.length; j < lenJ; j++) {
         var chara = textNode.data.charAt(j);
         var wrapper = wrapperBase.cloneNode(false);
         var charaNode = d.createTextNode(chara);
         wrapper.appendChild(charaNode);
         wrappers.appendChild(wrapper);
         if(isSafari){
           var blank = breakForSafari.cloneNode(false);
           wrappers.appendChild(blank);
         }
         result.push(wrapper);
       }
       textNode.parentNode.insertBefore(wrappers, textNode);
       textNode.parentNode.removeChild(textNode);
     }
     return result;
   }();

   // 隕∫ｴ�縺ｮ蠎ｧ讓吶ｒ蜿門ｾ励＠縺ｦ菫晏ｭ倥☆繧�
   var setPositionInfo = function(){
     var reWhiteSpace = /\s/;
     var targetCharasInViewPort = [];
     for(var i=0, len=targetCharas.length; i<len; i++){
       var targetChara = targetCharas[i];
       var point = getPoint(targetChara);
       var offsetWidth = targetChara.offsetWidth;
       var offsetHeight = targetChara.offsetHeight;
       var centerX = point.x + offsetWidth / 2;
       var centerY = point.y + offsetHeight / 2;
       targetChara._point = point;
       targetChara._offsetWidth = offsetWidth;
       targetChara._offsetHeight = offsetHeight;
       targetChara._centerX = centerX;
       targetChara._centerY = centerY;
       targetChara._character = true;
       targetChara._isInViewPort = function(){
         if( ( (point.y + offsetHeight) < initScrollY ) || ( point.y > (initScrollY + windowSize.height ) ) ){
           return false;
         }
         if( reWhiteSpace.test(targetChara.childNodes[0].data) ){
           return false;
         }
         targetCharasInViewPort.push(targetChara);
         return true;
       }();
     }
     targetCharas = targetCharasInViewPort;
     
   }();
   
   // 繝輔か繝ｳ繝域ュ蝣ｱ繧定ｦｪ縺ｫ險ｭ螳壹＠縺ｦ縺翫￥
   var setFontInfo = function(){
     
     // 竊薙％繧後′蠢�ｦ√↓縺ｪ繧九�縺ｯIE縺ｧ繧ｫ繝ｩ繝ｼ繝阪�繝�菴ｿ縺｣縺ｦ繧九�繝ｼ繧ｸ縺�縺代↑縺ｮ縺ｧ縲ょ�蟇ｾ蠢懊＠縺ｾ縺帙ｓ
     var fontColorKeys = {
       black : 0,
       silver : 0xc0c0c0,
       gray : 0x808080,
       white : 0xffffff,
       maroon : 0x800000,
       red : 0xff0000,
       purple : 0x800080,
       fuchsia : 0xff00ff,
       green : 0x008000,
       lime : 0x00ff00,
       olive : 0x808000,
       yellow : 0xffff00,
       navy : 0x000080,
       blue : 0x0000ff,
       teal : 0X008080,
       aqua : 0x00ffff
     };
     var reFontColorKeys = /^(black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua)|$/;
     
     var getFontColor = function(elm){
       var colorStyle = computedStyle(elm,'color');
       if(colorStyle.indexOf('#') == 0){
         // #RRGGBB縺ｨ縺�≧蠖｢蠑上�蝣ｴ蜷�
         if(colorStyle.length > 4){
           return parseInt(colorStyle.substr(1),16);
         }else{
           // #RGB縺ｨ縺�≧蠖｢蠑上�蝣ｴ蜷�
           return parseInt(colorStyle.substr(1,1),16)*65536*16 + parseInt(colorStyle.substr(2,1),16)*256*16 + parseInt(colorStyle.substr(3,1),16)*16;
         }
       }
       if(colorStyle.indexOf('rgb') == 0){
         // rgb(r,g,b)縺ｨ縺�≧蠖｢蠑上�蝣ｴ蜷�
         var rgbArray = colorStyle.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
         return parseInt(rgbArray[1],10)*65536 + parseInt(rgbArray[2],10)*256 + parseInt(rgbArray[3],10);
       }
       if(reFontColorKeys.test(colorStyle)){
         // 繧ｫ繝ｩ繝ｼ繝阪�繝�縺ｮ蝣ｴ蜷�
         return fontColorKeys[colorStyle];
       }
       // 繧医￥蛻�°繧峨↑縺九▲縺溘ｉ0
       return 0;
     };

     // font-family
     var getFontFamily = function(elm){
       // 蝓ｺ譛ｬ縺ｯsans
       var fontFamilyStyle = computedStyle(elm,'fontFamily');
       if(fontFamilyStyle.indexOf('serif') != -1 && fontFamilyStyle.indexOf('sans-serif') == -1){
         return 'serif';
         
       }else{
         return 'sans';
       }
     };
     
     var baseParents = d.getElementsByTagName(tag+tag);
     for(var i=0,len=baseParents.length; i<len; i++){
       var elm = baseParents[i];
       elm._color = getFontColor(elm);
       elm._fontFamily = getFontFamily(elm);
     }
     
   }();
   
   // iframe繧�沂繧∬ｾｼ縺ｿ繧ｪ繝悶ず繧ｧ繧ｯ繝磯未騾｣縺ｮ蠎ｧ讓吶ｒ繧ｻ繝�ヨ縺吶ｋ
   var setEmbedObjectInfo = function(){
     for(var i=0,len=embedObjects.length; i<len; i++){
       var elm = embedObjects[i];
       var point = getPoint(elm);
       elm._point = point;
       elm._width = elm.offsetWidth;
       elm._height = elm.offsetHeight;
     }
   }();
   
   // 竊代〒繧ｻ繝�ヨ縺励◆繧ゅ�繧帝撼陦ｨ遉ｺ縺ｫ縺吶ｋ縲�AS3縺九ｉ蜻ｼ縺ｳ蜃ｺ縺�
   meltdown3.removeEmbedbjects = function(){
     var result = [];
     for(var i=0,len=embedObjects.length; i<len; i++){
       var elm = embedObjects[i];
       elm.style.visibility = 'hidden';
       if(elm._width > 0 && elm._height > 0){
         result.push({x:elm._point.x - initScrollX, y:elm._point.y - initScrollY, width:elm._width, height:elm._height});
       }
     }
     return result;
   };
   
   // 逕ｻ蜒上�蠎ｧ讓呎ュ蝣ｱ縺ｪ縺ｩ繧偵そ繝�ヨ縺吶ｋ
   var targetImageSrcs = [];
   meltdown3.targetImageSrcs = targetImageSrcs;
   var setImageInfo = function(){
     for(var i=0,len=targetImages.length; i<len; i++){
       var image = targetImages[i];
       image._image = true;
       image._src = image.src;
       image._width = image.width;
       image._height = image.height;
       image._centerX = image._point.x + image._width / 2;
       image._centerY = image._point.y + image._height / 2;
       image._id = i;
       targetImageSrcs.push(image._src);
     }
   }();
   
   // 蜈ｨ蟇ｾ雎｡隕∫ｴ�縺ｮ驟榊�繧剃ｽ懊ｋ
   var allTargets = targetImages.concat(targetCharas);
   meltdown3.allTargets = allTargets;
   
   // 竊代�驟榊�繧偵す繝｣繝�ヵ繝ｫ縺吶ｋ
   var shuffleAllTargets = function(){
     for(var i=0,len=allTargets.length; i<len; i++){
       var tmp = allTargets[i];
       var randomNum = Math.floor(Math.random()*len);
       allTargets[i] = allTargets[randomNum];
       allTargets[randomNum] = tmp;
     }
   }();
   
   //alert(allTargets.length);
   
   // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ蟇ｾ雎｡隕∫ｴ�繧剃ｸ縺､縺壹▽霑斐☆
   var getTargetElm = function(){
     var current = 0;
     var max = allTargets.length;
     
     return function getNext(){
       if(current >= max){
         return false;
       }
       return allTargets[current++];
     };
   }();
   
   // AS3縺ｫ繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ隕∫ｴ�繧剃ｸ縺､縺壹▽霑斐☆
   meltdown3.transportElm = function(){
     var target = getTargetElm();
     if(target === false){
       return {end:true};
     }
     
     target.style.visibility = 'hidden';
     //console.log(target);

     if(target._character){
       return {chara:target.childNodes[0].data, x:target._centerX-initScrollX, y:target._centerY-initScrollY, color:target.parentNode._color, size:target._offsetHeight+1, family:target.parentNode._fontFamily};
     }
     
     if(target._image){
       return {width:target._width, height:target._height, x:target._centerX-initScrollX, y:target._centerY-initScrollY, id:target._id};
     }
     
     // 縺薙％縺ｫ蛻ｰ驕斐＠縺溘ｉ繝舌げ
     return {end:true};
   };
   
   // Flash雋ｼ繧贋ｻ倥￠
   addFlash();
   
 })();