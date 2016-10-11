#Part I: Design Solution

## Group Information

* **Group name**: Unknown 
* **Group Idea**: 
    1. cluster values for each attributes and then create bundles between parallel coordinates.
    2. Assign colors according to the bundle size.
    3. Assign special colors to bundles that are the goal of the task.
* **Group sketch**: The group sketch according to the idea is shown in Figure 1. 

<img src="./sketch.png" height="400">


**Figure 1. The group sketch based on our group idea**

* **Pros and Cons**:
    * **Prons**: The distribution is clear and it's easy to distinguish two distributions if they are different on the same parallel coordinate
    * **Cons**: It's not every effective when the distributions of multiple data are quite similar and the size of data is very large relatively to the display.

The solution we provided is as described above. However, since in class what we all agreed on is to create the visualization using boxplot. So the following section is the design and implementation for `boxplot` visualization.

## Design choices

### Tasks description


In homework three, we can choose from three tasks to visualize the tumor data in `parellel coordinate`. The three tasks are: 

* The first task is to develop a visualization technique to visualize the distributions for each therapy on the same attribute in such a way that we can easily distinguish between two more more therapies. 
* The second task is to group the clutters between two parallel attribute so that similar items are grouped together. 
* The last task is to develop an interaction technique to select areas of interest, which might be very strangely distributed.

Based on our discussion in class, the first task is selected.

### Dataset attributes

The tumor data set contains the therapy information for 108 samples, 12(therapy)x9(subject). Each sample contains 33 attributes. 

### mapping tasks and data needs in encoding process



### Design choices
### Good and Bad
### Issues, and future fixes

1. The first issue I run into is that when the web brower is resized, the boxplot is not resized accordingly. However, I have added `update_boxplot` to fix this problem.

## Steps to produce the visualization (Basic requirement)

### Basic requirement:

I followed the following five steps to get the correct output for the basic requirement
1. I first design and implement the `boxplot` in `bw_plot.html`
2. Parse the data to extract the information (i.e., the `y coordinate` for `5%`, `25%`, `50%`, `75%` and `95%`) for boxplots in the `processData` function in `boxplot.js`
3. Add the code to render the plot as a function `genPlot`, which is called within a new `g:boxAxis` for each `g.dimension`
4. To toggle on/off boxplot, I add `visibility` switch for each boxplot in the `on click` event of `legend` in `parallel.js`.
5. To fix the first issue, I added the function `update_boxplot` resize the boxplot

<img src="./basicResult.png" height=400>

**Figure 2. Plot two therapies in red and brown with box-and-whisker plot.**

### Shifted view (graduate student)

Based on the implementation in the previous section, by altering the `left top x` location of each visible boxplot in `update_boxplot`, we could generate the shifted view as illustrated in **Figure 3**.

<imag src="./shiftedview.png" height=400>

**Figure 3. Shifted view of three therapies in brown yellow and red with box-and-whisker plot.**

## Change in the future

In the future, I will try to do the extra credits. Because the time is really limited.

