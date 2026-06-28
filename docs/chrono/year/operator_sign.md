# std::chrono::year::operator+, std::chrono::year::operator-

```cpp
constexpr std::chrono::year operator+() noexcept;  // (1) (desde C++20)
constexpr std::chrono::year operator-() noexcept;  // (2) (desde C++20)
```

  
Aplica os operadores unários ao valor do ano.

1) Retorna uma cópia de *this.

2) Retorna um `year` cujo valor do ano é a negação do valor de *this.

### Valor de retorno

1) *this

2) [std::chrono::year](<#/doc/chrono/year>)(-int(*this))

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::year y{2020};
        constexpr auto ny = -y;
        std::cout << "The year " << (int)y << " negated is " << (int)ny << '\n';
    }
```

Saída: 
```
    The year 2020 negated is -2020
```