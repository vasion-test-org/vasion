const deepLog = (label, obj) => {
  if (process.env.NODE_ENV === "development") {
    // This forces the browser to show the full object
    console.group(label);
    console.dir(obj, { depth: null });
    console.groupEnd();
  }
};

export { deepLog };
