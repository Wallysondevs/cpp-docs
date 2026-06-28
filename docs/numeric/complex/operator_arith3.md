# operator+,-,*,/ (std::complex)

```cpp
  // (1)
template< class T >
std::complex<T> operator+( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator+( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (2)
template< class T >
std::complex<T> operator+( const std::complex<T>& lhs,
const T& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator+( const std::complex<T>& lhs,
const T& rhs );  // (desde C++20)
  // (3)
template< class T >
std::complex<T> operator+( const T& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator+( const T& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (4)
template< class T >
std::complex<T> operator-( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator-( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (5)
template< class T >
std::complex<T> operator-( const std::complex<T>& lhs,
const T& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator-( const std::complex<T>& lhs,
const T& rhs );  // (desde C++20)
  // (6)
template< class T >
std::complex<T> operator-( const T& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator-( const T& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (7)
template< class T >
std::complex<T> operator*( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator*( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (8)
template< class T >
std::complex<T> operator*( const std::complex<T>& lhs,
const T& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator*( const std::complex<T>& lhs,
const T& rhs );  // (desde C++20)
  // (9)
template< class T >
std::complex<T> operator*( const T& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator*( const T& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (10)
template< class T >
std::complex<T> operator/( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator/( const std::complex<T>& lhs,
const std::complex<T>& rhs );  // (desde C++20)
  // (11)
template< class T >
std::complex<T> operator/( const std::complex<T>& lhs,
const T& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator/( const std::complex<T>& lhs,
const T& rhs );  // (desde C++20)
  // (12)
template< class T >
std::complex<T> operator/( const T& lhs,
const std::complex<T>& rhs );  // (até C++20)
template< class T >
constexpr std::complex<T> operator/( const T& lhs,
const std::complex<T>& rhs );  // (desde C++20)
```

  
Implementa os operadores binários para aritmética complexa e para aritmética mista complexa/escalar. Argumentos escalares são tratados como números complexos com a parte real igual ao argumento e a parte imaginária definida como zero. 

1-3) Retorna a soma de seus argumentos.

4-6) Retorna o resultado da subtração de rhs de lhs.

7-9) Multiplica seus argumentos.

10-12) Divide lhs por rhs.

### Parâmetros

lhs, rhs  |  \-  |  os argumentos: ou ambos números complexos ou um complexo e um escalar de tipo correspondente (float, double, long double)   
  
### Valor de retorno

1-3) [std::complex](<#/doc/numeric/complex>)&lt;T&gt;(lhs) += rhs

4-6) [std::complex](<#/doc/numeric/complex>)&lt;T&gt;(lhs) -= rhs

7-9) [std::complex](<#/doc/numeric/complex>)&lt;T&gt;(lhs) *= rhs

10-12) [std::complex](<#/doc/numeric/complex>)&lt;T&gt;(lhs) /= rhs

### Observações

Como a [dedução de argumento de template](<#/doc/language/template_argument_deduction>) não considera conversões implícitas, esses operadores não podem ser usados para aritmética mista de inteiro/complexo. Em todos os casos, o escalar deve ter o mesmo tipo que o tipo subjacente do número complexo. 

A flag do GCC "-fcx-limited-range" (incluída por "-ffast-math") altera o comportamento da multiplicação/divisão complexa, removendo verificações para casos extremos de ponto flutuante. Isso afeta a vetorização de loop. 

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::complex<double> c2(2.0, 0.0);
        std::complex<double> ci(0.0, 1.0);
    
        std::cout << ci << " + " << c2 << " = " << ci + c2 << '\n'
                  << ci << " * " << ci << " = " << ci * ci << '\n'
                  << ci << " + " << c2 << " / " << ci << " = " << ci + c2 / ci << '\n'
                  << 1  << " / " << ci << " = " << 1.0 / ci << '\n';
    
    //    std::cout << 1.0f / ci; // compile error
    //    std::cout << 1 / ci; // compile error
    }
```

Saída: 
```
    (0,1) + (2,0) = (2,1)
    (0,1) * (0,1) = (-1,0)
    (0,1) + (2,0) / (0,1) = (0,-1)
    1 / (0,1) = (0,-1)
```

### Veja também

[ operator+=operator-=operator*=operator/=](<#/doc/numeric/complex/operator_arith>) | atribuição composta de dois números complexos ou um complexo e um escalar   
(função membro pública)  
[ operator+operator-](<#/doc/numeric/complex/operator_arith2>) | aplica operadores unários a números complexos   
(template de função)