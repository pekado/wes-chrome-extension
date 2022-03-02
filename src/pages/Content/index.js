window.onload = function () {
  function waitForAddedNode(params) {
    new MutationObserver(function (mutations) {
      var el = document.getElementById(params.id);
      if (el) {
        this.disconnect();
        params.done(el);
      }
    }).observe(params.parent || document, {
      subtree: !!params.recursive || !params.parent,
      childList: true,
    });
  }

  waitForAddedNode({
    id: 'publish-targets',
    recursive: false,
    done: function (el) {
      console.log(el);
      const list = el.getElementsByClassName('custom-domains')[0];
      const li = `<li><label class="kit-checkbox big"><a class="kit-checkbox-input kit-input-control"><i class="sprite-main"></i></a><span>Wes Domain</span></label><div class="status clearfix"><div class="published"><a href=${'target'} target="_blank" rel="noopener noreferrer">Click here</a> ${'WES URL'}</div></div></li>`;
      list.insertAdjacentHTML('beforeend', li);
    },
  });
};
