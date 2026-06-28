# std::swap(std::set)

Definido no cabeçalho `[<set>](<#/doc/header/set>)`

```c
template< class Key, class Compare, class Alloc >
void swap( std::set<Key, Compare, Alloc>& lhs,
std::set<Key, Compare, Alloc>& rhs );
template< class Key, class Compare, class Alloc >
void swap( std::set<Key, Compare, Alloc>& lhs,
std::set<Key, Compare, Alloc>& rhs )
noexcept(/* see below */);
```

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::set](<#/doc/container/set>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs). 

### Parâmetros

lhs, rhs  |  \-  |  containers cujo conteúdo será trocado   
  
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
    #include <set>
     
    int main()
    {
        std::set<int> alice{1, 2, 3};
        std::set<int> bob{7, 8, 9, 10};
     
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

[ swap](<#/doc/container/set/swap>) |  troca o conteúdo   
(função membro pública)  