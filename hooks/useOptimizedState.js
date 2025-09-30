'use client';

import { useState, useCallback, useRef } from 'react';
import { batchStateUpdates, deferNonCritical } from '@/lib/performanceUtils';

/**
 * Optimized state hook that reduces React Scheduler overhead
 * @param {*} initialState - Initial state value
 * @param {Object} options - Configuration options
 */
export const useOptimizedState = (initialState, options = {}) => {
  const {
    batchUpdates = true,
    deferNonCriticalUpdates = false,
    throttleMs = 0,
  } = options;

  const [state, setState] = useState(initialState);
  const pendingUpdates = useRef([]);
  const updateTimeout = useRef(null);

  const optimizedSetState = useCallback(
    (newState) => {
      if (batchUpdates && pendingUpdates.current?.length > 0) {
        pendingUpdates.current.push(newState);
        return;
      }

      if (deferNonCriticalUpdates) {
        deferNonCritical(() => {
          setState(newState);
        });
        return;
      }

      if (throttleMs > 0) {
        if (updateTimeout.current) {
          clearTimeout(updateTimeout.current);
        }
        updateTimeout.current = setTimeout(() => {
          setState(newState);
        }, throttleMs);
        return;
      }

      setState(newState);
    },
    [batchUpdates, deferNonCriticalUpdates, throttleMs]
  );

  const batchUpdate = useCallback(
    (updates) => {
      if (batchUpdates) {
        batchStateUpdates(setState, updates);
      } else {
        updates.forEach((update) => setState(update));
      }
    },
    [batchUpdates]
  );

  return [state, optimizedSetState, batchUpdate];
};

/**
 * Hook for managing multiple related state updates efficiently
 */
export const useBatchedState = (initialStates) => {
  const states = useRef(initialStates);
  const [state, setState] = useState(initialStates);
  const pendingUpdates = useRef({});

  const updateState = useCallback((key, value) => {
    pendingUpdates.current[key] = value;

    // Batch updates on next tick
    requestAnimationFrame(() => {
      if (Object.keys(pendingUpdates.current)?.length > 0) {
        setState((prevState) => ({
          ...prevState,
          ...pendingUpdates.current,
        }));
        pendingUpdates.current = {};
      }
    });
  }, []);

  const batchUpdateStates = useCallback((updates) => {
    Object.assign(pendingUpdates.current, updates);

    requestAnimationFrame(() => {
      if (Object.keys(pendingUpdates.current)?.length > 0) {
        setState((prevState) => ({
          ...prevState,
          ...pendingUpdates.current,
        }));
        pendingUpdates.current = {};
      }
    });
  }, []);

  return [state, updateState, batchUpdateStates];
};
