# std::deque&lt;T,Allocator&gt;::begin, std::deque&lt;T,Allocator&gt;::cbegin

```cpp
iterator begin(); |  (1)  |  (noexcept desde C++11)
const_iterator begin() const; |  (2)  |  (noexcept desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o primeiro elemento do `deque`.

Se o `deque` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/deque/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

libc++ faz o backport de `cbegin()` para o modo C++98.

### Exemplo

Run this code
```
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

Output: 
```
    1 2 4 8 16
    Sum of nums: 31
    First fruit: orange
    deque 'empty' is indeed empty.
```

### Ver também

[ endcend](<#/doc/container/deque/end>)(C++11) |  retorna um iterator para o fim   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) |  retorna um iterator para o início de um container ou array   
(modelo de função)