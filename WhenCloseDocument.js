
function createNextFileName( arg){
    var varString = null;
    arg += 1;
    if(arg<10){
        varString = "000" + arg;
    }else if(arg<100){
        varString = "00" + arg;
    }else if(arg<1000){
        varString = "0"+arg;
    }else{
        varString = "" + arg;
    }
    return varString + ".jpg";
}

function saveFileByName(argDoc,argFileName){
    var jpgFile = new File( argFileName ) ;
    var jpgSaveOptions = new JPEGSaveOptions() ;
    jpgSaveOptions.embedColorProfile = true ;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE ;
    jpgSaveOptions.matte = MatteType.NONE ;
    jpgSaveOptions.quality = 8 ;
    argDoc.saveAs(jpgFile, jpgSaveOptions, true,Extension.LOWERCASE) ;
}

function doApp(){
    try{

    var varDoc = app.activeDocument ;

    if(varDoc){
    }else{
        return;
    }
    
    //保存文档
    if(varDoc.saved){
    }else{
        saveFileByName(varDoc,varDoc.fullName);
    }
    
    //下一个文件名
    var varNextFileName = createNextFileName( parseInt(varDoc.name,10) );
    
    

    alert( varNextFileName ); 
    
    //关闭文档
    varDoc.close(SaveOptions.DONOTSAVECHANGES);

}catch(e){
    return;
}

}

doApp()


//https://gitee.com/code_yu/photoshop-javascript
// Presets\Scripts
