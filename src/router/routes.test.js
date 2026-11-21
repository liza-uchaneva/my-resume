import { describe, it, expect } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { routes } from "./routes";

describe("routes", () => {
  it("redirects unknown paths such as the old /projects page to home", async () => {
    const router = createRouter({ history: createMemoryHistory(), routes });
    await router.push("/projects");
    expect(router.currentRoute.value.name).toBe("home");
  });
});
