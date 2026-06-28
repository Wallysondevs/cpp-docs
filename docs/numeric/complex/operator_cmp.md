# operator==,!=(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
bool operator==( const complex<T>& lhs, const complex<T>& rhs );
template< class T >
constexpr bool operator==( const complex<T>& lhs, const complex<T>& rhs );
template< class T >
bool operator==( const complex<T>& lhs, const T& rhs );
template< class T >
constexpr bool operator==( const complex<T>& lhs, const T& rhs );
template< class T >
bool operator==( const T& lhs, const complex<T>& rhs );
template< class T >
constexpr bool operator==( const T& lhs, const complex<T>& rhs );
(até C++20)
template< class T >
bool operator!=( const complex<T>& lhs, const complex<T>& rhs );
template< class T >
constexpr bool operator!=( const complex<T>& lhs, const complex<T>& rhs );
(até C++20)
template< class T >
bool operator!=( const complex<T>& lhs, const T& rhs );
template< class T >
constexpr bool operator!=( const complex<T>& lhs, const T& rhs );
(até C++20)
template< class T >
bool operator!=( const T& lhs, const complex<T>& rhs );
template< class T >
constexpr bool operator!=( const T& lhs, const complex<T>& rhs );
(até C++20)
```

Compara dois números complexos. Argumentos escalares são tratados como números complexos com a parte real igual ao argumento e a parte imaginária definida como zero.

1-3) Compara lhs e rhs para igualdade.

4-6) Compara lhs e rhs para desigualdade.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — os argumentos a comparar: ou ambos números complexos ou um complexo e um escalar de tipo correspondente (float, double, long double)

### Valor de retorno

1-3) `true` se as partes respectivas de `lhs` forem iguais a `rhs`, `false` caso contrário.

4-6) `!(lhs == rhs)`

### Exemplo

Execute este código
```cpp
    #include <complex>
    
    int main()
    {
        using std::operator""i; // or: using namespace std::complex_literals;
    
        static_assert(1.0i == 1.0i);
        static_assert(2.0i != 1.0i);
    
        constexpr std::complex z(1.0, 0.0);
        static_assert(z == 1.0);
        static_assert(1.0 == z);
        static_assert(2.0 != z);
        static_assert(z != 2.0);
    }
```