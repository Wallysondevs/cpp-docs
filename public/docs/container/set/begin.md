# std::set&lt;Key,Compare,Allocator&gt;::begin, std::set&lt;Key,Compare,Allocator&gt;::cbegin

```cpp
iterator begin(); | (1) | (noexcept desde C++11)
const_iterator begin() const; | (2) | (noexcept desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o primeiro elemento do `set`.

Se o `set` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/set/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem de fato ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

O libc++ faz backport de `cbegin()` para o modo C++98.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <set>
     
    int main()
    {
        std::set<int> set{3, 1, 4, 1, 5, 9, 2, 6, 5};
        std::for_each(set.cbegin(), set.cend(), 
        {
            std::cout << x << ' ';
        });
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4 5 6 9
```

### Veja também

[ endcend](<#/doc/container/set/end>)(C++11) | retorna um iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)