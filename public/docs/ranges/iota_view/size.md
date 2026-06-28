# std::ranges::iota_view&lt;W, Bound&gt;::size

```cpp
constexpr auto size() const
requires (std::same_as<W, Bound> && /*advanceable*/<W>)
(/*is-integer-like*/<W> && /*is-integer-like*/<Bound>)
std::sized_sentinel_for<Bound, W>;  // (desde C++20)
```

  
Retorna o tamanho da view se a view for limitada.

Para as definições de /*advanceable*/ e /*is-integer-like*/, veja `_[advanceable](<#/doc/ranges/iota_view/iterator>)_` e [`_is-integer-like_`](<#/doc/iterator/is-integer-like>) respectivamente.

### Valor de retorno

Se qualquer um de `W` e `Bound` não for um [tipo inteiro](<#/doc/iterator/is-integer-like>), retorna `_[to-unsigned-like](<#/doc/ranges>)_` ﻿(`_[bound_](<#/doc/ranges/iota_view>)_` `-` ` _[value_](<#/doc/ranges/iota_view>)_`).

Caso contrário, retorna (`_[value_](<#/doc/ranges/iota_view>)_` `< 0) ?  
` `(  
` `(`_[bound_](<#/doc/ranges/iota_view>)_` `< 0) ?  
` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(-`_[value_](<#/doc/ranges/iota_view>)_` ﻿) -` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(-`_[bound_](<#/doc/ranges/iota_view>)_` ﻿) :  
` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(`_[bound_](<#/doc/ranges/iota_view>)_` ﻿) +` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(-`_[value_](<#/doc/ranges/iota_view>)_` ﻿)  
` `) :  
` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(`_[bound_](<#/doc/ranges/iota_view>)_` ﻿) -` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(`_[value_](<#/doc/ranges/iota_view>)_` ﻿) .

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        unsigned initial_value{1}, bound{5};
        auto i{std::views::iota(initial_value, bound)};
        assert(i.size() == bound - initial_value and i.size() == 4);
    
        auto u{std::views::iota(8)};
        // Erro: size() não está presente já que "u" é ilimitado
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3610](<https://cplusplus.github.io/LWG/issue3610>) | C++20  | `size` pode rejeitar tipos de classe inteira  | aceitar se possível   
  
### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)