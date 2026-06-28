# std::uses_allocator&lt;std::packaged_task&gt;

```cpp
template< class R, class Alloc >
struct uses_allocator<std::packaged_task<R>, Alloc> : true_type {};  // (desde C++11)
(removido em C++17)
```

  
Fornece uma especialização do [std::uses_allocator](<#/doc/memory/uses_allocator>) type trait para [std::packaged_task](<#/doc/thread/packaged_task>). 

##  Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

###  Constantes membro

value[static] |  true   
(constante membro estática pública)  
  
###  Funções membro

operator bool |  converte o objeto para bool, retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
###  Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  bool  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>  
  
### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) |  verifica se o tipo especificado suporta construção uses-allocator   
(template de classe)  