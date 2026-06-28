# std::swap(std::deque)

Definido no cabeçalho `[<deque>](<#/doc/header/deque>)`

```c
template< class T, class Alloc >
void swap( std::deque<T, Alloc>& lhs,
std::deque<T, Alloc>& rhs );
template< class T, class Alloc >
void swap( std::deque<T, Alloc>& lhs,
std::deque<T, Alloc>& rhs )
noexcept(/* see below */);
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::deque](<#/doc/container/deque>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

```cpp
Especificação `noexcept`: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <deque>
     
    int main()
    {
        std::deque<int> alice{1, 2, 3};
        std::deque<int> bob{7, 8, 9, 10};
     
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

[ swap](<#/doc/container/deque/swap>) | troca o conteúdo
(função membro pública)