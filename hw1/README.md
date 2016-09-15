#Introduction

In this project, I try to use two tools (D3 and Matlab) to visualize one diffusion tensor imaging of a brain in a way that it can better characterize micro-structural changes. The image is stored in `data1.txt` as a space separated matrix, where each value in the matrix represents a FA (fractional anisotropy ) value (`Data Type: ratio`) in the range of [0,1]. According to [the definition of FA on Wikipedia][1], the higher the value, the higher the fiber density, axonal diameter, or myelination in white matter. An example view of this image _provided by the course_ is shown below:

[<img src="https://2a15ca77-a-7363f245-s-sites.googlegroups.com/a/umbc.edu/datavisualization/resources/output1.png?attachauth=ANoY7cpeAsPJ2i_oqVZ1U94lRXKZ8LBoQ_DeTfJXo-0I6wNCtx0s92N1tpI11YHb8a5VKMhaThXLH7MQaZ7tEd8XYLW0hU9vI12f-w3Offx9xTpGMIY6SehQwq38R7dH03zSLUzUV4tS0dQTITB-lLDJ2--8aRYru4TuFvNYWdTXD8BWGN_PCNCWkF7YG6SKTLpIi8C2lyiKtHpvawRwCDIU4mHDJ7sp4-J1I1ZzP5XlO75TWqT53Wk%3D&attredirects=0">]()

The basic image maps `0` to black and maps the FA increase as the increase of the satuation of `green`. Two properties could be observed from the figure:

1. Most area are black (`value = 0`), indicating that there is no, e.g., fiber. This area is usually not important.
2. Interesting areas (`value > 0`) are sparse distributed in the figure. Some areas are lighter in green, which means the FA is high, while other areas are darker in green, which means the fiber density there is lower.

In order to have all the important information characterized. It is not enough to have this `green` figure that highlight the high density areas (_**P0**_). Because the following problem can't be solved with the original figure:

1. **P1: Low density areas are not intuitive**. If we are more interested in low density areas in the application, there is a need to highlight the low density areas. Because it's not intuitive to our visual system to directly present them to our brain.
2. **P2: Interest areas might be in a specific range**. If the point of interest is within a range such as `value=[0.3, 0.5]`, the original figure can not help us to identify these regions.
3. **P3: FA distribution might be more interesting**. One research has pointed out that [FA distribution might serve as additional measures to help monitor desease progression for patients][2]. I believe there is a need to visualize the distribution of FA.

To solve these problems, the design and implementation is arranged as bellow based on the course requirement that two tools should have two visualization:
 * _**P0**_ and _**P1**_ are implemented by **D3**. 
 * _**P2**_ and _**P3**_ are implemented by **Matlab**.

#Visualization with D3

**Basic Design**. The interested areas (`value > 0`) are in high spatial frequencies from the `texture` perspective. So I encode the `FA value` using `Luminance`, which is suitable for visualizing image in high spatial frequency based on \[[3]\]. By utilizing `luminance`, we can differentiate structures from the background. Another observation is that the interesting areas are formed by connected values in stripes/lines while consecutive values are very similar. If we only use `luminance`, it's difficult to capture those variance within those lines. To capture this subtle difference within lines, we can utilize `saturation` of color, which is very suitable for human eye to capture this subtle changes (low spatial frequency).

## High density area
In this scenario, the interesting areas are high density areas, we need to differentiate them from background and low density areas. Based on the basic design, the basic encoding is to encode high FA value to high Luminance `H=(0,0,1)` while the low FA value to low Luminance `L=(0,0,0)`. To differentiate the subtle difference within lines, we add `saturation` components to `H` and `L` so that higher FA more catches human eyes. We achieve this as follows:
 ```
 H'=H+(0,1,0)=(0,1,1)
 L'=L+(0,0,0)=(0,0,0)
 ```

