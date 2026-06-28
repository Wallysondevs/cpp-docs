# std::back_inserter

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Container >
std::back_insert_iterator<Container> back_inserter( Container& c );
```

`back_inserter` é um template de função de conveniência que constrói um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) para o container c com o tipo deduzido do tipo do argumento.

### Parâmetros

- **c** — container que suporta uma operação `push_back`

### Valor de retorno

Um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) que pode ser usado para adicionar elementos ao final do container c.

### Possível implementação
```
    template<class Container>
    std::back_insert_iterator<Container> back_inserter(Container& c)
    {
        return std::back_insert_iterator<Container>(c);
    }
```

---

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        std::fill_n(std::back_inserter(v), 3, -1);
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4 5 6 7 8 9 10 -1 -1 -1
```

### Veja também

[ back_insert_iterator](<#/doc/iterator/back_insert_iterator>) | adaptador de iterator para inserção no final de um container
(template de classe)
[ front_inserter](<#/doc/iterator/front_inserter>) | cria um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) de tipo inferido a partir do argumento
(template de função)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)