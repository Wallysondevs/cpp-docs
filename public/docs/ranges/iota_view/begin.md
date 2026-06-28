# std::ranges::iota_view&lt;W, Bound&gt;::begin

```cpp
constexpr /*iterator*/ begin() const;  // (desde C++20)
```

  
Obtém um [iterator](<#/doc/ranges/iota_view/iterator>) para o valor inicial.

### Valor de retorno

[`_iterator_`](<#/doc/ranges/iota_view/iterator>) ﻿{[`_value_`](<#/doc/ranges/iota_view>) ﻿}

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        auto iota{std::views::iota(2, 6)};
        auto iter{iota.begin()};
        while (iter != iota.end())
            std::cout << *iter++ << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    2 3 4 5
```