# std::array&lt;T,N&gt;::back

```cpp
reference back();  // (1) (desde C++11)
(constexpr desde C++17)
const_reference back() const;  // (2) (desde C++11)
(constexpr desde C++14)
```

Retorna uma referência para o último elemento no container.

Chamar `back` em um container vazio causa [comportamento indefinido](<#/doc/language/ub>).

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o último elemento.

### Complexidade

Constante.

### Notas

Para um container `c` não vazio, a expressão c.back() é equivalente a *[std::prev](<#/doc/iterator/prev>)(c.end()).

### Exemplo

Execute este código
```
    #include <cassert>
    #include <array>
     
    int main()
    {
        std::array<char, 4> letters{'a', 'b', 'c', 'd'};
        assert(letters.back() == 'd');
    }
```

### Veja também

[ front](<#/doc/container/array/front>) | acessa o primeiro elemento
(função membro pública)
[ rbegincrbegin](<#/doc/container/array/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ endcend](<#/doc/container/array/end>) | retorna um iterator para o fim
(função membro pública)