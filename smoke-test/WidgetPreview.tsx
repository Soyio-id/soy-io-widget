import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PrivacyCenterBox, ConsentBox } from '../src/index';
import type { ConsentConfig } from '../src/embeds/consent/types';
import type { PrivacyCenterConfig } from '../src/embeds/privacy-center/types';
import type { SoyioAppearance } from '../src/embeds/appearance/types';

interface WidgetPreviewProps {
  config: Partial<PrivacyCenterConfig> & Partial<ConsentConfig>;
  widgetType: 'privacy-center' | 'consent-box';
}

export interface WidgetPreviewHandle {
  updateAppearance: (appearance: SoyioAppearance) => void;
}

export const WidgetPreview = forwardRef<WidgetPreviewHandle, WidgetPreviewProps>(
  ({ config, widgetType }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<PrivacyCenterBox | ConsentBox | null>(null);

    // Expose updateAppearance to parent component
    useImperativeHandle(ref, () => ({
      updateAppearance: (appearance: SoyioAppearance) => {
        if (widgetRef.current) {
          widgetRef.current.updateAppearance(appearance);
        }
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      // Cleanup previous instance
      if (widgetRef.current) {
        widgetRef.current.unmount();
        widgetRef.current = null;
      }

      try {
        const widgetConfig = {
          ...config,
          onEvent: (event: unknown) => console.log('[SmokeTest] onEvent:', event),
        };

        let widget;
        if (widgetType === 'consent-box') {
          widget = new ConsentBox(widgetConfig as ConsentConfig);
        } else {
          widget = new PrivacyCenterBox(widgetConfig as PrivacyCenterConfig);
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
  }
);

WidgetPreview.displayName = 'WidgetPreview';
