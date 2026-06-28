# Guias de dedução para std::ranges::iota_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class W, class Bound >
requires (!/*is-integer-like*/<W>
!/*is-integer-like*/<Bound>
/*is-signed-integer-like*/<W> == /*is-signed-integer-like*/<Bound>)
iota_view( W, Bound ) -> iota_view<W, Bound>;
```

Este [guia de dedução](<#/doc/language/ctad>) é fornecido para [`iota_view`](<#/doc/ranges/iota_view>) para permitir a dedução a partir de um valor inicial e um valor limite.

Para as definições de /*is-integer-like*/ e /*is-signed-integer-like*/, consulte [`_is-integer-like_`](<#/doc/iterator/is-integer-like>) ﻿.

Note que o guia se protege contra bugs decorrentes de incompatibilidade de sinal, como [views::iota](<#/doc/ranges/iota_view>)(0, v.size()), onde ​0​ é assinado e v.size() é não assinado.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto io = std::ranges::iota_view(1L, 7L); // deduces W and Bound as “long”
        assert(io.front() == 1L and io.back() == 6L);
    }
```