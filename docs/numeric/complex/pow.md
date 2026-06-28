# std::pow(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> pow( const std::complex<T>& x, int y );
template< class T >
std::complex<T> pow( const std::complex<T>& x, const std::complex<T>& y );
template< class T >
std::complex<T> pow( const std::complex<T>& x, const T& y );
template< class T >
std::complex<T> pow( const T& x, const std::complex<T>& y );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<complex>`
template< class T1, class T2 >
std::complex</* common-type */>
pow( const std::complex<T1>& x, const std::complex<T2>& y );
template< class T1, class T2 >
std::complex<std::common_type_t<T1, T2>>
pow( const std::complex<T1>& x, const std::complex<T2>& y );
template< class T, class NonComplex >
std::complex</* common-type */>
pow( const std::complex<T>& x, const NonComplex& y );
template< class T, class NonComplex >
std::complex<std::common_type_t<T, NonComplex>>
pow( const std::complex<T>& x, const NonComplex& y );
template< class T, class NonComplex >
std::complex</* common-type */>
pow( const NonComplex& x, const std::complex<T>& y );
template< class T, class NonComplex >
std::complex<std::common_type_t<T, NonComplex>>
pow( const NonComplex& x, const std::complex<T>& y );
```

1-4) Calcula x complexo elevado a uma potência complexa y com um corte de ramo ao longo do eixo real negativo para o primeiro argumento. Argumentos não-complexos são tratados como números complexos com componente imaginária zero positiva.

A-C) Sobrecargas adicionais são fornecidas. `NonComplex` não é uma especialização de [std::complex](<#/doc/numeric/complex>). (desde C++11)

### Parâmetros

- **x** — base
- **y** — expoente

### Valor de retorno

1-4) Se nenhum erro ocorrer, a potência complexa xy , é retornada.

Erros e casos especiais são tratados como se a operação fosse implementada por [std::exp](<#/doc/numeric/math/exp>)(y * [std::log](<#/doc/numeric/math/log>)(x)).

O resultado de [std::pow](<#/doc/numeric/math/pow>)(0, 0) é definido pela implementação.

A-C) O mesmo que (2-4).

### Notas

A sobrecarga (1) foi fornecida em C++98 para corresponder às sobrecargas extras (2) de [std::pow](<#/doc/numeric/math/pow>). Essas sobrecargas foram removidas pela resolução do [LWG issue 550](<https://cplusplus.github.io/LWG/issue550>), e a sobrecarga (1) foi removida pela resolução do [LWG issue 844](<https://cplusplus.github.io/LWG/issue844>).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A-C). Elas apenas precisam ser suficientes para garantir que, para seu primeiro argumento base e segundo argumento expoente:

Se base e/ou expoente tiver o tipo [std::complex](<#/doc/numeric/complex>)&lt;T&gt;:

  * Se base e/ou expoente tiver o tipo [std::complex](<#/doc/numeric/complex>)&lt;long double&gt; ou long double, então `std::pow(base, exponent)` tem o mesmo efeito que `std::pow`([std::complex](<#/doc/numeric/complex>)&lt;long double&gt;(base),
[std::complex](<#/doc/numeric/complex>)&lt;long double&gt;(exponent)).
  * Caso contrário, se base e/ou expoente tiver o tipo [std::complex](<#/doc/numeric/complex>)&lt;double&gt;, double, ou um tipo inteiro, então `std::pow(base, exponent)` tem o mesmo efeito que `std::pow`([std::complex](<#/doc/numeric/complex>)&lt;double&gt;(base),
[std::complex](<#/doc/numeric/complex>)&lt;double&gt;(exponent)).
  * Caso contrário, se base e/ou expoente tiver o tipo [std::complex](<#/doc/numeric/complex>)&lt;float&gt; ou float, então `std::pow(base, exponent)` tem o mesmo efeito que `std::pow`([std::complex](<#/doc/numeric/complex>)&lt;float&gt;(base),
[std::complex](<#/doc/numeric/complex>)&lt;float&gt;(exponent)).

| (ate C++23)
Se um argumento tiver o tipo [std::complex](<#/doc/numeric/complex>)&lt;T1&gt; e o outro argumento tiver o tipo `T2` ou [std::complex](<#/doc/numeric/complex>)&lt;T2&gt;, então `std::pow(base, exponent)` tem o mesmo efeito que `std::pow`([std::complex](<#/doc/numeric/complex>)<[std::common_type_t](<#/doc/types/common_type>)<T1, T2>>(base),
[std::complex](<#/doc/numeric/complex>)<[std::common_type_t](<#/doc/types/common_type>)<T1, T2>>(exponent)). Se [std::common_type_t](<#/doc/types/common_type>)<T1, T2> não for bem-formado, então o programa é mal-formado. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
    
        std::complex<double> z(1.0, 2.0);
        std::cout << "(1,2)^2 = " << std::pow(z, 2) << '\n';
    
        std::complex<double> z2(-1.0, 0.0); // square root of -1
        std::cout << "-1^0.5 = " << std::pow(z2, 0.5) << '\n';
    
        std::complex<double> z3(-1.0, -0.0); // other side of the cut
        std::cout << "(-1,-0)^0.5 = " << std::pow(z3, 0.5) << '\n';
    
        std::complex<double> i(0.0, 1.0); // i^i = exp(-pi / 2)
        std::cout << "i^i = " << std::pow(i, i) << '\n';
    }
```

Saída:
```
    (1,2)^2 = (-3.000000,4.000000)
    -1^0.5 = (0.000000,1.000000)
    (-1,-0)^0.5 = (0.000000,-1.000000)
    i^i = (0.207880,0.000000)
```

### Veja também

[ sqrt(std::complex)](<#/doc/numeric/complex/sqrt>) | raiz quadrada complexa no intervalo do semiplano direito
(modelo de função)
[ powpowfpowl](<#/doc/numeric/math/pow>)(C++11)(C++11) | eleva um número à potência dada (\\(\small{x^y}\\)xy)
(função)
[ pow(std::valarray)](<#/doc/numeric/valarray/pow>) | aplica a função [std::pow](<#/doc/numeric/math/pow>) a dois valarrays ou a um valarray e um valor
(modelo de função)
[Documentação C](<#/>) para cpow