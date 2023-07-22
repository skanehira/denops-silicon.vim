import {
  clippy,
  Denops,
  ensure,
  is,
  isNumber,
  mapping,
  readAll,
  silicon,
  vars,
} from "./deps.ts";

export async function generateImage(
  denops: Denops,
  start: number,
  end: number,
  path?: unknown,
): Promise<void> {
  try {
    const code = await denops.call("getline", start, end) as string[];
    const ft = await denops.eval("&ft") as string;
    const opts = await vars.g.get(
      denops,
      "silicon_options",
      {},
    ) as silicon.Option;
    const r = await silicon.generateImage(code.join("\n"), ft, opts);

    if (path) {
      await Deno.writeFile(ensure(path, is.String), await readAll(r));
      return;
    }
    await clippy.write_image(r);
    await denops.cmd("echo '[silicon] successfully generated'");
  } catch (e) {
    console.error(e.message);
  }
}

export async function main(denops: Denops): Promise<void> {
  await denops.cmd(
    `command! -complete=file -range -nargs=? Silicon call denops#notify("${denops.name}", "generateImage", [<line1>, <line2>, <f-args>])`,
  );

  await mapping.map(denops, "<Plug>(silicon-generate)", ":Silicon<CR>", {
    mode: "x",
    noremap: true,
    silent: true,
  });

  await mapping.map(denops, "<Plug>(silicon-generate)", ":1,$Silicon<CR>", {
    mode: "n",
    noremap: true,
    silent: true,
  });

  denops.dispatcher = {
    async generateImage(
      start: unknown,
      end: unknown,
      path?: unknown,
    ): Promise<void> {
      if (!isNumber(start) || !isNumber(end)) {
        throw new Error(`start or end is not a number`);
      }

      await generateImage(denops, start, end, path);
    },
  };
}
