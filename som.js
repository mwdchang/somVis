class SOM {

  constructor(gwidth, gheight, initFn, simFn) {
    this.nodes = [];
    this.gwidth = gwidth;
    this.gheight = gheight;
    this.initFn = initFn;
    this.simFn = simFn;

    this.initialize();
  }

  getNodes() { return this.nodes; }

  initialize() {
    for (let i=0; i < this.gwidth; i++) {
      for (let j=0; j < this.gheight; j++) {
        let t = this.initFn();
        t._x = i;
        t._y = j;
        this.nodes.push(t);
      }
    }
  }


  dist(n1, n2) {
    return Math.sqrt( (n1._x - n2._x)*(n1._x - n2._x) + (n1._y - n2._y)*(n1._y - n2._y))
  }

  findNeighbours(ref, dist) {
    let r = [];
    this.nodes.forEach( node => {
      let d = this.dist(node, ref);
      if (d <= dist) r.push(node);
    })
    return r;
  }

  findNeighbourhoodSize(t) {
    return 18 * Math.exp(-t/7)
  }

  findLearnRate(t) {
    return 3.5 * Math.exp(-t/7)
  }

  findBestMatch(input) {
    let bestIdx = 0;
    let d = Number.POSITIVE_INFINITY;

    this.nodes.forEach( (node, idx) => {
      let score = this.simFn(input, node);
      if (score < d) {
        d = score;
        bestIdx = idx;
      }
    })
    return this.nodes[bestIdx];
  }




}
