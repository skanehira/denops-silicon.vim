# denops-silicon.vim
A plugin to generate image from source code.

![denops-silicon](https://user-images.githubusercontent.com/7888591/188260665-c18a22c9-7cca-4747-998e-8231c6b472f4.gif)

## Requirements
- [denops.vim](https://github.com/vim-denops/denops.vim)
- Deno v1.24.3 or earlier 

## Known issues
- Deno `v1.25.0` or later is not work
- Cannot run denops shared server

## Dependencies
Please refer silicon's [dependencies](https://github.com/Aloxaf/silicon#dependencies)

NOTE: You don't have to install `silicon`.

## Usage
```vim
" Generate image from current buffer and save to out.png
:Silicon out.png

" Generate image from specified range and save to clipboard
:'<,'>Silicon
```

## Options
The following options can customize the image.

```vim
let g:silicon_options = {
      \  'font': 'Cica',
      \  'no_line_number': v:false,
      \  'no_round_corner': v:false,
      \  'no_window_controls': v:false,
      \  'background_color': '#aaaaff',
      \  'line_offset': 1,
      \  'line_pad': 2,
      \  'pad_horiz': 80,
      \  'pad_vert': 100,
      \  'shadow_blur_radius': 0,
      \  'shadow_color': '#555555',
      \  'shadow_offset_x': 0,
      \  'shadow_offset_y': 0,
      \  'tab_width': 4,
      \  'theme': 'Solarized (dark)',
      \ }
```

## Author
skanehira
