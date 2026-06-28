# std::experimental::erase (std::list)

Definido no cabeçalho `[<experimental/list>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/list&action=edit&redlink=1> "cpp/header/experimental/list \(page does not exist\)")`

```c
template< class T, class A, class U >
void erase( std::list<T, A>& c, const U& value );
```

Apaga todos os elementos que se comparam como iguais a `value` do container. Equivalente a `c.remove_if([&](auto& elem) { return elem == value; });`.

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido

### Complexidade

Linear.

### Exemplo

Execute este código
```cpp
    #include <experimental/list>
    #include <iostream>
     
    auto show = 
    {
        for (auto e : container)
            std::cout << e;
        std::cout << '\n';
    };
     
    int main()
    {
        std::list<int> data{1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 1};
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

### Notas

Ao contrário de [std::list::remove](<#/doc/container/list/remove>), este function template aceita tipos heterogêneos e não força uma conversão para o tipo de valor do container antes de invocar o operador `==`.

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(function template)
[ removeremove_if](<#/doc/container/list/remove>) | remove elementos que satisfazem critérios específicos
(função membro pública de `std::list<T,Allocator>`)
[ erase_if (std::list)](<#/doc/experimental/list/erase_if>)(library fundamentals 2 TS) | apaga todos os elementos que satisfazem um predicado de uma [std::list](<#/doc/container/list>)
(function template)