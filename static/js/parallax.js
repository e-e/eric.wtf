(function() {
	const links = [
		{anchor: "github", href: "https://github.com/e-e"},
		{anchor: "linkedin", href: "https://www.linkedin.com/in/eric-ellingson/"},
		{anchor: "stackoverflow", href: "https://stackoverflow.com/users/2543424/e-e?tab=profile"},
		{anchor: "hackerrank", href: "https://www.hackerrank.com/xuomo"},
	];
	// console.log(links);

	// var _w = window.innerWidth * 0.99;
	// var _h = window.innerHeight * 0.98;
	var _w = window.innerWidth;
	var _h = window.innerHeight;

	var Game = {};
	Game._h = _h;
	Game._w = _w;

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.style.backgroundColor = '#000';
	canvas.setAttribute('width', Game._w);
	canvas.setAttribute('height', Game._h);

	Game.angVel = Math.PI * (3/2);


	Game.Parallax = {
		levels: 3,
		delta_theta_r: Math.PI / 2,
		objStartRad: 2,
		starNumCnst: 15,
		// xSpeed: 1,
		xSpeed: 0.1,
	};

	function normalize(value, max_p, min_p, max, min) {
		return Math.floor((( max_p - min_p ) / ( max - min ) * ( value - max)) + max_p);
	}

	Game.Sound = {
		muteButton: document.querySelector("#mute"),
		notes: Notes.selectScaleByName("C# minor"),
		getFreq(y) {
			let yN = normalize(y, Game.Sound.notes.scale.length, 0, window.innerHeight, 0);
			// console.log("yN", yN);
			return Game.Sound.notes.scale[yN].freq;
		},
		// getVolume(z) {
		// 	let zN = normalize(z, )
		// },
		play(y, z) {
			if (!Game.Sound.muteButton.checked) {
				let sineWave = new Pizzicato.Sound({
					source: "wave",
					options: {
						frequency: Game.Sound.getFreq(y)
					}
				});
				sineWave.attack = 4;
				sineWave.volume = 0.01 ;
				sineWave.release = 0.9;
				// sineWave.addEffect(new Pizzicato.Effects.Delay({
				// 	feedback: 0.6,
				// 	time:0.4,
				// 	mix:0.5
				// }));
				var reverb = new Pizzicato.Effects.Reverb({
					time: 0.01,
					decay: 0.01,
					reverse: false,
					mix: 0.5
				});
				var delay = new Pizzicato.Effects.PingPongDelay({
					feedback: 0.6,
					time:0.4,
					mix:0.5
				});
				sineWave.addEffect(delay);
				sineWave.addEffect(reverb);

				sineWave.on("play", function() {
					setTimeout(() => {
					sineWave.stop()
					}, 1000);
				});
				sineWave.play();
			}
		}
	};

	Game.Parallax.Particle = function(z, twinkle) {
		var theta = (Math.PI / 4) * Math.random();
		this.theta = theta;
		// x and y need to span for one full length on either side of the main game window
		// this is because the 'stars' will move AT MOST one width of the screen either direction,
		// following the motion of the game ball
		this.x = Math.random() * Game._w;
		this.y = Math.random() * Game._h;
		this.z = z;
		this.twinkle = twinkle;

		var rnd = Math.random();

		if (rnd > 0.4) this.clr = [255,255,255];
		else if (rnd > 0.2) this.clr = [255,255,200];
		else this.clr = [175,175,255];

		// this.r = this.z * Math.tan(theta);
		this.r = (Game.Parallax.objStartRad / this.z);

		this.update = function(d_theta) {
			this.x += (Game.Parallax.xSpeed * 2) / ( 2 * this.z * Math.sin( d_theta / 2) );
			// cycle the stars to the other side if they reach
			if (this.x > Game._w + this.r) {
				this.x = 0;
				this.y = Math.random() * Game._h;
				Game.Sound.play(this.y);
			} else if (this.x < -this.r) {
				this.x = Game._w;
				this.y = Math.random() * Game._h; 
			} else if (this.y > Game._h + this.r) {
				this.x = Math.random() * Game._w;
				this.y = 0;
			} else if (this.y < -this.r) {
				this.x = Math.random() * Game._w;
				this.y = Game._h;
			}
		};

		this.draw = function() {
			if (this.twinkle) {
				var rnd = Math.random();

				if (rnd >= 0.05) {
					color = 'rgba(' + this.clr[0] + ',' + this.clr[1] + ',' + this.clr[2] + ',0.5)';
				} else {
					color = 'rgba(' + this.clr[0] + ',' + this.clr[1] + ',' + this.clr[2] + ',' + (rnd).toString() + ')';
				}
			} else {
				color = 'rgba(' + this.clr[0] + ',' + this.clr[1] + ',' + this.clr[2] + ',0.5)';
			}

			ctx.save();
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		};
		// console.log(this);
	};

	Game.Parallax.LinkParticle = function(link, z, twinkle) {
		this.link = document.createElement("a");
		this.link.classList.add("space-link");
		this.link.href = link.href;
		this.link.innerText = link.anchor;
		this.linkAppended = false;
		this.offsetWidth = 20;
		let fontSize = (24 / z).toString();
		// console.log(z, fontSize);
		this.link.style.fontSize = fontSize + "px";

		
		var theta = (Math.PI / 4) * Math.random();
		this.theta = theta;
		// x and y need to span for one full length on either side of the main game window
		// this is because the 'stars' will move AT MOST one width of the screen either direction,
		// following the motion of the game ball
		this.x = Math.random() * Game._w;
		this.y = Math.random() * Game._h;
		this.z = z;
		this.twinkle = twinkle;

		var rnd = Math.random();

		if (rnd > 0.4) this.clr = [255,255,255];
		else if (rnd > 0.2) this.clr = [255,255,200];
		else this.clr = [175,175,255];

		// this.r = this.z * Math.tan(theta);
		// this.r = (Game.Parallax.objStartRad / this.z);
		this.r = this.offsetWidth;


		this.update = function(d_theta) {
			this.r = this.offsetWidth;
			this.x += Game.Parallax.xSpeed / ( 2 * this.z * Math.sin( d_theta / 2) );
			// cycle the stars to the other side if they reach
			if (this.x > Game._w + this.r) {
				this.x = -this.r;
				this.y = Math.random() * Game._h;
			} else if (this.x < -this.r) {
				this.x = Game._w;
				this.y = Math.random() * Game._h; 
			} else if (this.y > Game._h + this.r) {
				this.x = Math.random() * Game._w;
				this.y = 0;
			} else if (this.y < -this.r) {
				this.x = Math.random() * Game._w;
				this.y = Game._h;
			}
		};

		this.draw = function() {
			if (!this.linkAppended) {
				document.body.appendChild(this.link);
				// console.log(this.link);
				this.linkAppended = true;
				this.offsetWidth = this.link.offsetWidth;
				// console.dir(this.link.offsetWidth);
			}
			if (this.twinkle) {
				var rnd = Math.random();

				if (rnd >= 0.05) {
					color = 'rgba(' + this.clr[0] + ',' + this.clr[1] + ',' + this.clr[2] + ',0.5)';
				} else {
					color = 'rgba(' + this.clr[0] + ',' + this.clr[1] + ',' + this.clr[2] + ',' + (rnd).toString() + ')';
				}
			} else {
				color = 'rgba(' + this.clr[0] + ',' + this.clr[1] + ',' + this.clr[2] + ',0.5)';
			}
			this.link.style.top = this.y + "px";
			this.link.style.left = this.x + "px";
		};
		// console.log(this);
	};

	Game.Parallax.LinkParticleGroup = function(links, z, twinkle) {
		this.particles = [];
		this.z = z;
		this.twinkle = twinkle;
		this.links = links;

		if (this.twinkle === undefined) this.twinkle = false;

		for (var i = 0; i < this.links.length; i++) {
			this.particles[i] = new Game.Parallax.LinkParticle(this.links[i], this.z, this.twinkle);
		}

		this.update = function() {
			var particle;
			for (var i in this.particles) {
				particle = this.particles[i];
				particle.update(Game.angVel);
			}
		};

		this.draw = function() {
			var particle;
			for (var i in this.particles) {
				particle = this.particles[i];
				particle.draw();
			}
		};
		// console.log(this);
		return this;
	};

	Game.Parallax.ParticleGroup = function(z, twinkle) {
		this.particles = [];
		this.z = z;
		this.n = this.z * Game.Parallax.starNumCnst;
		this.twinkle = twinkle;

		if (this.twinkle === undefined) this.twinkle = false;

		for (var i = 0; i < this.n; i++) {
			this.particles[i] = new Game.Parallax.Particle(this.z, this.twinkle);
		}

		this.update = function() {
			var particle;
			for (var i in this.particles) {
				particle = this.particles[i];
				particle.update(Game.angVel);
			}
		};

		this.draw = function() {
			var particle;
			for (var i in this.particles) {
				particle = this.particles[i];
				particle.draw();
			}
		};
		// console.log(this);
		return this;
	};

	Game.Parallax.objects = [
		(new Game.Parallax.ParticleGroup(1.2)),
		(new Game.Parallax.ParticleGroup(1.5)),
		(new Game.Parallax.ParticleGroup(2.5)),
		(new Game.Parallax.ParticleGroup(3, true)),
		(new Game.Parallax.ParticleGroup(4.2, true)),
		(new Game.Parallax.ParticleGroup(5, true)),
		(new Game.Parallax.ParticleGroup(15, true)),
		(new Game.Parallax.LinkParticleGroup(links, 1)),
		(new Game.Parallax.LinkParticleGroup(links, 2)),
		(new Game.Parallax.LinkParticleGroup(links, 4)),
		(new Game.Parallax.LinkParticleGroup(links, 6)),
	];

	Game.Parallax.update = function() {
		for (var i = 0; i < Game.Parallax.objects.length; i++) {
			Game.Parallax.objects[i].update();
		}
	}

	Game.Parallax.draw = function() {
		ctx.save();
		ctx.clearRect(0, 0, _w, _h);

		for (var i = 0; i < Game.Parallax.objects.length; i++) {
			Game.Parallax.objects[i].draw();
		}

		ctx.restore();
	}

	Game.Utility = {};

	Game.Utility.Frame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||

			// assume 'element' is visible
			function (callback, element) {
				var self = this,
					start,
					finish;

					window.setTimeout(function() {
						start = +new Date(); // <=> new Date().getTime()
						callback(start);
						finish = +new Date();

						self.timeout = 1000 / 60 - (finish - start);
					}, self.timeout);
			};
	})();

	Game.updateLinks = function() {

	};
	Game.update = function() {
		canvas.setAttribute('width', Game._w);
		canvas.setAttribute('height', Game._h);
		Game.Parallax.update();
	}

	Game.draw = function() {
		Game.Parallax.draw();
	};

	Game.Run = function() {
		Game.update();
		Game.updateLinks();
		Game.draw();

		// continue main game loop function
		Game.Utility.Frame.call(window, Game.Run);

	};

	window.addEventListener("resize", function(e) {
		// console.log("resizing!");
		Game._w = window.innerWidth;
		Game._h = window.innerWidth;
	});


	// actually starts everything 
	Game.Utility.Frame.call(window, Game.Run);

	window.Game = Game;
})();
	