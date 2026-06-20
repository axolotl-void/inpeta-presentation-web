import React, { useEffect, useRef, useState } from 'react';

/*
 * WebGLGlobe — Realistic 3D Satellite Earth using WebGL Earth API.
 * Driven by scrollProgress (0..1) to perform:
 *   - Auto-rotation on Hero section (p < 0.11)
 *   - Zoom & pan to Banda Aceh (DISKOMINSA) in Section 2 (0.11 <= p < 0.22)
 *   - Shrink and drift in Section 3 (0.22 <= p < 0.33)
 *   - Fade out / hide in Sections 4-8 (0.33 <= p < 0.88)
 *   - Fade back in Section 9 (p >= 0.88)
 */
export default function WebGLGlobe({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const earthRef = useRef(null);
  const markerRef = useRef(null);
  const animationRef = useRef(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  // State values for interpolation
  const currentCoords = useRef({ lat: 0, lng: 95.33, zoom: 2.0 });
  const [styles, setStyles] = useState({
    opacity: 1,
    transform: 'scale(1) translate(0px, 0px)',
    display: 'block'
  });

  // Check if WebGL Earth API is loaded from index.html
  useEffect(() => {
    const checkApi = setInterval(() => {
      if (window.WE) {
        setApiLoaded(true);
        clearInterval(checkApi);
      }
    }, 100);
    return () => clearInterval(checkApi);
  }, []);

  // Initialize WebGL Earth
  useEffect(() => {
    if (!apiLoaded || !containerRef.current || earthRef.current) return;

    try {
      // Create Earth in container
      const earth = new window.WE.map(containerRef.current, {
        center: [0, 95.33],
        zoom: 2.0,
        dragging: false,
        scrollWheelZoom: false,
        sky: false,
        atmosphere: true
      });

      // Load Esri World Imagery (Satellite) tiles
      const satLayer = window.WE.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri Satellite',
        minZoom: 1,
        maxZoom: 12
      });
      satLayer.addTo(earth);

      // Add coordinate marker for DISKOMINSA Aceh
      const marker = window.WE.marker([5.5615, 95.3375]);
      marker.addTo(earth);
      marker.bindPopup("<div style='color:#1e293b; font-family:sans-serif; font-size:12px; line-height:1.4;'><b>UPTD Statistik DISKOMINSA</b><br>Jln. Tgk. Cot Plieng No. 48, Banda Aceh</div>", {
        maxWidth: 180,
        closeButton: false
      });

      earthRef.current = earth;
      markerRef.current = marker;
    } catch (err) {
      console.error("Failed to initialize WebGL Earth:", err);
    }
  }, [apiLoaded]);

  // Animation & Interpolation Loop
  useEffect(() => {

    let before = performance.now();
    let autoRotateLng = 95.33;

    const animate = (now) => {
      const elapsed = now - before;
      before = now;

      // Auto rotation increment (degrees per millisecond)
      const degPerMs = 0.005; // slow rotation
      autoRotateLng = (autoRotateLng + elapsed * degPerMs) % 360;

      const p = scrollProgress;
      let targetLat = 0;
      let targetLng = autoRotateLng;
      let targetZoom = 2.0;
      let targetOpacity = 1;
      let targetTransform = 'scale(1) translate(0px, 0px)';
      let targetDisplay = 'block';
      let shouldOpenPopup = false;

      // ── Interpolate values based on Scroll Progress ──
      if (p < 0.11) {
        // Section 1: Hero Cover (Center-Bottom, Rotating)
        const progress = p / 0.11;
        targetLat = 0 * (1 - progress) + 5.56 * progress;
        // Interpolate longitude from current auto-rotation to Aceh
        targetLng = autoRotateLng * (1 - progress) + 95.33 * progress;
        targetZoom = 3.2 * (1 - progress) + 6.2 * progress;
        targetOpacity = 1;

        // Shift down by 35vh in Cover section, transitioning smoothly to 0vh in Section 2
        const yTrans = (1 - progress) * 35;
        targetTransform = `translateY(${yTrans}vh)`;
      } else if (p < 0.22) {
        // Section 2: Profil Instansi (Aceh Zoomed-in)
        targetLat = 5.5615;
        targetLng = 95.3375;
        targetZoom = 6.2;
        targetOpacity = 1;
        shouldOpenPopup = true;
      } else if (p < 0.33) {
        // Section 3: Masalah (Shrink to top-right corner)
        const progress = (p - 0.22) / 0.11;
        targetLat = 5.5615 * (1 - progress) + 15 * progress;
        targetLng = 95.3375 * (1 - progress) + 105 * progress;
        targetZoom = 6.2 * (1 - progress) + 2.5 * progress;

        // Shrink & translation styles
        targetOpacity = 1 - progress * 0.4; // fade slightly
        const scale = 1 - progress * 0.6; // 1.0 down to 0.4
        const xTrans = progress * 32; // shift right
        const yTrans = -progress * 24; // shift up
        targetTransform = `scale(${scale}) translate(${xTrans}vw, ${yTrans}vh)`;
      } else if (p < 0.88) {
        // Sections 4-8: Hidden
        targetOpacity = 0;
        targetDisplay = 'none';
        targetZoom = 2.2;
      } else {
        // Section 9: Kesimpulan (Fade back in)
        const progress = (p - 0.88) / 0.12;
        targetOpacity = progress;
        targetLat = 15 * (1 - progress) + 0 * progress;
        targetLng = 105 * (1 - progress) + autoRotateLng * progress;
        targetZoom = 2.5 * (1 - progress) + 2.3 * progress;
      }

      // Smoothly interpolate current values towards targets (Lerp)
      const lerpSpeed = 0.08;
      currentCoords.current.lat += (targetLat - currentCoords.current.lat) * lerpSpeed;
      currentCoords.current.zoom += (targetZoom - currentCoords.current.zoom) * lerpSpeed;

      // Handle longitude wrap-around properly for lerp
      let diffLng = targetLng - currentCoords.current.lng;
      // Normalise difference to -180..180
      diffLng = ((diffLng + 180) % 360) - 180;
      currentCoords.current.lng += diffLng * lerpSpeed;

      // Update WebGL Earth Camera
      if (earthRef.current) {
        try {
          earthRef.current.setView(
            [currentCoords.current.lat, currentCoords.current.lng],
            currentCoords.current.zoom
          );

          // Control info popup based on section
          if (markerRef.current) {
            if (shouldOpenPopup) {
              // Open popup when centered on Aceh
              if (!markerRef.current.isOpen) {
                markerRef.current.openPopup();
                markerRef.current.isOpen = true;
              }
            } else {
              // Close popup elsewhere
              if (markerRef.current.isOpen) {
                // WebGL Earth marker popup close method
                markerRef.current.closePopup();
                markerRef.current.isOpen = false;
              }
            }
          }
        } catch (err) {
          console.warn("Error updating WebGL Earth Camera:", err);
        }
      }

      // Update CSS state
      setStyles({
        opacity: targetOpacity,
        transform: targetTransform,
        display: targetDisplay
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress]);

  return (
    <div 
      className="earth-container-3d" 
      style={{
        opacity: styles.opacity,
        transform: styles.transform,
        display: styles.display
      }}
    >
      <div 
        id="earth_div" 
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />
      {/* Atmosphere Glow Overlay */}
      <div 
        className="earth-atmosphere-glow" 
        style={{
          opacity: scrollProgress < 0.11 ? (1 - scrollProgress / 0.11) : 0,
          transition: 'opacity 0.4s ease'
        }}
      />
    </div>
  );
}
