//scene Dimensions in meters

var mySceneTLX;
var mySceneTLY;
var mySceneBRX;
var mySceneBRY;
var mySceneW;
var mySceneH;
var mySceneCenterX;
var mySceneCenterY;

//table object

var myObject;
var myImage;
var myMirror;
var myPrincipleLine;
var myRayThroughCenter;
var myRefRayThroughCenter;
var myRayParallelToPrincipleLine;
var myRefRayThroughFocusPoint;
var dottedRayViaCenter;
var dottedRayViaFocus;
var dottedLineCreated;

//Object Variable
var myObjHeight;
var myObjPositionX1;
var myObjPositionY1;
var myObjPositionX2;
var myObjPositionY2;


//ImageObjects
var myImgHeight;
var myImgPositionX1;
var myImgPositionY1;
var myImgPositionX2;
var myImgPositionY2;
var myImageType;
var myImageOrientation;

//Mirror Objects
var myMirrorVertexX;
var myMirrorVertexY;
var myMirrorCenterX;
var myMirrorCenterY;
var myMirrorFocalPointX;
var myMirrorFocalPointY;
var myMirrorFocalLength;
var myMirrorRadius;


//Principle  Axis
var princepleAxisStartX;
var princpleAxisStartY;
var principleAxisEndX;
var principleAxisEndY;

//gui control objects

var ObjectPosX;
var ObjectPosY;
var ObjectHeight;
var ObjectdefaultPosX;
var ObjectdefaultPosY;
var ObjectDefaultHeight;
var ObjectMinPositionX;
var ObjectMaxPositionX;
var ObjectMinHeight;
var ObjectMaxHeight;
var ObjectXPositionStep;
var ObjectHeightStep;


var ImageType;
var ImagePosX;
var ImageHeight;
var ImageOrientation;
//handle x positions slider
function handleX(newValue) {
    myObjPositionX2=myObjPositionX1=newValue;
    myObject.position.set(myObjPositionX2, myObjPositionY1, 0);


    dynamicChange();

    PIErender();
}

