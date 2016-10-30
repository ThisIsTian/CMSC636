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
                        return categoryColor[categoryData[i]];
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
                    return categoryColor[categoryData];
            })
    }
}