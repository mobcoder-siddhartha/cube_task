import './App.css';
import { Canvas } from '@react-three/fiber';
import { Cube } from './components/Cube';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function App() {
    const [rotationY, setRotationY] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setRotationY(newValue);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Canvas style={{ flexGrow: 1, width: '100%', height: '80%' }}>
                <ambientLight intensity={2} />
                <Cube rotationY={rotationY} />
            </Canvas>
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
