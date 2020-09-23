function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;

  if (k > set.length || k <= 0) {
    return [];
  }

  if (k == set.length) {
    return [set];
  }

  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i + 1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

function sum(array) {
  var sum = 0;
  array.forEach(el => sum += el);
  return sum;
}

function accepted(sumToFind, maxDelta) {
  return v => {
    const delta = Math.abs(sum(v) - sumToFind);
    return delta >= 0 && delta <= maxDelta;
  }
}

function chooseBestSum(t, k, mas, d) {
  return k_combinations(mas, k).filter(accepted(t, d));
}


var mas = [];

var data = localStorage.getItem('mas');
mas = JSON.parse(data);

function addTo() {
  mas.push(document.getElementById("userinput").value);
  for (var f = 0; f < mas.length; f++) {
    mas[f] = parseInt(mas[f], 10);

    localStorage.setItem('mas', JSON.stringify(mas));
    document.getElementById("array").innerHTML = JSON.parse(localStorage.getItem('mas'));
    for (var ff = 0; ff < mas.length; ff++) {
      mas[ff] = parseInt(mas[ff], 10);
    }
  }

}

function fp(){
document.getElementById("array").innerHTML = mas;
}

function fm(){
  document.getElementById("array").innerHTML = null;
}

function deleteTo() {

  var item = document.getElementById("userDelete").value;
  item = parseInt(item, 10);

  var index = mas.indexOf(item);
  if (index > -1) {
    mas.splice(index, 1);
  }

  localStorage.setItem('mas', JSON.stringify(mas))
  document.getElementById("array").innerHTML = JSON.parse(localStorage.getItem('mas'));
}

function myFunction(){
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const t = parseInt(this.sumToFind.value, 10);
  const k = parseInt(this.combLength.value, 10);
  const d = parseInt(this.criteria.value, 10);

  const b = chooseBestSum(t, k, mas, d);
  this.result.value = '';
  if (b.length) {
    b.forEach(n => this.result.innerHTML += `${n} => ${sum(n)}<br>`);
  } else {
    this.result.value = 'Не найдено';
  }
});

}

//106, 54, 28, 86, 107, 41, 33, 47, 11, 40, 105, 109, 98, 103, 59
