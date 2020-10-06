class RangeCounter {
  constructor(initialRange) {
    this.range = initialRange;
  }

  range() {
    return this.range;
  }

  incrementRange() {
    return this.range++
  }

  decrementRange() {
    return this.range--
  }


}

export default RangeCounter;