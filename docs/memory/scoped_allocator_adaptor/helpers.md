# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::outermost, outermost-construct, outermost-destroy

template< class Alloc >  
/* unspecified */ /*outermost*/( Alloc&& alloc = *this ); |  (1) | (exposition only*)  
template< class T, class... Args >  
void /*outermost-construct*/( T* p, Args&&... args ); |  (2) | (exposition only*)  
template< class T >  
void /*outermost-destroy*/( T* p ); |  (3) | (exposition only*)  

  
Esses templates de função membro auxiliares, apenas para exposição, são usados nas funções membro [`construct()`](<#/doc/memory/scoped_allocator_adaptor/construct>) e [`destroy()`](<#/doc/memory/scoped_allocator_adaptor/destroy>). 

1) Obtém o alocador mais externo de `alloc`. 

  * Se a expressão `alloc.outer_allocator()` for válida, retorna `_outermost_` ﻿(`alloc.outer_allocator()`). 
  * Caso contrário, retorna `alloc`.

2,3) Constrói ou destrói um objeto usando o alocador mais externo de `*this`.

Dado o tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)<[std::remove_reference_t](<#/doc/types/remove_reference>)<decltype(`_outermost_` ﻿())>> como `outermost_traits`:

2) Equivalente a `outermost_traits::construct(_outermost_` ﻿`(), p, [std::forward](<#/doc/utility/forward>)<Args>(args)...);`.

3) Equivalente a `outermost_traits::destroy(_outermost_` ﻿`(), p);`.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3116](<https://cplusplus.github.io/LWG/issue3116>) | C++11  | a condição de recursão para `_outermost_` era “`alloc` tem a função membro `outer_allocator()`”  | alterada para “a expressão `alloc.outer_allocator()` é válida”   
  
### Veja também

[ construct](<#/doc/memory/allocator_traits/construct>)[static] |  constrói um objeto no armazenamento alocado   
(template de função)  
[ destroy](<#/doc/memory/allocator_traits/destroy>)[static] |  destrói um objeto armazenado no armazenamento alocado   
(template de função)