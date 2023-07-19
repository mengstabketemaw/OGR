const AlwaysEnableTryItOutPlugin = function (system) {
  return {
    components: {
      TryItOutButton: () => null,
    },
  };
};

window.onload = async function () {
  const getBearerToken = () => {
    var authToken = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    if (authToken) {
      authToken = JSON.parse(authToken);
      return `Bearer ${authToken}`;
    }
    return null;
  };
  const axiosConfig = {
    timeout: 5000,
    headers: { Authorization: getBearerToken() },
  };

  const baseUrl = '/v3/api-docs';
  let urls;

  if (!urls || urls.length === 0) {
    const response = await axios.get('/management/jhiopenapigroups', axiosConfig);
    if (Array.isArray(response.data)) {
      urls = response.data.map(({ group, description }) => ({ name: description, url: `${baseUrl}/${group}` }));
    } else {
      urls = [{ name: 'default', url: baseUrl }];
    }
  }
  console.log(`Swagger urls`, urls);

  if (urls) {
    urls.sort(function (a, b) {
      var x = a.name.toLowerCase(),
        y = b.name.toLowerCase();
      if (x.includes('(default)')) return -1;
      if (y.includes('(default)')) return 1;
      if (x.includes('(management)')) return -1;
      if (y.includes('(management)')) return 1;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // Build a system
  var ui = SwaggerUIBundle({
    urls: urls,
    url: baseUrl,
    dom_id: '#swagger-ui',
    deepLinking: true,
    filter: true,
    layout: 'StandaloneLayout',
    withCredentials: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl, AlwaysEnableTryItOutPlugin],
    tryItOutEnabled: true,
    requestInterceptor: function (req) {
      req.headers['Authorization'] = getBearerToken();
      // Remove the sample Swagger UI request body if present
      if (req.method === 'GET' && req.body === '{"additionalProp1":"string","additionalProp2":"string","additionalProp3":"string"}') {
        req.body = undefined;
      }
      return req;
    },
  });

  window.ui = ui;
};
