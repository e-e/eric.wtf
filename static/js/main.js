(function() {
  window.onload = main;
  function createScaleSelect() {
    let scales = Notes.scales;
    let select = document.querySelector('#scales');
    Object.keys(scales).forEach(scale => {
      const option = document.createElement('option');
      option.value = scale;
      option.innerText = scale;
      select.appendChild(option);
    });
    select.addEventListener('change', function(e) {
      Game.Sound.scale = Notes.selectScaleByName(this.value);
    });
  }
  function main() {
    let cvs = document.querySelector('#canvas');
    let ships = [
      'url(/static/images/spaceship0.png) 50 23, auto',
      'url(/static/images/spaceship1.png) 50 23, auto',
      'url(/static/images/spaceship2.png) 50 23, auto'
    ];
    let shipIndex = 0;
    setInterval(function() {
      let ship = ships.shift();
      cvs.style.cursor = ship;
      ships.push(ship);
    }, 1000);
    createScaleSelect();
  }
})();
