# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::end, std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++11)
const_iterator end() const noexcept;  // (2) (desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o elemento que segue o último elemento do `unordered_multimap`. 

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp 
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

### Ver também

[ begincbegin](<#/doc/container/unordered_multimap/begin>) | retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o final de um container ou array   
(modelo de função)