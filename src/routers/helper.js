function getRoutes(pre, routes) {
  return routes.map((item) => {
    const curRoutes = item;
    curRoutes.path = pre + curRoutes.path;
    return curRoutes;
  });
}

export default getRoutes;
