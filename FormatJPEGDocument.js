
var varDoc = app.activeDocument ;
if( varDoc  ){
    varDoc.changeMode( ChangeMode.RGB )              ;
    varDoc.bitsPerChannel = BitsPerChannelType.EIGHT ;
}

