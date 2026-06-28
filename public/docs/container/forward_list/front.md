# std::forward_list&lt;T,Allocator&gt;::front

```cpp
reference front();  // (1) (desde C++11)
const_reference front() const;  // (2) (desde C++11)
```

Retorna uma referência para o primeiro elemento no container.

Chamar `front` em um container vazio causa comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o primeiro elemento.

### Complexidade

Constante.

### Observações

Para um container `c`, a expressão c.front() é equivalente a *c.begin().

### Exemplo

O código a seguir usa `front` para exibir o primeiro elemento de um [std::forward_list](<#/doc/container/forward_list>)&lt;char&gt;:

Execute este código
```cpp
    #include <cassert>
    #include <forward_list>
    
    int main()
    {
        std::forward_list<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.front() == 'a');
    }
```

### Veja também

[ before_begincbefore_begin](<#/doc/container/forward_list/before_begin>) | retorna um iterator para o elemento antes do início
(função membro pública)
[ begincbegin](<#/doc/container/forward_list/begin>) | retorna um iterator para o início
(função membro pública)