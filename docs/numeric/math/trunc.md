# std::trunc, std::truncf, std::truncl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float trunc ( float num );
double trunc ( double num );
long double trunc ( long double num );
constexpr /*floating-point-type*/
trunc ( /*floating-point-type*/ num );
float truncf( float num );
(constexpr desde C++23)
long double truncl( long double num );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
trunc ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double trunc ( Integer num );
```

1-3) Calcula o inteiro mais próximo não maior em magnitude que num. A biblioteca fornece sobrecargas de `std::trunc` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::trunc` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor inteiro mais próximo não maior em magnitude que num (em outras palavras, num arredondado em direção a zero) é retornado.

Valor de retorno

num

### Tratamento de erros

Os erros são relatados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

* O [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual não tem efeito.
* Se num for ±∞, ele é retornado, inalterado.
* Se num for ±0, ele é retornado, inalterado.
* Se num for NaN, NaN é retornado.

### Observações

[FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) pode ser (mas não é obrigatório ser) levantado ao truncar um valor finito não inteiro.

Os maiores valores de ponto flutuante representáveis são inteiros exatos em todos os formatos de ponto flutuante padrão, então esta função nunca transborda por si só; no entanto, o resultado pode transbordar qualquer tipo inteiro (incluindo [std::intmax_t](<#/doc/types/integer>)), quando armazenado em uma variável inteira.

A [conversão implícita](<#/doc/language/implicit_cast>) de tipos de ponto flutuante para tipos integrais também arredonda em direção a zero, mas é limitada aos valores que podem ser representados pelo tipo de destino.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::trunc(num) tenha o mesmo efeito que std::trunc(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <initializer_list>
    #include <iostream>
    
    int main()
    {
        const auto data = std::initializer_list<double>
        {
            +2.7, -2.9, +0.7, -0.9, +0.0, 0.0, -INFINITY, +INFINITY, -NAN, +NAN
        };
    
        std::cout << std::showpos;
        for (double const x : data)
            std::cout << "trunc(" << x << ") == " << std::trunc(x) << '\n';
    }
```

Saída possível:
```
    trunc(+2.7) == +2
    trunc(-2.9) == -2
    trunc(+0.7) == +0
    trunc(-0.9) == -0
    trunc(+0) == +0
    trunc(+0) == +0
    trunc(-inf) == -inf
    trunc(+inf) == +inf
    trunc(-nan) == -nan
    trunc(+nan) == +nan
```

### Veja também

[ floorfloorffloorl](<#/doc/numeric/math/floor>)(C++11)(C++11) | inteiro mais próximo não maior que o valor dado
(função)
[ ceilceilfceill](<#/doc/numeric/math/ceil>)(C++11)(C++11) | inteiro mais próximo não menor que o valor dado
(função)
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo, arredondando para longe de zero em casos de meio-termo
(função)
[Documentação C](<#/>) para trunc