/**
 * Created by tiantianxie on 10/29/16.
 */

function Drawcategory(node, cellWidth,cellHeight,XPos,categoryColor,categoryData) {

    if (categoryData instanceof Array) {
        for (i=0;i<categoryData.length;++i)
            node.append("rect")
                .attr("width", cellWidth / categoryData.length)
                .attr("height", cellHeight)
                .attr("x", XPos + i * cellWidth / categoryData.length)
                .attr("y", 0)
                .attr("fill", function (d) {
                    if (categoryData[i] == -1 || categoryData[i]==0)
                        return "#000000";
                    else
                        return categoryColor[categoryData[i]-1];
                })
    }
    else{
        node.append("rect")
            .attr("width",cellWidth)
            .attr("height",cellHeight)
            .attr("x",XPos)
            .attr("y",0)
            .attr("fill",function (d) {
                if (categoryData==-1|| categoryData==0)
                    return "#000000";
                else
                    return categoryColor[categoryData-1];
            })
    }
}



function Drawcategory2(node, cellWidth,cellHeight,XPos,categoryColor,categoryData,index,categoryRank,rankMaxlist,reverse) {
    //reverse mean the color hue decreases as rank  increases
    if (categoryData instanceof Array) {
        for (i=index;i<index+1;++i)
            for(j=0;j<categoryData[i].length;++j) {
                category=categoryData[i][j];
                node.append("rect")
                    .attr("width", cellWidth / categoryData[i].length)
                    .attr("height", cellHeight)
                    .attr("x", XPos + j * cellWidth / categoryData[i].length)
                    .attr("y", 0)
                    .attr("fill", function (d) {

                        if (category == -1 || category == 0)
                            return "#000000";

                        curRank=categoryRank[i][0][j+1];
                        c=categoryColor[category-1];
                        var ramp;
                        if (!reverse)
                            ramp = d3.scaleLinear().domain([rankMaxlist[category-1], 1]).range(["#000000", c]);
                        else
                            ramp = d3.scaleLinear().domain([rankMaxlist[category-1], 1]).range([c,"#000000"]);
                        c=ramp(curRank);
                        return c;
                    })
            }
    }
    else{
        node.append("rect")
            .attr("width",cellWidth)
            .attr("height",cellHeight)
            .attr("x",XPos)
            .attr("y",0)
            .attr("fill",function (d) {
                if (categoryData==-1|| categoryData==0)
                    return "#000000";
                else
                    c=categoryColor[categoryData];

                //check rank
                if (categoryRank[index].length==1)
                    return c;
                else{
                    var ramp=d3.scale.linear().domain([rankMaxlist[categoryData],1]).range(["#000000",c]);
                    c=ramp(categoryRank[1])
                    return c;
                }

            })


    }
}

function hsl2rgb(h,s,l){
    //0.5,1,0.4
    //c=0.8,x=0.8,value=0,0.8,0.8,m=0,rgb=0,0.8,0.8
    //chroma:
    c=(1-Math.abs(2*l-1))*s;

    hp=h*6;

    //intermediate value x
    x=c*(1-Math.abs(hp%2-1));

    //calculate R,G,B
    if(hp>=0&&hp<1){
        value=[c,x,0];
    }else if(hp>=1&&hp<2){
        value=[x,c,0];
    }else if(hp>=2&&hp<3){
        value=[0,c,x];
    }else if(hp>=3&&hp<4){
        value=[0,x,c];
    }else if(hp>=4&&hp<5){
        value=[x,0,c];
    }else if(hp>=5&&hp<6){
        value=[c,0,x];
    }

    //match luminance
    m=l-0.5*c;

    tmp=[value[0]+m,value[1]+m,value[2]+m];

    //console.log('c='+c+',x='+x+',value='+value+',m='+m+',rgb='+tmp);
    return tmp;
}

function rgb2hsl(r,g,b){

}