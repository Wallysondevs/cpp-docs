# std::swap(std::forward_list)

Definido no cabeçalho `[<forward_list>](<#/doc/header/forward_list>)`

```c
template< class T, class Alloc >
void swap( std::forward_list<T, Alloc>& lhs,
std::forward_list<T, Alloc>& rhs );
(até C++17)
template< class T, class Alloc >
void swap( std::forward_list<T, Alloc>& lhs,
std::forward_list<T, Alloc>& rhs )
noexcept(/* see below */);
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::forward_list](<#/doc/container/forward_list>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — containers cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

```cpp
`noexcept` especificação: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <forward_list>
    
    int main()
    {
        std::forward_list<int> alice{1, 2, 3};
        std::forward_list<int> bob{7, 8, 9, 10};
    
        auto print =  { std::cout << ' ' << n; };
    
        // Print state before swap
        std::cout << "Alice:";
        std::for_each(alice.begin(), alice.end(), print);
        std::cout << "\nBobby:";
        std::for_each(bob.begin(), bob.end(), print);
        std::cout << '\n';
    
        std::cout << "-- SWAP\n";
        std::swap(alice, bob);
    
        // Print state after swap
        std::cout << "Alice:";
        std::for_each(alice.begin(), alice.end(), print);
        std::cout << "\nBobby:";
        std::for_each(bob.begin(), bob.end(), print);
        std::cout << '\n';
    }
```

Saída:
```
    Alice: 1 2 3
    Bobby: 7 8 9 10
    -- SWAP
    Alice: 7 8 9 10
    Bobby: 1 2 3
```

### Veja também

[ swap](<#/doc/container/forward_list/swap>) | troca o conteúdo
(função membro pública)