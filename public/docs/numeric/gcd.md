# std::gcd

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class M, class N >
constexpr std::common_type_t<M, N> gcd( M m, N n );
```

Calcula o [máximo divisor comum](<https://en.wikipedia.org/wiki/greatest_common_divisor> "enwiki:greatest common divisor") dos inteiros m e n.

Se `M` ou `N` não for um tipo inteiro, ou se qualquer um for `bool` (possivelmente cv-qualificado), o programa é malformado.

Se |m| ou |n| não for representável como um valor do tipo [std::common_type_t](<#/doc/types/common_type>)<M, N>, o comportamento é indefinido.

### Parâmetros

- **m, n** — valores inteiros

### Valor de retorno

Se m e n forem ambos zero, retorna zero. Caso contrário, retorna o máximo divisor comum de |m| e |n|.

### Exceções

Não lança exceções.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_gcd_lcm`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | `std::gcd`, [std::lcm](<#/doc/numeric/lcm>)

### Exemplo

Execute este código
```cpp
    #include <numeric>
    
    int main()
    {
        constexpr int p{2 * 2 * 3};
        constexpr int q{2 * 3 * 3};
        static_assert(2 * 3 == std::gcd(p, q));
    
        static_assert(std::gcd( 6,  10) == 2);
        static_assert(std::gcd( 6, -10) == 2);
        static_assert(std::gcd(-6, -10) == 2);
    
        static_assert(std::gcd( 24, 0) == 24);
        static_assert(std::gcd(-24, 0) == 24);
    }
```

### Ver também

[ lcm](<#/doc/numeric/lcm>)(C++17) | calcula o mínimo múltiplo comum de dois inteiros
(modelo de função)