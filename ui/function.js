(function () {
    
    zz.ui.createWindowFunction = function(zzfunction) {
        
        var functionView = Ti.UI.createView({
            backgroundImage:'images_common/background.png',
        });
        
        var actionInd = Ti.UI.createActivityIndicator({
            style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAI,
            height:50,
            width:10,
            visible:true
        })
        
        var actionView = Ti.UI.createView({
            width:130,
            height:50,
            backgroundColor:'gray',
            opacity:0.7,
            borderRadius:5,
            visible:false
        });
        actionView.add(actionInd);
        
        // Creating the text output to show the functions results
        textOutput = Ti.UI.createTextArea({
            backgroundColor:'white',
            borderRadius:5,
            borderColor:'#cccccc',
            editable:false,
            touchEnabled:true,
            height:250,
            width:300,
            top:5,
            font:{fontSize:12,fontFamily:'Courier'},
            value:zz.common.executeFunction(zzfunction,'--help')
        });
        
        functionLabel = Ti.UI.createLabel({
            text:zzfunction,
            font:{fontSize:14,fontFamily:'Courier',fontWeight:'bold'},
            color:'#999999',
            top:130,
            left:11
        });
        
        // Creating the field for the arguments
        functionArguments = Ti.UI.createTextField({
            hintText:'argumentos da função',
            height:30,
            width:300,
            top:281,
            borderWidth:1,
            borderRadius:5,
            borderColor:'#cccccc',
            backgroundColor:'white',
            font:{fontSize:14,fontFamily:'Courier',fontWeight:'bold'},
            paddingLeft:5,
            clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
            autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
        });
        
        // The field should go up on focus
        functionArguments.addEventListener('focus', function(e) {
            textOutput.animate(Titanium.UI.createAnimation({top:-600}));
            functionLabel.animate(Titanium.UI.createAnimation({top:30}));
            functionArguments.animate(Titanium.UI.createAnimation({top:60}));
        });
        
        //  The field should return after you're ok
        functionArguments.addEventListener('return', function(e) {
            textOutput.animate(Titanium.UI.createAnimation({top:5}));
            functionLabel.animate(Titanium.UI.createAnimation({top:130}));
            functionArguments.animate(Titanium.UI.createAnimation({top:281}));
            executeButton.fireEvent('click');
        });
        
        // creating the button to execute the function with arguments
        executeButton = Ti.UI.createButton({
            title:'Executar',
            height:40,
            width:100,
            top:323,
            color:'black',
            font:{fontSize:14,fontFamily:'Courier',fontWeight:'bold'},
         });
        
        // the button should execute de function with the parameters
        executeButton.addEventListener('click', function(e) {
            actionView.show();
            textOutput.setValue(zz.common.executeFunction(zzfunction, functionArguments.value));
            
            // creating the send by email button in the top of the window
            var btSend = Ti.UI.createButton({
                systemButton: Titanium.UI.iPhone.SystemButton.ACTION
            }); 
            
            
            btSend.addEventListener('click', function(e) {
                var mailWindow = Ti.UI.createEmailDialog({
                   subject:'Resultado de função '+zzfunction,
                   barColor:'black',
                   messageBody:'A seguinte função foi executada no aplicativo FunçõesZZ para iPhone\n\n'+
                               zzfunction+' '+functionArguments.value+'\n'+
                               '\n Resultado:\n\n'+textOutput.value+'\n\n'+
                               'Funções ZZ, disponível gratuitamente na App Store'
                });
                mailWindow.open();
                
            });
            zz.theWindow.janela.rightNavButton = btSend;
            actionView.hide();
        });
        
        // creating the iAd banner 
        var ad = Ti.UI.iOS.createAdView({
            bottom:-365,
            visible:true,
            width:'auto'
        });
                
        // adding all together
        functionView.add(ad);
        functionView.add(textOutput);
        functionView.add(functionArguments);
        functionView.add(executeButton);
        functionView.add(functionLabel);
        functionView.add(actionView);
        
        
        
        // if it shakes, the user wants (at least I guess so) to clean the output
        Ti.Gesture.addEventListener('shake',function(e) {
            var dialog = Titanium.UI.createOptionDialog({
                title: 'Limpar o conteúdo da tela de saída?',
                options: ['Sim','Não'],
                cancel:1
            });
            dialog.show();
            
            dialog.addEventListener('click', function(e) {
                if (e.index === 0) {
                    textOutput.setValue('');
                }
            });
        });
        return functionView;
    };
})();