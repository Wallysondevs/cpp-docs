# std::expm1, std::expm1f, std::expm1l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float expm1 ( float num );
double expm1 ( double num );
long double expm1 ( long double num );
/*floating-point-type*/
expm1 ( /*floating-point-type*/ num );
(constexpr desde C++26)
float expm1f( float num );
(constexpr desde C++26)
long double expm1l( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
expm1 ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double expm1 ( Integer num );
```

1-3) Calcula _e_ ([número de Euler](<https://en.wikipedia.org/wiki/E_\(mathematical_constant\)> "enwiki:E \(mathematical constant\)"), 2.7182818...) elevado à potência `num`, menos 1.0. Esta função é mais precisa do que a expressão [std::exp](<#/doc/numeric/math/exp>)(num) - 1.0 se `num` estiver próximo de zero. A biblioteca fornece sobrecargas de `std::expm1` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::expm1` elemento a elemento em `v_num`.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, -1 é retornado.

Se ocorrer um erro de intervalo devido a overflow, `+HUGE_VAL`, `+HUGE_VALF`, ou `+HUGE_VALL` é retornado.

Se ocorrer um erro de intervalo devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se o argumento for ±0, ele é retornado, sem modificações.
  * Se o argumento for -∞, -1 é retornado.
  * Se o argumento for +∞, +∞ é retornado.
  * Se o argumento for NaN, NaN é retornado.

### Notas

As funções `std::expm1` e [std::log1p](<#/doc/numeric/math/log1p>) são úteis para cálculos financeiros, por exemplo, ao calcular pequenas taxas de juros diárias: (1+x)n -1 pode ser expresso como `std::expm1(n * [std::log1p](<#/doc/numeric/math/log1p>)(x))`. Essas funções também simplificam a escrita de funções hiperbólicas inversas precisas.

Para o tipo double compatível com IEEE, o overflow é garantido se 709.8 < `num`.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::expm1(num)` tenha o mesmo efeito que `std::expm1(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::cout << "expm1(1) = " << std::expm1(1) << '\n'
                  << "Interest earned in 2 days on $100, compounded daily at 1%\n"
                  << "    on a 30/360 calendar = "
                  << 100 * std::expm1(2 * std::log1p(0.01 / 360)) << '\n'
                  << "exp(1e-16)-1 = " << std::exp(1e-16) - 1
                  << ", but expm1(1e-16) = " << std::expm1(1e-16) << '\n';
     
        // special values
        std::cout << "expm1(-0) = " << std::expm1(-0.0) << '\n'
                  << "expm1(-Inf) = " << std::expm1(-INFINITY) << '\n';
     
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "expm1(710) = " << std::expm1(710) << '\n';
     
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída possível:
```
    expm1(1) = 1.71828
    Juros ganhos em 2 dias sobre $100, capitalizados diariamente a 1%
        em um calendário 30/360 = 0.00555563
    exp(1e-16)-1 = 0, but expm1(1e-16) = 1e-16
    expm1(-0) = -0
    expm1(-Inf) = -1
    expm1(710) = inf
        errno == ERANGE: Resultado muito grande
        FE_OVERFLOW levantado
```

### Veja também

[ expexpfexpl](<#/doc/numeric/math/exp>)(C++11)(C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)
(função)
[ exp2exp2fexp2l](<#/doc/numeric/math/exp2>)(C++11)(C++11)(C++11) | retorna 2 elevado à potência dada (\\({\small 2^x}\\)2x)
(função)
[ log1plog1pflog1pl](<#/doc/numeric/math/log1p>)(C++11)(C++11)(C++11) | logaritmo natural (na base e) de 1 mais o número dado (\\({\small\ln{(1+x)}}\\)ln(1+x))
(função)
[Documentação C](<#/>) para expm1