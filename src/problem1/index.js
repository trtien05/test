
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  return n === 1 ? 1 : n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(100)); // 5050
console.log(sum_to_n_b(100)); // 5050
console.log(sum_to_n_c(100)); // 5050