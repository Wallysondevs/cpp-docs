# std::experimental::erase (std::vector)

Definido no cabeçalho `[<experimental/vector>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/vector&action=edit&redlink=1> "cpp/header/experimental/vector \(page does not exist\)")`

```c
template< class T, class A, class U >
void erase( std::vector<T, A>& c, const U& value );
```

Apaga todos os elementos do container que se comparam como iguais a value. Equivalente a c.erase(std::remove(c.begin(), c.end(), value), c.end());.

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido

### Complexidade

Linear.

### Exemplo

Execute este código
```
    #include <experimental/vector>
    #include <iostream>
     
    auto show = 
    {
        for (auto e : container)
            std::cout << e;
        std::cout << '\n';
    };
     
    int main()
    {
        std::vector<int> data{1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 1};
        show(data);
        std::experimental::erase(data, 1);
        show(data);
    }
```

Saída:
```
    11141112111
    42
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ erase_if (std::vector)](<#/doc/experimental/vector/erase_if>)(TS de fundamentos da biblioteca 2) | apaga todos os elementos que satisfazem um predicado de um [std::vector](<#/doc/container/vector>)
(modelo de função)