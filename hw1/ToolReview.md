#Tool Reviews

In this document, eight different visualization tools are reviewed from my perspective. There are The visualization toolkit (VTK), Slicer, Matlab, Data-Driven Documents (D3), Tableau Public, Processing, WebGL, and OpenGL. The following criteria will be evaluated:

 * **Capability (C)**.
 * **Supported data type (SD)**. Supported data type includes Nominal (`N`), Ordered (`O`), Interval (`I`), and Ratio (`R`).
 * **Supported Visualization data type(SV)**. Examined `native` visualization data type includes points (`p`), lines (`l`), areas (`a`), volumes (`v`), and glyphs (`g`). If it's not provided by the native function the visualization tools provides, it will not count as supported.  
 * **API (A)**. Evaluate if API exist/GUI only, if it is script/programming language.
 * **Customization (Cu)**.
 
 The reviewed tools are listed in the following table. The result is based on surfing on its homepage and my own experience.
 
 | Tool\Metrics  | Capacity   | Data type  | Visualization data type  | API  | Customization |
 |---|---|---|---|---|---|
 | VTK  | 2D & 3D interactive graphics rendering, visualization and processing software system  | All  | All  | Script&programing   | `Expandable`  |
 | Slicer  | 2D & 3D Medical image visualization application  | All  |  All | GUI&programming&script  | `plugin`  |
 | Matlab  | 2D & 3D Fast prototyping & build-in functionality for visualization  | All  | All  | GUI&script&programming  | `Expandable` |
 | D3  | Decoupling framework & Data driven approach to DOM manipulation (3D needs other js) | All | All (no `v`)  | js  | `Expandable`  |
 | Tableau Public  | 2D Interactive task based visualization for business intelligence  |  All  | All (no `v`)   | GUI only | `Very Limited`  |
 | Processing  | 2d,3d graphics rendering & interactive Params | All | All (no `v`)  | GUI&script   | `Expandable`  |
 | WebGL  | js based interactive 2d,3d graphics rendering on websites  | All (no double)  | All (no `v`)  | js | `Expandable`  |
 | OpenGL  | cross platform and language interactive 2d,3d graphics rendering API  | All   | All  | All(e.g., c/c++)  | `Expandable`  | 


# Description

**The visualization toolkit (VTK)**. VTK is an open source 2D and 3D interactive graphics rendering, visualization and processing software system, which supports all data type and visualization data type. Users can write C++ or scripts in e.g., Python to provide more algorithms to customize the visualization.

**Slicer 3D**. Slicer is an open source 2D&3D medical image computing and visualization application. It supports all data types and visualization data types. Users can use GUI to operate on medical images. It also supports a lot of plugin-in extensions written in python or as Qt-plugin.

**Matlab**. Matlab is a scientific toolkit used for all kinds of data processing tasks. It provides fast build-in functions for the prototyping of 2D and 3D visualization. It supports all kind of data types and visualization data types. Users can write matlab scripts or use `mex` to use other programming language to provide more functions.
  
**D3**. D3 provides a data driven approach to DOM manipulation. It provides a general framwork that decouples low-layer implementations. It supports all kind of data type. However, it does not support `volume` visualization data type. To enable it to render those 3D images, it requires other libraries such as `three.js` or `WebGL`.
 
**Tableau Public**. Tableau Public is a 2D interactive task based visualization tool for business intelligence. Users can easily interact with the data based on GUI. It spports all data type. But its target is designed for 2D visualization and accept little customization from users. `Volume` visualization is not possible directly.
                   
**Processing**. Processing is used for 2D and 3D graphics rendering and provides a very interesting parameter interaction paradigm. It supports all kind of data type and can render all visualization data type except `volume`. Users can use GUI or its own scripting language to customize the visualization.

**WebGL**. WebGL is a js based interactive 3D graphics rendering library on websites. It is the web form of OpenGL. It can support all kind of data type. Hoever, id doesn't support `double`. It can't also support `volume` natively. Users need to write low-layer code to customize their visualization.

**OpenGL**. OpenGL is a cross-platform and cross-language interactive 2D and 3D rendering API. It provides fixed rendering pipelines and the capability to directly interactive with graphics processing unit(GPU). All data types and visualization data types are supported by OpenGL. However, it requries a sound knowledge of computer graphics in order to create good and customized visualizations.