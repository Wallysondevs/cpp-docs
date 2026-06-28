# std::experimental::erase (std::forward_list)

Definido no cabeçalho `[<experimental/forward_list>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/forward_list&action=edit&redlink=1> "cpp/header/experimental/forward list \(page does not exist\)")`

```c
template< class T, class A, class U >
void erase( std::forward_list<T, A>& c, const U& value );
```

Apaga todos os elementos do container que se comparam como iguais a value. Equivalente a `c.remove_if([&](auto& elem) { return elem == value; });`.

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido

### Complexidade

Linear.

### Exemplo

Execute este código
```cpp
    #include <experimental/forward_list>
    #include <iostream>
    
    auto show = 
    {
        for (auto e : container)
            std::cout << e;
        std::cout << '\n';
    };
    
    int main()
    {
        std::forward_list<int> data{1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 1};
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

Ao contrário de [std::forward_list::remove](<#/doc/container/forward_list/remove>), este modelo de função aceita tipos heterogêneos e não força uma conversão para o tipo de valor do container antes de invocar o operador `==`.

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ removeremove_if](<#/doc/container/forward_list/remove>) | remove elementos que satisfazem critérios específicos
(função membro pública de `std::forward_list<T,Allocator>`)
[ erase_if (std::forward_list)](<#/doc/experimental/forward_list/erase_if>)(library fundamentals 2 TS) | apaga todos os elementos que satisfazem um predicado de uma [std::forward_list](<#/doc/container/forward_list>)
(modelo de função)