// import React from 'react'

import { SpinnerDotted } from 'spinners-react';

export default function Loading() {
  return (
    <>
      <div className="text-center flex justify-center items-center h-full">
        <SpinnerDotted size={100} />
      </div>
    </>
  );
}
