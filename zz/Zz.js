/**
 *  Zz.js
 *  Funções ZZ
 *
 *  Created by Felipe Scuciatto Dos Santos on 11/12/11.
 *  Copyright (c) 2011 MobilizeTeam. All rights reserved.
 */

(function () {
    zz.common = {}
       
    zz.common.remoteClient = Titanium.Network.createHTTPClient();
    zz.common.baseUrl = 'http://zz.mobilizeteam.com/api/?';
    zz.common.functionList = new Array();
    
    zz.common.hasIntertConnection = function(shouldAlert) {
        if (Ti.Network.networkType == Ti.Network.NETWORK_NONE) {
            if (shouldAlert) {
                var alertDialog = Titanium.UI.createAlertDialog({
                        title: 'Internet',  
                        message: 'Para utilizar todos os recursos das Funções ZZ, é necessário uma conexão com a Internet',
                        buttonNames: ['OK']
                });
                alertDialog.show();
            }
            return false;
        }
        else {
            return true;
        }
    } 
    
    zz.common.getFunctionList = function(shouldReload) {
       if (zz.common.hasIntertConnection(true)) {       
           if (shouldReload || zz.common.functionList.length === 0) {
               zz.common.remoteClient.open('GET',zz.common.baseUrl+'zzfunc=getComandos', false);     
               var functionListToArray = '';
               zz.common.remoteClient.onload = function() {
                 functionListToArray = eval('('+this.responseText+')');             
               };
               zz.common.remoteClient.send();
           }
           return functionListToArray;
       }
    }
       
    zz.common.executeFunction = function(zzfunction, arguments) {
        if (zzfunction) {
            if (zz.common.hasIntertConnection(true)) {
                zz.common.remoteClient.open('GET',zz.common.baseUrl+'zzfunc='+zzfunction+'&arguments='+encodeURIComponent(arguments), false);
                var returnValue = '';
                zz.common.remoteClient.onload = function() {
                    returnValue = this.responseText;
                }
                zz.common.remoteClient.send();
                zz.common.remoteCliente = null;
                
                return returnValue;
            }
        }
    }
})();