# std::chrono::operator==(std::chrono::weekday_indexed)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::weekday_indexed& x,
const std::chrono::weekday_indexed& y ) noexcept;
```

Compara os dois `weekday_indexed` x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.weekday() == y.weekday() && x.index() == y.index()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    
    int main()
    {
        constexpr std::chrono::weekday_indexed wdi1{std::chrono::Wednesday[2]};
        constexpr std::chrono::weekday_indexed wdi2{std::chrono::weekday(3), 2};
        static_assert(wdi1 == wdi2);
    }
```