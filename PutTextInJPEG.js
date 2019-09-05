

//绘制文字
function putTheText(argDoc,argString){
    argDoc.changeMode( ChangeMode.RGB )              ;/* 更改文件格式 */
    argDoc.bitsPerChannel = BitsPerChannelType.EIGHT ;/* 更改文件格式 */

    var varTextSize = 36 ;
    var varTextLayer = argDoc.artLayers.add();
    varTextLayer.kind = LayerKind.TEXT;
   // for (i=0; i<  app.fonts.length ; i++) { 
   //     var varFont = app.fonts[i];
   //     if(varFont.name  ==  "FZShuTi" ){
   //      alert(app.fonts[i].postScriptName); 
   //     }
   // } 
    varTextLayer.textItem.contents = argString                 ;
    varTextLayer.textItem.font = "FZSTK--GBK1-0" ; /* "方正舒体" */;
    varTextLayer.textItem.size = varTextSize                   ;
    //varTextLayer.textItem.kind = TextType.PARAGRAPHTEXT        ;
    varTextLayer.textItem.justification = Justification.LEFT   ;
    var varSpace = 16 ;
    var varTextXPos = (argDoc.width - varSpace ) - (varTextLayer.bounds[2] - varTextLayer.bounds[0]);
    varTextLayer.textItem.position = new Array(
        varTextXPos , 
        varSpace + varTextLayer.bounds[3] - varTextLayer.bounds[1] );

}

//强制将单位改为像素
function doTheApp(){

    //用于恢复单位状态
    var varR1 = app.preferences.rulerUnits;
    var varR2 = app.preferences.typeUnits ;
    var varR3 = app.foregroundColor ;
    var varR4 = app.backgroundColor ;
    
    try{
        app.preferences.rulerUnits = Units.PIXELS    ;
        app.preferences.typeUnits = TypeUnits.PIXELS ;

        /*打开文档*/
        var varDoc = app.activeDocument ;

{//设置背景色为白色
    var mySolidColor = new SolidColor();
    mySolidColor.rgb.red= 255;
    mySolidColor.rgb.green= 255;
    mySolidColor.rgb.blue= 255;
    app.backgroundColor = mySolidColor ;
}

{//设置前景色为黑色
    var mySolidColor = new SolidColor();
    mySolidColor.rgb.red= 0;
    mySolidColor.rgb.green= 0;
    mySolidColor.rgb.blue= 0;
    app.foregroundColor = mySolidColor ;
}

        if( varDoc ){
        }else{
            return ;
        }

        {
        var varName = varDoc.name  ;
        /*绘制文字*/
        putTheText(varDoc,parseInt(varName,10));
       }
     
    } catch(e){
        alert(e);
    }
    finally{//恢复默认单位
        app.preferences.typeUnits  = varR2;
        app.preferences.rulerUnits = varR1;
        app.foregroundColor = varR3 ;
        app.backgroundColor = varR4 ;
    }

}


doTheApp()


/**** 
新細明體：PMingLiU

細明體：MingLiU

標楷體：DFKai-SB

黑体：SimHei

新宋体：NSimSun

仿宋：FangSong

楷体：KaiTi

仿宋_GB2312：FangSong_GB2312

楷体_GB2312：KaiTi_GB2312

微軟正黑體：Microsoft JhengHei

微软雅黑体：Microsoft YaHei

装Office会生出来的一些：

隶书：LiSu

幼圆：YouYuan

华文细黑：STXihei

华文楷体：STKaiti

华文宋体：STSong

华文中宋：STZhongsong

华文仿宋：STFangsong

方正舒体：FZShuTi

方正姚体：FZYaoti

华文彩云：STCaiyun

华文琥珀：STHupo

华文隶书：STLiti

华文行楷：STXingkai

华文新魏：STXinwei
*/



