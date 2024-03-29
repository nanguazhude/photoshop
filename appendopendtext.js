
//保存文档
function saveFileByName(argDoc,argFileName){
    var jpgFile = new File( argFileName ) ;
    var jpgSaveOptions = new JPEGSaveOptions() ;
    jpgSaveOptions.embedColorProfile = true ;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE ;
    jpgSaveOptions.matte = MatteType.NONE ;
    jpgSaveOptions.quality = 8 ;
    argDoc.saveAs(jpgFile, jpgSaveOptions, true,Extension.LOWERCASE) ;
}

//绘制文字
function putTheText(argDoc,argString){
    var varTextSize = 36 ;
    var varTextLayer = argDoc.artLayers.add();
    varTextLayer.kind = LayerKind.TEXT;
    varTextLayer.textItem.font = "黑体";
    varTextLayer.textItem.contents = argString                 ;
    varTextLayer.textItem.size = varTextSize                   ;
    varTextLayer.textItem.kind = TextType.PARAGRAPHTEXT        ;
    varTextLayer.textItem.justification = Justification.LEFT   ;
    var varTextXPos = (argDoc.width - varTextSize ) - (varTextLayer.bounds[2] - varTextLayer.bounds[0]);
    varTextLayer.textItem.position = new Array(varTextXPos , varTextSize + 8 );
}

//强制将单位改为像素
function doTheApp(varDoc){

    //用于恢复单位状态
    var varR1 = app.preferences.rulerUnits;
    var varR2 = app.preferences.typeUnits ;
    
    try{

        app.preferences.rulerUnits = Units.PIXELS    ;
        app.preferences.typeUnits = TypeUnits.PIXELS ;

        if( varDoc ){
        }else{
            alert("当前文档为空 " ) ;
            return ;
        }

        {
        var varName = varDoc.name  ;
        /*绘制文字*/
        putTheText(varDoc,parseInt(varName,10));
       }
     
       /*保存文档*/
       saveFileByName(varDoc, varDoc.fullName );

       /*关闭文档*/
       varDoc.close(SaveOptions.DONOTSAVECHANGES);

    } catch(e){
        alert(e);
    }
    finally{//恢复默认单位
        app.preferences.typeUnits  = varR2;
        app.preferences.rulerUnits = varR1;
    }

}

{//设置背景色为白色
    var mySolidColor = new SolidColor();
    mySolidColor.rgb.red= 255;
    mySolidColor.rgb.green= 255;
    mySolidColor.rgb.blue= 255;
    app.backgroundColor = mySolidColor ;
}

{//设置背景色为黑色
    var mySolidColor = new SolidColor();
    mySolidColor.rgb.red= 0;
    mySolidColor.rgb.green= 0;
    mySolidColor.rgb.blue= 0;
    app.foregroundColor = mySolidColor ;
}

while( app.documents.length > 0  ) {
    var varDoc = app.documents[0] ;
    app.activeDocument = varDoc ;
    doTheApp( varDoc );
}


// https://www.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-cc-scripting-guide-2019.pdf
// UnitValue(varDoc.width,"px")  ;


