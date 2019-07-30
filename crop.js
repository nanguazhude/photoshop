
//打开文档
function openFileByName(argFileName){
    var varFileRef = new File(argFileName);
    return app.open(varFileRef) ;
}

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

//裁剪边框
function cropTheDocument(argDoc,argX,argY,argWidth,argHeight){
    /*left top right bottom  */
    var varBounds = [argX,argY,argWidth+argX,argHeight+argY];
    argDoc.crop(varBounds);
}

//强制将单位改为像素
function doTheApp(argFileName){
    //用于恢复单位状态
    var varR1 = app.preferences.rulerUnits;
    var varR2 = app.preferences.typeUnits ;
    
    try{
        app.preferences.rulerUnits = Units.PIXELS    ;
        app.preferences.typeUnits = TypeUnits.PIXELS ;

        /*打开文档*/
        var varDoc = openFileByName(argFileName) ;

        if( varDoc ){
        }else{
            alert("当前文档为空 " + argFileName) ;
            return ;
        }

        {
        /*计算并应用裁剪*/
        var varDocWidth = varDoc.width.as("px")  ;
        var varDocHeight = varDoc.height.as("px")  ;
        var varTargetWidth = 100 ;
        var varTargetHeight = 600 ;
        var varTargetX = 0;
        var varTargetY = 0;

       if( varDocWidth >  varTargetWidth ){
           varTargetX = varDocWidth - varTargetWidth ;
       } else {
           varTargetWidth = varDocWidth;
       }
      
       if( varDocHeight > varTargetHeight ){
          varTargetY = varDocHeight - varTargetHeight ;
       } else{
           varTargetHeight = varDocHeight;
       }

       cropTheDocument(varDoc,
                       varTargetX,
                       varTargetY,
                       varTargetWidth,
                       varTargetHeight);

       }

       /*保存文档*/
       saveFileByName(varDoc,argFileName);

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

doTheApp("C:/Users/a/Desktop/k/bear1.jpg") ;

// https://www.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-cc-scripting-guide-2019.pdf
// UnitValue(varDoc.width,"px")  ;


