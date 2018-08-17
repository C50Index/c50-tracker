function get(url, success, failure) {
    var config = {};
    config.url = url;
    config.method = "GET";
    ajax(config, success, failure);
}
function ajax(config, success, failure) {
    var xhr = new XMLHttpRequest();
    var url = config.url;
    var query = config.query;
    if (query) {
        var parts = [];
        for (var key in query) {
            parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key]));
        }
        if (parts.length)
            url += (url.indexOf("?") === -1 ? "?" : "&") + parts.join("&");
    }
    xhr.open(config.method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            var status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                success(response);
            }
            else {
                if (typeof failure === "undefined") {
                    console.error("Failure in request: " + xhr.responseText);
                }
            }
        }
    };
    xhr.send();
}
//# sourceMappingURL=app.js.map