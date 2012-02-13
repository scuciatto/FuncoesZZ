(function () {
           
    /*
     * Function to create the main view of the iPhone interface
     */
    zz.ui.createMainView = function() {    
        var mainView = Ti.UI.createView({
            backgroundImage:'images_common/background.png'
        });
        
        // creating the tableview with the functions
        remoteFuncList = zz.common.getFunctionList(false);
        
        searchField = Titanium.UI.createSearchBar({
            barColor:'white',
            separatorColor:'black'
        });
        
        var funcTable = Ti.UI.createTableView({    
            backgroundColor:'transparent',
            backgroundImage:'images_common/background.png',
            style:Ti.UI.iPhone.TableViewStyle.GROUPED,
            bottom:50,
            search:searchField,
            filterAttribute:'zzfunction',
        });
        
        for (var i = 0; i < remoteFuncList.length; i++) {
            // creating label to tableview
            label = Ti.UI.createLabel({
                text:remoteFuncList[i].command,
                font:{fontSize:14,fontFamily:'Courier',fontWeight:'bold'},
                left:10
            });
            // creating row and adding the label
            line = Ti.UI.createTableViewRow({
                backgroundColor:'white',
                hasChild:true,
                selectedBackgroundColor:'grey',
                zzfunction:remoteFuncList[i].command
            });
            line.add(label);
            
            // add the line to the tableview
            funcTable.appendRow(line);
        }
        
        // creating the iAd banner
        var ad = Titanium.UI.iOS.createAdView({
            bottom:-365,
            visible:true,
            width:'auto'
        });
        mainView.add(ad);
        mainView.add(funcTable);
        
        // taking the garbage out
        remoteFuncList = null;
        
        // adding event to table lines
        funcTable.addEventListener('click', function(e) {           
           var funcWin = Ti.UI.createWindow({
               tabBarHidden:true,
               barColor:'black',
               titleImage:'images_common/title.png'
               
           });
           funcWin.add(zz.ui.createWindowFunction(e.rowData.zzfunction));
           zz.theWindow.janela = funcWin;
           zz.tabGroup.activeTab.open(funcWin, {animated:true});
        });
     
        return mainView;
    }
})();