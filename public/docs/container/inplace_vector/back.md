# std::inplace_vector&lt;T,N&gt;::back

```cpp
constexpr reference back();  // (1) (desde C++26)
constexpr const_reference back() const;  // (2) (desde C++26)
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
```cpp
    #include <cassert>
    #include <inplace_vector>
     
    int main()
    {
        std::inplace_vector<char, 4> letters{'a', 'b', 'c', 'd'};
        assert(letters.back() == 'd');
    }
```

### Veja também

[ front](<#/doc/container/inplace_vector/front>) | acessa o primeiro elemento
(public member function)
[ rbegincrbegin](<#/doc/container/inplace_vector/rbegin>) | retorna um reverse iterator para o início
(public member function)
[ endcend](<#/doc/container/inplace_vector/end>) | retorna um iterator para o fim
(public member function)