# std::atanh, std::atanhf, std::atanhl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
`float atanh ( float num );`
`double atanh ( double num );`
`long double atanh ( long double num );`
`/*floating-point-type*/`
`atanh ( /*floating-point-type*/ num );`
(constexpr desde C++26)
`float atanhf( float num );`
(constexpr desde C++26)
`long double atanhl( long double num );`
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
`template< /*math-floating-point*/ V >`
`constexpr /*deduced-simd-t*/<V>`
`atanh ( const V& v_num );`
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
`template< class Integer >`
`double atanh ( Integer num );`
```

1-3) Calcula a tangente hiperbólica inversa de num. A biblioteca fornece sobrecargas de `std::atanh` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::atanh` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, a tangente hiperbólica inversa de num (tanh-1
(num), ou artanh(num)), é retornada.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de polo, [±HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `±HUGE_VALF`, ou `±HUGE_VALL` é retornado (com o sinal correto).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se o argumento não estiver no intervalo `[`-1`, `+1`]`, ocorre um erro de range.

Se o argumento for ±1, ocorre um erro de polo.

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

*   se o argumento for ±0, ele é retornado sem modificações.
*   se o argumento for ±1, ±∞ é retornado e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
*   se |num|>1, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
*   se o argumento for NaN, NaN é retornado.

### Observações

Embora o padrão C (ao qual C++ se refere para esta função) nomeie esta função como "tangente hiperbólica de arco", as funções inversas das funções hiperbólicas são as funções de área. Seu argumento é a área de um setor hiperbólico, não um arco. O nome correto é "tangente hiperbólica inversa" (usado por POSIX) ou "tangente hiperbólica de área".

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/atanh.html>) que, em caso de underflow, num é retornado sem modificações, e se isso não for suportado, um valor definido pela implementação não maior que [DBL_MIN](<#/doc/types/climits>), [FLT_MIN](<#/doc/types/climits>), e [LDBL_MIN](<#/doc/types/climits>) é retornado.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::atanh(num) tenha o mesmo efeito que std::atanh(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cfloat>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    // #pragma STDC FENV_ACCESS ON
     
    int main()
    {
        std::cout << "atanh(0) = " << std::atanh(0) << '\n'
                  << "atanh(-0) = " << std::atanh(-0.0) << '\n'
                  << "atanh(0.9) = " << std::atanh(0.9) << '\n';
     
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "atanh(-1) = " << std::atanh(-1) << '\n';
     
        if (errno == ERANGE)
            std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_DIVBYZERO))
            std::cout << "    FE_DIVBYZERO raised\n";
    }
```

Saída possível:
```
    atanh(0) = 0
    atanh(-0) = -0
    atanh(0.9) = 1.47222
    atanh(-1) = -inf
        errno == ERANGE: Numerical result out of range
        FE_DIVBYZERO raised
```

### Veja também

[ asinhasinhfasinhl](<#/doc/numeric/math/asinh>)(desde C++11)(desde C++11)(desde C++11) | calcula o seno hiperbólico inverso (\\({\small\operatorname{arsinh}{x}}\\)arsinh(x))
(função)
[ acoshacoshfacoshl](<#/doc/numeric/math/acosh>)(desde C++11)(desde C++11)(desde C++11) | calcula o cosseno hiperbólico inverso (\\({\small\operatorname{arcosh}{x}}\\)arcosh(x))
(função)
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(desde C++11)(desde C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))
(função)
[ atanh(std::complex)](<#/doc/numeric/complex/atanh>)(desde C++11) | calcula a tangente hiperbólica de área de um número complexo (\\({\small\operatorname{artanh}{z}}\\)artanh(z))
(modelo de função)
[Documentação C](<#/>) para atanh

### Links externos

[Weisstein, Eric W. "Tangente Hiperbólica Inversa."](<https://mathworld.wolfram.com/InverseHyperbolicTangent.html>) De MathWorld — Um Recurso Web da Wolfram.
---
\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão