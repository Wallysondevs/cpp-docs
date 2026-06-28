# std::deque&lt;T,Allocator&gt;::end, std::deque&lt;T,Allocator&gt;::cend

```cpp
iterator end(); | (1) | (noexcept desde C++11)
const_iterator end() const; | (2) | (noexcept desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o elemento que segue o último elemento da `deque`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Notas

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <deque>
    
    int main()
    {
        std::deque<int> nums{1, 2, 4, 8, 16};
        std::deque<std::string> fruits{"orange", "apple", "raspberry"};
        std::deque<char> empty;
    
        // Print deque.
        std::for_each(nums.begin(), nums.end(),  { std::cout << n << ' '; });
        std::cout << '\n';
    
        // Sums all integers in the deque nums (if any), printing only the result.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.begin(), nums.end(), 0) << '\n';
    
        // Prints the first fruit in the deque fruits, checking if there is any.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.begin() << '\n';
    
        if (empty.begin() == empty.end())
            std::cout << "deque 'empty' is indeed empty.\n";
    }
```

Saída:
```
    1 2 4 8 16
    Sum of nums: 31
    First fruit: orange
    deque 'empty' is indeed empty.
```

### Veja também

[ begincbegin](<#/doc/container/deque/begin>)(desde C++11) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(desde C++11)(desde C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)