function dynamicChange()
{
    var x1 = getPositionOfInterSectionX(myObjPositionY2);
    myRayParallelToPrincipleLine.setLength(Math.abs(Math.abs(myObjPositionX2) - Math.abs(x1)));
    myRayParallelToPrincipleLine.position.set(myObjPositionX2, myObjPositionY2, 0);

    var source =new THREE.Vector3(x1, myObjPositionY2, 0);
    var target=new THREE.Vector3(myMirrorFocalPointX,myMirrorFocalPointY,0);
    var direction=new THREE.Vector3().subVectors(target,source);
    myRefRayThroughFocusPoint.setDirection(direction.clone().normalize());
    myRefRayThroughFocusPoint.position.set(x1, myObjPositionY2, 0);
    myRefRayThroughFocusPoint.setLength(14,0.5,0.2);

    var source =new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var target=new THREE.Vector3(myMirrorCenterX,myMirrorCenterY,0);
    var direction=new THREE.Vector3().subVectors(target,source);
    myRayThroughCenter.setDirection(direction.clone().normalize());
    myRayThroughCenter.position.set(myObjPositionX2, myObjPositionY2, 0);
    myRayThroughCenter.setLength(14,0.5,0.2);
    var x2 = intersectionByCircle();
    console.log("x2222222222:"+x2);
    var source =new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var target=new THREE.Vector3(x2[0],x2[1],0);
    var direction=new THREE.Vector3().subVectors(target,source);
    myRefRayThroughCenter.setDirection(direction.clone().normalize());
    //myRefRayThroughCenter.setLength(Math.sqrt(Math.pow(x2[0]-myObjPositionX2,2)+Math.pow(x2[1]-myObjPositionY2),2));
    myRefRayThroughCenter.position.set(myObjPositionX2, myObjPositionY2, 0);
    //var d=Math.sqrt(Math.pow(x2[0]-myObjPositionX2,2)+Math.pow(x2[1]-myObjPositionY2),2);
    myRefRayThroughCenter.setLength(0,0,0);
    // myImgPositionX1=myImgPositionX2=getPositionOfImageX();
    // myImgPositionY2=getHeightOfImageY(myImgPositionX1);
    var x11 = twoLineIntersectionPoint(x1);
    var source =new THREE.Vector3(x11[0], 0, 0);
    var target=new THREE.Vector3(x11[0],x11[1],0);
    var direction=new THREE.Vector3().subVectors(target,source);
    myImage.setDirection(direction.clone().normalize());
    myImage.position.set(x11[0], 0, 0);
    myImage.setLength(Math.abs(x11[1]));
    //  var x2=getPositionOfInterSectionX(myImgPositionY2);
    //myRefRayThroughCenter.setLength(Math.sqrt(Math.pow(x2[0]-myObjPositionX2,2)+Math.pow(x2[1]-myObjPositionY2),2));
    if(myObjPositionX2>myMirrorFocalPointX)
    {
        var source =new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
        var target=new THREE.Vector3(x11[0],x11[1],0);
        var direction=new THREE.Vector3().subVectors(target,source);
        // if(!dottedLineCreated)
        //     dottedRayViaCenter=new THREE.ArrowHelper(direction.clone().normalize(),source,direction.length(),0xfafaaf,0.1,0.1);
        // else
        dottedRayViaCenter.setDirection(direction.clone().normalize());
        dottedRayViaCenter.position.set(myObjPositionX2,myObjPositionY2,0);

        dottedRayViaCenter.setLength(10,0,0);
        var source =new THREE.Vector3(x1, myObjPositionY2, 0);
        var target=new THREE.Vector3(x11[0],x11[1],0);
        var direction=new THREE.Vector3().subVectors(target,source);
        // if(!dottedLineCreated)
        //     dottedRayViaFocus=new THREE.ArrowHelper(direction.clone().normalize(),source,direction.length(),0xfafaaf,0.1,0.1);
        // else
        dottedRayViaFocus.setDirection(direction.clone().normalize());
        dottedRayViaFocus.position.set(x1,myObjPositionY2,0);
        dottedRayViaFocus.setLength(10,0,0);


        // // dottedLineCreated=true;
        // dottedRayViaCenter.setLength(10);
        // dottedRayViaFocus.setLength(10);
    }
    else {
        //if(dottedLineCreated) {


        dottedRayViaCenter.setLength(0);
        dottedRayViaFocus.setLength(0);
        // }
    }
}
function handleH(newValue) {
    myObjPositionY2=newValue;
    myObject.setLength(Math.abs(myObjPositionY2));
    myObjHeight=Math.abs(myObjPositionY2);
    myObject.position.set(myObjPositionX2,myObjPositionY1,0);
   dynamicChange();
    PIErender();
}

function initialiseControlVariables() {
    ObjectPosX="u";

    ObjectHeight="oh";
    ObjectdefaultPosX=-1;
    ObjectdefaultPosY=0;
    ObjectDefaultHeight=0.5;
    ObjectMinHeight=0.5;
    ObjectMaxHeight=1.5;
    ObjectXPositionStep=0.5;
    ObjectHeightStep=0.1;
    ObjectMinPositionX=-6;
    ObjectMaxPositionX=-1.0;
    // myImgPositionX1=NaN;
    // myImgPositionX2=myImgPositionX1;
    // myImgPositionY1=0;
    // myImgPositionY2=NaN;
    // myImgHeight=undefined;
    // myImageType=undefined;
    // myImageOrientation=undefined;
    // ImagePosX="IX";
    // ImageHeight="IH";
    // ImageOrientation="IO";
    // ImageType="IT";

}

function  initialiseControls() {
    initialiseControlVariables();
    PIEaddInputSlider(ObjectPosX,ObjectdefaultPosX,handleX,ObjectMinPositionX,ObjectMaxPositionX,ObjectXPositionStep);
    PIEaddInputSlider(ObjectHeight,ObjectDefaultHeight,handleH,ObjectMinHeight,ObjectMaxHeight,ObjectHeightStep);

    PIEaddDisplayText(ObjectPosX,ObjectdefaultPosX);
    PIEaddDisplayText(ObjectHeight,ObjectDefaultHeight);

    // PIEaddDisplayText(ImagePosX,myImgPositionX1);
    // PIEaddDisplayText(ImageHeight,myImgHeight);
    // PIEaddDisplayText(ImageOrientation,myImageOrientation);
    // PIEaddDisplayText(ImageType,myImageType);
}

