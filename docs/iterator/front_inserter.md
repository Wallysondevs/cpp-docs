# std::front_inserter

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Container >
std::front_insert_iterator<Container> front_inserter( Container& c );
```

`front_inserter` é um template de função de conveniência que constrói um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) para o container c com o tipo deduzido do tipo do argumento.

### Parâmetros

- **c** — container que suporta uma operação `push_front`

### Valor de retorno

Um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) que pode ser usado para adicionar elementos ao início do container c.

### Possível implementação
```cpp
    template<class Container>
    std::front_insert_iterator<Container> front_inserter( Container& c )
    {
        return std::front_insert_iterator<Container>(c);
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <deque>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5};
        std::deque<int> d;
        std::copy(v.begin(), v.end(), std::front_inserter(d));
        for (int n : d)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    5 4 3 2 1
```

### Veja também

[ front_insert_iterator](<#/doc/iterator/front_insert_iterator>) | adaptador de iterator para inserção no início de um container
(template de classe)
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_inserter>) de tipo inferido a partir do argumento
(template de função)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)