# std::uses_allocator&lt;std::flat_multimap&gt;

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
template< class Key, class T, class Compare,
class KeyContainer, class MappedContainer, class Allocator >
struct uses_allocator<std::flat_multimap<Key, T, Compare,
KeyContainer, MappedContainer>, Allocator>
: std::bool_constant<std::uses_allocator_v<KeyContainer, Allocator> &&
std::uses_allocator_v<MappedContainer, Allocator>> {};
```

Fornece uma especialização transparente do *trait de tipo* [std::uses_allocator](<#/doc/memory/uses_allocator>) para [std::flat_multimap](<#/doc/container/flat_multimap>): o adaptador de container usa alocador se e somente se o container subjacente o fizer.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Run this code
```cpp
    #include <memory>
    #include <flat_map>
     
    static_assert(
        std::uses_allocator<std::flat_multimap<int, int>, void>::value == false &&
        std::uses_allocator<std::flat_multimap<int, int>, std::allocator<int>>::value == true
    );
     
    int main() {}
```

### Ver também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção com *uses-allocator*
(modelo de classe)