#Part I: Design Solution

## Task description

## Dataset Attribute description

## Encoding choice comparision


#Part II: Implementation

## Preprocessing

I preprocess the dataset using `matlab`, the processing files are:

* `FilterData.m`. This script read only task-related data including `PatientID`, `Days_From1stTBI`, `Encounter_date`, `TBI_encounter_flag`, `PRE_max_days`, `POST_max_days`, and all 16 symptoms.
* `DeriveInformation.m`. This script extract useful information for constructing the matrix view into a file `processed.json`. Those extracted important information includes:
    * `order`. The ordered id of the patient, which is used to show the `patient label`.
    * `pre`. The symptoms of all encounters sliced by encounter date before the TBI day. The matrix view before the TBI day is rendered using this data-set. 
    * `post`. The symptoms of all encounters sliced by encounter date after the TBI day. The matrix view after the TBI day is rendered using this data-set.
    * `preOrder`. It records the rank of each category at a specific encounter before the TBI day. This is used for `luminance` rendering.
    * `postOrder`. It records the rank of each category at a specific encounter after the TBI day. It's also used for `luminance` rendering. 

## Program Running result

A screenshot of the implementation is is illustrated in Figure 1. 

<img src="./screenshot.png" height="400">

**Figure 1. The TBI aligned matrix view that shows the symptom of all 41 patients.**

* **Basic matrix**. As you can observe, a clear matrix view is shown in Figure 1, where y axis shows the patient sequence ordered by their patient id, and x axis is the the progressing time.
* **Coloring hue**. The coloring hue is implemented using `d3.schemeCategory20c`. As you can observe in Figure 1, the hue is very clear. Using 20 color for this problem is efficient enough.
* **Coloring luminance**.
* **cell splitting**. I split the cell horizontally. The most obvious cell that shows the splitting is the `TBI cell` for `patient 6`. There are six symptoms at this encounter.
* **critical evaluation**.
