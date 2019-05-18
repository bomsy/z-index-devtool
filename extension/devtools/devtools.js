function onShown() {
  console.log('show')
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "INIT",
    data: {}
  });
}

function onHidden() {
  console.log('hide')
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "DESTROY",
    data: {}
  });
}
browser.devtools.panels
  .create("z-index", "/img/stacks.png", "panel/panel.html")
  .then(panel => {
    panel.onShown.addListener(onShown);
    panel.onHidden.addListener(onHidden);
  });
