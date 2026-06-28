# std::deque&lt;T,Allocator&gt;::emplace_front

```cpp
template< class... Args >
void emplace_front( Args&&... args );  // (desde C++11)
(até C++17)
template< class... Args >
reference emplace_front( Args&&... args );  // (desde C++17)
```

  
Insere um novo elemento no início do container. O elemento é construído através de [std::allocator_traits::construct](<#/doc/memory/allocator_traits/construct>), que tipicamente usa placement-new para construir o elemento no local fornecido pelo container. Os argumentos args... são encaminhados para o construtor como [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Nenhuma referência é invalidada. 

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
Requisitos de tipo   
-`T (o tipo de elemento do container)` deve atender aos requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).   
  
### Valor de retorno

(nenhum) | (até C++17)  
---|---
Uma referência para o elemento inserido. | (desde C++17)  
  
### Complexidade

Constante. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Ver também

[ push_front](<#/doc/container/deque/push_front>) |  insere um elemento no início   
(função membro pública)  