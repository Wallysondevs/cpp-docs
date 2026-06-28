# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::begin, std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++11)
const_iterator begin() const noexcept;  // (2) (desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o primeiro elemento do `unordered_multimap`.

Se o `unordered_multimap` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/unordered_multimap/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <utility>
    #include <unordered_map>
     
    int main()
    {
        auto show_node = <std::string, std::string>& node)
        {
            std::cout << node.first << " : " << node.second << '\n';
        };
     
        std::unordered_multimap<std::string, std::string> lemmas;
        assert(lemmas.begin() == lemmas.end());
        assert(lemmas.cbegin() == lemmas.cend());
     
        lemmas.insert({ "1. ∀x ∈ N ∃y ∈ N", "x ≤ y" });
        show_node(*lemmas.cbegin());
        assert(lemmas.begin() != lemmas.end());
        assert(lemmas.cbegin() != lemmas.cend());
     
        lemmas.begin()->second = "x < y";
        show_node(*lemmas.cbegin());
     
        lemmas.insert({ "2. ∀x, y ∈ N    ", "x = y V x ≠ y" });
        show_node(*lemmas.cbegin());
     
        lemmas.insert({ "3. ∀x ∈ N ∃y ∈ N", "y = x + 1" });
        show_node(*lemmas.cbegin());
     
        std::cout << "Lemmas: \n";
        std::for_each(lemmas.cbegin(), lemmas.cend(), &
        {
            show_node(n);
        });
        std::cout << '\n';
    }
```

Saída possível:
```
    1. ∀x ∈ N ∃y ∈ N : x ≤ y
    1. ∀x ∈ N ∃y ∈ N : x < y
    2. ∀x, y ∈ N     : x = y V x ≠ y
    3. ∀x ∈ N ∃y ∈ N : y = x + 1
    Lemmas:
    3. ∀x ∈ N ∃y ∈ N : y = x + 1
    1. ∀x ∈ N ∃y ∈ N : x < y
    2. ∀x, y ∈ N     : x = y V x ≠ y
```

### Veja também

[ endcend](<#/doc/container/unordered_multimap/end>) | retorna um iterator para o final
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)