# std::swap(std::priority_queue)

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template< class T, class Container, class Compare >
void swap( std::priority_queue<T, Container, Compare>& lhs,
std::priority_queue<T, Container, Compare>& rhs );
(até C++17)
template< class T, class Container, class Compare >
void swap( std::priority_queue<T, Container, Compare>& lhs,
std::priority_queue<T, Container, Compare>& rhs )
noexcept(/* veja abaixo */);
Especializa o algoritmo std::swap para std::priority_queue. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs). Esta sobrecarga participa da resolução de sobrecarga apenas se std::is_swappable_v<Container> e std::is_swappable_v<Compare> forem ambos verdadeiros.
```

  
### Parâmetros

lhs, rhs  |  \-  |  containers cujo conteúdo será trocado   
  
### Valor de retorno

(nenhum) 

### Complexidade

O mesmo que trocar os containers subjacentes. 

### Exceções

```cpp
especificação `noexcept`: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```
  
### Notas

Embora as sobrecargas de [std::swap](<#/doc/utility/swap>) para adaptadores de container sejam introduzidas no C++11, adaptadores de container já podem ser trocados por [std::swap](<#/doc/utility/swap>) no C++98. Tais chamadas para [std::swap](<#/doc/utility/swap>) geralmente têm complexidade de tempo linear, mas uma complexidade melhor pode ser fornecida. 

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <queue>
     
    int main()
    {
        std::priority_queue<int> alice;
        std::priority_queue<int> bob;
     
        auto print = 
        {
            std::cout << title << " size=" << cont.size();
            std::cout << " top=" << cont.top() << '\n';
        };
     
        for (int i = 1; i < 4; ++i)
            alice.push(i);
        for (int i = 7; i < 11; ++i)
            bob.push(i);
     
        // Print state before swap
        print("Alice:", alice);
        print("Bobby:", bob);
     
        std::cout << "-- SWAP\n";
        std::swap(alice, bob);
     
        // Print state after swap
        print("Alice:", alice);
        print("Bobby:", bob);
    }
```

Saída: 
```
    Alice: size=3 top=3
    Bobby: size=4 top=10
    -- SWAP
    Alice: size=4 top=10
    Bobby: size=3 top=3
```

### Veja também

[ swap](<#/doc/container/priority_queue/swap>)(C++11) |  troca o conteúdo   
(função membro pública)  