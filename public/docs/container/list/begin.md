# std::list&lt;T,Allocator&gt;::begin, std::list&lt;T,Allocator&gt;::cbegin

```cpp
iterator begin(); |  (1)  |  (noexcept desde C++11)
const_iterator begin() const; |  (2)  |  (noexcept desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o primeiro elemento da `list`.

Se a `list` estiver vazia, o iterator retornado será igual a [end()](<#/doc/container/list/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Notas

libc++ faz o backport de `cbegin()` para o modo C++98.

### Exemplo

Execute este código
```
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

Output: 
```
    1 2 4 8 16
    Sum of nums: 31
    First fruit: orange
    list 'empty' is indeed empty.
```

### Veja também

[ endcend](<#/doc/container/list/end>)(desde C++11) | retorna um iterator para o fim   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(desde C++11)(desde C++14) | retorna um iterator para o início de um container ou array   
(modelo de função)