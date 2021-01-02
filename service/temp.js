function Demo() {
  this.test1 = function () {
    console.log(this);
  }
  this.test2 = () => {
    console.log(this);
  }

  var obj = {
    name: 'barry'
  }
  return obj;
}

var res = new Demo();
// res.test1();
// res.test2();
console.log(res);

/* var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a); //undefined
      console.log(this); //window
    }
  }
}
var j = o.b.fn;
j(); */
