# std::norm(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
T norm( const std::complex<T>& z );
template< class T >
constexpr T norm( const std::complex<T>& z );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<complex>`
float norm( float f );
double norm( double f );
long double norm( long double f );
constexpr float norm( float f );
constexpr double norm( double f );
constexpr long double norm( long double f );
(até C++23)
template< class FloatingPoint >
constexpr FloatingPoint norm( FloatingPoint f );
template< class Integer >
double norm( Integer i );
template< class Integer >
constexpr double norm( Integer i );
```

1) Retorna o módulo ao quadrado do número complexo z.

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros e de ponto flutuante, que são tratados como números complexos com componente imaginária zero. | (desde C++11)

### Parâmetros

- **z** — valor complexo
- **f** — valor de ponto flutuante
- **i** — valor inteiro

### Valor de retorno

1) O módulo ao quadrado de z.

A) O quadrado de f.

B) O quadrado de i.

### Observações

A norma calculada por esta função também é conhecida como [norma de corpo](<https://en.wikipedia.org/wiki/Field_norm> "enwiki:Field norm") ou [quadrado absoluto](<https://mathworld.wolfram.com/AbsoluteSquare.html>).

A [norma Euclidiana](<https://en.wikipedia.org/wiki/Euclidean_space#Euclidean_norm> "enwiki:Euclidean space") de um número complexo é fornecida por [`std::abs`](<#/doc/numeric/complex/abs>), que é mais custosa para computar. Em algumas situações, ela pode ser substituída por `std::norm`, por exemplo, se abs(z1) > abs(z2) então norm(z1) > norm(z2).

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas apenas precisam ser suficientes para garantir que, para seu argumento num:

*   Se num tiver um tipo de ponto flutuante padrão (até C++23) `T`, então std::norm(num) tem o mesmo efeito que std::norm([std::complex](<#/doc/numeric/complex>)&lt;T&gt;(num)).
*   Caso contrário, se num tiver um tipo inteiro, então std::norm(num) tem o mesmo efeito que std::norm([std::complex](<#/doc/numeric/complex>)&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <complex>
    #include <iostream>
     
    int main()
    {
        constexpr std::complex<double> z {3.0, 4.0};
        static_assert(std::norm(z) == (z.real() * z.real() + z.imag() * z.imag()));
        static_assert(std::norm(z) == (z * std::conj(z)));
               assert(std::norm(z) == (std::abs(z) * std::abs(z)));
        std::cout << "std::norm(" << z << ") = " << std::norm(z) << '\n';
    }
```

Saída:
```
    std::norm((3,4)) = 25
```

### Veja também

[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna o módulo de um número complexo
(modelo de função)
[ conj](<#/doc/numeric/complex/conj>) | retorna o conjugado complexo
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir do módulo e do ângulo de fase
(modelo de função)