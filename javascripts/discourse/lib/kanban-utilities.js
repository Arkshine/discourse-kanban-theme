const categorySetting = (type, slug, allowTopRoutes = true) => {
  if (!slug && !allowTopRoutes) {
    return false;
  }
  let categories = settings[type].split("|");

  if (type === "default_modes") {
    categories = categories.map((category) => category.split(":")[0]);
  }

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
    (settings.default_mode_fallback !== "" ||
      categorySetting("default_modes", categorySlug, false))
  ) {
    return true;
  }

  return categorySetting("default_view", categorySlug, false);
};

const isDefaultView = (transition) => {
  return transition.to.name === "discovery.category";
};

export { displayConnector, boardDefaultView, isDefaultView };
