# std::experimental::erase_if (std::deque)

Definido no cabeçalho `[<experimental/deque>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/deque&action=edit&redlink=1> "cpp/header/experimental/deque \(page does not exist\)")`

```c
template< class T, class Alloc, class Pred >
void erase_if( std::deque<T, Alloc>& c, Pred pred );
```

Apaga todos os elementos que satisfazem o predicado pred do container. Equivalente a c.erase([std::remove_if](<#/doc/algorithm/remove>)(c.begin(), c.end(), pred), c.end());.

### Parâmetros

- **c** — container do qual apagar
- **pred** — predicado que determina quais elementos devem ser apagados

### Complexidade

Linear.

### Exemplo

Execute este código
```cpp
    #include <experimental/deque>
    #include <iostream>
    
    template<typename Os, typename Container>
    inline Os& operator<<(Os& os, Container const& container)
    {
        os << "{ ";
        for (const auto& item : container)
            os << item << ' ';
        return os << '}';
    }
    
    int main()
    {
        std::deque<int> data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
        std::cout << "Original:\n" << data << '\n';
        auto divisible_by_3 =  { return (x % 3) == 0; };
        std::experimental::erase_if(data, divisible_by_3);
        std::cout << "Erase all items divisible by 3:\n" << data << '\n';
    }
```

Saída:
```
    Original:
    { 3 3 4 5 5 6 6 7 2 1 0 }
    Erase all items divisible by 3:
    { 4 5 5 7 2 1 }
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ erase (std::deque)](<#/doc/experimental/deque/erase>)(library fundamentals 2 TS) | apaga todos os elementos iguais a um valor específico de um [std::deque](<#/doc/container/deque>)
(modelo de função)