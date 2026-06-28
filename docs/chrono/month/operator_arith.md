# std::chrono::month::operator+=, std::chrono::month::operator-=

```cpp
constexpr std::chrono::month& operator+=( const std::chrono::months& m ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::month& operator-=( const std::chrono::months& m ) noexcept;  // (2) (desde C++20)
```

Adiciona ou subtrai m.count() do valor do mês, reduzindo o resultado módulo 12 para um inteiro no intervalo `[`1`, `12`]`.

1) Executa *this = *this + m;.

2) Executa *this = *this - m;.

### Valor de retorno

Uma referência a este `month` após a modificação.

### Observações

Após uma chamada a uma dessas funções, [`ok()`](<#/doc/chrono/month/ok>) é sempre `true` se nenhum *overflow* ocorreu durante a operação.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::chrono::month m{6};
        m += std::chrono::months(2);
        std::cout << (m == std::chrono::month(8)) << ' '
                  << (m == std::chrono::August) << ' ';
     
        m -= std::chrono::months(3);
        std::cout << (m == std::chrono::month(5)) << ' '
                  << (m == std::chrono::May) << ' ';
     
        m = std::chrono::October;
        m += std::chrono::months{8}; // ((10 += 8 == 18) % 12) == 6;
        std::cout << (m == std::chrono::June) << ' ';
     
        m -= std::chrono::months{std::chrono::December - std::chrono::February}; // -= 10
        // (6 -= 10) == -4; -4 % 12 == (12 - 4) == 8
        std::cout << (m == std::chrono::August) << '\n';
    }
```

Saída:
```
    true true true true true true
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/month/operator_inc_dec>) | incrementa ou decrementa o mês
(função membro pública)
[ operator+operator-](<#/doc/chrono/month/operator_arith_2>)(C++20) | realiza operações aritméticas em `month`s
(função)