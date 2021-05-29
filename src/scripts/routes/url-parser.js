const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this.urlSplitter(url);
    return this.urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this.urlSplitter(url);
  },

  urlSplitter(url) {
    let resource = null;
    const urlsSplits = url.split('/');

    if (urlsSplits.length > 1) {
      const urlsHashtagSplits = urlsSplits[1].split('#');
      [resource] = urlsHashtagSplits;
    }

    return {
      resource,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
    + (splitedUrl.id ? '/:id' : '')
    + (splitedUrl.verb ? `/${splitedUrl.verb}` : '');
  },
};

export default UrlParser;
