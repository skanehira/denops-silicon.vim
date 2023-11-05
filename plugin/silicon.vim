if exists('g:loaded_silicon')
  finish
endif
let g:loaded_silicon = 1

command! -complete=file -range=% -nargs=? Silicon call denops#notify('silicon', 'generateImage', [<line1>, <line2>, <f-args>])

xnoremap <silent> <Plug>(silicon-generate) :Silicon<CR>
nnoremap <silent> <Plug>(silicon-generate) <Cmd>Silicon<CR>
