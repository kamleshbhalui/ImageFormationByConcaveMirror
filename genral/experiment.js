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
var myRayThroughFocusPoint;
var myRefRayParallelToPrincipleLine;
var myRayParallelToPrincipleLine;
var myRefRayThroughFocusPoint;
var dottedRefRayParallelToPrincipleAxis;
var dottedRefRayThroughVertex;

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



//Dragging the Objects

function myObjectsDrag(element,newpos) {
    myObjPositionX1=newpos.x;
    if(newpos.x>=princepleAxisStartX&&newpos.x<=myMirrorVertexX)
        myObjPositionX1=newpos.x;
    else
        myObjPositionX1=myMirrorCenterX;
    myObject.position.set(myObjPositionX1,0,0);
}


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
    myObjPositionX1=newValue;
    myObject.position.set(myObjPositionX1,0,0);
    PIErender();
}

function handleY(newValue) {
    myObjPositionY1=newValue;
    myObject.position.set(myObjPositionX1,myObjPositionY1,0);
    PIErender();
}

function handleH(newValue) {
    myObjPositionY2=newValue;
    var source=new THREE.Vector3(myObjPositionX1,myObjPositionY1,0);
    var target=new THREE.Vector3(myObjPositionX2,myObjPositionY2,0);
    var direction=new THREE.Vector3().sub(target,source);
    myObject=new THREE.ArrowHelper(direction.clone().normalize(),source,direction.length(),0x00ff00);
    myObjHeight=myObjPositionY2;
    PIErender();
}

function initialiseControlVariables() {
    ObjectPosX="X";
    ObjectPosY="Y";
    ObjectHeight="H";
    ObjectdefaultPosX=-5;
    ObjectdefaultPosY=0;
    ObjectDefaultHeight=0.6;
    ObjectMinHeight=0.5;
    ObjectMaxHeight=2.0;
    ObjectXPositionStep=0.5;
    ObjectHeightStep=0.1;
    ObjectMinPositionX=-5;
    ObjectMaxPositionX=0;
    myImgPositionX1=NaN;
    myImgPositionX2=myImgPositionX1;
    myImgPositionY1=0;
    myImgPositionY2=NaN;
    myImgHeight=undefined;
    myImageType=undefined;
    myImageOrientation=undefined;
    ImagePosX="IX";
    ImageHeight="IH";
    ImageOrientation="IO";
    ImageType="IT";

}

function  initialiseControls() {
    initialiseControlVariables();
    PIEaddInputSlider(ObjectPosX,ObjectdefaultPosX,handleX,ObjectMinPositionX,ObjectMaxPositionX,ObjectXPositionStep);
    PIEaddInputSlider(ObjectHeight,ObjectDefaultHeight,handleH,ObjectMinHeight,ObjectMaxHeight,ObjectHeightStep);
    PIEaddInputSlider(ObjectPosY,ObjectdefaultPosY,handleY,0,0,0);

    PIEaddDisplayText(ObjectPosX,ObjectdefaultPosX);
    PIEaddDisplayText(ObjectPosY,ObjectdefaultPosY);
    PIEaddDisplayText(ObjectHeight,ObjectDefaultHeight);

    // PIEaddDisplayText(ImagePosX,myImgPositionX1);
    // PIEaddDisplayText(ImageHeight,myImgHeight);
    // PIEaddDisplayText(ImageOrientation,myImageOrientation);
    // PIEaddDisplayText(ImageType,myImageType);
}

var helpContent;
function initialiseHelp() {
    helpContent="";
    helpContent=helpContent+"<h1>Image Formation by concave mirror help</h1>";
    helpContent=helpContent+"<h3>About the Experiment</h3>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
    infoContent="";
    infoContent=infoContent+"<h2>Image Formation By Concave Mirror Concepts</h2>";
    infoContent=infoContent+"<h3>About the experiment</h3>";
    PIEupdateInfo(infoContent);
}

function initialiseScene() {
    mySceneTLX=-7.0;
    mySceneTLY=7.0;
    mySceneBRX=7.0;
    mySceneBRY=-7.0;
    mySceneW=mySceneBRX-mySceneTLX;
    mySceneH=mySceneTLY-mySceneBRY;
    mySceneCenterX=(mySceneTLX+mySceneBRX)/2.0;
    mySceneCenterY=(mySceneTLY+mySceneBRY)/2.0;
}


