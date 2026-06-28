# std::chrono::operator==(std::chrono::month_weekday_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::month_weekday_last& x,
const std::chrono::month_weekday_last& y ) noexcept;
```

Compara os dois valores `month_weekday_last` x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.month() == y.month() && x.weekday_last() == y.weekday_last()

### Exemplo

Execute este código
```cpp
    #include <chrono>
     
    int main()
    {
        constexpr std::chrono::month_weekday_last mwdl1
        {
            std::chrono::March/std::chrono::Friday[std::chrono::last]
        };
     
        constexpr std::chrono::month_weekday_last mwdl2
        {
            std::chrono::March, std::chrono::Friday[std::chrono::last]
        };
     
        static_assert(mwdl1 == mwdl2);
    }
```