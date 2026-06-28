# std::uses_allocator&lt;std::flat_set&gt;

Definido no cabeçalho `[<flat_set>](<#/doc/header/flat_set>)`

```c
template< class Key, class Compare, class KeyContainer, class Allocator >
struct uses_allocator<std::flat_set<Key, Compare, KeyContainer>, Allocator>
: std::bool_constant<std::uses_allocator_v<KeyContainer, Allocator>> {};
```

Fornece uma especialização transparente do type trait [std::uses_allocator](<#/doc/memory/uses_allocator>) para [std::flat_set](<#/doc/container/flat_set>): o adaptador de container usa o allocator se e somente se o container subjacente o fizer.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes de membro

value[static] | true
(constante de membro estática pública)

### Funções de membro

operator bool | converte o objeto para bool, retorna value
(função de membro pública)
operator()(C++14) | retorna value
(função de membro pública)

### Tipos de membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```cpp
    #include <memory>
    #include <flat_set>
    
    static_assert(
        std::uses_allocator<std::flat_set<int>, void>::value == false &&
        std::uses_allocator<std::flat_set<int>, std::allocator<int>>::value == true
    );
    
    int main() {}
```

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(modelo de classe)