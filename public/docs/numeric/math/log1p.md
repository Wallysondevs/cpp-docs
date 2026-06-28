# std::log1p, std::log1pf, std::log1pl

```cpp
Definido no header `<cmath>`
  // (1)
float log1p ( float num );
double log1p ( double num );
long double log1p ( long double num );  // (até C++23)
/*floating-point-type*/
log1p ( /*floating-point-type*/ num );  // (desde C++23)
(constexpr desde C++26)
float log1pf( float num );  // (2) (desde C++11)
(constexpr desde C++26)
long double log1pl( long double num );  // (3) (desde C++11)
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no header `<simd>`
```

```cpp
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
log1p ( const V& v_num );  // (desde C++26)
Sobrecargas adicionais (desde C++11)
Definido no header `<cmath>`
template< class Integer >
double log1p ( Integer num );
```

1-3) Calcula o [logaritmo natural (base _e_)](<https://en.wikipedia.org/wiki/Natural_logarithm> "enwiki:Natural logarithm") de 1 + num. Esta função é mais precisa do que a expressão [std::log](<#/doc/numeric/math/log>)(1 + num) se `num` estiver próximo de zero. A biblioteca fornece sobrecargas de `std::log1p` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::log1p` elemento a elemento em `v_num`.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como `double`. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, ln(1+num) é retornado.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de polo, [-HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `-HUGE_VALF`, ou `-HUGE_VALL` é retornado.

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Ocorre erro de domínio se `num` for menor que -1.

Pode ocorrer erro de polo se `num` for -1.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se o argumento for ±0, ele é retornado sem modificação.
  * Se o argumento for -1, -∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for menor que -1, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for +∞, +∞ é retornado.
  * Se o argumento for NaN, NaN é retornado.

### Notas

As funções [std::expm1](<#/doc/numeric/math/expm1>) e `std::log1p` são úteis para cálculos financeiros, por exemplo, ao calcular pequenas taxas de juros diárias: (1 + x)n - 1 pode ser expresso como [std::expm1](<#/doc/numeric/math/expm1>)(n * std::log1p(x)). Essas funções também simplificam a escrita de funções hiperbólicas inversas precisas.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::log1p(num)` tenha o mesmo efeito que `std::log1p(static_cast<double>(num))`.

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
        std::cout << "log1p(0) = " << log1p(0) << '\n'
                  << "Juros ganhos em 2 dias sobre $100, capitalizados diariamente a 1%\n"
                  << "    em um calendário 30/360 = "
                  << 100 * expm1(2 * log1p(0.01 / 360)) << '\n'
                  << "log(1+1e-16) = " << std::log(1 + 1e-16)
                  << ", mas log1p(1e-16) = " << std::log1p(1e-16) << '\n';
    
        // valores especiais
        std::cout << "log1p(-0) = " << std::log1p(-0.0) << '\n'
                  << "log1p(+Inf) = " << std::log1p(INFINITY) << '\n';
    
        // tratamento de erros
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "log1p(-1) = " << std::log1p(-1) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO levantado\n";
    }
```

Saída possível:
```
    log1p(0) = 0
    Juros ganhos em 2 dias sobre $100, capitalizados diariamente a 1%
        em um calendário 30/360 = 0.00555563
    log(1+1e-16) = 0, mas log1p(1e-16) = 1e-16
    log1p(-0) = -0
    log1p(+Inf) = inf
    log1p(-1) = -inf
        errno == ERANGE: Resultado muito grande
        FE_DIVBYZERO levantado
```

### Veja também

[ loglogflogl](<#/doc/numeric/math/log>)(C++11)(C++11) | calcula o logaritmo natural (base e) (ln(x))
(function)
[ log10log10flog10l](<#/doc/numeric/math/log10>)(C++11)(C++11) | calcula o logaritmo comum (base 10) (log10(x))
(function)
[ log2log2flog2l](<#/doc/numeric/math/log2>)(C++11)(C++11)(C++11) | logaritmo de base 2 do número dado (log2(x))
(function)
[ expm1expm1fexpm1l](<#/doc/numeric/math/expm1>)(C++11)(C++11)(C++11) | retorna e elevado à potência dada, menos 1 (ex-1)
(function)
[Documentação C](<#/>) para log1p