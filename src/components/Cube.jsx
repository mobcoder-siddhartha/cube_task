import { OrbitControls } from "@react-three/drei"
import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Cube = () => {
    const colors = ["Teal", "Turquoise", "Orange", "Violet", "hotpink", "Olive"]
    const cubeRef = useRef();
    const { camera, scene } = useThree();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // Handle mouse click
  const handleClick = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(cubeRef.current);

    if (intersects.length > 0) {
      const faceIndex = intersects[0].face.materialIndex;
      alert(`Clicked face color: ${colors[faceIndex]}`);
    }
  };

  useFrame(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

    return (
        <>
            <OrbitControls />
            <mesh ref={cubeRef}>
                <boxGeometry />
                {colors.map((color, i) => <meshStandardMaterial key={i} attach={`material-${i}`} color={color} />)}
            </mesh>
        </>
    )
}