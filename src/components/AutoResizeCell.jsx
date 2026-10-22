import React, { useRef, useLayoutEffect, useEffect, useCallback } from 'react';

/**
 * AutoResizeCell:
 * An auto-expanding, multi-line table cell textarea component.
 * 
 * Features:
 * 1. Auto-Wrap: Text wraps automatically to the next line at cell boundary.
 * 2. Shift + Enter: Inserts a new line within the same cell.
 * 3. Dynamic Height Expansion: Cell and row automatically grow/shrink vertically
 *    based on content length without clipping or hiding text.
 * 4. Resilient cross-browser sizing: Uses CSS field-sizing: content along with
 *    useLayoutEffect scrollHeight calculation and ResizeObserver.
 */
export default function AutoResizeCell({
    value = '',
    onChange,
    placeholder = '',
    className = '',
    textAlign = 'left',
    minHeight = 28,
    ariaLabel,
    disabled = false,
}) {
    const textareaRef = useRef(null);

    // Calculate and apply dynamic height based on text content
    const adjustHeight = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;

        // Temporarily reset height to auto to compute the true scrollHeight
        el.style.height = 'auto';

        let targetHeight = el.scrollHeight;

        // In some browser engines, a trailing newline (\n) at the end of the text
        // might not be included in scrollHeight until the next character is typed.
        // We account for trailing newlines to ensure immediate height expansion on Shift+Enter:
        const strVal = String(el.value || '');
        if (strVal.endsWith('\n')) {
            const computedStyle = window.getComputedStyle(el);
            const lineHeight = parseFloat(computedStyle.lineHeight) || 16.5;
            const paddingTop = parseFloat(computedStyle.paddingTop) || 4;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 4;
            const lineCount = strVal.split('\n').length;
            const estimatedMin = (lineCount * lineHeight) + paddingTop + paddingBottom;
            if (targetHeight < estimatedMin) {
                targetHeight = estimatedMin;
            }
        }

        targetHeight = Math.max(targetHeight, minHeight);
        el.style.height = `${targetHeight}px`;
    }, [minHeight]);

    useLayoutEffect(() => {
        adjustHeight();
    }, [value, adjustHeight]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        adjustHeight();

        // Observe container size changes (e.g. column resizing, zoom, window resize)
        if (typeof window !== 'undefined' && window.ResizeObserver) {
            const ro = new ResizeObserver(() => {
                adjustHeight();
            });
            ro.observe(el);
            return () => ro.disconnect();
        }
    }, [adjustHeight]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Stop propagation so parent table or modal shortcuts don't swallow Enter/Shift+Enter
            e.stopPropagation();

            if (e.shiftKey) {
                // Shift + Enter: creates a new line within the same cell.
                // Standard textarea behavior natively inserts \n at cursor position.
            }
        }
    };

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={ariaLabel}
            spellCheck={false}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{
                textAlign,
                minHeight: `${minHeight}px`,
                resize: 'none',
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                fieldSizing: 'content',
            }}
            className={`w-full bg-transparent border-0 outline-none leading-snug text-black font-normal text-[12px] py-1 px-1.5 block box-border focus:bg-blue-50/40 transition-colors ${className}`}
        />
    );
}
