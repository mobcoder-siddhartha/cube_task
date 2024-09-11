import './App.css';
import { Canvas } from '@react-three/fiber';
import { Cube } from './components/Cube';

function App() {
  return (
    <Canvas>
      <ambientLight intensity={2}/>
      <Cube/>
    </Canvas>
  );
}

export default App;
