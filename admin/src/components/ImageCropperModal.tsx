'use client';

import { useState, useRef, useEffect } from 'react';

interface ImageCropperModalProps {
  imageSrc: string;
  onCrop: (croppedBlob: Blob) => void;
  onClose: () => void;
}

export default function ImageCropperModal({ imageSrc, onCrop, onClose }: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset crop box when image changes
  useEffect(() => {
    setCrop({ x: 10, y: 10, width: 80, height: 80 });
  }, [imageSrc]);

  const handleMouseDown = (e: React.MouseEvent, type: 'drag' | 'resize') => {
    e.preventDefault();
    if (type === 'drag') {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }
    setDragStart({ x: e.clientX, y: e.clientY });
    setCropStart({ ...crop });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return;
    if (!containerRef.current || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

    if (isDragging) {
      let newX = cropStart.x + deltaX;
      let newY = cropStart.y + deltaY;

      // Bound check
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + cropStart.width > 100) newX = 100 - cropStart.width;
      if (newY + cropStart.height > 100) newY = 100 - cropStart.height;

      setCrop(prev => ({ ...prev, x: newX, y: newY }));
    } else if (isResizing) {
      let newWidth = cropStart.width + deltaX;
      let newHeight = cropStart.height + deltaY;

      // Bound check
      if (newWidth < 5) newWidth = 5;
      if (newHeight < 5) newHeight = 5;
      if (cropStart.x + newWidth > 100) newWidth = 100 - cropStart.x;
      if (cropStart.y + newHeight > 100) newHeight = 100 - cropStart.y;

      setCrop(prev => ({ ...prev, width: newWidth, height: newHeight }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const handleCropSave = () => {
    if (!imageRef.current) return;
    
    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate crop dimensions based on natural size of image
    const cropX = (crop.x / 100) * img.naturalWidth;
    const cropY = (crop.y / 100) * img.naturalHeight;
    const cropW = (crop.width / 100) * img.naturalWidth;
    const cropH = (crop.height / 100) * img.naturalHeight;

    canvas.width = cropW;
    canvas.height = cropH;

    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      cropW,
      cropH
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCrop(blob);
        }
      },
      'image/jpeg',
      0.95
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <div>
            <h3 className="font-bold text-white text-base">Crop Image (Free Sizing)</h3>
            <p className="text-xs text-zinc-400">Drag box to move, drag bottom-right blue handle to resize freely</p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all text-xs"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex items-center justify-center bg-zinc-950/50 max-h-[60vh] overflow-auto">
          <div 
            ref={containerRef}
            className="relative select-none max-w-full max-h-full"
            style={{ position: 'relative' }}
          >
            {/* The image to crop */}
            <img 
              ref={imageRef}
              src={imageSrc} 
              alt="Crop target" 
              className="max-h-[50vh] object-contain max-w-full block"
              draggable={false}
            />

            {/* Dark overlay for cropped out area */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            {/* Highlight box */}
            <div 
              className="absolute border-2 border-indigo-500 cursor-move shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              style={{
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
              }}
              onMouseDown={(e) => handleMouseDown(e, 'drag')}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                  src={imageSrc} 
                  alt="preview"
                  className="absolute max-w-none block pointer-events-none"
                  style={{
                    width: `${10000 / crop.width}%`,
                    height: `${10000 / crop.height}%`,
                    left: `${-crop.x * (100 / crop.width)}%`,
                    top: `${-crop.y * (100 / crop.height)}%`,
                    objectFit: 'fill',
                  }}
                />
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 border border-white/20 grid grid-cols-3 grid-rows-3 pointer-events-none">
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
              </div>

              {/* Resize Handle */}
              <div 
                className="absolute right-0 bottom-0 w-4 h-4 bg-indigo-500 border-2 border-white cursor-se-resize rounded-full translate-x-1/2 translate-y-1/2 flex items-center justify-center hover:scale-125 transition-transform"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, 'resize');
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleCropSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/10"
          >
            Crop & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
