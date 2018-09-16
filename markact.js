// A better React and utils -- MarkAct.js

function h(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return {
        nodeName,
        attributes,
        children
    };
}

function fastRender(prev, vnode) {
    if (JSON.stringify(prev) === JSON.stringify(vnode)) return;
    if (vnode.split) return document.createTextNode(vnode);
    let n = document.createElement(vnode.nodeName);
    let as = vnode.attributes || {};
    for (let k in as) n.setAttribute(k, as[k]);
    (vnode.children || []).map(c => n.appendChild(render(c)));
    return n;
}

function render(vnode) {
    if (vnode.split) return document.createTextNode(vnode);
    let n = document.createElement(vnode.nodeName);
    let as = vnode.attributes || {};
    for (let k in as) n.setAttribute(k, as[k]);
    (vnode.children || []).map(c => n.appendChild(render(c)));
    return n;
}

function get(url, success) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status === 0 || request.status >= 200 && request.status < 400) {
          var resp = request.responseText;

          success(resp);
        }
    };
    request.send();
}
