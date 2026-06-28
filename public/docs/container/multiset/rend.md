# std::multiset&lt;Key,Compare,Allocator&gt;::rend, std::multiset&lt;Key,Compare,Allocator&gt;::crend

```cpp
reverse_iterator rend(); | (1) | (noexcept desde C++11)
const_reverse_iterator rend() const; | (2) | (noexcept desde C++11)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
```

Retorna um reverse iterator para o elemento que segue o último elemento do `multiset` invertido. Ele corresponde ao elemento que precede o primeiro elemento do `multiset` não invertido. Este elemento atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Notas

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem de fato ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

libc++ faz o backport de `crend()` para o modo C++98.

### Exemplo

Execute este código
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

[ rbegincrbegin](<#/doc/container/multiset/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)