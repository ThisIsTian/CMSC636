/**
 * Created by tiantianxie on 10/7/16.
 */

//=========================================================================
//1, based on the input to calculate the values for a box-and-whisker plot
//2, render a box-and-whisker plot based on the input
//3, render decisions the color and line width, how to decide
//=========================================================================

//this is the test data for rendering the plot
//data=[0,1,2,3,4,3,8,9,8,15,13,90];
//======Calculate the boxplot parameters======
//Calculate the values required for a box-and-whisker plot
//
//Args: the data array
//
//Return:
//    mean,p05,p25,p75,p95
//============

function calBoxPlotParam(data){

    return [
        d3.quantile(data,0.05),
        d3.quantile(data,0.25),
        d3.quantile(data,0.5),
        d3.quantile(data,0.75),
        d3.quantile(data,0.95)];
}

function genPlot(data,container,lefttopX,lefttopY,boxwidth,plotHeight,className,inColor){

    bparam=data;
    for(var i=0;i<data.length;++i)
        bparam[i]-=lefttopY;
    //plotHeight=200;
    linewidth=2;

    //lefttopX=2;
    //lefttopY=2;
    //boxwidth=25;



    height25s=[(bparam[3]),//95->75
        (bparam[2]),//75->50
        (bparam[1]),//50->25
        (bparam[0])];//25->5


    width=boxwidth+2*d3.max([lefttopX,linewidth]);
    height=plotHeight//+2*linewidth+lefttopY;
    lineColor=inColor;
    dashType="3,3"


    //the right side position of the box
    righttopX=boxwidth+lefttopX;
    righttopY=lefttopY;


    var bplot1=container.append("g")
                .attr("class",className)
                .attr("width",width)
                .attr("height",height);
    //draw 95% line
    var line95=bplot1.append("g");

    //console.log(d3.min([lefttopX+boxwidth,boxwidth-lefttopX]));

    line95.append("line")
        .attr("x1",lefttopX)
        .attr("y1",lefttopY)
        .attr("x2",righttopX)
        .attr("y2",righttopY)
        .attr("stroke-width",linewidth)
        .attr("stroke",lineColor);

    //draw vertical lines
    var vline75295=bplot1.append("g");
    vline75295.append("line")
        .attr("x1",(lefttopX+righttopX)/2)
        .attr("y1",lefttopY)
        .attr("x2",(lefttopX+righttopX)/2)
        .attr("y2",lefttopY+height25s[0])
        .attr("stroke-width",linewidth)
        .attr("stroke",lineColor)
        .attr("stroke-dasharray",dashType);

    boxx=lefttopX;
    boxy=lefttopY+height25s[0];

    var box50275=bplot1.append("g");
    box50275.append("rect")
        .attr("width",boxwidth)
        .attr("height",height25s[1]-height25s[0])//95->75
        .attr("x",boxx)
        .attr("y",boxy)
        .attr("fill","#FFFFFF")
        .attr("fill-opacity",0.1)
        .attr("stroke-width",linewidth)
        .attr("stroke",lineColor);

    var box25250=bplot1.append("g");


    boxx2=boxx;
    boxy2=lefttopY+height25s[1];

    box25250.append("rect")
        .attr("width",boxwidth)
        .attr("height",height25s[2]-height25s[1])
        .attr("x",boxx2)
        .attr("y",boxy2)
        .attr("fill","#FFFFFF")
        .attr("fill-opacity",0.1)
        .attr("stroke-width",linewidth)
        .attr("stroke",lineColor);

    //draw 5%~25% line
    //draw vertical lines
    var vline5225=bplot1.append("g");

    vline5225.append("line")
        .attr("x1",(lefttopX+righttopX)/2)
        .attr("y1",lefttopY+height25s[2])
        .attr("x2",(lefttopX+righttopX)/2)
        .attr("y2",lefttopY+height25s[3])
        .attr("stroke-width",linewidth)
        .attr("stroke",lineColor)
        .attr("stroke-dasharray",dashType);

    //draw 5% horizontal lines
    var line5=bplot1.append("g");

    line5ylt=lefttopY+height25s[3];

    line5.append("line")
        .attr("x1",lefttopX)
        .attr("y1",line5ylt)
        .attr("x2",righttopX)
        .attr("y2",line5ylt)
        .attr("stroke-width",linewidth)
        .attr("stroke",lineColor);

}

var boxplotData={};
var boxplotInfo={};
var organTherapyKeyMap=[];
var organTherapyKeys=[];
var initialized=false;

//this function will be called once to build the boxplot information
function processData(rawData,xscale,yscale,dimensions){
    if(initialized==true)
        return;
    initialized=true;

    //console.log("["+dimensions.join(",")+"]");

    //console.log("process data");

    var obj;
    for(i=0;i<rawData.length;++i){
        //the first two
        obj=rawData[i];
        organ=obj["Organ"];
        therapy=obj["Therapy"];
        organTherapyKeyMap[therapy+"_"+organ]=true;
        for(j=0;j<dimensions.length;++j){
            attr=dimensions[j];
            key=therapy+"_"+organ+"_"+attr
            if (boxplotData[key]==null)
                boxplotData[key]=new Array();
            var tmpA=boxplotData[key];
            tmpA.push(obj[attr]);
            boxplotData[key]=tmpA;
        }
    }
    //setup all keys
    organTherapyKeys=Object.keys(organTherapyKeyMap);
    //setup parameters
    for(var key in boxplotData){
        keys=key.split("_");
        x=xscale(keys[2]);
        bpparam=calBoxPlotParam(boxplotData[key].sort(d3.ascending));
        var ys=[];
        for(i=0;i<bpparam.length;++i){
            ys.push(yscale[keys[2]](bpparam[i]))
        }
        boxplotInfo[key]=ys;
    }

    //console.log(boxplotData);
}
