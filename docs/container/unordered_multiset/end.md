# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::end, std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++11)
const_iterator end() const noexcept;  // (2) (desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o elemento que segue o último elemento do `unordered_multiset`.

Este elemento atua como um placeholder; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem de fato ser do mesmo tipo), não é possível mutar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

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

[ begincbegin](<#/doc/container/unordered_multiset/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(template de função)