# std::multiset&lt;Key,Compare,Allocator&gt;::rbegin, std::multiset&lt;Key,Compare,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); | (1) | (noexcept desde C++11)
const_reverse_iterator rbegin() const; | (2) | (noexcept desde C++11)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um reverse iterator para o primeiro elemento do `multiset` invertido. Ele corresponde ao último elemento do `multiset` não invertido. Se o `multiset` estiver vazio, o iterator retornado é igual a [rend()](<#/doc/container/multiset/rend>).

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [iterator final](<#/doc/container/multiset/end>). Portanto, o iterator retornado é invalidado se e quando o iterator final for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

### Exemplo

Run this code
```
    #include <iostream>
    #include <set>
    
    int main()
    {
        std::multiset<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};
    
        for (auto it = rep.crbegin(); it != rep.crend(); ++it)
        {
            for (auto n = *it; n > 0; --n)
                std::cout << "⏼" << ' ';
            std::cout << '\n';
        }
    }
```

Saída:
```
    ⏼ ⏼ ⏼ ⏼
    ⏼ ⏼ ⏼ ⏼
    ⏼ ⏼ ⏼
    ⏼ ⏼ ⏼
    ⏼ ⏼
    ⏼ ⏼
    ⏼
    ⏼
```

### Veja também

[ rendcrend](<#/doc/container/multiset/rend>)(C++11) | retorna um reverse iterator para o final
(função membro pública)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)