function generateRandomArray(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 20001) - 10000;
  }
  return arr;
}


function methodSort(arr) {
  const sorted = [...arr].sort((a, b) => b - a);
  return sorted[5];
}


function methodTop6(arr) {
  let top = [];

  for (let num of arr) {
    if (top.length < 6) {
      top.push(num);
      top.sort((a, b) => b - a);
    } else if (num > top[5]) {
      top[5] = num;
      top.sort((a, b) => b - a);
    }
  }

  return top[5];
}

function methodRepeatedMax(arr) {
  let temp = [...arr];
  let max;

  for (let i = 0; i < 6; i++) {
    max = Math.max(...temp);
    let index = temp.indexOf(max);
    temp[index] = -Infinity;
  }

  return max;
}

function measureTime(fn, arr) {
  const runs = 3;
  let total = 0;

  for (let i = 0; i < runs; i++) {
    const copy = [...arr];
    const start = performance.now();
    fn(copy);
    const end = performance.now();
    total += (end - start);
  }

  return (total / runs).toFixed(2);
}

const sizes = [100, 1000, 10000, 100000];
const results = [];

for (let size of sizes) {
  const arr = generateRandomArray(size);

  const t1 = measureTime(methodSort, arr);
  const t2 = measureTime(methodTop6, arr);
  const t3 = measureTime(methodRepeatedMax, arr);

  results.push({ size, sort: t1, top6: t2, repeatedMax: t3 });
}

console.table(results);
