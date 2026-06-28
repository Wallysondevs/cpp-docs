# std::conj(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> conj( const std::complex<T>& z );
template< class T >
constexpr std::complex<T> conj( const std::complex<T>& z );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<complex>`
std::complex<float> conj( float f );
std::complex<double> conj( double f );
std::complex<long double> conj( long double f );
constexpr std::complex<float> conj( float f );
constexpr std::complex<double> conj( double f );
constexpr std::complex<long double> conj( long double f );
(ate C++23)
template< class FloatingPoint >
constexpr std::complex<FloatingPoint> conj( FloatingPoint f );
template< class Integer >
constexpr std::complex<double> conj( Integer i );
template< class Integer >
constexpr std::complex<double> conj( Integer i );
```

1) Calcula o [conjugado complexo](<https://en.wikipedia.org/wiki/Complex_conjugate> "enwiki:Complex conjugate") de z invertendo o sinal da parte imaginária.

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros e de ponto flutuante, que são tratados como números complexos com componente imaginário zero. | (desde C++11)

### Parâmetros

- **z** — valor complexo
- **f** — valor de ponto flutuante
- **i** — valor inteiro

### Valor de retorno

1) O conjugado complexo de z.

A) [std::complex](<#/doc/numeric/complex>)(f).

B) [std::complex](<#/doc/numeric/complex>)&lt;double&gt;(i).

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas apenas precisam ser suficientes para garantir que, para seu argumento num:

* Se num tem um tipo de ponto flutuante padrão (ate C++23) `T`, então `std::conj(num)` tem o mesmo efeito que `std::conj([std::complex](<#/doc/numeric/complex>)<T>(num))`.
* Caso contrário, se num tem um tipo inteiro, então `std::conj(num)` tem o mesmo efeito que `std::conj([std::complex](<#/doc/numeric/complex>)<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::complex<double> z(1.0, 2.0);
        std::cout << "The conjugate of " << z << " is " << std::conj(z) << '\n'
                  << "Their product is " << z * std::conj(z) << '\n';
    }
```

Saída:
```
    The conjugate of (1,2) is (1,-2)
    Their product is (5,0)
```

### Veja também

[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ norm](<#/doc/numeric/complex/norm>) | retorna a magnitude ao quadrado
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir da magnitude e do ângulo de fase
(modelo de função)
[Documentação C](<#/>) para conj