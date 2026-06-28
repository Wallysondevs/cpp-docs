# std::chrono::operator==(std::chrono::month_weekday)

Defined in header `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::month_weekday& x,
const std::chrono::month_weekday& y ) noexcept;
```

  
Compara os dois valores `month_weekday` x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.month() == y.month() && x.weekday_indexed() == y.weekday_indexed()

### Exemplo

Execute este código
```
    #include <chrono>
     
    int main()
    {
        constexpr auto mwdi1{std::chrono::March/std::chrono::Friday[1]};
     
        constexpr auto mwdi2
        {
            std::chrono::month_weekday
            {
                std::chrono::month(3), std::chrono::weekday(5)[1]
            }
        };
     
        static_assert(mwdi1 == mwdi2);
    }
```