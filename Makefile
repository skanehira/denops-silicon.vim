DIR_NAME := $(shell basename `git rev-parse --show-toplevel` .vim)
PLUGIN_NAME := $(shell echo $(DIR_NAME) | cut -d "-" -f 2)
DENOPS := $${DENOPS_TEST_DENOPS_PATH:-$$GHQ_ROOT/github.com/vim-denops/denops.vim}
VIM := $${DENOPS_TEST_VIM_EXECUTABLE:-$$(which vim)}
NVIM := $${DENOPS_TEST_NVIM_EXECUTABLE:-$$(which nvim)}

.PHONY: coverage
coverage: test
	@deno coverage cov
	@rm -rf cov

.PHONY: test
test:
	@DENOPS_TEST_DENOPS_PATH=$(DENOPS) \
		DENOPS_TEST_NVIM_EXECUTABLE=$(NVIM) \
		DENOPS_TEST_VIM_EXECUTABLE=$(VIM) \
		deno test -A --unstable

.PHONY: deps
deps:
	@deno run -A https://deno.land/x/udd@0.7.3/main.ts denops/$(PLUGIN_NAME)/deps.ts
	@deno run -A https://deno.land/x/udd@0.7.3/main.ts denops/$(PLUGIN_NAME)/deps_test.ts
