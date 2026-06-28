# std::chrono::month_day::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Determina se este `month_day` armazena uma combinação válida de mês e dia.

A combinação é válida se month() representa um mês válido (month().ok() == true), unsigned{day()} >= 1, e unsigned{day()} <= D, onde D é o número de dias no mês representado por `month()`. O número de dias em Fevereiro é considerado 29.

### Valor de retorno

true se a combinação de mês e dia for válida, caso contrário false.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        constexpr auto md1{std::chrono::July/15};
        std::cout << (md1.ok()) << ' ';
        constexpr std::chrono::month_day md2{std::chrono::month(14), std::chrono::day(42)};
        std::cout << (md2.ok()) << ' ';
        constexpr auto md3{std::chrono::February/29};
        std::cout << (md3.ok()) << '\n';
    }
```

Saída:
```
    true false true
```