# std::set&lt;Key,Compare,Allocator&gt;::rbegin, std::set&lt;Key,Compare,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); | (1) | (noexcept desde C++11)
const_reverse_iterator rbegin() const; | (2) | (noexcept desde C++11)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um reverse iterator para o primeiro elemento do `set` invertido. Ele corresponde ao último elemento do `set` não invertido. Se o `set` estiver vazio, o iterator retornado é igual a [rend()](<#/doc/container/set/rend>).

### Parameters

(nenhum)

### Return value

Reverse iterator para o primeiro elemento.

### Complexity

Constante.

### Notes

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem de fato ser do mesmo tipo), não é possível mutar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/set/end>). Portanto, o iterator retornado é invalidado se e quando o end iterator for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

### Example

Execute este código
```
    #include <iostream>
    #include <set>
    
    int main()
    {
        std::set<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};
    
        for (auto it = rep.crbegin(); it != rep.crend(); ++it)
        {
            for (auto n = *it; n > 0; --n)
                std::cout << "⏼" << ' ';
            std::cout << '\n';
        }
    }
```

Output:
```
    ⏼ ⏼ ⏼ ⏼
    ⏼ ⏼ ⏼
    ⏼ ⏼
    ⏼
```

### See also

[ rendcrend](<#/doc/container/set/rend>)(desde C++11) | retorna um reverse iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(desde C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)