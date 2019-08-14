
function doApp(){

    //{/* 进行备份 ... */
    //    var jpgFile       = varDoc.fullName ;
    //    var varBackFile   = new File( Folder.temp + "/" + jpgFile.name ) ;
    //    var varLastObject = new ActionDescriptor() ;
    //    varLastObject.putPath(1 , jpgFile );
    //    varLastObject.putPath(2 , varBackFile );
    //    app.putCustomOptions("savedDataZ",varLastObject,true);
    //    jpgFile.copy( varBackFile );
    //}

    var varLastObject = app.getCustomOptions("savedDataZ");
    if( varLastObject ){
        jpgFile     = varLastObject.getPath( 1 );
        varBackFile = varLastObject.getPath( 2 );
        varBackFile.copy( jpgFile );
        app.open( jpgFile );
    }

}


doApp()

//设置快捷键：
// C:/Program Files/Adobe/Adobe Photoshop CC 2018/Presets/Scripts
// https://forums.adobe.com/thread/1966460

//https://gitee.com/code_yu/photoshop-javascript

// https://forums.adobe.com/thread/1246514

//C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CC\SDK

// File and Folder Help :
// https://estk.aenhancers.com/3%20-%20File%20System%20Access/folder-object.html
// https://estk.aenhancers.com/3%20-%20File%20System%20Access/using-file-and-folder-objects.html



