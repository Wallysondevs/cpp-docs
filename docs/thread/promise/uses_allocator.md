# std::uses_allocator&lt;std::promise&gt;

```cpp
template< class R, class Alloc >
struct uses_allocator<std::promise<R>, Alloc> : std::true_type {};  // (desde C++11)
```

  
Fornece uma especialização do type trait [std::uses_allocator](<#/doc/memory/uses_allocator>) para [std::promise](<#/doc/thread/promise>). 

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
(modelo de classe)  