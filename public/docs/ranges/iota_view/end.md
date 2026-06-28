# std::ranges::iota_view&lt;W, Bound&gt;::end

```cpp
constexpr auto end() const;  // (1) (desde C++20)
constexpr /*iterator*/ end() const requires std::same_as<W, Bound>;  // (2) (desde C++20)
```

1) Obtém um [sentinel](<#/doc/ranges/iota_view/sentinel>) representando o valor sentinel:

  * Se `Bound` for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>), retorna [std::unreachable_sentinel](<#/doc/iterator/unreachable_sentinel_t>).
  * Caso contrário, retorna [`_sentinel_`](<#/doc/ranges/iota_view/sentinel>) ﻿{`_[bound_](<#/doc/ranges/iota_view>)_` ﻿}.

2) Obtém um [iterator](<#/doc/ranges/iota_view/iterator>) para o valor sentinel.

### Valor de retorno

1) Conforme especificado acima.

2) [`_iterator_`](<#/doc/ranges/iota_view/iterator>) ﻿{`_[bound_](<#/doc/ranges/iota_view>)_` ﻿}

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        auto iota{std::views::iota(2, 6)};
        auto end{iota.end()};
        for (auto iter{iota.begin()}; iter != end; ++iter)
            std::cout << *iter << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    2 3 4 5
```