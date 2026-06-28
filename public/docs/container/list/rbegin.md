# std::list&lt;T,Allocator&gt;::rbegin, std::list&lt;T,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); |  (1)  |  (noexcept desde C++11)
const_reverse_iterator rbegin() const; |  (2)  |  (noexcept desde C++11)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um reverse iterator para o primeiro elemento da `list` invertida. Ele corresponde ao último elemento da `list` não invertida. Se a `list` estiver vazia, o iterator retornado é igual a [rend()](<#/doc/container/list/rend>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Observações

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/list/end>). Consequentemente, o iterator retornado é invalidado se e quando o end iterator for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

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
     
        // Imprime a lista.
        std::for_each(nums.rbegin(), nums.rend(),  { std::cout << n << ' '; });
        std::cout << '\n';
     
        // Soma todos os inteiros na lista nums (se houver), imprimindo apenas o resultado.
        std::cout << "Sum of nums: "
                  << std::accumulate(nums.rbegin(), nums.rend(), 0) << '\n';
     
        // Imprime a primeira fruta na lista fruits, verificando se há alguma.
        if (!fruits.empty())
            std::cout << "First fruit: " << *fruits.rbegin() << '\n';
     
        if (empty.rbegin() == empty.rend())
            std::cout << "list 'empty' is indeed empty.\n";
    }
```

Saída: 
``` 
    16 8 4 2 1
    Sum of nums: 31
    First fruit: raspberry
    list 'empty' is indeed empty.
```

### Veja também

[ rendcrend](<#/doc/container/list/rend>)(desde C++11) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(desde C++14) |  retorna um reverse iterator para o início de um container ou array   
(modelo de função)