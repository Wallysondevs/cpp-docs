# std::vector&lt;T,Allocator&gt;::begin, std::vector&lt;T,Allocator&gt;::cbegin

```cpp
iterator begin(); |  (1)  |  (noexcept desde C++11)
(constexpr desde C++20)
const_iterator begin() const; |  (2)  |  (noexcept desde C++11)
(constexpr desde C++20)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Retorna um iterator para o primeiro elemento do `vector`. 

Se o `vector` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/vector/end>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Observações

libc++ faz o backport de `cbegin()` para o modo C++98.

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
     
        // Imprime o vector.
        std::for_each(nums.begin(), nums.end(),  { std::cout << n << ' '; });
        std::cout << '\n';
     
        // Soma todos os inteiros no vector nums (se houver), imprimindo apenas o resultado.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.begin(), nums.end(), 0) << '\n';
     
        // Imprime a primeira fruta no vector fruits, verificando se há alguma.
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

[ endcend](<#/doc/container/vector/end>)(C++11) |  retorna um iterator para o final   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) |  retorna um iterator para o início de um container ou array   
(template de função)