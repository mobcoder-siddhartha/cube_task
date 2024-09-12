import './App.css'; // Import the CSS file for styling the app
import { Canvas } from '@react-three/fiber'; // Import canvas component for 3D rendersing
import { Cube } from './components/Cube'; // Import Cube component from folder
import { useState } from 'react';  // Import useState hook from React to manage state
import Slider from '@mui/material/Slider';  // Import the Slider componet form Material UI
import Box from '@mui/material/Box';   // Import Box component from Mateiral UI for layout

function App() {
  // State to manage the rotation of the Cube along Y-axis
    const [rotationY, setRotationY] = useState(0);

    const handleSliderChange = (e, newValue) => {
        setRotationY(newValue);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Canvas component for 3D rendering */}
            <Canvas style={{ flexGrow: 1, width: '100%', height: '80%' }}>
                <ambientLight intensity={2} />  {/* Add ambient light to illuminate the scene */}
                <Cube rotationY={rotationY} />
            </Canvas>
            {/* Box component to wrap the Slider and apply styling */}
            <Box sx={{ width: 300, marginTop: 2 }}>
                <Slider
                    min={0}
                    max={2 * Math.PI}
                    step={0.01}
                    value={rotationY}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider"
                />
            </Box>
        </div>
    );
}

export default App;
