# std::erase, std::erase_if(std::inplace_vector)

Definido no cabeçalho `[<inplace_vector>](<#/doc/header/inplace_vector>)`

```c
template< class T, std::size_t N, class U = T >
constexpr typename std::inplace_vector<T, N>::size_type
erase( std::inplace_vector<T, N>& c, const U& value );
template< class T, std::size_t N, class Pred >
constexpr typename std::inplace_vector<T, N>::size_type
erase_if( std::inplace_vector<T, N>& c, Pred pred );
```

1) Apaga todos os elementos que se comparam como iguais a value do container. Equivalente a
```
    auto it = std::remove(c.begin(), c.end(), value);
    auto r = std::distance(it, c.end());
    c.erase(it, c.end());
    return r;
```

2) Apaga todos os elementos que satisfazem o predicado pred do container. Equivalente a
```
    auto it = std::remove_if(c.begin(), c.end(), pred);
    auto r = std::distance(it, c.end());
    c.erase(it, c.end());
    return r;
```

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido
- **pred** — predicado unário que retorna ​true se o elemento deve ser apagado.
A expressão pred(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `T`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro T& não é permitido, nem T a menos que para `T` uma move seja equivalente a uma copy (desde C++11). ​

### Valor de retorno

O número de elementos apagados.

### Complexidade

Linear.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <complex>
    #include <inplace_vector>
    #include <numeric>
    #include <print>
     
    int main()
    {
        std::inplace_vector<int, 10> v(10, 0);
        std::ranges::iota(v, 0);
        std::println("Initially, v = {}", v);
     
        auto erased = std::erase(v, 3);
        std::println("After erase(v, 3), v = {}", v);
        assert(erased == 1);
     
        erased = std::erase_if(v,  { return x % 2 == 0; });
        std::println("After erasing all even numbers, v = {}", v);
        std::println("Erased even numbers: {}", erased);
     
        std::inplace_vector<std::complex<double>> nums{{2, 2}, {4, 2}, {4, 8}, {4, 2}};
        std::erase(nums, {4, 2}); // since U = T, the value type can be ommited
        std::println("After erase {4, 2}, nums = {}", nums);
    }
```

Saída:
```
    Initially, v = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    After erase(v, 3), v = [0, 1, 2, 4, 5, 6, 7, 8, 9]
    After erasing all even numbers, v = [1, 5, 7, 9]
    Erased even numbers: 5
    After erase {4, 2}, nums = [(2,2), (4,8)]
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)