import { useEffect, useRef } from 'react';

const CanvasCursor = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      
      // Add a new point when the mouse can moves 1
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
        ttl: 2000, // time to live in ms
        size: Math.random() * 3 + 1,
        color: `hsla(${Math.random() * 60 + 240}, 80%, 70%, ${Math.random() * 0.5 + 0.3})`
      });
    };

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      
      // Update and draw points
      pointsRef.current = pointsRef.current.filter(point => {
        const age = now - point.time;
        const life = 1 - age / point.ttl;
        
        if (life <= 0) return false;
        
        // Draw the point with fading opacity
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * life, 0, Math.PI * 2);
        ctx.fillStyle = point.color.replace(/[\d.]+\)$/g, `${life * 0.8})`);
        ctx.fill();
        
        return life > 0;
      });
      
      // Draw main cursor
      ctx.beginPath();
      ctx.arc(cursorRef.current.x, cursorRef.current.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cursorRef.current.x, cursorRef.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 204, 0, 0.6)';
      ctx.fill();
      
      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'lighten' }}
    />
  );
};

export default CanvasCursor;
