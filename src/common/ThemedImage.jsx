// Renders both theme variants and lets CSS pick one from <html data-theme>
// (see App.css). Choosing in JS would bake the wrong variant into the
// prerendered HTML for dark-mode visitors until hydration.
function ThemedImage({ light, dark, alt = "", ...props }) {
  return (
    <>
      <img src={light} alt={alt} data-theme-only="light" {...props} />
      <img src={dark} alt={alt} data-theme-only="dark" {...props} />
    </>
  );
}

export default ThemedImage;
