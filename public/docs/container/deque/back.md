# std::deque&lt;T,Allocator&gt;::back

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
```
    #include <cassert>
    #include <deque>
     
    int main()
    {
        std::deque<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.back() == 'd');
    }
```

### Veja também

[ front](<#/doc/container/deque/front>) | acessa o primeiro elemento   
(função membro pública)  
[ rbegincrbegin](<#/doc/container/deque/rbegin>)(C++11) | retorna um reverse iterator para o início   
(função membro pública)  
[ endcend](<#/doc/container/deque/end>)(C++11) | retorna um iterator para o fim   
(função membro pública)