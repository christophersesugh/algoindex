/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

export default function Discord() {
  return (
    <section className="min-w-full min-h-screen">
      <iframe
        src="https://discord.com/widget?id=1140714344297017394&theme=dark"
        width="350"
        height="500"
        className="w-full h-screen"
        allowtransparency="true"
        frameborder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
      {/* <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl text-center text-slate-600">Coming soon!</h1>
      </div> */}
    </section>
  );
}
