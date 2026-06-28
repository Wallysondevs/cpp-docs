# std::lcm

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class M, class N >
constexpr std::common_type_t<M, N> lcm( M m, N n );
```

Calcula o [mínimo múltiplo comum](<https://en.wikipedia.org/wiki/least_common_multiple> "enwiki:least common multiple") dos inteiros m e n.

Se `M` ou `N` não for um tipo inteiro, ou se qualquer um for `bool` (possivelmente cv-qualificado), o programa é malformado.

O comportamento é indefinido se |m|, |n|, ou o mínimo múltiplo comum de |m| e |n| não for representável como um valor do tipo [std::common_type_t](<#/doc/types/common_type>)<M, N>.

### Parâmetros

- **m, n** — valores inteiros

### Valor de retorno

Se m ou n for zero, retorna zero. Caso contrário, retorna o mínimo múltiplo comum de |m| e |n|.

### Exceções

Não lança exceções.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_gcd_lcm`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | [std::gcd](<#/doc/numeric/gcd>), `std::lcm`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <numeric>
    
    #define OUT(...) std::cout << #__VA_ARGS__ << " = " << __VA_ARGS__ << '\n'
    
    constexpr auto lcm(auto x, auto... xs)
    {
        return ((x = std::lcm(x, xs)), ...);
    }
    
    int main()
    {
        constexpr int p{2 * 2 * 3};
        constexpr int q{2 * 3 * 3};
        static_assert(2 * 2 * 3 * 3 == std::lcm(p, q));
        static_assert(225 == std::lcm(45, 75));
    
        static_assert(std::lcm( 6,  10) == 30);
        static_assert(std::lcm( 6, -10) == 30);
        static_assert(std::lcm(-6, -10) == 30);
    
        static_assert(std::lcm( 24, 0) == 0);
        static_assert(std::lcm(-24, 0) == 0);
    
        OUT(lcm(2 * 3, 3 * 4, 4 * 5));
        OUT(lcm(2 * 3 * 4, 3 * 4 * 5, 4 * 5 * 6));
        OUT(lcm(2 * 3 * 4, 3 * 4 * 5, 4 * 5 * 6, 5 * 6 * 7));
    }
```

Saída:
```
    lcm(2 * 3, 3 * 4, 4 * 5) = 60
    lcm(2 * 3 * 4, 3 * 4 * 5, 4 * 5 * 6) = 120
    lcm(2 * 3 * 4, 3 * 4 * 5, 4 * 5 * 6, 5 * 6 * 7) = 840
```

### Veja também

[ gcd](<#/doc/numeric/gcd>)(C++17) | calcula o máximo divisor comum de dois inteiros
(modelo de função)