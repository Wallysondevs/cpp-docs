# std::chrono::year_month::operator+=, std::chrono::year_month::operator-=

```cpp
constexpr std::chrono::year_month&
operator+=( const std::chrono::years& dy ) const noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month&
operator+=( const std::chrono::months& dm ) const noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month&
operator-=( const std::chrono::years& dy ) const noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month&
operator-=( const std::chrono::months& dm ) const noexcept;  // (4) (desde C++20)
```

  
Modifica o ponto no tempo que *this representa pela duração dy ou dm.

1) Equivalente a *this = *this + dy;.

2) Equivalente a *this = *this + dm;.

3) Equivalente a *this = *this - dy;.

4) Equivalente a *this = *this - dm;.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (1,3) são preferidas se a chamada seria ambígua de outra forma.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        auto ym{std::chrono::day(1)/7/2023};
     
        ym -= std::chrono::years{2};
        assert(ym.month() == std::chrono::July);
        assert(ym.year() == std::chrono::year(2021));
     
        ym += std::chrono::months{7};
        assert(ym.month() == std::chrono::month(2));
        assert(ym.year() == std::chrono::year(2022));
    }
```

### Veja também

[ operator+operator-](<#/doc/chrono/year_month/operator_arith_2>)(C++20) | realiza aritmética em `year_month`   
(função)  