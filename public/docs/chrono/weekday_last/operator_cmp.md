# std::chrono::operator==(std::chrono::weekday_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::weekday_last& x,
const std::chrono::weekday_last& y ) noexcept;
```

Compara os dois valores `weekday_last` x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.weekday() == y.weekday()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr auto wdl1{std::chrono::Tuesday[std::chrono::last]};
        constexpr std::chrono::weekday_last wdl2{std::chrono::weekday(2)};
        std::cout << std::boolalpha
                  << (wdl1 == wdl2) << ' '
                  << (wdl1 == std::chrono::Wednesday[std::chrono::last]) << '\n';
    }
```

Saída:
```
    true false
```