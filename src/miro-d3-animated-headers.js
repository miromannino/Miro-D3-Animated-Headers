/* ========================================================================
 * Animated headers by Miro Mannino
 * © Miro Mannino
 * ======================================================================== */

import * as d3 from 'd3';

export default class MiroD3AnimatedHeader {

  constructor(headerElement, width, height) {
    this.svgContainer = d3.select(headerElement);
    this.width = width === undefined ? 1000 : width;
    this.height = height === undefined ? 200 : height;
    this.svgContainer.attr('viewBox', '0 0 ' + this.width + ' ' + this.height);
    this.svgContainer.attr('preserveAspectRatio', 'xMidYMid slice');

    this.gradient = this.svgContainer.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    this.gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#fafaff')
      .attr('stop-opacity', 1);

    this.gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#ffffff')
      .attr('stop-opacity', 1);

    this.svgContainer.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'url(#gradient)');
  }

  rndColor() {
    var colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
      '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B',
      '#FFC107', '#FF9800', '#FF5722'
    ];
    return colors[parseInt(Math.random() * colors.length)];
  }

  circleAnimation() {
    var g = this.svgContainer.append('g');
    g.attr('class', 'header-figure');

    function startPen(xVel, x0, y0, rr, maxD, maxR, stopX) {
      var penPosX = x0;
      var penVel = {
        x: xVel,
        y: 0
      };
      var interval = d3.interval(() => {
        penPosX += penVel.x;
        g.append('circle')
          .attr('class', 'enter')
          .style('fill-opacity', 1e-6)
          .attr('fill', this.rndColor())
          .attr('cx', penPosX + Math.random() * maxD * 2 - maxD)
          .attr('cy', rr * penPosX + y0 + Math.random() * maxD * 2 - maxD)
          .attr('r', Math.random() * maxR)
          .transition().duration(1000)
          .style('fill-opacity', Math.random() * 0.8 + 0.1);
        if (xVel > 0 && penPosX > stopX || xVel < 0 && penPosX < stopX) interval.stop();
      }, 1);
    }

    var y0 = this.height * (Math.random() * 0.3 + 0.2);
    var rr = (Math.random() * this.height - y0) / this.width;
    startPen.call(this, this.width / 50, 0, y0, rr, this.height / 10, this.width / 100, this.width / 12 * 8);

    y0 = this.height - this.height * (Math.random() * 0.2 + 0.2);
    rr = (Math.random() * this.height - y0) / this.width;
    startPen.call(this, this.width / 50, 0, y0, rr, this.height / 10, this.width * 3 / 200, this.width / 12 * 7);

    y0 = this.height * (Math.random() * 0.4 + 0.5);
    rr = (this.height * (Math.random() * 0.2 + 0.1) - y0) / this.width;
    startPen.call(this, -this.width / 50, this.width, y0, rr, this.height / 10, this.width / 100, this.width / 12 * 5);

    y0 = this.height * (Math.random() * 0.4 + 0.5);
    rr = (this.height * (Math.random() * 0.2 + 0.4) - y0) / this.width;
    startPen.call(this, -this.width / 50, this.width, y0, rr, this.height / 10, this.width * 3 / 200, this.width / 12 * 4);

    y0 = this.height * 0.2;
    rr = (this.height * 0.1 - y0) / this.width;
    startPen.call(this, -this.width / 50, this.width, y0, rr, this.height / 10, this.width / 100, this.width / 12 * 6);

    y0 = this.height * 0.9;
    rr = (this.height - y0) / this.width;
    startPen.call(this, this.width / 50, 0, y0, rr, this.height / 10, this.width / 100, this.width / 12 * 8);
  }

  squareAnimation() {
    var g = this.svgContainer.append('g');
    g.attr('class', 'header-figure');

    var pause = 10;
    var hw = this.height / 10;

    var matr = [];
    for (var x = 0; x * hw < this.width; x++) {
      matr[x] = [];
      for (var y = 0; y * hw < this.height; y++) matr[x][y] = 0;
    }
    var matrXLength = Math.ceil(this.width / hw);
    var matrYLength = Math.ceil(this.height / hw);

    function matRect(g, x, y, color) {
      g.append('path')
        .attr('d', () => 'M ' + x + ' ' + y + ' l ' + hw + ' 0 l -' + hw + ' ' + hw + ' z')
        .attr('fill', color)
        .style('fill-opacity', 1e-6)
        .transition().duration(300)
        .style('fill-opacity', Math.random() * 0.6 + 0.1);

      g.append('path')
        .attr('d', () => 'M ' + (x + hw) + ' ' + y + ' l -' + hw + ' ' + hw + ' l ' + hw + ' 0 z')
        .attr('fill', d3.rgb(color).darker(0.2))
        .style('fill-opacity', 1e-6)
        .transition().duration(300)
        .style('fill-opacity', Math.random() * 0.5 + 0.1);
    }

    function populate(x, y) {
      if (matr[x][y] === 1) return;
      matr[x][y] = 1;
      matRect(g, x * hw, y * hw, this.rndColor());
      if (y > 0) setTimeout(populate.bind(this, x, y - 1), pause);
      if (x > 0) setTimeout(populate.bind(this, x - 1, y), pause);
      if (x < matrXLength - 1) setTimeout(populate.bind(this, x + 1, y), pause);
      if (y < matrYLength - 1) setTimeout(populate.bind(this, x, y + 1), pause);
    }

    populate.call(this, Math.floor(Math.random() * (matrXLength / 2)), Math.floor(Math.random() * matrYLength));
  }

  treeAnimation() {
    var g = this.svgContainer.append('g');
    g.attr('class', 'header-figure');

    function line(direction, x, y, angle, len, stroke, color) {
      g.append('path')
        .attr('d', function (d) {
          return 'M ' + x + ' ' + y + ' l ' + (direction * Math.cos(angle) * len) + ' ' + (direction * Math.sin(angle) * len) + ' z';
        })
        .attr('stroke', color)
        .attr('stroke-width', stroke)
        .style('stroke-opacity', 1e-6)
        .transition().duration(500)
        .style('stroke-opacity', Math.random() * 0.4 + 0.6);
    }

    var startX = 0, startY = Math.random() * this.height / 2 + this.height / 4;
    var len = this.width / 50;
    var startStroke = this.width / 100;
    var angleVel = 0.1;
    var forkProb = 0.6;

    function expand(direction, x, y, stroke, angle, color, rate, primary, pause) {
      if (stroke < 1 || x < 0 || x > this.width + 10) return;

      if (primary > 0) {
        if (y <= this.height * 0.4) angle += Math.random() * angleVel;
        if (y >= this.height * 0.6) angle -= Math.random() * angleVel;
      }

      if (angle >= Math.PI / 4) angle -= Math.random() * angleVel;
      if (angle <= -Math.PI / 4) angle += Math.random() * angleVel;
      else angle += Math.random() * 2 * angleVel - angleVel;

      var nextY = y + direction * Math.sin(angle) * len;
      if (nextY < this.height) {
        line(direction, x, y, angle, len, stroke, color);
      }

      stroke *= rate;
      x += direction * Math.cos(angle) * len;
      y = nextY;
      setTimeout(() => expand.call(this, direction, x, y, stroke, angle, color, rate, primary, pause), pause);

      if (Math.random() < forkProb) {
        if (Math.random() >= 0.5) {
          setTimeout(() => expand.call(this, direction, x, y, stroke, angle + Math.PI / 6, this.rndColor(), rate * 0.85, primary--, pause), pause);
        } else {
          setTimeout(() => expand.call(this, direction, x, y, stroke, angle - Math.PI / 6, this.rndColor(), rate * 0.85, primary--, pause), pause);
        }
      }

    }

    expand.call(this, 1, startX, startY, startStroke, 0, '#FF9800', 0.95, 2, 20);
    expand.call(this, -1, this.width + 5, this.height - 10, startStroke, Math.PI / 4, '#FF9800', 0.85, 2, 100);
  }

  triangleAnimation() {
    var g = this.svgContainer.append('g');
    g.attr('class', 'header-figure');

    var vMaxDecr = 0.02;
    var hMaxDecr = 0.1;
    var pause = 30;
    var l = this.height / 7;
    var h = Math.sqrt(3) * l / 2;

    var matr = [];
    for (var x = 0;
      (x - 1) * h < this.width; x++) {
      matr[x] = [];
      for (var y = 0;
        (y - 1) * l < this.height; y++) matr[x][y] = 0;
    }
    var matXLen = matr.length,
      matYLen = matr[0].length;

    function matTr(g, x, y, or, color, intensity) {
      var duration = 500;
      if (intensity <= 0) {
        color = '#eee';
        duration = 300;
      }
      var xt = x * h,
        yt = y * l + (x % 2) * (l / 2);

      if (or === 1) {
        g.append('path')
          .attr('d', () => {
            return 'M ' + (xt) + ' ' + (yt) +
              ' l ' + (h) + ' ' + (-l / 2) +
              ' l ' + 0 + ' ' + (l);
          })
          .attr('fill', color)
          .style("fill-opacity", 1e-6)
          .transition().duration(duration)
          .style("fill-opacity", Math.random() * 0.8 + 0.1);
      } else if (or === 2) {
        g.append('path')
          .attr('d', () => {
            return 'M ' + (xt) + ' ' + (yt) +
              ' l ' + (-h) + ' ' + (-l / 2) +
              ' l ' + 0 + ' ' + (l);
          })
          .attr('fill', color)
          .style("fill-opacity", 1e-6)
          .transition().duration(duration)
          .style("fill-opacity", Math.random() * 0.8 + 0.1);
      }
    }

    function popT(x, y, or, color, intensity, maxDecr) {
      setTimeout(() => populate(x, y, or, color, intensity - Math.random() * maxDecr), pause);
    }

    function populate(x, y, or, color, intensity) {
      if (matr[x][y] === 0) {
        matr[x][y] = or;
      } else if (matr[x][y] === 3 || matr[x][y] === or) {
        return;
      } else {
        matr[x][y] = 3;
      }
      matTr(g, x, y, or, color, intensity);
      if (or === 1) {
        if (x < matXLen - 2) popT(x + 2, y, 2, color, intensity, hMaxDecr);
        if (x % 2 === 0) {
          if (x < matXLen - 1) {
            popT(x + 1, y, 2, color, intensity, hMaxDecr);
            if (y > 0) popT(x + 1, y - 1, 2, color, intensity, vMaxDecr);
          }
        } else {
          if (x < matXLen - 1) {
            popT(x + 1, y, 2, color, intensity, hMaxDecr);
            if (y < matYLen - 1) popT(x + 1, y + 1, 2, color, intensity, vMaxDecr);
          }
        }
      } else if (or === 2) {
        if (x > 1) popT(x - 2, y, 1, color, intensity, hMaxDecr);
        if (x % 2 === 0) {
          if (x > 0) {
            popT(x - 1, y, 1, color, intensity, hMaxDecr);
            if (y > 0) popT(x - 1, y - 1, 1, color, intensity, vMaxDecr);
          }
        } else {
          if (x > 0) {
            popT(x - 1, y, 1, color, intensity, hMaxDecr);
            if (y < matYLen - 1) popT(x - 1, y + 1, 1, color, intensity, vMaxDecr);
          }
        }
      }
    }

    var colors = ['#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#FF9800', '#FF5722'];
    var color = colors[parseInt(Math.random() * colors.length)];

    populate(Math.floor(Math.random() * matXLen / 4 + matXLen / 8), Math.floor(Math.random() * matYLen), 1, color, 1);
  }

}