function initialiseOtherVariables() {
    princepleAxisStartX=-6;
    princpleAxisStartY=0;
    principleAxisEndX=6;
    principleAxisEndY=0;


    myObjPositionX1=-5;
    myObjPositionY1=0;
    myObjPositionX2=myObjPositionX1;
    myObjPositionY2=1.5;
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
function loadExperimentElements() {
    PIEsetExperimentTitle("Image Formation By Concave Mirror");
    PIEsetDeveloperName("Kamlesh Kumar");
    PIEhideControlElement();
    initialiseHelp();
    initialiseInfo();
    initialiseScene();

    initialiseOtherVariables();

    //
   //  var geometry = new THREE.BoxGeometry( 2, mySceneH * 2, 100 );
   //  var material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
   //  var myLeft = new THREE.Mesh( geometry, material );
   //  myLeft.position.set(-7, mySceneCenterX, 0.0);
   //  myLeft.receiveShadow = true;
   //  PIEaddElement(myLeft);
   //
   //
   //  geometry = new THREE.BoxGeometry( mySceneW * 2, 2, 100);
   //  material = new THREE.MeshLambertMaterial( {color: 0xaaaaaa} );
   // var  myFloor  = new THREE.Mesh( geometry, material );
   //  // myFloor.lookAt(new THREE.Vector3(0,1,0));
   //  myFloor.position.set(mySceneCenterX, -7, 0.0);
   //  myFloor.receiveShadow = true;
   //  PIEaddElement(myFloor);
   //
   //
   //  geometry = new THREE.BoxGeometry( mySceneW * 2, 2, 100 );
   //  material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
   //  var myCeiling = new THREE.Mesh( geometry, material );
   //  myCeiling.position.set(mySceneCenterX,7, 0.0);
   //  myFloor.receiveShadow = true;
   //  PIEaddElement(myCeiling);
   //
   //  geometry = new THREE.BoxGeometry( 2, mySceneH * 2, 100 );
   //  material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
   //  var myRight = new THREE.Mesh( geometry, material );
   //  myRight.position.set(7, mySceneCenterY, 0.0);
   //  myRight.receiveShadow = true;
   //  PIEaddElement(myRight);


    //Mirror
    var curve = new THREE.EllipseCurve(
        myMirrorCenterX,  myMirrorCenterY,            // ax, aY
        myMirrorRadius, myMirrorRadius,           // xRadius, yRadius
        -Math.PI/8.0,   Math.PI/8.0,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    var path = new THREE.Path(curve.getPoints(50000));
    var geometry = path.createPointsGeometry(50000);
    var material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
    // Create the final object to add to the scene
    myMirror = new THREE.Line( geometry, material );
   // myMirror.position.set(myMirrorCenterX,myMirrorCenterY,0);
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

    // //Object


    var sourcePos = new THREE.Vector3(myObjPositionX1, myObjPositionY1, 0);
    var targetPos = new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
    myObject = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0x00ff00);
    PIEaddElement(myObject);



    //Incoming Ray  Parallel to the Principle Axis After Reflection It Goes by Focal Point

    var sourcePos = new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);

    var x=getPositionOfInterSectionX(myObjPositionY2);
    var targetPos = new THREE.Vector3(x,myObjPositionY2,0);
    var direction = new THREE.Vector3().sub(targetPos, sourcePos);
    myRayParallelToPrincipleLine = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0x00ff00);
    PIEaddElement(myRayParallelToPrincipleLine);

    myImgPositionX1=getPositionOfImageX();
    myImgPositionY1=0;
    myImgPositionX2=myImgPositionX1;
    myImgPositionY2 =getHeightOfImageY(myImgPositionX1);

console.log("myImgPositionX1"+myImgPositionX1);
    console.log("myImgPositiony2"+myImgPositionY2);
    console.log("myObjheight"+myObjPositionX1);
    //Incoming Ray After Reflection From Mirror
    var sourcePos = new THREE.Vector3(x, myObjPositionY2, 0);
    var targetPos = new THREE.Vector3(myImgPositionX2, myImgPositionY2, 0);
    var direction = new THREE.Vector3().sub(targetPos, sourcePos);
    myRefRayThroughFocusPoint = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length()+2, 0x00ff00);
    PIEaddElement(myRefRayThroughFocusPoint);

    //Incoming ray through focal point

    var x1=getPositionOfInterSectionX(myImgPositionY2);
    var sourcePos = new THREE.Vector3(myObjPositionX2, myObjPositionY2, 0);
    var targetPos = new THREE.Vector3(x1, myImgPositionY2, 0);
    var direction = new THREE.Vector3().sub(targetPos, sourcePos);
    myRayThroughFocusPoint = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0x00ff00);
    PIEaddElement(myRayThroughFocusPoint);
     // reflection From mirror
    var sourcePos = new THREE.Vector3(x1,myImgPositionY2, 0);
    var targetPos = new THREE.Vector3(myImgPositionX2,myImgPositionY2, 0);
    var direction = new THREE.Vector3().sub(targetPos, sourcePos);
    myRefRayParallelToPrincipleLine = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length()+2, 0x00ff00);
    PIEaddElement(myRefRayParallelToPrincipleLine);

    //Image

    var sourcePos = new THREE.Vector3(myImgPositionX1,myImgPositionY1, 0);
    var targetPos = new THREE.Vector3(myImgPositionX2,myImgPositionY2, 0);
    var direction = new THREE.Vector3().sub(targetPos, sourcePos);
    myImage= new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0x00ff00);
    PIEaddElement(myImage);


    initialiseControlVariables();
    initialiseControls();
    resetExperiment();
    PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);

}

function resetExperiment() {
    //initialise Other Variables
    initialiseOtherVariables();

    /*initialise Object Variable*/
    myObjPositionX1=myMirrorCenterX;
    myObjPositionY1=myMirrorCenterY;
   myObject.position.set(myObjPositionX1,myObjPositionY1,0.0);

}



function updateExperimentElements(t,dt) {


    myObjPositionX1=myObject.position.x;
    myObjPositionY1=myObject.position.y;
    if(myObjPositionX1<princepleAxisStartX&&myObjPositionX1>principleAxisEndX)
    {

        if(myObjPositionY1!=0)
        {
            myObjPositionY1=0;
        }

    }
    else
    {
        if(myObjPositionY1!=0)
        {
            myObjPositionY1=0;
        }
    }

    myObject.position.set(myObjPositionX1,myObjPositionY1,0);


    PIEchangeDisplayText(ObjectPosX,myObjPositionX1);
    PIEchangeDisplayText(ObjectPosY,myObjPositionY1);
    PIEchangeDisplayText(ObjectHeight,myObjPositionY2);



}