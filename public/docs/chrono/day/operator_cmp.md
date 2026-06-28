# std::chrono::operator==,&lt;=&gt;(std::chrono::day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::day& x,
const std::chrono::day& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::day& x,
const std::chrono::day& y ) noexcept;
```

Compara os dois std::chrono::day x e y.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Valor de retorno

1) unsigned(x) == unsigned(y)

2) unsigned(x) <=> unsigned(y)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::day x{13}, y{31};
        static_assert(x != y);
     
        if constexpr (constexpr auto res = x <=> y; res < 0)
            std::cout << "x é menor que y\n";
        else if constexpr (res > 0)
            std::cout << "x é maior que y\n";
        else
            std::cout << "x e y são iguais\n";
     
        using namespace std::literals::chrono_literals;
     
        static_assert
        (
            (6d < 9d) && (6d == 6d) && (6d <= 9d) &&
            (9d > 6d) && (9d != 6d) && (9d >= 6d)
        );
    }
```

Saída:
```
    x é menor que y
```