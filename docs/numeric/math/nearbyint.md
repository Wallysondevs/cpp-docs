# std::nearbyint, std::nearbyintf, std::nearbyintl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float nearbyint ( float num );
double nearbyint ( double num );
long double nearbyint ( long double num );
/*floating-point-type*/
nearbyint ( /*floating-point-type*/ num );
float nearbyintf( float num );
long double nearbyintl( long double num );
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
nearbyint ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double nearbyint ( Integer num );
```

1-3) Arredonda o argumento de ponto flutuante num para um valor inteiro em formato de ponto flutuante, usando o [modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>). A biblioteca fornece sobrecargas de `std::nearbyint` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::nearbyint` elemento a elemento em v_num.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

O valor inteiro mais próximo de num, de acordo com o [modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>), é retornado.

### Tratamento de erros

Esta função não está sujeita a nenhum dos erros especificados em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

* [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) nunca é levantado.
* Se num é ±∞, ele é retornado, sem modificação.
* Se num é ±0, ele é retornado, sem modificação.
* Se num é NaN, NaN é retornado.

### Observações

A única diferença entre `std::nearbyint` e [std::rint](<#/doc/numeric/math/rint>) é que `std::nearbyint` nunca levanta [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>).

Os maiores valores de ponto flutuante representáveis são inteiros exatos em todos os formatos de ponto flutuante padrão, então `std::nearbyint` nunca causa overflow por si só; no entanto, o resultado pode causar overflow em qualquer tipo inteiro (incluindo [std::intmax_t](<#/doc/types/integer>)), quando armazenado em uma variável inteira.

Se o modo de arredondamento atual é [FE_TONEAREST](<#/doc/numeric/fenv/FE_round>), esta função arredonda para o par em casos de meio-termo (como [std::rint](<#/doc/numeric/math/rint>), mas diferente de [std::round](<#/doc/numeric/math/round>)).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::nearbyint(num) tenha o mesmo efeito que std::nearbyint(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    #pragma STDC FENV_ACCESS ON
    
    int main()
    {
        std::fesetround(FE_TONEAREST);
        std::cout << "rounding to nearest: \n"
                  << "nearbyint(+2.3) = " << std::nearbyint(2.3)
                  << "  nearbyint(+2.5) = " << std::nearbyint(2.5)
                  << "  nearbyint(+3.5) = " << std::nearbyint(3.5) << '\n'
                  << "nearbyint(-2.3) = " << std::nearbyint(-2.3)
                  << "  nearbyint(-2.5) = " << std::nearbyint(-2.5)
                  << "  nearbyint(-3.5) = " << std::nearbyint(-3.5) << '\n';
    
        std::fesetround(FE_DOWNWARD);
        std::cout << "rounding down:\n"
                  << "nearbyint(+2.3) = " << std::nearbyint(2.3)
                  << "  nearbyint(+2.5) = " << std::nearbyint(2.5)
                  << "  nearbyint(+3.5) = " << std::nearbyint(3.5) << '\n'
                  << "nearbyint(-2.3) = " << std::nearbyint(-2.3)
                  << "  nearbyint(-2.5) = " << std::nearbyint(-2.5)
                  << "  nearbyint(-3.5) = " << std::nearbyint(-3.5) << '\n';
    
        std::cout << "nearbyint(-0.0) = " << std::nearbyint(-0.0)  << '\n'
                  << "nearbyint(-Inf) = " << std::nearbyint(-INFINITY) << '\n';
    }
```

Saída:
```
    rounding to nearest: 
    nearbyint(+2.3) = 2  nearbyint(+2.5) = 2  nearbyint(+3.5) = 4
    nearbyint(-2.3) = -2  nearbyint(-2.5) = -2  nearbyint(-3.5) = -4
    rounding down:
    nearbyint(+2.3) = 2  nearbyint(+2.5) = 2  nearbyint(+3.5) = 3
    nearbyint(-2.3) = -3  nearbyint(-2.5) = -3  nearbyint(-3.5) = -4
    nearbyint(-0.0) = -0
    nearbyint(-Inf) = -inf
```

### Veja também

[ rintrintfrintllrintlrintflrintlllrintllrintfllrintl](<#/doc/numeric/math/rint>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual com exceção se o resultado for diferente (função)
---|---
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo, arredondando para longe de zero em casos de meio-termo (função)
[ fegetroundfesetround](<#/doc/numeric/fenv/feround>)(C++11)(C++11) | obtém ou define a direção de arredondamento (função)
[Documentação C](<#/>) para nearbyint