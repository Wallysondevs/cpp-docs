# std::forward_list&lt;T,Allocator&gt;::end, std::forward_list&lt;T,Allocator&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++11)
const_iterator end() const noexcept;  // (2) (desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o elemento que segue o último elemento da `forward_list`.

Este elemento atua como um placeholder; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <forward_list>
    
    int main()
    {
        std::forward_list<int> nums{1, 2, 4, 8, 16};
        std::forward_list<std::string> fruits{"orange", "apple", "raspberry"};
        std::forward_list<char> empty;
    
        // Print forward_list.
        std::for_each(nums.begin(), nums.end(),  { std::cout << n << ' '; });
        std::cout << '\n';
    
        // Sums all integers in the forward_list nums (if any), printing only the result.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.begin(), nums.end(), 0) << '\n';
    
        // Prints the first fruit in the forward_list fruits, checking if there is any.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.begin() << '\n';
    
        if (empty.begin() == empty.end())
            std::cout << "forward_list 'empty' is indeed empty.\n";
    }
```

Saída:
```
    1 2 4 8 16
    Sum of nums: 31
    First fruit: orange
    forward_list 'empty' is indeed empty.
```

### Veja também

[ begincbegin](<#/doc/container/forward_list/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)