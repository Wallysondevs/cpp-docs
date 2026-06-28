# std::uses_allocator&lt;std::priority_queue&gt;

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template< class T, class Container, class Compare, class Alloc >
struct uses_allocator<std::priority_queue<T, Compare, Container>, Alloc>
: std::uses_allocator<Container, Alloc>::type {};
```

Fornece uma especialização transparente do type trait [std::uses_allocator](<#/doc/memory/uses_allocator>) para [std::priority_queue](<#/doc/container/priority_queue>): o adaptador de container usa um alocador se e somente se o container subjacente o fizer.

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

Execute este código
```cpp
    #include <memory>
    #include <queue>
    
    static_assert(
        std::uses_allocator<std::priority_queue<int>, void>::value == false &&
        std::uses_allocator<std::priority_queue<int>, std::allocator<int>>::value == true
    );
    
    int main() {}
```

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(modelo de classe)