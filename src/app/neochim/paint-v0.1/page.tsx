"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Card } from "@/components/ui/card";

interface SphereCardProps {
  mainColor: string;
  paletteColors: string[];
  category: string;
  name: string;
}

const createShaders = () => ({
  vertexShader: `
    uniform float time;
    uniform vec2 mouse;
    uniform float clickTime;
    uniform vec3 clickPosition;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;

      vec3 newPosition = position;

      // Complex surface waves
      float waveX = sin(time * 2.0 + position.x * 4.0) * 0.03;
      float waveY = cos(time * 2.0 + position.y * 4.0) * 0.03;
      float waveZ = sin(time * 2.0 + position.z * 4.0) * 0.03;
      newPosition += normal * (waveX + waveY + waveZ);

      // Click wave effect
      float timeSinceClick = time - clickTime;
      if (timeSinceClick < 2.5) {
        float distanceToClick = distance(newPosition, clickPosition);
        float waveIntensity = sin(distanceToClick * 10.0 - timeSinceClick * 5.0) * 0.02;
        waveIntensity *= exp(-timeSinceClick * 0.5) * smoothstep(0.0, 0.2, timeSinceClick);
        newPosition += normal * waveIntensity;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float dProd = max(0.0, dot(vNormal, light));

      vec3 baseColor = color;
      baseColor += vec3(
        sin(vUv.x * 10.0 + time * 0.5) * 0.1,
        sin(vUv.y * 10.0 + time * 0.7) * 0.1,
        sin((vUv.x + vUv.y) * 10.0 + time * 0.9) * 0.1
      );

      vec3 viewDir = normalize(cameraPosition - vPosition);
      vec3 halfDir = normalize(light + viewDir);
      float specular = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
      vec3 specColor = vec3(1.0, 1.0, 1.0) * specular * 0.5;

      vec3 finalColor = baseColor * (dProd * 0.5 + 0.5) + specColor;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
});

const SphereCard: React.FC<SphereCardProps> = ({
  mainColor = "#f5d0ba",
  paletteColors = ["#f5c3a8", "#f5d0ba", "#f5e0d0"],
  category = "Пастельные",
  name = "Белый Молочный",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    planet?: THREE.Mesh;
    clock?: THREE.Clock;
    animationId?: number;
  }>({});

  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const clickTime = useRef(0);
  const clickPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    scene.background = new THREE.Color(0xffffff);
    camera.position.z = 2;
    renderer.setSize(100, 100);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(mainColor) },
        mouse: { value: new THREE.Vector2(0, 0) },
        clickTime: { value: 0 },
        clickPosition: { value: new THREE.Vector3() },
      },
      vertexShader: createShaders().vertexShader,
      fragmentShader: createShaders().fragmentShader,
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight);
    scene.add(pointLight);

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      planet,
      clock: new THREE.Clock(),
    };

    // Animation loop
    function animate() {
      const { renderer, scene, camera, planet, clock } = sceneRef.current;
      if (!renderer || !scene || !camera || !planet || !clock) return;

      sceneRef.current.animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      if (planet.material instanceof THREE.ShaderMaterial) {
        planet.material.uniforms.time.value = elapsedTime;
        planet.material.uniforms.mouse.value = mouse.current;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      const { renderer, scene, planet, animationId } = sceneRef.current;
      if (animationId) cancelAnimationFrame(animationId);
      if (planet) {
        scene?.remove(planet);
        planet.geometry.dispose();
      }
      renderer?.dispose();
    };
  }, [mainColor]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handleClick = () => {
    const { scene, camera, planet, clock } = sceneRef.current;
    if (!scene || !camera || !planet || !clock) return;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects([planet]);

    if (intersects.length > 0) {
      clickTime.current = clock.getElapsedTime();
      clickPosition.current.copy(intersects[0].point);

      if (planet.material instanceof THREE.ShaderMaterial) {
        planet.material.uniforms.clickTime.value = clickTime.current;
        planet.material.uniforms.clickPosition.value = clickPosition.current;
      }
    }
  };

  return (
    <Card className="w-[200px]">
      <div className="p-4">
        <div className="w-[100px] h-[100px] mx-auto mb-4">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{category}</h3>
          <p className="text-sm text-muted-foreground">{name}</p>
          <div className="flex gap-1">
            {paletteColors.map((color, index) => (
              <div
                key={index}
                className="flex-1 h-6 rounded"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Данные о цветах
const colorPalettes = [
  {
    mainColor: "#f5d0ba",
    paletteColors: ["#f5c3a8", "#f5d0ba", "#f5e0d0"],
    category: "Пастельные",
    name: "Белый Молочный",
  },
  {
    mainColor: "#ff6b6b",
    paletteColors: ["#ff5252", "#ff6b6b", "#ff8787"],
    category: "Красные",
    name: "Коралловый",
  },
  {
    mainColor: "#4ecdc4",
    paletteColors: ["#45b7af", "#4ecdc4", "#6ad4cd"],
    category: "Бирюзовые",
    name: "Морская волна",
  },
  {
    mainColor: "#ffbe0b",
    paletteColors: ["#ffa900", "#ffbe0b", "#ffd000"],
    category: "Жёлтые",
    name: "Солнечный",
  },
];

// Компонент палитры цветов
const ColorPalette: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {colorPalettes.map((palette, index) => (
        <SphereCard key={index} {...palette} />
      ))}
    </div>
  );
};

export default ColorPalette;
