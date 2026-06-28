# std::vector&lt;T,Allocator&gt;::rend, std::vector&lt;T,Allocator&gt;::crend

```cpp
reverse_iterator rend(); |  (1)  |  (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator rend() const; |  (2)  |  (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Retorna um iterador reverso para o elemento seguinte ao último elemento do `vector` invertido. Ele corresponde ao elemento precedente ao primeiro elemento do `vector` não invertido. Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterador reverso para o elemento seguinte ao último elemento.

### Complexidade

Constante.

### Notas

libc++ faz backport de `crend()` para o modo C++98.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <vector>
     
    int main()
    {
        std::vector<int> nums{1, 2, 4, 8, 16};
        std::vector<std::string> fruits{"orange", "apple", "raspberry"};
        std::vector<char> empty;
     
        // Print vector.
        std::for_each(nums.rbegin(), nums.rend(),  { std::cout << n << ' '; });
        std::cout << '\n';
     
        // Sums all integers in the vector nums (if any), printing only the result.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.rbegin(), nums.rend(), 0) << '\n';
     
        // Prints the first fruit in the vector fruits, checking if there is any.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.rbegin() << '\n';
     
        if (empty.rbegin() == empty.rend())
            std::cout << "vector 'empty' is indeed empty.\n";
    }
```

Saída: 
```
    16 8 4 2 1
    Sum of nums: 31
    First fruit: raspberry
    vector 'empty' is indeed empty.
```

### Ver também

[ rbegincrbegin](<#/doc/container/vector/rbegin>)(C++11) |  retorna um iterador reverso para o início   
(função membro pública)  
[ rendcrend](<#/doc/iterator/rend>)(C++14) |  retorna um iterador reverso de fim para um container ou array   
(template de função)