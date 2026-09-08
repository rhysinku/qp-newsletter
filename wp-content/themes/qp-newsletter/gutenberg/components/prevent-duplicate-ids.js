import { useEffect, useRef } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

const TARGET_BLOCK = 'gutenberg-blocks/popup-card';
const blockAnchors = new Set();

const makeBaseAnchor = (clientId) =>
  `popup-card-${String(clientId).replace(/-/g, '').slice(0, 6)}`;

const makeUnique = (base) => {
  let candidate = base;
  let i = 2;
  while (blockAnchors.has(candidate)) {
    candidate = `${base}-${i++}`;
  }
  return candidate;
};

const preventDuplicateBlockIds = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { name, attributes, setAttributes, clientId } = props;
    const { anchor } = attributes;

    // Track what this instance last registered so we can clean up / update
    const registeredRef = useRef(null);
    const initializedRef = useRef(false);

    // Initialize once on mount
    useEffect(() => {
      if (name !== TARGET_BLOCK) return;

      // If no anchor or a duplicate, assign a stable unique one
      const current = (anchor || '').trim();
      if (!current || blockAnchors.has(current)) {
        const base = makeBaseAnchor(clientId);
        const unique = makeUnique(base);
        setAttributes({ anchor: unique });
        blockAnchors.add(unique);
        registeredRef.current = unique;
      } else {
        blockAnchors.add(current);
        registeredRef.current = current;
      }

      initializedRef.current = true;

      // Cleanup on unmount
      return () => {
        if (registeredRef.current) {
          blockAnchors.delete(registeredRef.current);
          registeredRef.current = null;
        }
      };
      // run once per block instance
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If the user edits the anchor in the sidebar, keep it unique
    useEffect(() => {
      if (name !== TARGET_BLOCK) return;
      if (!initializedRef.current) return;

      const prev = registeredRef.current;
      const next = (anchor || '').trim();

      if (!next) {
        // User cleared it; assign a unique one again
        const unique = makeUnique(makeBaseAnchor(clientId));
        setAttributes({ anchor: unique });
        blockAnchors.delete(prev);
        blockAnchors.add(unique);
        registeredRef.current = unique;
        return;
      }

      if (next === prev) return; // nothing changed

      // User changed it; re-register uniquely
      blockAnchors.delete(prev);
      if (blockAnchors.has(next)) {
        const base = next;
        const unique = makeUnique(base);
        setAttributes({ anchor: unique });
        blockAnchors.add(unique);
        registeredRef.current = unique;
      } else {
        blockAnchors.add(next);
        registeredRef.current = next;
      }
    }, [name, anchor, clientId, setAttributes]);

    return <BlockEdit {...props} />;
  };
}, 'preventDuplicateBlockIds');

wp.hooks.addFilter(
  'editor.BlockEdit',
  'gutenberg-blocks/prevent-duplicate-block-ids',
  preventDuplicateBlockIds,
);
