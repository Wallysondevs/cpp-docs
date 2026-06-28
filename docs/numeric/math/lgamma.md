# std::lgamma, std::lgammaf, std::lgammal

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float lgamma ( float num );
double lgamma ( double num );
long double lgamma ( long double num );
/*floating-point-type*/
lgamma ( /*floating-point-type*/ num );
(constexpr desde C++26)
float lgammaf( float num );
(constexpr desde C++26)
long double lgammal( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
lgamma ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double lgamma ( Integer num );
```

1-3) Calcula o logaritmo natural do valor absoluto da [função gama](<https://en.wikipedia.org/wiki/gamma_function> "enwiki:função gama") de num. A biblioteca fornece sobrecargas de `std::lgamma` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::lgamma` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o valor do logaritmo da função gama de num, isto é \\(\log_{e}|{\int_0^\infty t^{num-1} e^{-t} \mathsf{d}t}|\\)loge|∫∞
0 _t_ num-1
_e_ -t d _t_ |, é retornado.

Se ocorrer um erro de polo, [+HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `+HUGE_VALF`, ou `+HUGE_VALL` é retornado.

Se ocorrer um erro de range devido a overflow, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se num for zero ou um inteiro menor que zero, um erro de polo pode ocorrer.

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

  * Se o argumento for 1, +0 é retornado.
  * Se o argumento for 2, +0 é retornado.
  * Se o argumento for ±0, +∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for um inteiro negativo, +∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
  * Se o argumento for ±∞, +∞ é retornado.
  * Se o argumento for NaN, NaN é retornado.

### Observações

Se num for um número natural, std::lgamma(num) é o logaritmo do fatorial de num - 1.

A [versão POSIX de `lgamma`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/lgamma.html>) não é thread-safe: cada execução da função armazena o sinal da função gama de num na variável externa estática `signgam`. Algumas implementações fornecem `lgamma_r`, que recebe um ponteiro para armazenamento fornecido pelo usuário para `singgam` como segundo parâmetro, e é thread-safe.

Existe uma função não-padrão chamada `gamma` em várias implementações, mas sua definição é inconsistente. Por exemplo, as versões glibc e 4.2BSD de `gamma` executam `lgamma`, mas a versão 4.4BSD de `gamma` executa `tgamma`.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::lgamma(num) tenha o mesmo efeito que std::lgamma(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    
    const double pi = std::acos(-1); // or std::numbers::pi since C++20
    
    int main()
    {
        std::cout << "lgamma(10) = " << std::lgamma(10)
                  << ", log(9!) = " << std::log(std::tgamma(10))
                  << ", exp(lgamma(10)) = " << std::exp(std::lgamma(10)) << '\n'
                  << "lgamma(0.5) = " << std::lgamma(0.5)
                  << ", log(sqrt(pi)) = " << std::log(std::sqrt(pi)) << '\n';
    
        // special values
        std::cout << "lgamma(1) = " << std::lgamma(1) << '\n'
                  << "lgamma(+Inf) = " << std::lgamma(INFINITY) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "lgamma(0) = " << std::lgamma(0) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída:
```
    lgamma(10) = 12.8018, log(9!) = 12.8018, exp(lgamma(10)) = 362880
    lgamma(0.5) = 0.572365, log(sqrt(pi)) = 0.572365
    lgamma(1) = 0
    lgamma(+Inf) = inf
    lgamma(0) = inf
        errno == ERANGE: Numerical result out of range
        FE_DIVBYZERO raised
```

### Veja também

[ tgammatgammaftgammal](<#/doc/numeric/math/tgamma>)(C++11)(C++11)(C++11) | função gama
(função)
[Documentação C](<#/>) para lgamma

### Links externos

[Weisstein, Eric W. "Função Gama Logarítmica."](<https://mathworld.wolfram.com/LogGammaFunction.html>) De MathWorld — Um Recurso Web da Wolfram.
---