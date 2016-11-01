/**
 * Created by tiantianxie on 10/29/16.
 */

function Drawcategory(node, cellWidth,cellHeight,XPos,categoryColor,categoryData) {

    if (categoryData instanceof Array) {

        for (i=0;i<categoryData.length;++i) {
            console.log(categoryData[i])
            node.append("rect")
                .attr("width", cellWidth)
                .attr("height", cellHeight / categoryData.length)
                .attr("x", XPos)
                .attr("y", 0 + i * cellHeight / categoryData.length)
                .attr("fill", function (d) {
                    if (categoryData[i] == -1 || categoryData[i] == 0)
                        return "#000000";
                    else
                        return categoryColor[categoryData[i] - 1];
                })
        }
    }
    else{
        console.log(categoryData)
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
            for(j=0;j<categoryData[i].length;++j) { //the iterate he category data for all encounters
                category=categoryData[i][j];
                //console.log(category);

                //the symptom of each encounter
                if(category instanceof Array) {
                    for (k = 0; k < category.length; ++k) {//render each symptom
                        node.append("rect")
                            .attr("width", cellWidth)
                            .attr("height", cellHeight / category.length)
                            .attr("x", XPos)
                            .attr("y", 0 + k * cellHeight / category.length)
                            .attr("fill", function (d) {

                                if (category[k] == -1 || category[k] == 0)
                                    return "#000000";

                                curRank = categoryRank[i][0][k + 1];
                                c = categoryColor[category[k] - 1];
                                var ramp;
                                if (!reverse)
                                    ramp = d3.scaleLinear().domain([rankMaxlist[category[k] - 1]+1, 0]).range(["#000000", c]);
                                else
                                    ramp = d3.scaleLinear().domain([rankMaxlist[category[k] - 1]+1, 0]).range([c, "#000000"]);
                                c = ramp(curRank);
                                return c;
                            })
                    }
                }else{
                    //console.log('single cell')
                    node.append("rect")
                        .attr("width", cellWidth)
                        .attr("height", cellHeight)
                        .attr("x", XPos)
                        .attr("y", 0)
                        .attr("fill", function (d) {

                            if (category == -1 || category == 0)
                                return "#000000";

                            curRank = categoryRank[i][0][1];
                            c = categoryColor[category - 1];
                            var ramp;
                            if (!reverse)
                                ramp = d3.scaleLinear().domain([rankMaxlist[category - 1]+1, 0]).range(["#000000", c]);
                            else
                                ramp = d3.scaleLinear().domain([rankMaxlist[category - 1]+1, 0]).range([c, "#000000"]);
                            c = ramp(curRank);
                            return c;
                        })
                }
            }
    }
}
