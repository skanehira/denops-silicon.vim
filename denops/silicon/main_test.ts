import { generateImage } from "./main.ts";
import { assertEquals, Denops, test } from "./deps.ts";

function assertImage(data: Uint8Array) {
  const header = data.slice(0, 8);
  const pngHeader = new Uint8Array([
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
  ]);
  assertEquals(header, pngHeader);
}

test({
  mode: "all",
  name: "generate image",
  fn: async (denops: Denops) => {
    try {
      const text = `fmt.Println("Hello World")`;
      await denops.call("setline", 1, text.split("\n"));
      await denops.cmd("set ft=go");
      await generateImage(denops, 1, 1, "out.png");
      const data = await Deno.readFile("out.png");
      assertImage(data);
    } finally {
      await Deno.remove("out.png");
    }
  },
});
