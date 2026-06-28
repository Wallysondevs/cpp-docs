# std::vector&lt;T,Allocator&gt;::back

reference back(); | (1) | (constexpr desde C++20)
---|---|---
const_reference back() const; | (2) | (constexpr desde C++20)

Retorna uma referência para o último elemento no container.

Chamar `back` em um container vazio causa [comportamento indefinido](<#/doc/language/ub>).

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o último elemento.

### Complexidade

Constante.

### Observações

Para um container `c` não vazio, a expressão c.back() é equivalente a *[std::prev](<#/doc/iterator/prev>)(c.end()).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <vector>
     
    int main()
    {
        std::vector<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.back() == 'd');
    }
```

### Veja também

[ front](<#/doc/container/vector/front>) | acessa o primeiro elemento
(função membro pública)
[ rbegincrbegin](<#/doc/container/vector/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ endcend](<#/doc/container/vector/end>)(C++11) | retorna um iterator para o fim
(função membro pública)