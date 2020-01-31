const Utils = {
  parseRequestedUrl: () => {
    let url = location.hash.slice(1).toLowerCase() || "/";
    let r = url.split("/");
    let request = {
      resource: null,
      verb: null
    };
    request.resource = r[1];
    request.verb = r[2];
    return request;
  },
  sleep: ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

export default Utils;
