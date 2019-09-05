

//绘制文字
function putTheText(argDoc,argString){
    argDoc.changeMode( ChangeMode.RGB )              ;/* 更改文件格式 */
    argDoc.bitsPerChannel = BitsPerChannelType.EIGHT ;/* 更改文件格式 */

    var varTextSize = 36 ;
    var varTextLayer = argDoc.artLayers.add();
    varTextLayer.kind = LayerKind.TEXT;
    varTextLayer.textItem.font ="方正舒体";
    varTextLayer.textItem.contents = argString                 ;
    varTextLayer.textItem.size = varTextSize                   ;
    varTextLayer.textItem.kind = TextType.PARAGRAPHTEXT        ;
    varTextLayer.textItem.justification = Justification.LEFT   ;
    var varTextXPos = (argDoc.width - varTextSize ) - (varTextLayer.bounds[2] - varTextLayer.bounds[0]);
    varTextLayer.textItem.position = new Array(varTextXPos , varTextSize + 8 );

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






