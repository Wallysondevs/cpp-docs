# std::real(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
T real( const std::complex<T>& z );
template< class T >
constexpr T real( const std::complex<T>& z );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<complex>`
float real( float f );
double real( double f );
long double real( long double f );
constexpr float real( float f );
constexpr double real( double f );
constexpr long double real( long double f );
(até C++23)
template< class FloatingPoint >
constexpr FloatingPoint real( FloatingPoint f );
template< class Integer >
double real( Integer i );
template< class Integer >
constexpr double real( Integer i );
```

1) Retorna a parte real do número complexo z, ou seja, z.real().

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros e de ponto flutuante, que são tratados como números complexos com parte imaginária zero. | (desde C++11)

### Parâmetros

- **z** — valor complexo
- **f** — valor de ponto flutuante
- **i** — valor inteiro

### Valor de retorno

1) A parte real de z.

A) f.

B) static_cast&lt;double&gt;(i).

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas apenas precisam ser suficientes para garantir que, para seu argumento num:

  * Se num tiver um tipo de ponto flutuante padrão (até C++23) `T`, então `std::real(num)` tem o mesmo efeito que `std::real([std::complex](<#/doc/numeric/complex>)<T>(num))`.
  * Caso contrário, se num tiver um tipo inteiro, então `std::real(num)` tem o mesmo efeito que `std::real([std::complex](<#/doc/numeric/complex>)<double>(num))`.

### Ver também

[ real](<#/doc/numeric/complex/real>) | acessa a parte real do número complexo
(função membro pública)
[ imag](<#/doc/numeric/complex/imag2>) | retorna a parte imaginária
(modelo de função)
[Documentação C](<#/>) para creal