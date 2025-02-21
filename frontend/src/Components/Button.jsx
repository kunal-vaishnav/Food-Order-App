export default function Button({ children, textonly, className, ...props }) {
  let cssclass = textonly ? "text-button" : "button";

  cssclass += " " + className;

  return (
    <button className={cssclass} {...props}>
      {children}
    </button>
  );
}
