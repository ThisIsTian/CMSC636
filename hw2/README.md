# Literature Review

In this homework, we are going to do critical analysis of two visualization examples. One is selected as an ineffective example and the other effective. 

The paper I selected from the reading list is:

* Jeffrey Heer, Michael Bostock, Vadim Ogievetsky (2010), A Tour through the Visualization Zoo, Communications of the ACM, vol. 53, no. 6, pp. 59-67, 2010.

I find both the effective visualization and ineffective visualization from this paper.


#The ineffective figure


<img src="./ineffective.png" height="400"> 

**Figure 1. Stacked graph of unemployed U.S. workers by industry, 2000–2010(The ineffective image** from \[[1][1]\]).

The effectiveness is less than 13%. Because this figure can only convey the overal trend of unemployed U.S. workers while it is difficult for human eyes to distinguish the max,min overall or during a specific time. It's better to lower half be a straight line rather than changing lines to represent data.

The most noticeable elements of this visualization are 1) the overall changing bandwidth, 2) the color of each sub-band and 3) the bandwidth of each subband. And they are the most important.Although all elements carry information information, the information to show the max, min or local trend is missing. For example, the min unemployed U.S. workers are nearly impossible to be identified with the corrent coloring method. And the labeling is a little confusing without counting from top to bottom. It's not effective. Moreover, this color visualization encourages a misperception of the min unemployed U.S. works from `Mining and Extraction` to `Agriculture` or `Information`.

In order to make the presentation more effective, my suggestions are as below: 

1. They can `first` change the coloring method by `adding a color lengend that shows the ranking using illuminan components`. In this way, users can clearly identify the maximum unemployed and employed works in U.S.
2. They can `shift` the figure so that the lower part is on the line instead of changing. In this way, users can clear see when the overall unemployment reaches its min or max.
3. They can add a enlarge circle to the min component `Mining and  Extraction`, to indicate that it is min. Otherwise, we can't see it unless we can zoom in and in.
4. For those labels that occupies more that two sub-band, add a line from it to its sub-band.


#The effective figure

<img src="./effective.png" height="300"> 

**Figure 2. Indented tree layout of the Flare package hierarchy.(The effective image from \[[1][1]\]).**

* How effective do you judge this visualization to be? Why?

* What are the most noticeable elements of the visualization? Are they the most important?
* Is there essential information missing?
* Are there elements which carry no information?
* Are colors used effectively?
* Does this visualization encourage any misperceptions?
* How could this visualization be improved? Offer specific suggestions.


#Citation

[1]: http://queue.acm.org/detail.cfm?id=1805128  "A Tour through the Visualization Zoo"