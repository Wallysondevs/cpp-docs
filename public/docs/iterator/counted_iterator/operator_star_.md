# std::counted_iterator&lt;I&gt;::operator*,-&gt;

```cpp
constexpr decltype(auto) operator*();  // (1) (desde C++20)
constexpr decltype(auto) operator*() const
requires /*dereferenceable*/<const I>;  // (2) (desde C++20)
constexpr auto operator->() const noexcept
requires std::contiguous_iterator<I>;  // (3) (desde C++20)
```

1,2) Retorna uma referência para o elemento atual. O comportamento é indefinido se this->count() <= 0. O corpo da função é equivalente a return *current;.

3) Retorna um ponteiro para o elemento atual. O corpo da função é equivalente a return [std::to_address](<#/doc/memory/to_address>)(current);.

### Parâmetros

(nenhum)

### Valor de retorno

Referência ou ponteiro para o elemento atual.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    #include <iterator>
    using std::operator""i;
    
    int main()
    {
        const auto il = {1.i, 2.i, 3.i, 4.i, 5.i};
    
        for (std::counted_iterator i{il.begin() + 1, 3}; i != std::default_sentinel; ++i)
            std::cout << *i << ' ';
        std::cout << '\n';
    
        for (std::counted_iterator i{il.begin() + 1, 3}; i != std::default_sentinel; ++i)
            std::cout << i->imag() << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    (0,2) (0,3) (0,4)
    2 3 4
```

### Ver também

[ operator[]](<#/doc/iterator/counted_iterator/operator_at>)(C++20) | acessa um elemento por índice
(função membro pública)