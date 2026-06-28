# std::pmr::polymorphic_allocator&lt;T&gt;::destroy

```cpp
template< class U >
void destroy( U* p );  // (desde C++17)
(obsoleto em C++20)
(não obsoleto em C++26)
```

  
Destrói o objeto apontado por p, como se chamasse p->~U(). 

### Parâmetros

p  |  \-  |  ponteiro para o objeto sendo destruído   
  
### Notas

Esta função é obsoleta via [LWG issue 3036](<https://cplusplus.github.io/LWG/issue3036>), porque sua funcionalidade pode ser fornecida pela implementação padrão de [std::allocator_traits::destroy](<#/doc/memory/allocator_traits/destroy>) e, portanto, é supérflua. 

Esta função não é mais obsoleta via [P2875R4](<https://wg21.link/P2875R4>). 

### Veja também

[ destroy](<#/doc/memory/allocator_traits/destroy>)[static] |  destrói um objeto armazenado no armazenamento alocado   
(modelo de função)  