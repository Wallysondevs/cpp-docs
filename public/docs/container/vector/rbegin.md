# std::vector&lt;T,Allocator&gt;::rbegin, std::vector&lt;T,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); |  (1)  |  (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator rbegin() const; |  (2)  |  (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Retorna um reverse iterator para o primeiro elemento do `vector` invertido. Ele corresponde ao último elemento do `vector` não invertido. Se o `vector` estiver vazio, o iterator retornado é igual a [rend()](<#/doc/container/vector/rend>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Notas

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [iterator final](<#/doc/container/vector/end>). Portanto, o iterator retornado é invalidado se e quando o iterator final for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

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

[ rendcrend](<#/doc/container/vector/rend>)(C++11) |  retorna um reverse iterator para o final   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um reverse iterator para o início de um container ou array   
(template de função)