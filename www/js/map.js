

//BING MAPS API
//https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/pushpin-class

var map;

//test vars <- should be retriev automatically via gps 
// set test to true if you dont want to use gps
var isTest = true; 

//Seattle
//var Latitude = 47.603561;
//var Longitude = -122.329437;

//Krakow
var Latitude = 50.057870;
var Longitude = 19.939025;

var tag = 'wallpaper,outdoor,nature,landscape,scenery,view,sight,city';
var privacy = 1;
var safe = 1;
var content = 3;
var context = 1;

//API KEYS - DO NOT COMMITTTTTT!!!!!!!!!!!!!!


var bing = 'ask Piotr';
var flickr = 'ask Piotr';


//load map and set api settings
function loadMap() {
        var mapScriptUrl = 'https://www.bing.com/api/maps/mapcontrol?callback=GetMap%key=' + bing;
        var script = document.createElement("script");
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", mapScriptUrl);
        document.body.appendChild(script);
        GetMap();
}


//call API with specified settings
function GetMap(){

    try{
         map = new  Microsoft.Maps.Map(document.getElementById("mappp"),
         { 
            credentials: bing,
            mapTypeId:  Microsoft.Maps.MapTypeId.road,
            enableClickableLogo: false,
            enableSearchLogo: false,
            center: new  Microsoft.Maps.Location(Latitude, Longitude),
            zoom: 10,
            theme: new  Microsoft.Maps.Themes.BingTheme()
         }); 

        var center = map.getCenter();

        var pin = new Microsoft.Maps.Pushpin(center, {
            title: 'Microsoft',
            subTitle: 'City Center',
            text: '1'
        });

        map.entities.push(pin);

        console.log(map);

     } catch(Ex){

        if(typeof(Microsoft)=='undefined' || Ex.message=="'Microsoft' is undefined" || 'undefined')
                setTimeout('GetMap()',1000);
        else
        alert(Ex.Message);
    }    
}



//FLICKR API
// Get geo coordinates - teporary disabled in order to be able to check func in browser
function getPicturesLocation() {

    navigator.geolocation.getCurrentPosition(onPicturesSuccess, onPicturesError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates


var onPicturesSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getPictures(Latitude, Longitude);
}

// Error callback

function onPicturesError(error) {

    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


function triggPhoto(){

    if(isTest){
      getPictures(Latitude, Longitude);
    } else {
      getPicturesLocation();
    }  
}

// Get pictures by using coordinates
function getPictures(latitude, longitude) {

    console.log('clicked pictures');
    $('#pictures').empty();

    var queryString =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+flickr+"&lat="
    + latitude + "&lon=" + longitude + "&format=json&jsoncallback=?" + "&tags=" + tag + "&privacy_filter=" + privacy + "&safe_search=" + safe
	+ "&content_type" + content + "&geo_context" + context;

    $.getJSON(queryString, function (results) {
        $.each(results.photos.photo, function (index, item) {

            var photoURL = "http://farm" + item.farm + ".static.flickr.com/" +
                item.server + "/" + item.id + "_" + item.secret + ".jpg";
            $('#pictures').append("<div><img src=" + photoURL+"><a onclick=downloadPic(" + '\'' + photoURL +  '\',' + false + ") class='ui-btn ui-btn-b ui-corner-all'>Download</a><a onclick=downloadPic(" + '\'' + photoURL +  '\',' + true + ") class='ui-btn ui-btn-b ui-corner-all'>Set as Wallpaper</a></div>");

           });
        }
    );
}




//'Validate URL and trigger function'

function downloadPic(url, setWallPaper){
  console.log('URL is:' + url);

  var success = function(msg){

    if(!setWallPaper){

      console.info(msg);
      console.log('jestem success');
      $("#on_success").popup("open");

    } else {

      console.info(msg);
      console.log('jestem success tapeta');
      $("#on_success_wall").popup("open");
    }  
  };

  var error = function(err){

      if(!setWallPaper){

        console.error(err);
        console.log('jestem error');
        $("#on_fail").popup("open");

      } else {
        console.info(err);
        console.log('jestem error tapeta');
        $("#on_fail_wall").popup("open");
      }  
  };

  saveImageToPhone(url, setWallPaper, success, error);
}


//Convert image to base 64 and save on device or
//convert to base 64, save and set as paperwall 
//possible 3rd button to prevent saving picture on device
function saveImageToPhone(url, setWallPaper, success, error) {

  var canvas, context, imageDataUrl, imageData;
  var img = new Image();

  img.onload = function() {
    canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);

    try {
        imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
        console.log('image data URL' + imageDataUrl);
        imageData = imageDataUrl.replace("data:image\/jpeg;base64,", '');

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0);
        console.log('image data ' + imageData);

        cordova.exec(
            success,
            error,
            'Canvas2ImagePlugin',
            'saveImageDataToLibrary',
            [imageData]
        );

        if(setWallPaper){
          window.plugins.wallpaper.setImageBase64(imageData);
        }

    } catch(e) {
        error('E1' + e.message);
    }
  };

  try {
      img.src = url;
  }catch(e) {
      error('E3' + e.message);
  }
}



