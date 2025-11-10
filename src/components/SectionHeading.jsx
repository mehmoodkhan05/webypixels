const SectionHeading = ({ eyebrow, title, description, align = "center", animate, animateDelay, animateDuration }) => {
  const alignmentClass =
    align === "start" ? "section-heading section-heading-start" : "section-heading";

  const dataProps = {};
  if (animate) {
    dataProps["data-animate"] = animate;
  }
  if (animateDelay) {
    dataProps["data-animate-delay"] = animateDelay;
  }
  if (animateDuration) {
    dataProps["data-animate-duration"] = animateDuration;
  }

  return (
    <div className={alignmentClass} {...dataProps}>
      {eyebrow && <span className="eyebrow" data-animate="fade-up" data-animate-delay="0.05s">{eyebrow}</span>}
      <h2 data-animate={animate ? undefined : "fade-up"} data-animate-delay={animate ? undefined : "0.1s"}>{title}</h2>
      {description && (
        <p data-animate={animate ? undefined : "fade-up"} data-animate-delay={animate ? undefined : "0.18s"}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;


