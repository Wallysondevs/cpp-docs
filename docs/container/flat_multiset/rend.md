# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::rend, std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::crend

```cpp
reverse_iterator rend() noexcept;  // (1) (desde C++23)
const_reverse_iterator rend() const noexcept;  // (2) (desde C++23)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++23)
```

Retorna um reverse iterator para o elemento que segue o último elemento do `flat_multiset` invertido. Ele corresponde ao elemento que precede o primeiro elemento do `flat_multiset` não invertido. Este elemento atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem de fato ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_set>
    
    int main()
    {
        std::flat_multiset<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};
    
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

[ rbegincrbegin](<#/doc/container/flat_multiset/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)