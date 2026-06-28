# std::deque&lt;T,Allocator&gt;::rbegin, std::deque&lt;T,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); | (1) | (noexcept desde C++11)
const_reverse_iterator rbegin() const; | (2) | (noexcept desde C++11)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um reverse iterator para o primeiro elemento da `deque` invertida. Ele corresponde ao último elemento da `deque` não invertida. Se a `deque` estiver vazia, o iterator retornado é igual a [rend()](<#/doc/container/deque/rend>).

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o primeiro elemento.

### Complexidade

Constante.

### Notas

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/deque/end>). Consequentemente, o iterator retornado é invalidado se e quando o end iterator for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

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

[ rendcrend](<#/doc/container/deque/rend>)(desde C++11) | retorna um reverse iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(desde C++14) | retorna um reverse iterator para o início de um container ou array
(template de função)