import React, { useEffect, useRef } from 'react';
import { PrivacyCenterBox, ConsentBox } from '../src/index';

interface WidgetPreviewProps {
  config: any;
  widgetType: 'privacy-center' | 'consent-box';
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({ config, widgetType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<PrivacyCenterBox | ConsentBox | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup previous instance
    if (widgetRef.current) {
      widgetRef.current.unmount();
      widgetRef.current = null;
    }

    try {
      // Create new instance
      // Ensure developmentUrl is set if not present in config, for local testing
      const widgetConfig = {
        ...config,
        // developmentUrl: config.developmentUrl || 'http://localhost:5173',
        onEvent: (event: any) => console.log('[SmokeTest] onEvent:', event),
      };

      let widget;
      if (widgetType === 'consent-box') {
        widget = new ConsentBox(widgetConfig);
      } else {
        widget = new PrivacyCenterBox(widgetConfig);
      }

      widget.mount(`#${containerRef.current.id}`);
      widgetRef.current = widget;
    } catch (e) {
      console.error("Failed to mount widget:", e);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.unmount();
        widgetRef.current = null;
      }
    };
  }, [config, widgetType]);

  return <div id="widget-container" ref={containerRef} style={{ width: '100%' }} />;
};
