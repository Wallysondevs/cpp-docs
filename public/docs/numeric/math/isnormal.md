# std::isnormal

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isnormal( float num );
bool isnormal( double num );
bool isnormal( long double num );
(até C++23)
constexpr bool isnormal( /*floating-point-type*/ num );
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr typename /*deduced-simd-t*/<V>::mask_type
isnormal ( const V& v_num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
bool isnormal( Integer num );
(constexpr desde C++23)
```

1) Determina se o número de ponto flutuante `num` fornecido é normal, ou seja, não é zero, subnormal, infinito, nem NaN. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro `num`.(desde C++23)

S) A sobrecarga SIMD executa um `std::isnormal` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro
- **v_num** — um objeto data-parallel de especialização `std::basic_simd` onde seu tipo de elemento é um tipo de ponto flutuante

### Valor de retorno

1) `true` se `num` for normal, `false` caso contrário.

S) Um objeto de máscara data-parallel onde o i-ésimo elemento é igual a `true` se `v_num[i]` for normal ou `false` caso contrário para todo i no intervalo `[`​0​`, `v_num.size()`)`.

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::isnormal(num)` tenha o mesmo efeito que `std::isnormal(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cfloat>
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha
                  << "isnormal(NaN) = " << std::isnormal(NAN) << '\n'
                  << "isnormal(Inf) = " << std::isnormal(INFINITY) << '\n'
                  << "isnormal(0.0) = " << std::isnormal(0.0) << '\n'
                  << "isnormal(DBL_MIN/2.0) = " << std::isnormal(DBL_MIN / 2.0) << '\n'
                  << "isnormal(1.0) = " << std::isnormal(1.0) << '\n';
    }
```

Saída:
```
    isnormal(NaN) = false
    isnormal(Inf) = false
    isnormal(0.0) = false
    isnormal(DBL_MIN/2.0) = false
    isnormal(1.0) = true
```

### Veja também

[ fpclassify](<#/doc/numeric/math/fpclassify>)(C++11) | categoriza o valor de ponto flutuante fornecido
(função)
[ isfinite](<#/doc/numeric/math/isfinite>)(C++11) | verifica se o número fornecido tem valor finito
(função)
[ isinf](<#/doc/numeric/math/isinf>)(C++11) | verifica se o número fornecido é infinito
(função)
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número fornecido é NaN
(função)
[Documentação C](<#/>) para isnormal