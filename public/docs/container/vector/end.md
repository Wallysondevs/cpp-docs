# std::vector&lt;T,Allocator&gt;::end, std::vector&lt;T,Allocator&gt;::cend

```cpp
  // (1)
iterator end();  // (até C++11)
iterator end() noexcept;  // (desde C++11)
(constexpr desde C++20)
  // (2)
const_iterator end() const;  // (até C++11)
const_iterator end() const noexcept;  // (desde C++11)
(constexpr desde C++20)
const_iterator cend() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Retorna um iterator para o elemento que segue o último elemento do `vector`.

Este elemento atua como um placeholder; tentar acessá-lo resulta em comportamento indefinido.

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
        std::for_each(nums.begin(), nums.end(),  { std::cout << n << ' '; });
        std::cout << '\n';
     
        // Sums all integers in the vector nums (if any), printing only the result.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.begin(), nums.end(), 0) << '\n';
     
        // Prints the first fruit in the vector fruits, checking if there is any.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.begin() << '\n';
     
        if (empty.begin() == empty.end())
            std::cout << "vector 'empty' is indeed empty.\n";
    }
```

Saída:
```
    1 2 4 8 16
    Sum of nums: 31
    First fruit: orange
    vector 'empty' is indeed empty.
```

### Veja também

[ begincbegin](<#/doc/container/vector/begin>)(C++11) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) |  retorna um iterator para o fim de um container ou array   
(template de função)