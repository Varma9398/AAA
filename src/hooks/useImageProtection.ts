import { useEffect } from 'react';

/**
 * Custom hook to add image protection and security measures
 */
export function useImageProtection() {
  useEffect(() => {
    // Disable image dragging on mount
    const disableImageDrag = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        return false;
      }
    };

    // Disable context menu on images
    const disableContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection on images
    const disableSelection = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('dragstart', disableImageDrag);
    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('selectstart', disableSelection);

    // Cleanup function
    return () => {
      document.removeEventListener('dragstart', disableImageDrag);
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('selectstart', disableSelection);
    };
  }, []);

  // Additional protection functions
  const protectImage = (imageElement: HTMLImageElement) => {
    if (imageElement) {
      imageElement.setAttribute('draggable', 'false');
      (imageElement.style as any).webkitUserDrag = 'none';
      imageElement.style.userSelect = 'none';
      imageElement.style.pointerEvents = 'none';
      imageElement.oncontextmenu = () => false;
      imageElement.ondragstart = () => false;
      imageElement.onselectstart = () => false;
    }
  };

  return { protectImage };
}