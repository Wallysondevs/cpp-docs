# std::swap(std::vector)

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
template< class T, class Alloc >
void swap( std::vector<T, Alloc>& lhs,
std::vector<T, Alloc>& rhs );
template< class T, class Alloc >
void swap( std::vector<T, Alloc>& lhs,
std::vector<T, Alloc>& rhs )
noexcept(/* see below */);
(constexpr desde C++20)
```

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::vector](<#/doc/container/vector>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs). 

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
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> alice{1, 2, 3};
        std::vector<int> bob{7, 8, 9, 10};
    
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

[ swap](<#/doc/container/vector/swap>) |  troca o conteúdo   
(função membro pública)  