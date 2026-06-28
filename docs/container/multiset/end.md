# std::multiset&lt;Key,Compare,Allocator&gt;::end, std::multiset&lt;Key,Compare,Allocator&gt;::cend

```cpp
iterator end(); | (1) | (noexcept desde C++11)
const_iterator end() const; | (2) | (noexcept desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o elemento que segue o último elemento do `multiset`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <set>
    #include <string>
     
    int main()
    {
        const std::multiset<std::string> words =
        {
            "some", "not", "sorted", "words",
            "will", "come", "out", "sorted",
        };
     
        for (auto it = words.begin(); it != words.end(); )
        {
            auto count = words.count(*it);
            std::cout << *it << ":\t" << count << '\n';
            std::advance(it, count); // todos os elementos de contagem têm chaves equivalentes
        }
    }
```

Saída:
```
    come:	1
    not:	1
    out:	1
    some:	1
    sorted:	2
    will:	1
    words:	1
```

### Veja também

[ begincbegin](<#/doc/container/multiset/begin>)(desde C++11) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(desde C++11)(desde C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)