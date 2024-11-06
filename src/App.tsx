import { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";

function App() {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let qrScanner: QrScanner | null = null;

    // Initialize QRScanner
    if (videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => setScannedData(result.data as unknown as null), // Callback to handle successful scan
        {
          onDecodeError: (err) => setError(err as unknown as null), // Callback to handle decode errors
        }
      );

      qrScanner.start().catch((err) => setError(err as unknown as null));
    }

    return () => {
      if (qrScanner) {
        qrScanner.stop();
      }
    };
  }, []);

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
      <div>
        {scannedData ? (
          <p>Scanned Data: {scannedData}</p>
        ) : (
          <p>No QR code scanned yet.</p>
        )}
      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
export default App;
