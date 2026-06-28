# std::list&lt;T,Allocator&gt;::rend, std::list&lt;T,Allocator&gt;::crend

```cpp
reverse_iterator rend(); | (1) | (noexcept desde C++11)
const_reverse_iterator rend() const; | (2) | (noexcept desde C++11)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
```

Retorna um reverse iterator para o elemento que segue o último elemento da `list` invertida. Ele corresponde ao elemento que precede o primeiro elemento da `list` não invertida. Este elemento atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido.

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
        std::cout << "Soma de nums: "
                  << std::accumulate(nums.rbegin(), nums.rend(), 0) << '\n';
    
        // Imprime a primeira fruta na lista fruits, verificando se há alguma.
        if (!fruits.empty())
            std::cout << "Primeira fruta: " << *fruits.rbegin() << '\n';
    
        if (empty.rbegin() == empty.rend())
            std::cout << "A lista 'empty' está de fato vazia.\n";
    }
```

Saída:
```
    16 8 4 2 1
    Soma de nums: 31
    Primeira fruta: raspberry
    A lista 'empty' está de fato vazia.
```

### Veja também

[ rbegincrbegin](<#/doc/container/list/rbegin>)(desde C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/iterator/rend>)(desde C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)