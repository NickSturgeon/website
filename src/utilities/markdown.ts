import setup from "vite-plugin-md";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import { Plugin } from "vite";

function slugify(s: string): string {
  const maxNumberOfSlugs = 10;
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // replace all whitespace with '-'
    .replace(/[^a-zA-Z0-9\-]/g, "") // remove all non-alphanumeric or '-' characters
    .split("-")
    .filter((x) => x !== "")
    .slice(0, maxNumberOfSlugs)
    .join("-");
}

export function markdown(): Plugin {
  return setup({
    markdownItSetup: (md) => {
      md.use(anchor, {
        level: 2,
        slugify: slugify,
        // @ts-ignore -- complains about function parameters but it is valid
        permalink: anchor.permalink.headerLink({ safariReaderFix: true }),
        tabIndex: false,
      });
      md.use(toc, {
        level: 2,
        listType: "ul",
        slugify: slugify,
      });
      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        // set all links that are not self-referencing in the MD to open in another tab
        if (tokens[idx].attrGet("class") !== "header-anchor")
          tokens[idx].attrPush(["target", "_blank"]);
        return self.renderToken(tokens, idx, options);
      };
    },
  });
}
