# std::chrono::day::operator+=, std::chrono::day::operator-=

```cpp
constexpr std::chrono::day& operator+=( const std::chrono::days& d ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::day& operator-=( const std::chrono::days& d ) noexcept;  // (2) (desde C++20)
```

  
Adiciona ou subtrai d.count() dias do valor do dia.

1) Equivalente a *this = *this + d;.

2) Equivalente a *this = *this - d;.

### Valor de retorno

Uma referência a este `day` após a modificação.

### Notas

Se o resultado estiver fora do intervalo `[`​0​`, `255`]`, o valor real armazenado é não especificado.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        std::chrono::day d{15};
     
        d += std::chrono::days(2);
        assert(d == std::chrono::day(17));
     
        d -= std::chrono::days{3};
        assert(d == std::chrono::day(14));
    }
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/day/operator_inc_dec>) |  incrementa ou decrementa o dia   
(função membro pública)  
[ operator+operator-](<#/doc/chrono/day/operator_arith_2>)(C++20) |  adiciona ou subtrai um número de dias e um `day`, ou encontra a diferença entre dois `day`s   
(função)