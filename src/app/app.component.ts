import { Component, OnInit } from '@angular/core';

/**
 * Import the AssemblyScript loader here. If this code runs in the browser,
 * call the `instantiateStreaming` function, otherwise the `instantiateBuffer`
 * method is used in node.js.
 */
import { instantiateStreaming, ASUtil } from 'assemblyscript/lib/loader';

/**
 * Defining an interface like this allows you to define the shape of the exported
 * Web Assembly module. Each parameter is a number. Later, when we want to push
 * a string into our module, we will have to generate a pointer to a string.
 * The add function takes two integer parameters and will assume the value is `0`
 * if the parameter is not provided.
 */
interface MyApi {
  add(a: number, b: number): number;
}

/**
 * Imports are used to specify functions that need to be linked. This will be
 * discussed in greater detail later. For now, leave the imports object empty.
 **/
const imports: any = {};

/* import add from '../../build/optimized.wasm'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AssemblyScript';
  ngOnInit() {
    this.suma();
  }
  /**
   * Now, let's instantiate our module. Using `fetch()` allows the browser to
   * download and parse the module at exactly the same time.
   */
  async suma(): Promise<void> {
/*     const urlToFile = require('!!file-loader!../../build/optimized.wasm');
    console.log(urlToFile); */
    const interop: ASUtil & MyApi =
    // ¡Ojo! lo compilado de AssemblyScript se tiene que ir/copiar a assets que es a donde puede acceder Angular.
      await instantiateStreaming<MyApi>(fetch('../assets/build/optimized.wasm'), imports);
    // Finally, call the add function we exported
    console.log('The result is:', interop.add(1, 2));
  }
}