var helpContent;
function initialiseHelp() {
    helpContent="";
    helpContent = helpContent + "<h2>Image Formation By Concave Mirror experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a object on principle axis which is movable and shrinkable on principle axis  .</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top right of window  has animation controls.</p>";
    helpContent=helpContent + "<p>  You have access to two sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>u&nbsp;&nbsp;:&nbsp;Controls the X position of the object on principle axis.</li>";
    helpContent = helpContent + "<li>oh&nbsp;&nbsp;:&nbsp;Controls the Y height of the object from principle axis.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>After sliding the controls as soon as you stop sliding you will get the desired image formed.</p>";
    helpContent = helpContent + "<p>You can keep changing both controls and see desired result.</p>";
    helpContent = helpContent + "<h3 style='font-weight: bold;'> Do not  to press any other  button showed on the page like start and left shift and right shift.</h3>";

    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
    infoContent =  "";
    infoContent = infoContent + "<h2>Image Formation By Concave Mirror concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows  a how Images are affected when object moves on principle axis.</p>";
    infoContent = infoContent + "<h3>Image Formation</h3>";
    infoContent = infoContent + "<p>Two small circle on principle axis Represents Mirror's Center and focalpoint </p>";

    infoContent = infoContent + "<p>When a ray  passed from top of object parallel to principle axis after reflection it Returns through Focus  Point of Concave Mirror.</p>";
    infoContent = infoContent + "<p>When a another ray pass through center of mirror from top of object after reflection it returns on same path.</p>";
    infoContent = infoContent + "<p>Where these two rays intersect each other image is formed.</p>";
    infoContent = infoContent + "<p>If image formed is below Principle axis it is called real image and it's also reverse in orientation.</p>";
    infoContent = infoContent + "<p>If image formed is above the principle axis it is called virtual image and it's orientation is same as object .</p>";
    PIEupdateInfo(infoContent);
}

function initialiseScene() {

    mySceneTLX=-7;
    mySceneTLY=7;
    mySceneBRX=7;
    mySceneBRY=-7;
    mySceneW=mySceneBRX-mySceneTLX;
    mySceneH=mySceneTLY-mySceneTLX;


    mySceneCenterX=(mySceneTLX+mySceneBRX)/2.0;
    mySceneCenterY=(mySceneTLY+mySceneBRY)/2.0;
}


function initialiseOtherVariables() {
    princepleAxisStartX=-12;
    princpleAxisStartY=0;
    principleAxisEndX=12;
    principleAxisEndY=0;

    dottedLineCreated=false;
    myObjPositionX1=-1;
    myObjPositionY1=0;
    myObjPositionX2=myObjPositionX1;
    myObjPositionY2=0.6;
    myObjHeight=myObjPositionY2-myObjPositionY1;
    myMirrorCenterX=-5.0;
    myMirrorCenterY=0.0;
    myMirrorRadius=5.0;
    myMirrorFocalPointX=myMirrorCenterX/2.0;
    myMirrorFocalPointY=myMirrorCenterY/2.0;
    myMirrorFocalLength=myMirrorRadius/2.0;
}

function getPositionOfInterSectionX(y1) {
    var x1;
    var b=Math.sqrt(Math.pow(myMirrorRadius,2)-Math.pow(y1,2));
    if(b<5)
    x1=b-5;
    else
        x1=-b-5;
    return x1;
}

function twoLineIntersectionPoint(x1)
{var x,y;
    console.log("mymirrorcenterxInfunction:"+myMirrorCenterX);

    var cm=(myMirrorCenterY-myObjPositionY2)/(myMirrorCenterX-myObjPositionX2);
    var fm=(myMirrorFocalPointY-myObjPositionY2)/(myMirrorFocalPointX-x1);
    console.log("cm"+cm);
    console.log("fm"+fm);
    console.log("x1"+x1);
    if(myMirrorCenterX!=myObjPositionX2){
         x=(fm*myMirrorFocalPointX-cm*myMirrorCenterX)/(fm-cm);
         y=cm*(x-myMirrorCenterX);
    }
    else
    {
        x=myMirrorCenterX;
        y=(x-myMirrorFocalPointX)*fm;
    }
   console.log("x"+x);
    console.log("y"+y);

    return[x,y];

}

