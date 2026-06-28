# std::chrono::year_month::year, std::chrono::year_month::month

```cpp
constexpr std::chrono::year year() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::month month() const noexcept;  // (2) (desde C++20)
```

  
Recupera os valores de ano e mês armazenados neste objeto `year_month`.

### Valor de retorno

1) Retorna o valor std::chrono::year armazenado.

2) Retorna o valor std::chrono::month armazenado.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        constexpr auto ym{std::chrono::year(2021)/std::chrono::July};  
        std::cout << (ym.year() == std::chrono::year(2021)) << ' ';
        std::cout << (ym.month() == std::chrono::month(7)) << '\n';
    }
```

Saída: 
```
    true true
```