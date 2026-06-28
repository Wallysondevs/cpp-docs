# std::list&lt;T,Allocator&gt;::end, std::list&lt;T,Allocator&gt;::cend

```cpp
iterator end(); |  (1)  |  (noexcept desde C++11)
const_iterator end() const; |  (2)  |  (noexcept desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o elemento que segue o último elemento da `list`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <list>
    
    int main()
    {
        std::list<int> nums{1, 2, 4, 8, 16};
        std::list<std::string> fruits{"orange", "apple", "raspberry"};
        std::list<char> empty;
    
        // Print list.
        std::for_each(nums.begin(), nums.end(),  { std::cout << n << ' '; });
        std::cout << '\n';
    
        // Sums all integers in the list nums (if any), printing only the result.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.begin(), nums.end(), 0) << '\n';
    
        // Prints the first fruit in the list fruits, checking if there is any.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.begin() << '\n';
    
        if (empty.begin() == empty.end())
            std::cout << "list 'empty' is indeed empty.\n";
    }
```

Saída:
```
    1 2 4 8 16
    Sum of nums: 31
    First fruit: orange
    list 'empty' is indeed empty.
```

### Veja também

[ begincbegin](<#/doc/container/list/begin>)(C++11) | retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array   
(template de função)