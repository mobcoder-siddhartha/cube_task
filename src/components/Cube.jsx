import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Cube = ({ rotationY }) => {
    const colors = ["Teal", "Turquoise", "Orange", "Violet", "hotpink", "Olive"];
    const cubeRef = useRef();
    const { camera } = useThree();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // handle mouse click event
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
        if (cubeRef.current) {
            cubeRef.current.rotation.y = rotationY;
        }
    });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick]);

    return (
        <>
            <OrbitControls />
            <mesh ref={cubeRef}>
                <boxGeometry args={[2, 2, 2]} />
                {colors.map((color, i) => <meshStandardMaterial key={i} attach={`material-${i}`} color={color} />)}
            </mesh>
        </>
    );
}
