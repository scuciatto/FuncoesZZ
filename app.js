/**
 *  Zz.js
 *  Funções ZZ
 *
 *  Created by Felipe Scuciatto Dos Santos on 11/12/11.
 *  Copyright (c) 2011 MobilizeTeam. All rights reserved.
 */

zz = {};
zz.ui = {};
Ti.include('zz/Zz.js');

//TODO: test the platform and include specific files
Ti.include('ui/function.js');
Ti.include('ui/main.js');

zz.tabGroup = Ti.UI.createTabGroup();

zz.theWindow = Ti.UI.createWindow({
    title:'Funções ZZ',
    tabBarHidden:true,
    barColor:'black',
    titleImage:'images_common/title.png'
});

zz.theWindow.add(zz.ui.createMainView());

zz.tab = Ti.UI.createTab({  
    window:zz.theWindow
});

zz.tabGroup.addTab(zz.tab);
zz.tabGroup.open({
    transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
});