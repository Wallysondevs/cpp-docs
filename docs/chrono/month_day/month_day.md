# std::chrono::month_day::month_day

```cpp
month_day() = default;  // (1) (desde C++20)
constexpr month_day( const std::chrono::month& m,
const std::chrono::day& d ) noexcept;  // (2) (desde C++20)
```

  
Constrói um `month_day`.

1) O construtor padrão deixa os valores de mês e dia armazenados não inicializados.

2) Constrói um `month_day` que armazena o mês m e o dia d.

### Notas

Uma maneira mais conveniente de construir um `month_day` é com o operator/, por exemplo, [std::chrono::April](<#/doc/chrono/month>)/1.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono_literals;
        constexpr auto mo_da = std::chrono::month_day(std::chrono::February, 29d);
        std::cout << static_cast<unsigned>(mo_da.day()) << '/' 
                  << static_cast<unsigned>(mo_da.month()) << '\n';
    }
```

Saída:
```
    29/2
```

### Veja também

[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano
(função)