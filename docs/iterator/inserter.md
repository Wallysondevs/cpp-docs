# std::inserter

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Container >
std::insert_iterator<Container>
inserter( Container& c, typename Container::iterator i );
template< class Container >
constexpr std::insert_iterator<Container>
inserter( Container& c, ranges::iterator_t<Container> i );
```

`inserter` é um template de função de conveniência que constrói um [std::insert_iterator](<#/doc/iterator/insert_iterator>) para o container c e seu iterator i com o tipo deduzido do tipo do argumento.

### Parâmetros

- **c** — container que suporta uma operação `insert`
- **i** — iterator em c indicando a posição de inserção

### Valor de retorno

Um [std::insert_iterator](<#/doc/iterator/insert_iterator>) que pode ser usado para inserir elementos no container c na posição indicada por i.

### Possível implementação
```cpp
    template<class Container>
    std::insert_iterator<Container> inserter(Container& c, typename Container::iterator i)
    {
        return std::insert_iterator<Container>(c, i);
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <set>
    #include <vector>
    
    int main()
    {
        std::multiset<int> s{1, 2, 3};
    
        // std::inserter é comumente usado com multi-sets
        std::fill_n(std::inserter(s, s.end()), 5, 2);
    
        for (int n : s)
            std::cout << n << ' ';
        std::cout << '\n';
    
        std::vector<int> d{100, 200, 300};
        std::vector<int> v{1, 2, 3, 4, 5};
    
        // ao inserir em um container de sequência, o ponto de inserção avança
        // porque cada std::insert_iterator::operator= atualiza o iterator alvo
        std::copy(d.begin(), d.end(), std::inserter(v, std::next(v.begin())));
    
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 2 2 2 2 2 3 
    1 100 200 300 2 3 4 5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 561](<https://cplusplus.github.io/LWG/issue561>) | C++98 | o tipo de i era independente de `Container` | é o tipo de iterator de `Container`

### Veja também

[ insert_iterator](<#/doc/iterator/insert_iterator>) | adaptador de iterator para inserção em um container
(template de classe)
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento
(template de função)
[ front_inserter](<#/doc/iterator/front_inserter>) | cria um [std::front_insert_iterator](<#/doc/iterator/front_inserter>) de tipo inferido a partir do argumento
(template de função)