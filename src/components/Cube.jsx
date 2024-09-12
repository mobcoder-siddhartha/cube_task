import { OrbitControls } from "@react-three/drei";  // Import OrbitControls for rotation and zooming the scene
import { useRef, useEffect } from "react";  // Import hooks from react 
import { useThree, useFrame } from "@react-three/fiber"; // Import hookes for 3D rendering
import * as THREE from "three"; // Import the THREE namespace form three.js library

export const Cube = ({ rotationY }) => {
    // Array of colours for Cube's faces
    const colors = ["Teal", "Turquoise", "Orange", "Violet", "hotpink", "Olive"];
    // Reference to cube mesh
    const cubeRef = useRef();
    // get camera from  the THREE.js context
    const { camera } = useThree();
    // Create a raycaster fro dedecting  intersection  with 3D objects
    const raycaster = new THREE.Raycaster();

    // create a vector to sotre the pointer's position
    const pointer = new THREE.Vector2();

    // handle mouse click event
    const handleClick = (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Check if the ray intersects the cube
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(cubeRef.current);

        // If there's intersection, alert the colour of the clicked face
        if (intersects.length > 0) {
            const faceIndex = intersects[0].face.materialIndex;
            alert(`Clicked face color: ${colors[faceIndex]}`);
        }
    };

    // Use useFrame to update the cube's rotation of each frame
    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.y = rotationY;  // Set the roration of the cube based on the rotationY prop
        }
    });

    // useEffect hook to add  and remove  the click event listener
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick]);  // passed the dependency of handleCick

    return (
        <>
        {/* Add OrbitControls to enable camera controls */}
            <OrbitControls />
            {/* Define the 3D cube mesh */}
            <mesh ref={cubeRef}>
                {/* Create a box geometry with dimensions2*2*2 */}
                <boxGeometry args={[2, 2, 2]} />
                {colors.map((color, i) => <meshStandardMaterial key={i} attach={`material-${i}`} color={color} />)}
            </mesh>
        </>
    );
}
