# std::chrono::weekday::operator+=, std::chrono::weekday::operator-=

```cpp
constexpr std::chrono::weekday& operator+=( const std::chrono::days& d ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::weekday& operator-=( const std::chrono::days& d ) noexcept;  // (2) (desde C++20)
```

Adiciona ou subtrai d.count() do valor do dia da semana, reduzindo o resultado módulo 7 para um inteiro no intervalo `[`0`, `6`]`.

1) Realiza *this = *this + d;.

2) Realiza *this = *this - d;.

### Valor de retorno

Uma referência para este `weekday` após a modificação.

### Observações

Após uma chamada a uma dessas funções, ok() é sempre verdadeiro se nenhum overflow ocorreu durante a operação.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::chrono::weekday wd{5}; // Friday is 5
        wd += std::chrono::days(2);
        std::cout << (wd == std::chrono::weekday(0)) << ' '
                  << (wd == std::chrono::Sunday) << ' ';
     
        wd -= std::chrono::days(3);
        std::cout << (wd == std::chrono::weekday(4)) << ' '
                  << (wd == std::chrono::Thursday) << ' ';
     
        wd = std::chrono::Wednesday;
        wd += std::chrono::days{8}; // ((3 += 8 == 11) % 7) == 4;
        std::cout << (wd == std::chrono::Thursday) << ' ';
     
        wd -= (std::chrono::Sunday - std::chrono::Tuesday); // -= -2
        // (4 -= -2) == 6
        std::cout << (wd == std::chrono::Saturday) << '\n';
    }
```

Saída:
```
    true true true true true true
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/weekday/operator_inc_dec>) | incrementa ou decrementa o dia da semana
(função membro pública)
[ operator+operator-](<#/doc/chrono/weekday/operator_arith_2>)(C++20) | realiza operações aritméticas em `weekday`s
(função)