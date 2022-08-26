export const initialize = async () => {
  return await (async () => {
    window._hjSettings = {
      hjid: parseInt(`${process.env.REACT_APP_HOTJAR_ID}`),
      hjsv: parseInt(`${process.env.REACT_APP_HOTJAR_SV}`),
    };
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//static.hotjar.com/c/hotjar-${process.env.REACT_APP_HOTJAR_ID}.js?sv=${process.env.REACT_APP_HOTJAR_SV}`;
    document.body.appendChild(script);
  })();
}
