import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ['theme'],
    },
  }),

  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
};

export default config;
