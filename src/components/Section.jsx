export default function Section({
  id,
  className = "",
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={["relative py-12 sm:py-14 lg:py-18 xl:py-22", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </section>
  );
}
