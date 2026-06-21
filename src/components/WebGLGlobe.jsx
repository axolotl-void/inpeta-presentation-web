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
  const mountTimeRef = useRef(performance.now());
  const [apiLoaded, setApiLoaded] = useState(false);

  // State values for interpolation
  const currentCoords = useRef({ lat: 0, lng: 95.33, zoom: 2.0 });
  const currentTransform = useRef({ x: 0, y: 120, scale: 1 });
  const [styles, setStyles] = useState({
    opacity: 0,
    transform: 'translate(0vw, 120vh) scale(1)',
    display: 'block'
  });

  const scrollProgressRef = useRef(scrollProgress);
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

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
      marker.bindPopup("<div style='color:var(--text-main); font-family:var(--font-sans); font-size:12.5px; line-height:1.5; font-weight:400;'><b>UPTD Statistik DISKOMINSA</b><br><span style='color:var(--text-muted); font-size:11.5px;'>Jln. Tgk. Cot Plieng No. 48, Banda Aceh</span></div>", {
        maxWidth: 190,
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

      const p = scrollProgressRef.current;
      let targetLat = 0;
      let targetLng = autoRotateLng;
      let targetZoom = 2.0;
      let targetOpacity = 1;
      let targetDisplay = 'block';
      let shouldOpenPopup = false;

      // target transform values (lerped in JS)
      let targetX = 0;
      let targetY = 0;
      let targetScale = 1;

      // ── Cinematic entrance: globe rises from below ──
      const elapsedSinceMount = (now - mountTimeRef.current) / 1000; // seconds
      const entranceDuration = 1.2; // seconds for globe to rise
      const entranceProgress = Math.min(elapsedSinceMount / entranceDuration, 1);
      // Smooth easing: cubic-bezier approximation
      const entranceEase = 1 - Math.pow(1 - entranceProgress, 3);

      const isMobile = window.innerWidth <= 768;

      // ── Interpolate values based on Scroll Progress ──
      if (p < 0.11) {
        // Section 1: Hero Cover (Center-Bottom, Rotating)
        const progress = p / 0.11;
        targetLat = 0 * (1 - progress) + 5.56 * progress;
        // Interpolate longitude from current auto-rotation to Aceh
        targetLng = autoRotateLng * (1 - progress) + 95.33 * progress;
        targetZoom = 3.2 * (1 - progress) + 6.2 * progress;
        targetOpacity = entranceEase; // fade in during entrance

        // Globe rises from 120vh → 35vh during entrance, then transitions to 0vh as user scrolls
        const baseY = (1 - progress) * 35;
        const entranceY = (1 - entranceEase) * 85; // 120vh - 35vh = 85vh extra offset
        targetX = 0;
        targetY = baseY + entranceY;
        targetScale = 1;
      } else if (p < 0.22) {
        // Section 2: Profil Instansi (Aceh Zoomed-in, shifted to right)
        targetLat = 5.5615;
        targetLng = 95.3375;
        targetZoom = 6.4;
        targetOpacity = 1;

        if (isMobile) {
          targetX = 0;
          targetY = 22; // fixed shift down
          targetScale = 0.85; // fixed scale
          shouldOpenPopup = currentTransform.current.y > 15;
        } else {
          targetX = 40; // fixed shift right by 40vw (avoids boundary crop with 180vw container)
          targetY = 0;
          targetScale = 1.15; // fixed scale
          shouldOpenPopup = currentTransform.current.x > 30;
        }
      } else if (p < 0.33) {
        // Section 3: Masalah (Shrink to top-right corner)
        const progress = (p - 0.22) / 0.11;
        targetLat = 5.5615 * (1 - progress) + 15 * progress;
        targetLng = 95.3375 * (1 - progress) + 105 * progress;
        targetZoom = 6.4 * (1 - progress) + 2.5 * progress;
        targetOpacity = 1 - progress * 0.4; // fade slightly

        if (isMobile) {
          targetX = progress * 32;
          targetY = 22 * (1 - progress) - progress * 24;
          targetScale = (1 - 0.15) * (1 - progress) + 0.4 * progress;
        } else {
          targetX = 40 * (1 - progress) + 32 * progress; // start from 40 instead of 34
          targetY = 0 * (1 - progress) - 24 * progress;
          targetScale = 1.15 * (1 - progress) + 0.4 * progress;
        }
      } else if (p < 0.88) {
        // Sections 4-8: Hidden
        targetOpacity = 0;
        targetDisplay = 'none';
        targetZoom = 2.2;
        targetX = 32;
        targetY = -24;
        targetScale = 0.4;
      } else {
        // Section 9: Kesimpulan (Fade back in)
        const progress = (p - 0.88) / 0.12;
        targetOpacity = progress;
        targetLat = 15 * (1 - progress) + 0 * progress;
        targetLng = 105 * (1 - progress) + autoRotateLng * progress;
        targetZoom = 2.5 * (1 - progress) + 2.3 * progress;

        targetX = 32 * (1 - progress);
        targetY = -24 * (1 - progress);
        targetScale = 0.4 * (1 - progress) + 1 * progress;
      }

      // Smoothly interpolate current values towards targets (Lerp)
      const lerpSpeed = 0.08;
      const lerpSpeedTransform = 0.06;

      currentCoords.current.lat += (targetLat - currentCoords.current.lat) * lerpSpeed;
      currentCoords.current.zoom += (targetZoom - currentCoords.current.zoom) * lerpSpeed;

      // Handle longitude wrap-around properly for lerp
      let diffLng = targetLng - currentCoords.current.lng;
      diffLng = ((diffLng + 180) % 360) - 180;
      currentCoords.current.lng += diffLng * lerpSpeed;

      // Lerp transform values (removes patah-patah / CSS transition fights)
      currentTransform.current.x += (targetX - currentTransform.current.x) * lerpSpeedTransform;
      currentTransform.current.y += (targetY - currentTransform.current.y) * lerpSpeedTransform;
      currentTransform.current.scale += (targetScale - currentTransform.current.scale) * lerpSpeedTransform;

      const targetTransform = `translate(${currentTransform.current.x}vw, ${currentTransform.current.y}vh) scale(${currentTransform.current.scale})`;

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
  }, []);

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
