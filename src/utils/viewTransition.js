const browserEnv = () => ({
  document: globalThis.document,
  matchMedia: globalThis.matchMedia?.bind(globalThis),
});

export function prefersReducedMotion(env = browserEnv()) {
  return Boolean(env.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

// Applies a DOM update, animated with the View Transitions API when the browser
// supports it and the user hasn't asked for reduced motion. Resolves once the
// update has been applied.
export async function withViewTransition(update, env = browserEnv()) {
  if (!env.document?.startViewTransition || prefersReducedMotion(env)) {
    await update();
    return;
  }
  const transition = env.document.startViewTransition(update);
  await transition.updateCallbackDone;
}
