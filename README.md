# PATH FINDER

This web-based project is a path-finding algorithms visualizer.<br/>
Link: https://path-finder-wasm.herokuapp.com/

## Functionalities 

- Visualize path-finding algorithms like (BFS, DFS, A-star, Dijkstra, and Best FS) in an elegantly styled ReactJS-based web application. 
- The application utilizes the Web WASM API to make use of the algorithm implementations. 
- To provide a better user experience, I fashioned a 3D depiction of the path using ThreeJS.

## Technicalities 
- The path-finding algorithms are written in `C++` and then converted into `WASM` files using the emscripten tool. These WASM binaries are then used by the browser’s `WASM API`.	
- On testing (for large scale grid), the results from this were **40% faster** (best case) than `vanilla javascript implementations`. 
- The 3D depiction implemented with `ThreeJS` includes `First Person Control and Orbit Controls` for a wider experience and a good depiction of how pathfinding in games, AR and maps can be implemented.


## Skills Learned

### `WASM`
* WebAssembly opened a whole new world to me where optimization and efficiency is everything. 
* Although, the documentation was not well structured, I managed to learn about the important features necessary to implement the algorithms through various tutorials and videos. 
* I also took reference from other projects in different languages like Golang and videos fromJSconf on the same topic. 

### `Emscripten tool`
* Although trivial in use, this tool was helpful to convert the raw implementations into WASM files showing that  multiple languages can be utilised in browsers. 

### `C++`
* Although competent in C++, I was required to write code that could be converted into WASM files and be utilized by the WASM Web API for a real-world problem. Through this, I used struct and dynamic memo allocation concepts. 
* In addition, I studied graph-based path finding algorithms and their efficient implementations which gave me a better sense of understanding for the same. 

### `ThreeJS`
* This javascript 3D library helped n create and display 3D computer graphics. 
* The easy setup, great community support and excellent documentation motivated me to use the library for other projects as well. 


## Screenshots

<ol>
  <li>Home Page with default grid</li>
  <li>Start(green), finish(red) and obstacles(dark navy)</li>
  <li>Shortest path(yellow) and travelled points(light blue)</li>
  <li>Recursive Division maze</li>
  <li>Shortest path for maze using A-star algorithm</li>
  <li>3D depiction of path finder (Orbit Controls)</li>
  <li>3D depiction of path finder (First Person Controls)</li>
  <li>Types of path finding algorithms</li>
</ol>

<br/>

<div class="container" style="display:flex; flex-direction:row; width:100%;">
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137911-9058ef9d-848f-4aa8-bf65-e1fd6f43039e.jpeg" />
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137928-bf50fdf4-29fd-4f65-b700-d625ccfea496.jpeg" />
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137943-e7ae9edc-0bdf-4f25-aa06-95b866caaccb.jpeg" />
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137964-7bc306e2-82b0-4a0f-ba34-e35ba9708614.jpeg" />
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137972-ac8b374c-82a3-4658-b7b4-82863cc8dfbe.jpeg" />
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137982-11b75018-f4e8-456b-abe1-1325981405c7.jpeg" />  
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192137988-62f3b10c-1997-4872-984c-732001606b73.png" />
    <img width="400" src="https://user-images.githubusercontent.com/71624964/192138001-6ccf3e5c-b74b-41a9-8d1a-dda33af70349.png" />
</div>