<script>
 //========================================================
    //We need to render the diffusion tensor image for a head.
    //To learn the implementation of an image, I referred to:
    //http://bl.ocks.org/e-/5244131
    //
    //The data type of each pixel is ratio. By observing the basic
    //image that I tuned with. This image is of low frequency.
    // Therefore It's better to use satuation-varying color to illustrate
    // the information in the image based on:
    //http://www.research.ibm.com/people/l/lloydt/color/color.HTM
    //blue->yellow
    //(0,0,0,) should be set to black otherwise, it will distract our eye.
    //========================================================

    //==========Reading tab separated data====================
    var pixels=[];
    var bar_data=[];
    var height=0;
    var width=0;
    var row=[];
    var coef=2;//the width and length factor of each pixel.

    pmax=-1;
    pmin=1;

    //Figure 1(a)
    var hsl_start=[0,0,0];
    var hsl_end=[0,0,1];//h s l
    //Figure 1(b)
    //var hsl_start=[0,0,0];
    //var hsl_end=[0,1,1];//h s l
    //=========================================================
    //hsl to rgb
    //referred to https://en.wikipedia.org/wiki/HSL_and_HSV
    //
    //Input:
    //  h: hue [0,1]
    //  s: satuation [0,1]
    //  l: luminance [0,1]
    //==========================================================

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

    //hsl interpolate with ratio
    function hsl_interpolate(from,to,ratio){
        hsl_value=[0,0,0];

        hsl_value[0]=ratio*from[0]+(1-ratio)*to[0];
        hsl_value[1]=ratio*from[1]+(1-ratio)*to[1];
        hsl_value[2]=ratio*from[2]+(1-ratio)*to[2];

        return hsl_value;
    }

    //the rgb function
    function rgb(array) {
        //color joined by (233,123,123)
        tmp= 'rgb('+array.map(function(color){return Math.round(255*color);}).join(',')+')';
        //console.log(tmp);
        return tmp;
    }

    //Asynchronized loading of data from data1
    d3.text("data1.txt", function(error, text) {
        if (error) throw error;

        //parse the file
        var psv=d3.dsvFormat("\n");
        var data=psv.parse(text);   //data stored in rows

        //read the height
        console.log("The number of rows:"+data.length);
        height=data.length;

        //read the width
        var ssv=d3.dsvFormat(" ");

        for(i=0;i<data.length;i++){

            //only one data pair inside this loop, the key:value "0 0 0 0 0":0 0 0 0 0
            for(var key in data[i]){
                rowRaw=data[i][key];
                row=ssv.parse(rowRaw);//obtain the value in row
            }

            //update the width variable, it's not efficient
            width=row.columns.length;

            //operate on row to get the width and fillup the pixels
            for(j=0;j<width;++j){

                //calculate the rgb based on row.columns[j]
                ratio=1-(+row.columns[j]);
                //ratio=Math.sqrt(ratio);
                //interpolate start and end to draw the image
                //
                hsl_value=hsl_interpolate(hsl_start,hsl_end,ratio);

                //cutoff
                if(ratio==0){
                    hsl_value=[0,0,0];
                }

                pixels.push({
                    x:j,
                    y:i,
                    value:hsl2rgb(hsl_value[0],hsl_value[1],hsl_value[2])//[+row.columns[j],+row.columns[j],+row.columns[j]]
                });

                //log max min
                if(pmax<(+row.columns[j])){
                    pmax=+row.columns[j];
                }
                if(pmin>(+row.columns[j])) {
                    pmin = +row.columns[j];
                }
            }
        }


        //initialize bar data
        for(j=0;j<height;++j){
            //initialize bar data
            ratio=j*1.0/(height-1);
            //console.log(ratio);
            //if(ratio==1){
            //    hslv=[0,0,0];
            //}else
            hslv=hsl_interpolate(hsl_start,hsl_end,ratio);

            bar_data.push({
                x:0,
                y:j,
                value:hsl2rgb(hslv[0],hslv[1],hslv[2])
            });
        }

        //log the pixels
        //render the canvas
        //Add an svg in the body with the size of (w,h)
        var svg = d3.select('body').append('svg').attr('width',width*coef).attr('height',height*coef);
                //margin = 30,
                //width = width*coef,
                //height = height*coef;
        console.log('done');
        //add an rgb figure into the svg file
        rgb_node=svg.append('g').attr('class','nodes all');

        bar_svg=d3.select('body').append('svg').attr('width',40*coef).attr('height',height*coef);
                //margin = 30,
                //width = 10*coef,
                //height = height*coef;

        bar_node=bar_svg.append('g').
        attr('class','nodes bar').attr('transform','translate('+(20)+',0)');

        //fill the color
        rgb_node.selectAll('rect')
                .data(pixels).enter().append('rect')
                .attr('x',function (node) {return node.x*coef;})
                .attr('y',function(node){return node.y*coef;})
                .attr('width',coef)
                .attr('height',coef)
                .style('fill',function(node){
                    return rgb(node.value);
                });

        //add a contour bar
        bar_node.selectAll('rect')
                .data(bar_data).enter().append('rect')
                .attr('x',function (node) {return node.x*coef*10;})
                .attr('y',function(node){return node.y*coef;})
                .attr('width',coef*10)
                .attr('height',coef)
                .style('fill',function(node){
                    return rgb(node.value);
                });

        //adding axis
        console.log(height);

        var ls=d3.scaleLinear().domain([1,0]).range([0,height*coef]);
        var yAxis=d3.axisRight(ls);//.ticks(0.1);

        bar_svg.append('g')
                .attr('class','y axis')
                .attr('transform','translate(40,5)')
                .call(yAxis);
    });

    //var ls=d3.scaleLinear().domain([0,100]).range([0, 100]);
    //var axis = d3.axisRight(ls);

    //d3.select("body").append("svg")
    //        .attr("class", "axis")
    //        .attr("width", 400)
    //        .attr("height", 400)
    //        .append("g")
    //        .attr("transform", "translate(100,5)")
    //        .call(axis);

</script>

The visualization for _**P0**_ is implemented in `d3_p0.html`.
## Low density area


#Visualization with Matlab


[1]: https://en.wikipedia.org/wiki/Fractional_anisotropy  "Fractional Anisotropy on Wikipedia"
[2]: http://lmt.projectsinknowledge.com/Activity/pdfs/2023_02/952.pdf "Mean Diffusivity and Fractional Anisotropy Histograms of Patients with Multiple Sclerosis"
[3]: http://www.research.ibm.com/people/l/lloydt/color/color.HTM "Why Should Engineers and Scientists Be Worried About Color?"
