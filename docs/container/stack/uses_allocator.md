# std::uses_allocator&lt;std::stack&gt;

Definido no cabeçalho `[<stack>](<#/doc/header/stack>)`

```c
template< class T, class Container, class Alloc >
struct uses_allocator<std::stack<T, Container>, Alloc>
: std::uses_allocator<Container, Alloc>::type {};
```

Fornece uma especialização transparente do trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>) para [std::stack](<#/doc/container/stack>): o adaptador de container usa alocador se e somente se o container subjacente o fizer.

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
    #include <stack>
    
    static_assert(
        std::uses_allocator<std::stack<int>, void>::value == false &&
        std::uses_allocator<std::stack<int>, std::allocator<int>>::value == true
    );
    
    int main() {}
```

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção com alocador
(modelo de classe)