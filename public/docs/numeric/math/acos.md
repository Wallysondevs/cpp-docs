# std::acos, std::acosf, std::acosl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float acos ( float num );
double acos ( double num );
long double acos ( long double num );
/*floating-point-type*/
acos ( /*floating-point-type*/ num );
(constexpr desde C++26)
float acosf( float num );
(constexpr desde C++26)
long double acosl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
acos ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double acos ( Integer num );
```

1-3) Calcula o valor principal do arco cosseno de num. A biblioteca fornece sobrecargas de `std::acos` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::acos` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o arco cosseno de num (arccos(num)) no intervalo [0, π] é retornado.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Ocorre um erro de domínio se num estiver fora do intervalo `[`-1.0`, `1.0`]`.

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559),

*   Se o argumento for +1, o valor `+0` é retornado.
*   Se |num| > 1, ocorre um erro de domínio e NaN é retornado.
*   se o argumento for NaN, NaN é retornado.

### Notas

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::acos(num) tenha o mesmo efeito que std::acos(static_cast&lt;double&gt;(num)).

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
        std::cout << "acos(-1) = " << std::acos(-1) << '\n'
                  << "acos(0.0) = " << std::acos(0.0) << '\n'
                  << "2*acos(0.0) = " << 2 * std::acos(0) << '\n'
                  << "acos(0.5) = " << std::acos(0.5) << '\n'
                  << "3*acos(0.5) = " << 3 * std::acos(0.5) << '\n'
                  << "acos(1) = " << std::acos(1) << '\n';
     
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
     
        std::cout << "acos(1.1) = " << std::acos(1.1) << '\n';
     
        if (errno == EDOM)
            std::cout << "    errno == EDOM: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised" << '\n';
    }
```

Saída:
```
    acos(-1) = 3.14159
    acos(0.0) = 1.5708
    2*acos(0.0) = 3.14159
    acos(0.5) = 1.0472
    3*acos(0.5) = 3.14159
    acos(1) = 0
    acos(1.1) = nan
        errno == EDOM: Numerical argument out of domain
        FE_INVALID raised
```

### Veja também

[ asinasinfasinl](<#/doc/numeric/math/asin>)(desde C++11)(desde C++11) | calcula o arco seno (\\({\small\arcsin{x}}\\)arcsin(x))
(função)
[ atanatanfatanl](<#/doc/numeric/math/atan>)(desde C++11)(desde C++11) | calcula o arco tangente (\\({\small\arctan{x}}\\)arctan(x))
(função)
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(desde C++11)(desde C++11) | arco tangente, usando sinais para determinar quadrantes
(função)
[ coscosfcosl](<#/doc/numeric/math/cos>)(desde C++11)(desde C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))
(função)
[ acos(std::complex)](<#/doc/numeric/complex/acos>)(desde C++11) | calcula o arco cosseno de um número complexo (\\({\small\arccos{z}}\\)arccos(z))
(modelo de função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função **std::acos** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para acos
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão