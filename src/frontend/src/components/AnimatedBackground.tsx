import { useEffect, useRef } from "react";

interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  width: number;
  targetClose: number;
  speed: number;
}

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCandles();
    };

    const initCandles = () => {
      const cols = Math.floor(canvas.width / 28);
      candlesRef.current = Array.from({ length: cols }, (_, i) => {
        const baseY = canvas.height * 0.5;
        const open = baseY + (Math.random() - 0.5) * canvas.height * 0.4;
        const close = baseY + (Math.random() - 0.5) * canvas.height * 0.4;
        return {
          x: i * 28 + 14,
          open,
          close,
          high: Math.min(open, close) - Math.random() * 30,
          low: Math.max(open, close) + Math.random() * 30,
          width: 14,
          targetClose: baseY + (Math.random() - 0.5) * canvas.height * 0.4,
          speed: 0.005 + Math.random() * 0.01,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const c of candlesRef.current) {
        // Animate close toward target
        c.close += (c.targetClose - c.close) * c.speed;
        if (Math.abs(c.close - c.targetClose) < 5) {
          c.targetClose =
            canvas.height * 0.5 + (Math.random() - 0.5) * canvas.height * 0.4;
          c.open = c.close;
        }

        const bullish = c.close < c.open;
        const color = bullish
          ? "oklch(0.82 0.22 155 / 0.13)"
          : "oklch(0.65 0.26 20 / 0.13)";

        const bodyTop = Math.min(c.open, c.close);
        const bodyHeight = Math.abs(c.open - c.close);

        // Wick
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.moveTo(c.x, c.high);
        ctx.lineTo(c.x, c.low);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.fillRect(
          c.x - c.width / 2,
          bodyTop,
          c.width,
          Math.max(bodyHeight, 2),
        );
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Canvas candlesticks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 1 }}
      />

      {/* Bull - right side, green tint */}
      <div
        className="absolute float-up pulse-glow"
        style={{
          right: "-40px",
          bottom: "10%",
          width: "380px",
          height: "380px",
          opacity: 0.13,
          filter: "sepia(1) saturate(3) hue-rotate(95deg) brightness(1.2)",
          pointerEvents: "none",
        }}
      >
        <img
          src="/assets/generated/bull-bg-transparent.dim_400x400.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bear - left side, red tint */}
      <div
        className="absolute float-down pulse-glow"
        style={{
          left: "-40px",
          top: "15%",
          width: "350px",
          height: "350px",
          opacity: 0.12,
          filter: "sepia(1) saturate(3) hue-rotate(310deg) brightness(1.1)",
          pointerEvents: "none",
        }}
      >
        <img
          src="/assets/generated/bear-bg-transparent.dim_400x400.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Radial glow spots */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          top: "-200px",
          right: "-200px",
          background:
            "radial-gradient(circle, oklch(0.82 0.22 155 / 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-200px",
          left: "-200px",
          background:
            "radial-gradient(circle, oklch(0.65 0.26 20 / 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
