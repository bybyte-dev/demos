"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRef, useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface Square {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  velocity: {
    x: number;
    y: number;
  };
}

const colors = ["#DDFF00", "#FFFFFF", "#4FACFC", "#028E02", "#FD6BA09"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [squares, setSquares] = useState<Square[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const squareSize = 80;
  const baseOpacity = 0.1;

  const initSquares = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const cols = Math.ceil(canvas.width / squareSize);
    const rows = Math.ceil(canvas.height / squareSize);

    const newSquares: Square[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newSquares.push({
          x: j * squareSize,
          y: i * squareSize,
          size: squareSize,
          opacity: baseOpacity,
        });
      }
    }

    setSquares(newSquares);
  };

  const createParticle = () => {
    if (!canvasRef.current) return null;
    return {
      x: Math.random() * canvasRef.current.width,
      y: Math.random() * canvasRef.current.height,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      velocity: {
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
      },
    };
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 2;
    ctx.lineJoin = "miter";
    ctx.strokeStyle = `rgba(200, 200, 200, ${baseOpacity})`;

    squares.forEach((square) => {
      if (square.opacity > baseOpacity) {
        square.opacity -= 0.01;
        if (square.opacity < baseOpacity) square.opacity = baseOpacity;
      }

      ctx.strokeStyle = `rgba(200, 200, 200, ${square.opacity})`;
      ctx.strokeRect(
        square.x + ctx.lineWidth / 2,
        square.y + ctx.lineWidth / 2,
        square.size - ctx.lineWidth,
        square.size - ctx.lineWidth
      );
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fillRect(
        particle.x - particle.size / 2,
        particle.y - particle.size / 2,
        particle.size,
        particle.size
      );
    });
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSquares();
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSquares((prev) =>
        prev.map((square) => {
          const isHover =
            x > square.x &&
            x < square.x + square.size &&
            y > square.y &&
            y < square.y + square.size;

          return {
            ...square,
            opacity: isHover ? 1 : square.opacity,
          };
        })
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.1) {
        const newParticle = createParticle();
        if (newParticle) {
          particlesRef.current = [
            ...particlesRef.current.slice(-200),
            newParticle,
          ];
        }
      }

      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.velocity.x,
          y: p.y + p.velocity.y,
          opacity: p.opacity - 0.005,
        }))
        .filter((p) => p.opacity > 0);

      drawParticles(ctx);
      drawGrid(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [squares]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen">
          <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-black" />

          <div className="relative z-10 ">{children}</div>
        </div>
      </body>
    </html>
  );
}
