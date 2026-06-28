# std::uses_allocator&lt;std::flat_multiset&gt;

Definido no cabeçalho `[<flat_set>](<#/doc/header/flat_set>)`

```c
template< class Key, class Compare, class KeyContainer, class Allocator >
struct uses_allocator<std::flat_multiset<Key, Compare, KeyContainer>, Allocator>
: std::bool_constant<std::uses_allocator_v<KeyContainer, Allocator>> {};
```

  
Fornece uma especialização transparente do trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>) para [std::flat_multiset](<#/doc/container/flat_multiset>): o adaptador de container usa um alocador se e somente se o container subjacente o fizer. 

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
  
### Exemplo

Execute este código
```
    #include <memory>
    #include <flat_set>
     
    static_assert(
        std::uses_allocator<std::flat_multiset<int>, void>::value == false &&
        std::uses_allocator<std::flat_multiset<int>, std::allocator<int>>::value == true
    );
     
    int main() {}
```

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) |  verifica se o tipo especificado suporta construção com uses-allocator   
(modelo de classe)  