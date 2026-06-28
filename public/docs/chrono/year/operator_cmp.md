# std::chrono::operator==,&lt;=&gt;(std::chrono::year)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::year& x,
const std::chrono::year& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::year& x,
const std::chrono::year& y ) noexcept;
```

  
Compara os dois std::chrono::year x e y.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator== respectivamente.

### Valor de retorno

1) int(x) == int(y)

2) int(x) <=> int(y)

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono;
     
        constexpr year y1{2020};
        constexpr year y2{2021};
     
        std::cout << std::boolalpha << (y1 != y2) << '\n';
     
        static_assert((2020y < 2023y) && (2020y == 2020y) && (2020y <= 2023y) &&
                      (2023y > 2020y) && (2023y != 2020y) && (2023y >= 2020y));
    }
```

Saída: 
```
    true
```