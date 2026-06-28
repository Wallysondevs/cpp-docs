# operator==,!=(std::allocator)

```cpp
  // (1)
template< class T1, class T2 >
bool operator==( const allocator<T1>& lhs, const allocator<T2>& rhs ) throw();  // (até C++11)
template< class T1, class T2 >
bool operator==( const allocator<T1>& lhs, const allocator<T2>& rhs ) noexcept;  // (desde C++11)
(até C++20)
template< class T1, class T2 >
constexpr bool
operator==( const allocator<T1>& lhs, const allocator<T2>& rhs ) noexcept;  // (desde C++20)
  // (2)
template< class T1, class T2 >
bool operator!=( const allocator<T1>& lhs, const allocator<T2>& rhs ) throw();  // (até C++11)
template< class T1, class T2 >
bool operator!=( const allocator<T1>& lhs, const allocator<T2>& rhs ) noexcept;  // (desde C++11)
(até C++20)
```

  
Compara dois allocators padrão. Como allocators padrão são sem estado, dois allocators padrão são sempre iguais. 

1) Retorna true.

2) Retorna false.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  allocators padrão para comparar   
  
### Valor de retorno

1) true

2) false