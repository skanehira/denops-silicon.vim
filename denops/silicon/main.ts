import {
  assert,
  batch,
  clippy,
  Denops,
  fn,
  is,
  opts,
  Predicate,
  silicon,
  vars,
} from "./deps.ts";

const isPartialOptions: Predicate<Partial<silicon.Options>> = is.ObjectOf({
  no_line_number: is.OptionalOf(is.Boolean),
  no_round_corner: is.OptionalOf(is.Boolean),
  no_window_controls: is.OptionalOf(is.Boolean),
  background_color: is.OptionalOf(is.String),
  font: is.OptionalOf(is.String),
  highlight_lines: is.OptionalOf(is.String),
  line_offset: is.OptionalOf(is.Number),
  line_pad: is.OptionalOf(is.Number),
  pad_horiz: is.OptionalOf(is.Number),
  pad_vert: is.OptionalOf(is.Number),
  shadow_blur_radius: is.OptionalOf(is.Number),
  shadow_color: is.OptionalOf(is.String),
  shadow_offset_x: is.OptionalOf(is.Number),
  shadow_offset_y: is.OptionalOf(is.Number),
  tab_width: is.OptionalOf(is.Number),
  theme: is.OptionalOf(is.String),
});

export async function generateImage(
  denops: Denops,
  start: number,
  end: number,
  path?: string,
): Promise<void> {
  try {
    const [code, ft, options] = await batch.collect(denops, (denops) => [
      fn.getline(denops, start, end),
      opts.filetype.get(denops),
      vars.g.get(denops, "silicon_options", {}),
    ]);
    assert(options, isPartialOptions);

    const data = silicon.generate(code.join("\n"), ft, options);
    if (path) {
      await Deno.writeFile(path, data);
      return;
    }
    await clippy.writeImage(data);
    await denops.cmd("echo '[silicon] successfully generated'");
  } catch (e) {
    console.error(e.message);
  }
}

export function main(denops: Denops): void {
  denops.dispatcher = {
    async generateImage(
      start: unknown,
      end: unknown,
      path?: unknown,
    ): Promise<void> {
      assert(start, is.Number);
      assert(end, is.Number);
      assert(path, is.OptionalOf(is.String));
      await generateImage(denops, start, end, path);
    },
  };
}
