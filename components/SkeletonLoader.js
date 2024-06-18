import React from "react";

export default function SkeletonSearchLoader() {
  return <div className="skeleton skeleton__search--loader"></div>;
}

export function SkeletonSelected() {
  return <div className="skeleton skeleton__selected--list"></div>
}

export function SkeletonBook() {
  return <div className="skeleton__book--wrapper">
    <div className="skeleton skeleton__book"></div>
    <div className="skeleton skeleton__book--title"></div>
    <div className="skeleton skeleton__book--author"></div>
    <div className="skeleton skeleton__book--details"></div>
  </div>
}