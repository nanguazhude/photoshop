
function createNextFileName(arg) {
    var varString = null;
    arg += 1; // 改成 -=1 就是寻找上一张图片 ...  
    if (arg < 10) {
        varString = "000" + arg;
    } else if (arg < 100) {
        varString = "00" + arg;
    } else if (arg < 1000) {
        varString = "0" + arg;
    } else {
        varString = "" + arg;
    }
    return varString + ".jpg";
}

function saveFileByName(argDoc, argFileName) {
    var jpgFile = new File(argFileName);
    var jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 8;
    argDoc.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

function doApp() {
    try {

        var varDoc = app.activeDocument;

        if (varDoc) {
        } else {
            return;
        }

        var varThisName  = varDoc.name ;
        var varRootPath  = varDoc.path ;
        var isOpenedNext = false;

        //保存文档
        if (varDoc.saved) {
        } else {
            saveFileByName(varDoc, varDoc.fullName);
        }

        //关闭文档
        varDoc.close(SaveOptions.DONOTSAVECHANGES);
        varDoc = null ;

        //下一个文件名
        var varNextFileName = createNextFileName(parseInt(varThisName, 10));

        {   //寻找在当前文件夹下有无此文件
            var varNextFileFullName = varRootPath + "/" + varNextFileName;
            var varFile = new File(varNextFileFullName);
            if (varFile && varFile.open("r")) {
                varFile.close();
                app.open(varFile);
                isOpenedNext = true;
            }
        }

        if (!isOpenedNext) { 
            var varThisFolder = new Folder(varRootPath).parent;
            var varOpenFiles = null;

            if (varThisFolder) {//寻找在父文件夹下有无此文件
                varOpenFiles = varThisFolder.getFiles(varNextFileName);
                if (varOpenFiles && (varOpenFiles.length > 0)) {
                    app.open(varOpenFiles[0]);
                    isOpenedNext = true;
                } else {        //寻找在父文件夹下的所一级子文件下有无此文件
                    var varNextDirs = varThisFolder.getFiles();
                    for (var varI = 0; varI < varNextDirs.length; ++varI) {
                        var varFolderI = varNextDirs[varI];
                        if (varFolderI instanceof Folder) {
                            varOpenFiles = varFolderI.getFiles(varNextFileName);
                            if (varOpenFiles && (varOpenFiles.length > 0)) {
                                app.open(varOpenFiles[0]);
                                isOpenedNext = true;
                                break;
                            }
                        }
                    }/*for*/
                }/*else*/
            }/*if*/
        }

        //已经完成此序列提示
        if(!isOpenedNext){
            alert("can not find : " + varNextFileName + " finished !!!!");
        }

    } catch (e) {
        return;
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