function getPositionOfInterSectionY(x) {
    var b=Math.sqrt(Math.pow(myMirrorRadius,2)-Math.pow(x+myMirrorRadius,2));

    return -b;
}

function getPositionOfImageX() {
    return (myMirrorFocalPointX*myObjPositionX1)/(myObjPositionX1-myMirrorFocalPointX);
}

function getHeightOfImageY(x1) {
    return -myObjHeight*x1/myObjPositionX1;
}
function intersectionByCircle() {
    var cm=(myMirrorCenterY-myObjPositionY2)/(myMirrorCenterX-myObjPositionX2);
    if(myMirrorCenterX==myObjPositionX2)
        return [myMirrorCenterX,myMirrorCenterY+myMirrorRadius]
    else {
        console.log("mirrorcebtery"+myMirrorCenterY);
        console.log("myobjpositiony2"+myObjPositionY2);
        console.log("mymirror center x"+myMirrorCenterX);
        console.log("mymirror positionx2"+myObjPositionX2);
        var x, y;
        var d1=Math.pow((-2 * myMirrorCenterX * cm + 10), 2);
        var d2=4 * (1 + cm) * cm * Math.pow(myMirrorCenterX, 2);
        console.log("d1-d2:"+(d1-d2));
        var d ;

        d= Math.sqrt(d1-d2);
        console.log("Math.pow(2*myMirrorCenterX*cm+10,2)" + Math.pow(-2 * myMirrorCenterX * cm + 10, 2));
        console.log("4*(1+cm)*cm*Math.pow(myMirrorCenterX,2)" + 4 * (1 + cm) * cm * Math.pow(myMirrorCenterX, 2));
        var r1 = (-(-2 * myMirrorCenterX * cm +10) + d) / (2 * (1 + cm));
        var r2 = (-(-2 * myMirrorCenterX * cm+10) - d) / (2 * (1 + cm));
        if (myObjPositionX2>myMirrorCenterX)
            x = r2>r1?r2:r1;
        else
            x = r2>r1?r1:r2;

        console.log("dddd" + d);
        y = cm * (x - myMirrorCenterX);
        console.log("cmmmmmm" + cm);
        console.log("xMmmmm" + x);
        console.log("ymmmmm" + y);
        return [x, y];

    }
}
function loadExperimentElements() {
    PIEsetExperimentTitle("Image Formation By Concave Mirror");
    PIEsetDeveloperName("Kamlesh Kumar");
    PIEhideControlElement();
    initialiseHelp();
    initialiseInfo();
    initialiseScene();
    initialiseOtherVariables();
    //Mirror center
    var curve = new THREE.EllipseCurve(
        myMirrorCenterX,  myMirrorCenterY,            // ax, aY
        0.1, 0.1,           // xRadius, yRadius
        0,   Math.PI*2,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    var path = new THREE.Path(curve.getPoints(50000));
    var geometry = path.createPointsGeometry(50000);
    var material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
    // Create the final object to add to the scene
    var center = new THREE.Line( geometry, material );
    // myMirror.position.set(myMirrorCenterX,myMirrorCenterY,0);
    PIEaddElement(center);
    //mirror focus point
    var curve = new THREE.EllipseCurve(
        myMirrorFocalPointX,  myMirrorFocalPointY,            // ax, aY
        0.1, 0.1,           // xRadius, yRadius
        0,   Math.PI*2,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    var path = new THREE.Path(curve.getPoints(50000));
    var geometry = path.createPointsGeometry(50000);
    var material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
    // Create the final object to add to the scene
    var focus = new THREE.Line( geometry, material );
    // myMirror.position.set(myMirrorCenterX,myMirrorCenterY,0);
    PIEaddElement(focus);
    //Mirror
    var curve = new THREE.EllipseCurve(
        myMirrorCenterX,  myMirrorCenterY,            // ax, aY
        myMirrorRadius, myMirrorRadius,           // xRadius, yRadius
        -Math.PI/4.0,   Math.PI/4.0,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    var path = new THREE.Path(curve.getPoints(50000));
    var geometry = path.createPointsGeometry(50000);
    var material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
    // Create the final object to add to the scene
    myMirror = new THREE.Line( geometry, material );
    //myMirror.position.set(myMirrorCenterX,myMirrorCenterY,0);
    PIEaddElement(myMirror);
    // Principle Axis
    var princMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    var princGeometry = new THREE.Geometry();
    princGeometry.vertices.push(
        new THREE.Vector3(princepleAxisStartX, princpleAxisStartY, 0 ),
        new THREE.Vector3( principleAxisEndX, principleAxisEndY, 0 )
    );
    myPrincipleLine = new THREE.Line( princGeometry, princMaterial );
    PIEaddElement(myPrincipleLine);
    //Object
    var sourcePos = new THREE.Vector3(myObjPositionX1, myObjPositionY1, 0);
    var targetPos = new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myObject = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0xFAF5F5,0.5,0.2);
    PIEaddElement(myObject);
    //Incoming Ray  Parallel to the Principle Axis After Reflection It Goes by Focal Point
    var sourcePos = new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var x=getPositionOfInterSectionX(myObjPositionY2);
    var targetPos = new THREE.Vector3(x,myObjPositionY2,0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myRayParallelToPrincipleLine = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0xFA0A1A);
    PIEaddElement(myRayParallelToPrincipleLine);
    //Incoming Ray After Reflection From Mirror
    var sourcePos = new THREE.Vector3(x, myObjPositionY2, 0);
    var targetPos = new THREE.Vector3(myMirrorFocalPointX, myMirrorFocalPointY, 0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myRefRayThroughFocusPoint = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, 10, 0xFA0A1A);
    PIEaddElement(myRefRayThroughFocusPoint);
    //Incoming ray through center point
    var sourcePos = new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var targetPos = new THREE.Vector3(myMirrorCenterX, myMirrorCenterY, 0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myRayThroughCenter = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, myMirrorRadius, 0x00ff00);
    PIEaddElement(myRayThroughCenter);
    // reflection From mirror
    var x1=intersectionByCircle();
    console.log("x1111111"+x1);
    var sourcePos = new THREE.Vector3(myObjPositionX2,myObjPositionY2, 0);
    var targetPos = new THREE.Vector3(x1[0],x1[1], 0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myRefRayThroughCenter = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, 0, 0x00ff00);
    PIEaddElement(myRefRayThroughCenter);
    //Image
   var x11=twoLineIntersectionPoint(x);
    console.log(x11);
    var sourcePos = new THREE.Vector3(x11[0],0, 0);
    var targetPos = new THREE.Vector3(x11[0],x11[1], 0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myImage= new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0xFAF5F5,0.5,0.2);

    PIEaddElement(myImage);
   if(myObjPositionX1>myMirrorFocalPointX)
   {

       var sourcePos = new THREE.Vector3(myObjPositionX2,myObjPositionY2, 0);
       var targetPos = new THREE.Vector3(x11[0],x11[1], 0);
       var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
       dottedRayViaCenter= new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, 10, 0x978d9b,0,0);
       PIEaddElement(dottedRayViaCenter);


       var sourcePos = new THREE.Vector3(x,myObjPositionY2, 0);
       var targetPos = new THREE.Vector3(x11[0],x11[1], 0);
       var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
       dottedRayViaFocus= new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, 10, 0x978d9b,0,0);
       PIEaddElement(dottedRayViaFocus);
   }

    initialiseControlVariables();
    initialiseControls();
    resetExperiment();
    PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);

}

function resetExperiment() {
    //initialise Other Variables
    initialiseOtherVariables();
    myObject.position.set(myObjPositionX1,myObjPositionY1,0.0);

}
function updateExperimentElements(t,dt) {

    PIEchangeDisplayText(ObjectPosX,myObjPositionX1);
    PIEchangeDisplayText(ObjectPosY,myObjPositionY1);
    PIEchangeDisplayText(ObjectHeight,myObjPositionY2);



}