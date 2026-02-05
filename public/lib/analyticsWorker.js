/**
 * Web Worker for Analytics Processing
 * Offloads analytics processing from main thread to improve TBT
 */

// Analytics event queue
let eventQueue = [];
let isProcessing = false;

// Configuration
const BATCH_SIZE = 10;
const BATCH_TIMEOUT = 5000; // 5 seconds

/**
 * Process analytics events in batches
 */
function processBatch() {
  if (isProcessing || eventQueue.length === 0) return;

  isProcessing = true;
  const batch = eventQueue.splice(0, BATCH_SIZE);

  // Process each event in the batch
  batch.forEach((event) => {
    try {
      switch (event.type) {
        case 'gtm':
          processGTMEvent(event.data);
          break;
        case 'ga':
          processGAEvent(event.data);
          break;
        case 'ads':
          processAdsEvent(event.data);
          break;
        case 'marketo':
          processMarketoEvent(event.data);
          break;
        default:
          console.warn('Unknown analytics event type:', event.type);
      }
    } catch (error) {
      console.error('Error processing analytics event:', error);
    }
  });

  isProcessing = false;

  // Process remaining events if any
  if (eventQueue.length > 0) {
    setTimeout(processBatch, 100);
  }
}

/**
 * Process Google Tag Manager events
 */
function processGTMEvent(data) {
  // Send to GTM dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
}

/**
 * Process Google Analytics events
 */
function processGAEvent(data) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(data.action, data.eventName, data.parameters);
  }
}

/**
 * Process Google Ads events
 */
function processAdsEvent(data) {
  // Send to Google Ads
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', data.eventName, {
      send_to: data.conversionId,
      ...data.parameters,
    });
  }
}

/**
 * Process Marketo events
 */
function processMarketoEvent(data) {
  // Send to Marketo
  if (typeof window !== 'undefined' && window.Munchkin) {
    window.Munchkin(data.action, data.data);
  }
}

/**
 * Add event to queue
 */
function queueEvent(type, data) {
  eventQueue.push({ type, data, timestamp: Date.now() });

  // Process immediately if batch is ready
  if (eventQueue.length >= BATCH_SIZE) {
    processBatch();
  }
}

/**
 * Flush all pending events
 */
function flushEvents() {
  if (eventQueue.length > 0) {
    processBatch();
  }
}

// Set up periodic processing
setInterval(() => {
  if (eventQueue.length > 0) {
    processBatch();
  }
}, BATCH_TIMEOUT);

// Listen for messages from main thread
self.addEventListener('message', function (e) {
  const { type, data, action } = e.data;

  switch (action) {
    case 'queue':
      queueEvent(type, data);
      break;
    case 'flush':
      flushEvents();
      break;
    case 'ping':
      self.postMessage({ type: 'pong' });
      break;
    default:
      console.warn('Unknown worker action:', action);
  }
});

// Send ready signal
self.postMessage({ type: 'ready' });
