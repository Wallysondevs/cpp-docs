# std::chrono::abs(std::chrono::duration)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Rep, class Period >
constexpr std::chrono::duration<Rep, Period> abs( std::chrono::duration<Rep, Period> d );
```

Retorna o valor absoluto da duração d. Especificamente, se d >= d.zero(), retorna d, caso contrário retorna -d.

A função não participa da resolução de sobrecarga a menos que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;Rep&gt;::is_signed seja true.

### Parâmetros

- **d** — duração

### Valor de retorno

Valor absoluto de d.

### Implementação possível
```cpp
    template<class Rep, class Period,
        class = std::enable_if_t<std::numeric_limits<Rep>::is_signed>>
    constexpr std::chrono::duration<Rep, Period> abs(std::chrono::duration<Rep, Period> d)
    {
        return d >= d.zero() ? +d : -d;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono;
    
        static_assert(abs(-42s) == std::chrono::abs(42s));
    
        std::cout << "abs(+3min) = " << abs(3min).count() << '\n'
                  << "abs(-3min) = " << abs(-3min).count() << '\n';
    }
```

Saída:
```
    abs(+3min) = 3
    abs(-3min) = 3
```

### Veja também

[ operator+operator-](<#/doc/chrono/duration/operator_arith>) | implementa + unário e - unário
(função membro pública)
[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)
(função)