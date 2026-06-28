# std::allocator&lt;T&gt;::allocator

```cpp
  // (1)
allocator() throw();  // (até C++11)
allocator() noexcept;  // (desde C++11)
(até C++20)
constexpr allocator() noexcept;  // (desde C++20)
  // (2)
allocator( const allocator& other ) throw();  // (até C++11)
allocator( const allocator& other ) noexcept;  // (desde C++11)
(até C++20)
constexpr allocator( const allocator& other ) noexcept;  // (desde C++20)
  // (3)
template< class U >
allocator( const allocator<U>& other ) throw();  // (até C++11)
template< class U >
allocator( const allocator<U>& other ) noexcept;  // (desde C++11)
(até C++20)
template< class U >
constexpr allocator( const allocator<U>& other ) noexcept;  // (desde C++20)
```

  
Constrói o alocador padrão. Como o alocador padrão é sem estado, os construtores não têm efeito visível. 

### Parâmetros

other  |  \-  |  outro alocador para construir com   