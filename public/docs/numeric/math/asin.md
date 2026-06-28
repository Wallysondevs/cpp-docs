# std::asin, std::asinf, std::asinl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float asin ( float num );
double asin ( double num );
long double asin ( long double num );
/*floating-point-type*/
asin ( /*floating-point-type*/ num );
(constexpr desde C++26)
float asinf( float num );
(constexpr desde C++26)
long double asinl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
asin ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double asin ( Integer num );
```

1-3) Calcula o valor principal do arco seno de num. A biblioteca fornece sobrecargas de `std::asin` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::asin` elemento a elemento em v_num.

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

Se nenhum erro ocorrer, o arco seno de num (arcsin(num)) no intervalo [- π
---
2
, +π
---
2
], é retornado.

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Ocorre erro de domínio se num estiver fora do intervalo `[`-1.0`, `1.0`]`.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se o argumento for ±0, ele é retornado sem modificações.
  * Se |num| > 1, ocorre um erro de domínio e NaN é retornado.
  * se o argumento for NaN, NaN é retornado.

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::asin(num) tenha o mesmo efeito que std::asin(static_cast&lt;double&gt;(num)).

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
        std::cout << "asin(1.0) = " << asin(1) << '\n'
                  << "2*asin(1.0) = " << 2 * asin(1) << '\n'
                  << "asin(-0.5) = " << asin(-0.5) << '\n'
                  << "6*asin(-0.5) =" << 6 * asin(-0.5) << '\n';
    
        // special values
        std::cout << "asin(0.0) = " << asin(0) << " asin(-0.0)=" << asin(-0.0) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "asin(1.1) = " << asin(1.1) << '\n';
    
        if (errno == EDOM)
            std::cout << "    errno == EDOM: " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised" << '\n';
    }
```

Saída possível:
```
    asin(1.0) = 1.5708
    2*asin(1.0) = 3.14159
    asin(-0.5) = -0.523599
    6*asin(-0.5) = -3.14159
    asin(0.0) = 0 asin(-0.0)=-0
    asin(1.1) = nan
        errno == EDOM: Numerical argument out of domain
        FE_INVALID raised
```

### Veja também

[ acosacosfacosl](<#/doc/numeric/math/acos>)(C++11)(C++11) | calcula o arco cosseno (\\({\small\arccos{x}}\\)arccos(x))
(função)
[ atanatanfatanl](<#/doc/numeric/math/atan>)(C++11)(C++11) | calcula o arco tangente (\\({\small\arctan{x}}\\)arctan(x))
(função)
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(C++11)(C++11) | arco tangente, usando sinais para determinar quadrantes
(função)
[ sinsinfsinl](<#/doc/numeric/math/sin>)(C++11)(C++11) | calcula o seno (\\({\small\sin{x}}\\)sin(x))
(função)
[ asin(std::complex)](<#/doc/numeric/complex/asin>)(C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))
(modelo de função)
[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função **std::asin** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para asin