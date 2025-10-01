// Preload route components for better performance

export const preloadTopicSelection = () => {
  return import('../components/TopicSelection');
};

export const preloadConversationView = () => {
  return import('../components/ConversationView');
};

export const preloadFavoritesView = () => {
  return import('../components/FavoritesView');
};

export const preloadRoleplayView = () => {
  return import('../components/RoleplayView');
};

// Preload most commonly accessed routes on idle
export const preloadCommonRoutes = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preloadTopicSelection();
      preloadConversationView();
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      preloadTopicSelection();
      preloadConversationView();
    }, 1000);
  }
};
