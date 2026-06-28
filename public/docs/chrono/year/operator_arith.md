# std::chrono::year::operator+=, std::chrono::year::operator-=

```cpp
constexpr std::chrono::year& operator+=( const std::chrono::years& y ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::year& operator-=( const std::chrono::years& y ) noexcept;  // (2) (desde C++20)
```

Adiciona ou subtrai y.count() anos do valor do ano.

1) Equivalente a *this = *this + y;.

2) Equivalente a *this = *this - y;.

### Valor de retorno

Uma referência a este `year` após a modificação.

### Observações

Se o resultado estiver fora do intervalo `[`-32767`, `32767`]`, o valor armazenado real é não especificado.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::literals::chrono_literals;
        std::cout << std::boolalpha;
    
        std::chrono::year y{2020};
    
        y += std::chrono::years(12);
        std::cout << (y == 2032y) << ' ';
    
        y -= std::chrono::years(33);
        std::cout << (y == 1999y) << '\n';
    }
```

Saída:
```
    true true
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/year/operator_inc_dec>) | incrementa ou decrementa o ano
(função membro pública)
[ operator+operator-](<#/doc/chrono/year/operator_arith_2>)(C++20) | realiza operações aritméticas em `year`s
(função)