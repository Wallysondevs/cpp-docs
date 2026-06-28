# std::list&lt;T,Allocator&gt;::back

```cpp
reference back();  // (1)
const_reference back() const;  // (2)
```

  
Retorna uma referência para o último elemento no container.

Chamar `back` em um container vazio causa [comportamento indefinido](<#/doc/language/ub>).

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o último elemento.

### Complexidade

Constante.

### Notas

Para um container não vazio `c`, a expressão c.back() é equivalente a *[std::prev](<#/doc/iterator/prev>)(c.end()).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <list>
     
    int main()
    {
        std::list<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.back() == 'd');
    }
```

### Veja também

[ front](<#/doc/container/list/front>) | acessa o primeiro elemento   
(função membro pública)  
[ rbegincrbegin](<#/doc/container/list/rbegin>)(desde C++11) | retorna um reverse iterator para o início   
(função membro pública)  
[ endcend](<#/doc/container/list/end>)(desde C++11) | retorna um iterator para o fim   
(função membro pública)