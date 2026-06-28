# std::experimental::observer_ptr&lt;W&gt;::observer_ptr

constexpr observer_ptr() noexcept;  
constexpr observer_ptr( nullptr_t ) noexcept; |  (1)  |  (library fundamentals TS v2)  
---|---|---
constexpr explicit observer_ptr( element_type* p ) noexcept; |  (2)  |  (library fundamentals TS v2)  
template< class W2 >  
constexpr observer_ptr( observer_ptr&lt;W2&gt; other ) noexcept; |  (3)  |  (library fundamentals TS v2)  
---|---|---
observer_ptr( const observer_ptr& other ) = default; |  (4)  |  (library fundamentals TS v2)   
(declarado implicitamente)  
observer_ptr( observer_ptr&& other ) = default; |  (5)  |  (library fundamentals TS v2)   
(declarado implicitamente)  

  
1) Constrói um `observer_ptr` que não possui um objeto observado correspondente.

2) Constrói um `observer_ptr` que observa p.

3) Constrói um `observer_ptr` que observa other.get(). Esta sobrecarga participa da resolução de sobrecarga apenas se W2* for conversível para element_type*.

4,5) Construtores de cópia e de movimento declarados implicitamente. Constrói um `observer_ptr` que observa other.get().

### Parâmetros

p  |  \-  |  um ponteiro para um objeto a ser observado   
---|---|---
other  |  \-  |  outro `observer_ptr` para copiar 