# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::begin, std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++11)
const_iterator begin() const noexcept;  // (2) (desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o primeiro elemento do `unordered_multiset`.

Se o `unordered_multiset` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/unordered_multiset/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <unordered_set>
    
    int main()
    {
        const std::unordered_multiset<std::string> words =
        {
            "some", "words", "to", "count",
            "count", "these", "words"
        };
    
        for (auto it = words.begin(); it != words.end(); )
        {
            auto count = words.count(*it);
            std::cout << *it << ":\t" << count << '\n';
            std::advance(it, count); // all count elements have equivalent keys
        }
    }
```

Saída possível:
```
    some:   1
    words:  2
    to:     1
    count:  2
    these:  1
```

### Veja também

[ endcend](<#/doc/container/unordered_multiset/end>) | retorna um iterator para o final
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)