# std::list&lt;T,Allocator&gt;::front

```cpp
reference front();  // (1)
const_reference front() const;  // (2)
```

Retorna uma referência para o primeiro elemento no container.

Chamar `front` em um container vazio causa comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o primeiro elemento.

### Complexidade

Constante.

### Notas

Para um container `c`, a expressão c.front() é equivalente a *c.begin().

### Exemplo

O código a seguir usa `front` para exibir o primeiro elemento de uma [std::list](<#/doc/container/list>)&lt;char&gt;:

Execute este código
```
    #include <cassert>
    #include <list>
    
    int main()
    {
        std::list<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.front() == 'a');
    }
```

### Veja também

[ back](<#/doc/container/list/back>) | acessa o último elemento
(função membro pública)
[ rendcrend](<#/doc/container/list/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/container/list/begin>)(C++11) | retorna um iterator para o início
(função membro pública)