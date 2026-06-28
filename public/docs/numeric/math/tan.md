# std::tan, std::tanf, std::tanl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float tan ( float num );
double tan ( double num );
long double tan ( long double num );
/*floating-point-type*/
tan ( /*floating-point-type*/ num );
(constexpr desde C++26)
float tanf( float num );
(constexpr desde C++26)
long double tanl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
tan ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double tan ( Integer num );
```

1-3) Calcula a tangente de num (medida em radianos). A biblioteca fornece sobrecargas de `std::tan` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::tan` elemento a elemento em v_num.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro representando o ângulo em radianos

### Valor de retorno

Se nenhum erro ocorrer, a tangente de num (tan(num)) é retornada.

O resultado pode ter pouca ou nenhuma significância se a magnitude de num for grande. | (até C++11)

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

*   se o argumento for ±0, ele é retornado sem modificação.
*   se o argumento for ±∞, NaN é retornado e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
*   se o argumento for NaN, NaN é retornado.

### Observações

O caso em que o argumento é infinito não é especificado como um erro de domínio em C (ao qual C++ se refere), mas é definido como um [erro de domínio em POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/tan.html>).

A função possui polos matemáticos em π(1/2 + n); no entanto, nenhuma representação comum de ponto flutuante é capaz de representar π/2 exatamente, portanto, não há valor do argumento para o qual um erro de polo ocorra.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::tan(num) tenha o mesmo efeito que std::tan(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cmath>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    const double pi = std::acos(-1); // or C++20's std::numbers::pi
    
    int main()
    {
        // typical usage
        std::cout << "tan(1*pi/4) = " << std::tan(1*pi/4) << '\n' // 45°
                  << "tan(3*pi/4) = " << std::tan(3*pi/4) << '\n' // 135°
                  << "tan(5*pi/4) = " << std::tan(5*pi/4) << '\n' // -135°
                  << "tan(7*pi/4) = " << std::tan(7*pi/4) << '\n'; // -45°
    
        // special values
        std::cout << "tan(+0) = " << std::tan(0.0) << '\n'
                  << "tan(-0) = " << std::tan(-0.0) << '\n';
    
        // error handling
        std::feclearexcept(FE_ALL_EXCEPT);
    
        std::cout << "tan(INFINITY) = " << std::tan(INFINITY) << '\n';
        if (std::fetestexcept(FE_INVALID))
            std::cout << "    FE_INVALID raised\n";
    }
```

Saída possível:
```
    tan(1*pi/4) = 1
    tan(3*pi/4) = -1
    tan(5*pi/4) = 1
    tan(7*pi/4) = -1
    tan(+0) = 0
    tan(-0) = -0
    tan(INFINITY) = -nan
        FE_INVALID raised
```

### Veja também

[ sinsinfsinl](<#/doc/numeric/math/sin>)(C++11)(C++11) | calcula o seno (\\({\small\sin{x}}\\)sin(x))
(função)
[ coscosfcosl](<#/doc/numeric/math/cos>)(C++11)(C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))
(função)
[ atanatanfatanl](<#/doc/numeric/math/atan>)(C++11)(C++11) | calcula o arco tangente (\\({\small\arctan{x}}\\)arctan(x))
(função)
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))
(modelo de função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função **std::tan** a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para tan