# std::floor, std::floorf, std::floorl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float floor ( float num );
double floor ( double num );
long double floor ( long double num );
constexpr /*floating-point-type*/
floor ( /*floating-point-type*/ num );
float floorf( float num );
(constexpr desde C++23)
long double floorl( long double num );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
floor ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double floor ( Integer num );
```

1-3) Calcula o maior valor inteiro não maior que num. A biblioteca fornece sobrecargas de `std::floor` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::floor` elemento a elemento em `v_num`.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o maior valor inteiro não maior que num, ou seja ⌊num⌋, é retornado.

Valor de retorno

num

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * O [modo de arredondamento](<#/doc/numeric/fenv/FE_round>) atual não tem efeito.
  * Se num é ±∞, ele é retornado, sem modificação.
  * Se num é ±0, ele é retornado, sem modificação.
  * Se num é NaN, NaN é retornado.

### Observações

[FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>) pode ser (mas não é obrigatório ser) levantado ao arredondar um valor finito não inteiro.

Os maiores valores de ponto flutuante representáveis são inteiros exatos em todos os formatos de ponto flutuante padrão, então esta função nunca transborda por si só; no entanto, o resultado pode transbordar qualquer tipo inteiro (incluindo [std::intmax_t](<#/doc/types/integer>)), quando armazenado em uma variável inteira.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, `std::floor(num)` tenha o mesmo efeito que `std::floor(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed
                  << "floor(+2.7) = " << std::floor(+2.7) << '\n'
                  << "floor(-2.7) = " << std::floor(-2.7) << '\n'
                  << "floor(-0.0) = " << std::floor(-0.0) << '\n'
                  << "floor(-Inf) = " << std::floor(-INFINITY) << '\n';
    }
```

Saída:
```
    floor(+2.7) = 2.000000
    floor(-2.7) = -3.000000
    floor(-0.0) = -0.000000
    floor(-Inf) = -inf
```

### Veja também

[ ceilceilfceill](<#/doc/numeric/math/ceil>)(C++11)(C++11) | inteiro mais próximo não menor que o valor dado
(função)
[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(C++11)(C++11)(C++11) | inteiro mais próximo não maior em magnitude que o valor dado
(função)
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo, arredondando para longe de zero em casos de meio-termo
(função)
[Documentação C](<#/>) para floor