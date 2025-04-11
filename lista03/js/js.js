fetch('https://raw.githubusercontent.com/Fernandofgs91/PFEJ/main/lista03/js/dados.json')
.then(res => res.json())
.then(dados => console.log(dados));
