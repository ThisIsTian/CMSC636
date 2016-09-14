#Introduction

In this project, I try to use two tools (D3 and Matlab) to visualize one diffusion tensor imaging of a brain in a way that it can better characterize micro-structural changes. The data is contained in data1.txt. It is a space divided matrix, each value in the matrix represents a FA(fractional anisotropy ) value in the range of [0,1]. According to [the definition of FA on Wikipedia][1], the higher the value, the higher the fiber density, axonal diameter, and myelination in white matter. An example view of this image provided by the course is shown below:

[<img src="https://2a15ca77-a-7363f245-s-sites.googlegroups.com/a/umbc.edu/datavisualization/resources/output1.png?attachauth=ANoY7cpeAsPJ2i_oqVZ1U94lRXKZ8LBoQ_DeTfJXo-0I6wNCtx0s92N1tpI11YHb8a5VKMhaThXLH7MQaZ7tEd8XYLW0hU9vI12f-w3Offx9xTpGMIY6SehQwq38R7dH03zSLUzUV4tS0dQTITB-lLDJ2--8aRYru4TuFvNYWdTXD8BWGN_PCNCWkF7YG6SKTLpIi8C2lyiKtHpvawRwCDIU4mHDJ7sp4-J1I1ZzP5XlO75TWqT53Wk%3D&attredirects=0">]()

The basic image renders `0` to black and increases the satuation of `green`. Two properties could be observed:
1. Most area are black (`value = 0`), indicating that there is no, e.g., fiber.
2. Different FA

#Visualization with D3




#Visualization with Matlab


[1]: https://en.wikipedia.org/wiki/Fractional_anisotropy  "Fractional Anisotropy on Wikipedia"