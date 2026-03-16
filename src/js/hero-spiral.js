/**
 * Hero spiral — горизонтальная спираль с анимацией
 * RAF, те же принципы что mono/hero-hex
 */
(function () {
  function init() {
    var bg = document.getElementById('hero-bg') || document.querySelector('#hero .hero-bg');
    if (!bg) return;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    bg.appendChild(canvas);

    var width, height;
    var startTime;

    function resize() {
      width = bg.offsetWidth;
      height = bg.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function draw(t) {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      var cx = width * 0.7;
      var cy = height * 0.5;
      var baseR = Math.min(width, height) * 0.2;
      var growth = Math.min(width, height) * 0.028;

      var spread = 1 + 0.15 * Math.sin(t * 0.18);
      var unwind = 1 + 0.12 * Math.sin(t * 0.15);
      var rotation = t * 0.08;

      var turns = 3;
      var theme = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var fillAlpha = theme === 'dark' ? 0.09 : 0.06;

      var maxR = (baseR * 1.25 + growth * Math.PI * 2 * turns) * 1.6;
      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, 'rgba(201,151,58,' + (fillAlpha * 1.8) + ')');
      grad.addColorStop(0.35, 'rgba(201,151,58,' + fillAlpha + ')');
      grad.addColorStop(1, 'rgba(201,151,58,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      var steps = 220;
      ctx.beginPath();
      for (var i = 0; i <= steps; i++) {
        var angle = (i / steps) * Math.PI * 2 * turns + rotation;
        var r = baseR * spread + growth * unwind * (i / steps) * Math.PI * 2 * turns;
        var x = cx + r * Math.cos(angle) * 1.6;
        var y = cy + r * Math.sin(angle) * 0.8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = theme === 'dark' ? 'rgba(201,151,58,0.16)' : 'rgba(201,151,58,0.12)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    function tick() {
      var t = (performance.now() - startTime) / 1000;
      draw(t);
      requestAnimationFrame(tick);
    }

    resize();
    startTime = performance.now();
    window.addEventListener('resize', resize);
    window.addEventListener('load', function () { resize(); });
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(resize).observe(bg);
    }
    if (!width || !height) {
      requestAnimationFrame(function () {
        resize();
        if (width && height) tick();
      });
      return;
    }
    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
