# std::imag(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
T imag( const std::complex<T>& z );
template< class T >
constexpr T imag( const std::complex<T>& z );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<complex>`
float imag( float f );
double imag( double f );
long double imag( long double f );
constexpr float imag( float f );
constexpr double imag( double f );
constexpr long double imag( long double f );
(até C++23)
template< class FloatingPoint >
FloatingPoint imag( FloatingPoint f );
template< class Integer >
double imag( Integer i );
template< class Integer >
constexpr double imag( Integer i );
```

1) Retorna a parte imaginária do número complexo z, ou seja, z.imag().

A,B) Sobrecargas adicionais são fornecidas para todos os tipos inteiros e de ponto flutuante, que são tratados como números complexos com parte imaginária zero. | (desde C++11)

### Parâmetros

- **z** — valor complexo
- **f** — valor de ponto flutuante
- **i** — valor inteiro

### Valor de retorno

1) A parte imaginária de z.

A) decltype(f){} (zero).

B) 0.0.

### Observações

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas só precisam ser suficientes para garantir que, para seu argumento num:

* Se num tiver um tipo de ponto flutuante padrão (até C++23) `T`, então `std::imag(num)` tem o mesmo efeito que `std::imag([std::complex](<#/doc/numeric/complex>)<T>(num))`.
* Caso contrário, se num tiver um tipo inteiro, então `std::imag(num)` tem o mesmo efeito que `std::imag([std::complex](<#/doc/numeric/complex>)<double>(num))`.

### Ver também

[ imag](<#/doc/numeric/complex/imag>) | acessa a parte imaginária do número complexo
(função membro pública)
[ real](<#/doc/numeric/complex/real2>) | retorna a parte real
(modelo de função)
[Documentação C](<#/>) para cimag