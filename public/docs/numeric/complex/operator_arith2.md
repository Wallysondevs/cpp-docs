# std::complex&lt;T&gt;::operator+(unary), operator-(unary)

```cpp
  // (1)
template< class T >
std::complex<T> operator+( const std::complex<T>& val ); |  | (ate C++20)
template< class T >
constexpr std::complex<T> operator+( const std::complex<T>& val );  // (desde C++20)
  // (2)
template< class T >
std::complex<T> operator-( const std::complex<T>& val ); |  | (ate C++20)
template< class T >
constexpr std::complex<T> operator-( const std::complex<T>& val );  // (desde C++20)
```

  
Implementa os análogos dos operadores aritméticos unários para números complexos.

1) Retorna o valor de seu argumento

2) Nega o argumento

### Parâmetros

val  |  \-  |  o argumento do número complexo   
  
### Valor de retorno

1) uma cópia do argumento, [std::complex](<#/doc/numeric/complex>)&lt;T&gt;(val)

2) argumento negado, [std::complex](<#/doc/numeric/complex>)&lt;T&gt;(-val.real(), -val.imag())

### Veja também

[ operator+operator-operator*operator/](<#/doc/numeric/complex/operator_arith3>) |  realiza aritmética de números complexos em dois valores complexos ou um complexo e um escalar   
(modelo de função)  