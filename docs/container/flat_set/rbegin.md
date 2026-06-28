# std::flat_set&lt;Key,Compare,KeyContainer&gt;::rbegin, std::flat_set&lt;Key,Compare,KeyContainer&gt;::crbegin

```cpp
reverse_iterator rbegin() noexcept;  // (1) (desde C++23)
const_reverse_iterator rbegin() const noexcept;  // (2) (desde C++23)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++23)
```

Retorna um reverse iterator para o primeiro elemento do `flat_set` invertido. Ele corresponde ao último elemento do `flat_set` não invertido. Se o `flat_set` estiver vazio, o iterator retornado é igual a rend().

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o primeiro elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/flat_set/end>). Consequentemente, o iterator retornado é invalidado se e quando o end iterator for invalidado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_set>
    
    int main()
    {
        std::flat_set<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};
    
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
    ⏼ ⏼ ⏼
    ⏼ ⏼
    ⏼
```

### Veja também

[ rendcrend](<#/doc/container/flat_set/rend>) | retorna um reverse iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)