// Success callback for watching your changing position possible to set proposition to user to download new files
/*
var onPicturesWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getPictures(updatedLatitude, updatedLongitude);
    }
}



// Watch your changing position

function watchPicturePosition() {

    return navigator.geolocation.watchPosition
    (onPicturesWatchSuccess, onPicturesError, { enableHighAccuracy: true });
}





// additional functions to save file 
// can be deleted if not neded before riching master branch

function dowloadFile(url){

  var blob = null;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
  xhr.onload = function()
  {
      blob = xhr.response;//xhr.response is now a blob object
      console.log(blob);
      var storageLocation = 'file:///storage/emulated/0/';


     var folderpath = storageLocation + "Download";
     var filename = "Myimg.jpg";
     var DataBlob = blob;
      window.resolveLocalFileSystemURL(folderpath, function(dir) {
        dir.getFile(filename, {create:true}, function(file) {
                file.createWriter(function(fileWriter) {
                    fileWriter.write(DataBlob);
                    //Download was succesfull
                }, function(err){
                  // failed
                  console.log(err);
                });
        });
      });
  }
  xhr.send();
}


function onSuccess(fileSystem) {
    console.log(fileSystem.name);
}


function dowloadFile(url){

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

function fileSystemSuccess(fileSystem) {

    Folder_Name = 'PicTUUUUUUUUU';
    File_Name = url.substring(url.lastIndexOf('/'), url.lastIndexOf('.'));
    var download_link = encodeURI(url);
    console.log('down link: ' + download_link);
    ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    console.log('rootdir' + rootdir);
    var fp = rootdir.toURL();  // Returns Fulpath of local directory
    console.log('fp' + fp);
    fp =  fp + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
    //fp = '/PK/Pic/' + File_Name + "." + ext;
    // download function call
    filetransfer(download_link, fp);
}

function onDirectorySuccess(parent) {
    // Directory created successfuly
}

function onDirectoryFail(error) {
    //Error while creating directory
    alert("Unable to create new directory: " + error.code);
}

  function fileSystemFail(evt) {
    //Unable to access file system
    alert(evt.target.error.code);
 }
}


function filetransfer(download_link, fp) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path
fileTransfer.download(download_link, fp,
                    function (entry) {
                        console.log(entry);
                        alert("download complete: " + entry.fullPath);
                        window.scanmedia.scanFile(fp, function (msg) {
                                    alert("Success ScanMedia");
                                }, function (err) {
                                    alert("Fail ScanMedia: " + err);
                                })
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                     alert("download error target " + error.target);// target //Pictures/test111.jpg
                     alert("upload error code" + error.code); // code 1
                 }
            );
}
*/