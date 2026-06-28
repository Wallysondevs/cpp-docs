# std::pointer_traits&lt;Ptr&gt;::pointer_to

Definido no header `[<memory>](<#/doc/header/memory>)`

```cpp
static pointer
pointer_to( element_type& r );  // (1) (desde C++11)
(membro da especialização de `pointer_traits<Ptr>`)
  // (2)
static pointer
pointer_to( element_type& r ) noexcept;  // (desde C++11)
(ate C++20)
(membro da especialização de `pointer_traits<T*>`)
static constexpr pointer
pointer_to( element_type& r ) noexcept;  // (desde C++20)
(membro da especialização de `pointer_traits<T*>`)
```

  
Constrói um ponteiro desreferenciável ou objeto tipo ponteiro (["fancy pointer"](<#/doc/named_req/Allocator>)) para seu argumento.

1) A versão desta função no template [std::pointer_traits](<#/doc/memory/pointer_traits>) não especializado simplesmente chama Ptr::pointer_to(r), e se Ptr não fornecer uma função membro estática `pointer_to`, a instanciação desta função é um erro em tempo de compilação.

2) A versão desta função na especialização de [std::pointer_traits](<#/doc/memory/pointer_traits>) para tipos de ponteiro retorna [std::addressof](<#/doc/memory/addressof>)(r).

### Parâmetros

r  |  \-  |  referência para um objeto do tipo element_type&, exceto se element_type for void, caso em que o tipo de `r` é não especificado   
  
### Valor de retorno

Um ponteiro desreferenciável para r, do tipo pointer_traits<>::pointer.

### Exceções

1) Não especificadas (tipicamente o mesmo que Ptr::pointer_to).

### Notas

A versão da biblioteca [Boost.Intrusive](<https://www.boost.org/doc/libs/release/doc/html/boost/intrusive/pointer_traits.html>) desta função retorna pointer([std::addressof](<#/doc/memory/addressof>)(r)) se Ptr::pointer_to não existir.

### Veja também

[ addressof](<#/doc/memory/addressof>)(C++11) |  obtém o endereço real de um objeto, mesmo que o operador `&` esteja sobrecarregado   
(modelo de função)  
[ address](<#/doc/memory/allocator/address>)(ate C++20) |  obtém o endereço de um objeto, mesmo que o operador & esteja sobrecarregado   
(função membro pública de `std::allocator<T>`)  
[ to_address](<#/doc/memory/pointer_traits/to_address>)[static] (C++20)(opcional) |  obtém um ponteiro bruto de um fancy pointer (inverso de `pointer_to`)   
(função membro estática pública)  
[ to_address](<#/doc/memory/to_address>)(C++20) |  obtém um ponteiro bruto de um tipo tipo-ponteiro   
(modelo de função)