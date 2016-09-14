#Introduction

In this project, I try to use two tools (D3 and Matlab) to visualize one diffusion tensor imaging of a brain in a way that it can better characterize micro-structural changes. The data is contained in `data1.txt`. It is a space divided matrix, each value in the matrix represents a FA(fractional anisotropy ) value in the range of [0,1]. According to [the definition of FA on Wikipedia][1], the higher the value, the higher the fiber density, axonal diameter, or myelination in white matter. An example view of this image _provided by the course_ is shown below:

[<img src="https://2a15ca77-a-7363f245-s-sites.googlegroups.com/a/umbc.edu/datavisualization/resources/output1.png?attachauth=ANoY7cpeAsPJ2i_oqVZ1U94lRXKZ8LBoQ_DeTfJXo-0I6wNCtx0s92N1tpI11YHb8a5VKMhaThXLH7MQaZ7tEd8XYLW0hU9vI12f-w3Offx9xTpGMIY6SehQwq38R7dH03zSLUzUV4tS0dQTITB-lLDJ2--8aRYru4TuFvNYWdTXD8BWGN_PCNCWkF7YG6SKTLpIi8C2lyiKtHpvawRwCDIU4mHDJ7sp4-J1I1ZzP5XlO75TWqT53Wk%3D&attredirects=0">]()

The basic image renders `0` to black and increases the satuation of `green` when FA increases. Two properties could be observed:

1. Most area are black (`value = 0`), indicating that there is no, e.g., fiber. This area is usually not important.
2. Interesting areas are sparse distributed in the figure. Some areas are lighter in green, which means the FA is high, while other areas are darker in green, which means the fiber density there is lower.

In order to have all the important information characterized. To have this `green` figure that only captures the high density areas (_**P0**_) is not enough. Because the following problem can't be solved with the original figure:

1. **P1: Low density areas are not intuitive**. If we are more interested in low density areas in the application, there is a need to highlight the low density areas.
2. **P2: Interest areas might be in a specific range**. If the point of interest is within a range such as `value=[0.3, 0.5]`, the original figure can not help us to identify these regions.
3. **P3: FA distribution might be more interesting**. One research has pointed out that [FA distribution might serve as additional measures to help monitor desease progression for patients][2]. I believe there is a need to visualize the distribution of FA.

To solve these problems, the design and implementation is arranged as bellow:
 * _**P0**_ and _**P1**_ are implemented by **D3**. 
 * _**P2**_ and _**P3**_ are implemented by **Matlab**.

#Visualization with D3



The visualization is implemented in `d3_p0.html`.



#Visualization with Matlab


[1]: https://en.wikipedia.org/wiki/Fractional_anisotropy  "Fractional Anisotropy on Wikipedia"
[2]: http://lmt.projectsinknowledge.com/Activity/pdfs/2023_02/952.pdf "Mean Diffusivity and Fractional Anisotropy Histograms of Patients with Multiple Sclerosis"