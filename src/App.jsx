function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();
  const [isMenuVisible, setMenuVisible] = useState(false); // State for menu visibility

  let { onxrloaded, cubeCamera } = XR8Scene(canvasRef, R3Scene);

  useEffect(() => {
    XRExtras.Loading.showLoading({ onxrloaded });
  }, []);

  const handleObjectClick = () => {
    // Handle object click event
    // This can be a placeholder for your object interaction logic
    console.log('Object clicked!');
  };

  const handleMenuButtonClick = () => {
    // Toggle menu visibility
    setMenuVisible(!isMenuVisible);
  };

  return (
    <div className="App">
      <Canvas style={{ position: 'absolute' }}>
        <scene ref={R3Scene}>
          <ambientLight />
          {/* <DreiRefraction envMap={cubeCamera.renderTarget.texture} /> */}
          <LoadedGltf onClick={handleObjectClick} />
          <pointLight position={[10, 15, 10]} />

          {/* Display menu only if it's visible */}
          {isMenuVisible && (
            <Menu handleObjectClick={handleObjectClick} />
          )}

          {/* Overlay HTML for UI elements */}
          <Html>
            <button onClick={handleMenuButtonClick}>Toggle Menu</button>
          </Html>
        </scene>
      </Canvas>
      <canvas
        ref={canvasRef}
        width="480"
        height="640"
        style={{ position: 'absolute' }}
      ></canvas>
    </div>
  );
}

export default App;

function Menu({ handleObjectClick }) {
  // Menu component content
  return (
    <group>
      <Html>
        <div style={{ position: 'absolute', top: '50px', left: '50px' }}>
          <h2>Menu</h2>
          <button onClick={handleObjectClick}>Interact with Object</button>
        </div>
      </Html>
    </group>
  );
}

