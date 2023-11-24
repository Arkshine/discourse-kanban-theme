const categorySetting = (type, slug, allowTopRoutes = true) => {
  if (!slug && !allowTopRoutes) {
    return false;
  }
  const categories = settings[type].split("|");
  const lookup = slug || "@";
  return categories.includes(lookup);
};

const displayConnector = (categorySlug) => {
  return (
    settings.display_categories === "" ||
    categorySetting("display_categories", categorySlug)
  );
};

const boardDefaultView = (categorySlug) => {
  if (
    settings.default_view_fallback &&
    settings.default_view === "" &&
    displayConnector(categorySlug)
  ) {
    return true;
  }

  return categorySetting("default_view", categorySlug, false);
};

const isDefaultView = (transition) => {
  return transition.to.name === "discovery.category";
};

export { displayConnector, boardDefaultView, isDefaultView };
