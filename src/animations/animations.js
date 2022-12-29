export class Animation {
    constructor(elm) {
        this.elm = elm;
        this.width = window.outerWidth;
        this.height = window.outerHeight;
        this.particles = [];
        this.particlesColors = ["#FF0F", "#FE0E", "#FD0D", "#FC0C", "#FB0B", "#FA0A", "#F909", "#F808", "#F707", "#F606", "#F505", "#F404", "#F303", "#F202", "#F101"];
        this.cx = window.innerWidth / 2;
        this.cy = window.innerHeight / 2;
        this.ctx = elm.getContext("2d");
        this.numberOfLoops = 100;
    }

    adjustCanvasElement() {
        this.elm.width = this.width;
        this.elm.height = this.height;
    }

    setParticles() {


        var angle = Math.random() * Math.PI * 2,
            radius = Math.random() * -10 + 5;

        this.particles.push({
            x: 0,
            y: 0,
            r: Math.random() * 10 + 5,
            sx: Math.cos(angle) * radius,
            sy: Math.sin(angle) * radius,
            pc: "#0000"
        });

    }

    getCursorPosition(e) {
        this.cx = e.clientX;
        this.cy = e.clientY;
    }

    setAnimationPosition(x, y) {

        this.cx = x;
        this.cy = y;
    }

    startAnimation(loops) {
        this.numberOfLoops += loops;
    }

    render() {


        var c = this.ctx;
        var p = this.particles;

        c.fillStyle = "#22222210";
        c.rect(0, 0, this.elm.width, this.elm.height);
        c.fill();

        if (this.numberOfLoops < 0) {
            this.particles.pop();
        } else {
            if (p.length < 100) {
                this.setParticles();
            }
            this.numberOfLoops--;
        }

        for (var i = 0; i < p.length; i++) {
            p[i].x += p[i].sx;
            p[i].y += p[i].sy;
            p[i].r -= 0.1;

            if (p[i].r <= 0) {
                p[i].r = Math.random() * 5 + 2;
                p[i].x = this.cx;
                p[i].y = this.cy;
                p[i].pc = this.particlesColors[parseInt(Math.random() * this.particlesColors.length)];
            }

            c.beginPath();
            c.fillStyle = p[i].pc;
            c.arc(p[i].x, p[i].y, p[i].r, 0, 10);
            c.fill();
            c.closePath();
        }

        if (p.length > 0) {
            // this.ctx.clear
            requestAnimationFrame(this.render.bind(this));
            // this.ctx.clearRect(0, 0, this.elm.width, this.elm.height);
        }
        console.log(this.numberOfLoops, " - ", this.particles.length)
    }
}
