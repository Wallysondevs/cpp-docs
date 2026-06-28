# std::deque&lt;T,Allocator&gt;::rend, std::deque&lt;T,Allocator&gt;::crend

```cpp
reverse_iterator rend(); |  (1)  |  (noexcept desde C++11)
const_reverse_iterator rend() const; |  (2)  |  (noexcept desde C++11)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um reverse iterator para o elemento que segue o último elemento do `deque` invertido. Ele corresponde ao elemento que precede o primeiro elemento do `deque` não invertido. Este elemento atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Notas

libc++ faz o backport de `crend()` para o modo C++98.

### Exemplo

Execute este código
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
        std::for_each(nums.rbegin(), nums.rend(),  { std::cout << n << ' '; });
        std::cout << '\n';
     
        // Sums all integers in the deque nums (if any), printing only the result.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.rbegin(), nums.rend(), 0) << '\n';
     
        // Prints the first fruit in the deque fruits, checking if there is any.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.rbegin() << '\n';
     
        if (empty.rbegin() == empty.rend())
            std::cout << "deque 'empty' is indeed empty.\n";
    }
```

Saída: 
```
    16 8 4 2 1
    Sum of nums: 31
    First fruit: raspberry
    deque 'empty' is indeed empty.
```

### Veja também

[ rbegincrbegin](<#/doc/container/deque/rbegin>)(C++11) |  retorna um reverse iterator para o início   
(função membro pública)  
[ rendcrend](<#/doc/iterator/rend>)(C++14) |  retorna um reverse end iterator para um container ou array   
(template de função)