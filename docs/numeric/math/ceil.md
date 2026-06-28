# std::ceil, std::ceilf, std::ceill

```cpp
Definido no header `<cmath>`
  // (1)
float ceil ( float num );
double ceil ( double num );
long double ceil ( long double num );  // (até C++23)
constexpr /*floating-point-type*/
ceil ( /*floating-point-type*/ num );  // (desde C++23)
float ceilf( float num );  // (2) (desde C++11)
(constexpr desde C++23)
long double ceill( long double num );  // (3) (desde C++11)
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
ceil ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double ceil ( Integer num );
```

1-3) Calcula o menor valor inteiro não menor que num. A biblioteca fornece sobrecargas de `std::ceil` para todos os tipos floating-point não qualificados por cv como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::ceil` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor floating point ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o menor valor inteiro não menor que num, ou seja ⌈num⌉, é retornado.

Valor de retorno

num

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética floating-point IEEE (IEC 60559),

*   O modo de arredondamento atual não tem efeito.
*   Se num for ±∞, ele é retornado sem modificação.
*   Se num for ±0, ele é retornado, sem modificação.
*   Se num for NaN, NaN é retornado.

### Notas

[FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) pode ser (mas não é obrigatório) levantado ao arredondar um valor finito não inteiro.

Os maiores valores floating-point representáveis são inteiros exatos em todos os formatos floating-point padrão, então esta função nunca transborda por si só; no entanto, o resultado pode transbordar qualquer tipo inteiro (incluindo [std::intmax_t](<#/doc/types/integer>)), quando armazenado em uma variável inteira. É por esta razão que o tipo de retorno é floating-point e não integral.

Esta função (para argumento double) se comporta como se (exceto pela liberdade de não levantar [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>)) implementada pelo seguinte código:
```cpp
    #include <cfenv>
    #include <cmath>
    #pragma STDC FENV_ACCESS ON

    double ceil(double x)
    {
        int save_round = std::fegetround();
        std::fesetround(FE_UPWARD);
        double result = std::rint(x); // or std::nearbyint
        std::fesetround(save_round);
        return result;
    }
```

As sobrecargas adicionais não são obrigadas a serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, `std::ceil(num)` tenha o mesmo efeito que `std::ceil(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>

    int main()
    {
        std::cout << std::fixed
                  << "ceil(+2.4) = " << std::ceil(+2.4) << '\n'
                  << "ceil(-2.4) = " << std::ceil(-2.4) << '\n'
                  << "ceil(-0.0) = " << std::ceil(-0.0) << '\n'
                  << "ceil(-Inf) = " << std::ceil(-INFINITY) << '\n';
    }
```

Saída:
```
    ceil(+2.4) = 3.000000
    ceil(-2.4) = -2.000000
    ceil(-0.0) = -0.000000
    ceil(-Inf) = -inf
```

### Veja também

[ floorfloorffloorl](<#/doc/numeric/math/floor>)(C++11)(C++11) | inteiro mais próximo não maior que o valor dado
(função)
[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(C++11)(C++11)(C++11) | inteiro mais próximo não maior em magnitude que o valor dado
(função)
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo, arredondando para longe de zero em casos de meio termo
(função)
[ nearbyintnearbyintfnearbyintl](<#/doc/numeric/math/nearbyint>)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual
(função)
[ rintrintfrintllrintlrintflrintlllrintllrintfllrintl](<#/doc/numeric/math/rint>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual com exceção se o resultado diferir
(função)
[Documentação C](<#/>) para ceil

### Links externos

[Teto rápido de uma divisão inteira](<https://stackoverflow.com/a/2745086>) — StackOverflow
---
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão