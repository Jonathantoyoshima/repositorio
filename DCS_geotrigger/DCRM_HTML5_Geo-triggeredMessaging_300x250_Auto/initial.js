// Setup namespace for ad.
var creative = {};

creative.init = function () {
  creative.setupDOMElements();

  // Check if Enabler is initialized.
  if (Enabler.isInitialized()) {
    // Check if ad is visible to user.
    if (Enabler.isVisible()) {
      creative.enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
        creative.enablerInitHandler);
    }
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT,
        creative.enablerInitHandler);
  }
};

creative.setupDOMElements = function () {
  creative.domElements = {};
  creative.domElements.background = document.getElementById('background');
  creative.domElements.headline = document.getElementById('headline');
  creative.domElements.subline = document.getElementById('subline');
  creative.domElements.button = document.getElementById('button');
  creative.domElements.cta = document.getElementById('cta');
};

creative.enablerInitHandler = function (event) {
  creative.dynamicDataAvailable();
  creative.domElements.button.addEventListener('click', creative.exitClickHandler);
  creative.showAd();

  if (Enabler.isPageLoaded()) {
    creative.pageLoadHandler();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.PAGE_LOADED, creative.pageLoadHandler);
  }
};

creative.dynamicDataAvailable = function () {

  // NOTE: Here starts the pasted section from Studio.

  // Dynamic Content variables and sample values

  Enabler.setProfileId(1026778);
  var devDynamicContent = {};
     devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo= [{}];
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0]._id = 0;
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Background_Image = {};
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Background_Image.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/31686745/dirty/auto_geo_NY.jpg";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Headline = "THE 2014 TORO SEDAN";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Headline_Color = "000000";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Headline_Left = "10px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Headline_Top = "10px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Subline = "0% APR FOR 36 MONTHS";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Subline_Color = "ffffff";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Subline_Left = "10px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Subline_Top = "38px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Button_Image = {};
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Button_Image.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/31683059/dirty/cta_btn_blue.png";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Button_Left = "70px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Button_Bottom = "145px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Text = "FIND A DEALER";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Text_Bottom = "146px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].CTA_Text_Left = "85px";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].IsDefault = false;
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Exit_URL = {};
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].Exit_URL.Url = "http://www.google.com";
    devDynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0].IsActive = true;
    Enabler.setDevDynamicContent(devDynamicContent);
  // NOTE: Here ends the pasted section from Studio.

  // Variable "dynamicContent" gets automatically initialized by Enabler.
  // Change "Travel_Packaged_Solutions_AB" to the name of your dynamic elements.
  creative.dynamicData = dynamicContent.Dynamic_Packaged_Solution__Automotive_Geo[0];

  // Set your dynamic exit url so it can be used in initial.js.
  creative.dynamicExitUrl = creative.dynamicData.Exit_URL.Url;
  creative.domElements.cta.style.visibility = 'hidden';
  creative.domElements.button.style.visibility = 'hidden';

  creative.domElements.subline.style.color = "#" + creative.dynamicData.Subline_Color;
  creative.domElements.subline.style.left = creative.dynamicData.Subline_Left;
  creative.domElements.subline.style.top = creative.dynamicData.Subline_Top;

  creative.domElements.headline.style.color = "#" + creative.dynamicData.Headline_Color;
  creative.domElements.headline.style.left = creative.dynamicData.Headline_Left;
  creative.domElements.headline.style.top = creative.dynamicData.Headline_Top;

  creative.domElements.cta.innerHTML = creative.dynamicData.CTA_Text;
  creative.domElements.cta.style.left = creative.dynamicData.CTA_Text_Left;
  creative.domElements.cta.style.bottom = creative.dynamicData.CTA_Text_Bottom;
  creative.domElements.button.style.left = creative.dynamicData.CTA_Button_Left;
  creative.domElements.button.style.bottom = creative.dynamicData.CTA_Button_Bottom;
};


creative.exitClickHandler = function (event) {
  Enabler.exit('exit', creative.dynamicExitUrl);
};

creative.pageLoadHandler = function (event) {
  creative.domElements.background.src = creative.dynamicData.Background_Image.Url;
  creative.domElements.button.src = creative.dynamicData.CTA_Button_Image.Url;
  creative.domElements.cta.style.visibility = 'visible';
  creative.domElements.button.style.visibility = 'visible';
  creative.domElements.headline.innerHTML = creative.dynamicData.Headline;
  creative.domElements.subline.innerHTML = creative.dynamicData.Subline;
};

// Is triggered when the background image in polite.js was fully loaded.
creative.showAd = function () {
  document.getElementById('content').className = "show";
  document.getElementById('loader').className = "hide";
};

// Start creative once all elements in window are loaded.
window.addEventListener('load', creative.init.bind(creative));
