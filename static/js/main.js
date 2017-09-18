(function() {
	window.onload = main;
	function createScaleSelect() {
		let scales = Notes.scales;
		let select = document.querySelector("#scales");
		Object.keys(scales).forEach(scale => {
			const option = document.createElement("option");
			option.value = scale;
			option.innerText = scale;
			select.appendChild(option);
		});
		select.addEventListener("change", function(e) {
			console.log(this.value);
			Game.Sound.scale = Notes.selectScaleByName(this.value);
			console.log(Game.Sound.scale);
		});
	}
	function main() {
		createScaleSelect();
	}
})();