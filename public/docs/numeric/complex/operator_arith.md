# std::complex&lt;T&gt;::operator+=,-=,*=,/=

```cpp
Modelo primário `complex<T>`
  // (1)
complex& operator+=( const T& other );  // (até C++20)
constexpr complex& operator+=( const T& other );  // (desde C++20)
  // (2)
complex& operator-=( const T& other );  // (até C++20)
constexpr complex& operator-=( const T& other );  // (desde C++20)
  // (3)
complex& operator*=( const T& other );  // (até C++20)
constexpr complex& operator*=( const T& other );  // (desde C++20)
  // (4)
complex& operator/=( const T& other );  // (até C++20)
constexpr complex& operator/=( const T& other );  // (desde C++20)
Especialização `complex<float>`
  // (1)
complex& operator+=( float other );  // (até C++20)
constexpr complex& operator+=( float other );  // (desde C++20)
  // (2)
complex& operator-=( float other );  // (até C++20)
constexpr complex& operator-=( float other );  // (desde C++20)
  // (3)
complex& operator*=( float other );  // (até C++20)
constexpr complex& operator*=( float other );  // (desde C++20)
  // (4)
complex& operator/=( float other );  // (até C++20)
constexpr complex& operator/=( float other );  // (desde C++20)
Especialização `complex<double>`
  // (1)
complex& operator+=( double other );  // (até C++20)
constexpr complex& operator+=( double other );  // (desde C++20)
  // (2)
complex& operator-=( double other );  // (até C++20)
constexpr complex& operator-=( double other );  // (desde C++20)
  // (3)
complex& operator*=( double other );  // (até C++20)
constexpr complex& operator*=( double other );  // (desde C++20)
  // (4)
complex& operator/=( double other );  // (até C++20)
constexpr complex& operator/=( double other );  // (desde C++20)
Especialização `complex<long double>`
  // (1)
complex& operator+=( long double other );  // (até C++20)
constexpr complex& operator+=( long double other );  // (desde C++20)
  // (2)
complex& operator-=( long double other );  // (até C++20)
constexpr complex& operator-=( long double other );  // (desde C++20)
  // (3)
complex& operator*=( long double other );  // (até C++20)
constexpr complex& operator*=( long double other );  // (desde C++20)
  // (4)
complex& operator/=( long double other );  // (até C++20)
constexpr complex& operator/=( long double other );  // (desde C++20)
Todas as especializações
  // (5)
template<class X>
complex& operator+=( const std::complex<X>& other );  // (até C++20)
template<class X>
constexpr complex& operator+=( const std::complex<X>& other );  // (desde C++20)
  // (6)
template<class X>
complex& operator-=( const std::complex<X>& other );  // (até C++20)
template<class X>
constexpr complex& operator-=( const std::complex<X>& other );  // (desde C++20)
  // (7)
template<class X>
complex& operator*=( const std::complex<X>& other );  // (até C++20)
template<class X>
constexpr complex& operator*=( const std::complex<X>& other );  // (desde C++20)
  // (8)
template<class X>
complex& operator/=( const std::complex<X>& other );  // (até C++20)
template<class X>
constexpr complex& operator/=( const std::complex<X>& other );  // (desde C++20)
```

  
Implementa os operadores de atribuição composta para aritmética complexa e para aritmética mista complexa/escalar. Argumentos escalares são tratados como números complexos com a parte real igual ao argumento e a parte imaginária definida como zero. 

1,5) Adiciona `other` a `*this`.

2,6) Subtrai `other` de `*this`.

3,7) Multiplica `*this` por `other`.

4,8) Divide `*this` por `other`.

### Parâmetros

other  |  \-  |  um valor complexo ou escalar de tipo correspondente (float, double, long double)   
  
### Valor de retorno

`*this`

### Veja também

[ operator+operator-](<#/doc/numeric/complex/operator_arith2>) |  aplica operadores unários a números complexos   
(modelo de função)  
[ operator+operator-operator*operator/](<#/doc/numeric/complex/operator_arith3>) |  realiza aritmética de números complexos em dois valores complexos ou em um complexo e um escalar   
(modelo de função)