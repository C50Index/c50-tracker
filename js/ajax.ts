interface AjaxConfig {
  url: string
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
  json?: Object
  query?: { [k: string]: string | number }
  body?: string
  headers?: { [k: string]: string }
}

type InputMap = { [k: string]: string}

function get(url: string, success: Function, failure?: Function) {
  let config = {} as AjaxConfig;
  config.url = url;
  config.method = "GET";
  ajax(config, success, failure);
}

function ajax(config: AjaxConfig, success: Function, failure?: Function) {
  var xhr = new XMLHttpRequest();
  let url = config.url;

  const query = config.query;
  if (query) {
    let parts = [] as string[];
    for (let key in query) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key] as string));
    }
    if (parts.length) url += (url.indexOf("?") === -1 ? "?" : "&") + parts.join("&");
  }

  xhr.open(config.method, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var response = JSON.parse(xhr.responseText);
      var status = xhr.status;
      if (status >= 200 && status < 300 || status === 304) {
        success(response);
      } else {
        if(typeof failure === "undefined") {
         console.error("Failure in request: " + xhr.responseText)
        }
      }
    }
  }

  xhr.send();
}