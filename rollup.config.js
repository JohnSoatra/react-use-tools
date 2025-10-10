import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";

const prependGlobalReference = () => ({
  name: "prepend-global-dts",
  generateBundle(_, bundle) {
    for (const fileName in bundle) {
      if (fileName.endsWith(".d.ts")) {
        const chunk = bundle[fileName];
        chunk.code = `/// <reference types="./global" />\n` + chunk.code;
      }
    }
  },
});

export default [
  // JS bundle
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
      { file: "dist/index.esm.js", format: "esm", sourcemap: true },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ declaration: false }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  // Types bundle
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
      prependGlobalReference(),
      copy({
        targets: [{ src: "src/global.d.ts", dest: "dist" }],
        hook: "writeBundle", // make sure it runs after build
      }),
    ],
  },
];
