# Miro D3 Animated Headers

D3 animated headers for websites. Demo at https://miromannino.com

## How to use

As showed in the test folder it's only needed a SVG element in the DOM. For example:

```
  <svg id="my-header" width="1000" height="200"></svg>
```

And then to start the animation:

```
var myHeader = document.getElementById('my-header');
var md3ah = new MiroD3AnimatedHeader(myHeader);
md3ah.triangleAnimation();
```

## Animations

### Tree

Using `treeAnimation()` method.


### Triangle

Using `triangleAnimation()` method.


### Square

Using `squareAnimation()` method.


### Circle

Using `circleAnimation()` method.


## License

Copyright (c) 2020 Miro Mannino

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.