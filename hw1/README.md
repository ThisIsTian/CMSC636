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

**Basic Design**. The interested areas (`value > 0`) are in high spatial frequencies from the `texture` perspective. So I encode the `FA value` using `Luminance`, which is suitable for visualizing image in high spatial frequency based on \[[3]\]. By utilizing `luminance`, we can differentiate structures from the background. Another observation is that the interesting areas are formed by connected values in stripes/lines while consecutive values are very similar. If we only use `luminance`, it's difficult to capture those variance within those lines. To capture this subtle difference within lines, we can utilize `saturation varying color`, which is very suitable for human eye to capture this subtle changes (low spatial frequency).

## High density area
In this scenario, the interesting areas are high density areas, we need to differentiate them from background and low density areas. Based on the basic design, the basic encoding is to encode high FA value to high Luminance `H=(0,0,1)` while the low FA value to low Luminance `L=(0,0,0)`. To differentiate the subtle difference within lines, we add `saturation` components to `H` and `L` so that higher FA more catches human eyes. We achieve this as follows:
 ```
 H'=H+(0.2,1,0)=(0.2,1,1)
 L'=L+(0,0,0)=(0,0,0)
 ```

Solarized dark             |  Solarized Ocean
:-------------------------:|:-------------------------:
<img src="./d3_1.png" height="300">  |  <img src="./d3_2.png" height="300">
 

The visualization for _**P0**_ is implemented in `d3_p0.html`.
## Low density area


#Visualization with Matlab


[1]: https://en.wikipedia.org/wiki/Fractional_anisotropy  "Fractional Anisotropy on Wikipedia"
[2]: http://lmt.projectsinknowledge.com/Activity/pdfs/2023_02/952.pdf "Mean Diffusivity and Fractional Anisotropy Histograms of Patients with Multiple Sclerosis"
[3]: http://www.research.ibm.com/people/l/lloydt/color/color.HTM "Why Should Engineers and Scientists Be Worried About Color?"
