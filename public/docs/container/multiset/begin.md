# std::multiset&lt;Key,Compare,Allocator&gt;::begin, std::multiset&lt;Key,Compare,Allocator&gt;::cbegin

```cpp
iterator begin(); |  (1)  |  (noexcept desde C++11)
const_iterator begin() const; |  (2)  |  (noexcept desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o primeiro elemento do `multiset`.

Se o `multiset` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/multiset/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem de fato ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

libc++ faz backport de `cbegin()` para o modo C++98.

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
            std::advance(it, count); // all count elements have equivalent keys
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

[ endcend](<#/doc/container/multiset/end>)(desde C++11) | retorna um iterator para o fim   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(desde C++11)(desde C++14) | retorna um iterator para o início de um container ou array   
(modelo de função)