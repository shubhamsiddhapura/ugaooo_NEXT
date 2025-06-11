"use client";

import React from "react";

const ThreeDModel = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="Indoor Plants Pack"
          frameBorder="0"
          allowFullScreen
          mozAllowFullScreen="true"
          webkitAllowFullScreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          width="100%"
          height="480"
          src="https://sketchfab.com/models/412ca7af2fb64ed59bed378518d0eae0/embed"
        ></iframe>
      </div>
      <div className="p-3 bg-white rounded-sm">
        <h1 className="mb-2 text-2xl font-bold text-black">
          Indoor Plants Pack 26
        </h1>
        <p className="mb-1 text-gray-700">
          A beautiful collection of realistic indoor plant 3D models, perfect
          for modern home or office design.
        </p>
        <p className="mb-4 font-semibold text-green-600">Price: ₹499</p>
      </div>
    </div>
  );
};

export default ThreeDModel;
