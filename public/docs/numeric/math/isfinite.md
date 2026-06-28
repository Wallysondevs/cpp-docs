# std::isfinite

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isfinite( float num );
bool isfinite( double num );
bool isfinite( long double num );
(até C++23)
constexpr bool isfinite( /*floating-point-type*/ num );
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr typename /*deduced-simd-t*/<V>::mask_type
isfinite ( const V& v_num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
bool isfinite( Integer num );
(constexpr desde C++23)
```

1) Determina se o número de ponto flutuante `num` fornecido tem valor finito, ou seja, é normal, subnormal ou zero, mas não infinito ou NaN. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro `num`. (desde C++23)

S) A sobrecarga SIMD executa um `std::isfinite` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro
- **v_num** — um objeto data-parallel da especialização `std::basic_simd` onde seu tipo de elemento é um tipo de ponto flutuante

### Valor de retorno

1) `true` se `num` tiver valor finito, `false` caso contrário.

S) Um objeto de máscara data-parallel onde o i-ésimo elemento é igual a `true` se `v_num[i]` tiver valor finito ou `false` caso contrário para todo `i` no range `[`​0​`, `v_num.size()`)`.

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::isfinite(num)` tenha o mesmo efeito que `std::isfinite(static_cast<double>(num))`.

### Exemplos

Execute este código
```cpp
    #include <cfloat>
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha
                  << "isfinite(NaN) = " << std::isfinite(NAN) << '\n'
                  << "isfinite(Inf) = " << std::isfinite(INFINITY) << '\n'
                  << "isfinite(-Inf) = " << std::isfinite(-INFINITY) << '\n'
                  << "isfinite(HUGE_VAL) = " << std::isfinite(HUGE_VAL) << '\n'
                  << "isfinite(0.0) = " << std::isfinite(0.0) << '\n'
                  << "isfinite(exp(800)) = " << std::isfinite(std::exp(800)) << '\n'
                  << "isfinite(DBL_MIN/2.0) = " << std::isfinite(DBL_MIN / 2.0) << '\n';
    }
```

Saída:
```
    isfinite(NaN) = false
    isfinite(Inf) = false
    isfinite(-Inf) = false
    isfinite(HUGE_VAL) = false
    isfinite(0.0) = true
    isfinite(exp(800)) = false
    isfinite(DBL_MIN/2.0) = true
```

### Veja também

[ fpclassify](<#/doc/numeric/math/fpclassify>)(C++11) | categoriza o valor de ponto flutuante fornecido
(função)
[ isinf](<#/doc/numeric/math/isinf>)(C++11) | verifica se o número fornecido é infinito
(função)
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número fornecido é NaN
(função)
[ isnormal](<#/doc/numeric/math/isnormal>)(C++11) | verifica se o número fornecido é normal
(função)
[Documentação C](<#/>) para isfinite