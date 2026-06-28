# std::erase, std::erase_if(std::vector)

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
template< class T, class Alloc, class U >
constexpr std::vector<T, Alloc>::size_type
erase( std::vector<T, Alloc>& c, const U& value );
(até C++26)
template< class T, class Alloc, class U = T >
constexpr std::vector<T, Alloc>::size_type
erase( std::vector<T, Alloc>& c, const U& value );
template< class T, class Alloc, class Pred >
constexpr std::vector<T, Alloc>::size_type
erase_if( std::vector<T, Alloc>& c, Pred pred );
```

1) Apaga todos os elementos do container que são iguais a `value`. Equivalente a
```
    auto it = std::remove(c.begin(), c.end(), value);
    auto r = c.end() - it;
    c.erase(it, c.end());
    return r;
```

2) Apaga todos os elementos do container que satisfazem o predicado `pred`. Equivalente a
```
    auto it = std::remove_if(c.begin(), c.end(), pred);
    auto r = c.end() - it;
    c.erase(it, c.end());
    return r;
```

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido
- **pred** — predicado unário que retorna `true` se o elemento deve ser apagado.
A expressão `pred(v)` deve ser conversível para `bool` para cada argumento `v` do tipo (possivelmente `const`) `T`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro `T&` não é permitido, nem `T` a menos que para `T` uma move seja equivalente a uma copy (desde C++11).

### Valor de retorno

O número de elementos apagados.

### Complexidade

Linear.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmo ([1](<#/doc/container/vector/erase2>))

### Exemplo

Execute este código
```
    #include <complex>
    #include <iostream>
    #include <numeric>
    #include <string_view>
    #include <vector>
     
    void println(std::string_view comment, const auto& c)
    {
        std::cout << comment << '[';
        bool first{true};
        for (const auto& x : c)
            std::cout << (first ? first = false, "" : ", ") << x;
        std::cout << "]\n";
    }
     
    int main()
    {
        std::vector<char> cnt(10);
        std::iota(cnt.begin(), cnt.end(), '0');
        println("Initially, cnt = ", cnt);
     
        std::erase(cnt, '3');
        println("After erase '3', cnt = ", cnt);
     
        auto erased = std::erase_if(cnt,  { return (x - '0') % 2 == 0; });
        println("After erase all even numbers, cnt = ", cnt);
        std::cout << "Erased even numbers: " << erased << '\n';
     
        std::vector<std::complex<double>> nums{{2, 2}, {4, 2}, {4, 8}, {4, 2}};
        #ifdef __cpp_lib_algorithm_default_value_type
            std::erase(nums, {4, 2});
        #else
            std::erase(nums, std::complex<double>{4, 2});
        #endif
        println("After erase {4, 2}, nums = ", nums);
    }
```

Saída:
```
    Initially, cnt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    After erase '3', cnt = [0, 1, 2, 4, 5, 6, 7, 8, 9]
    After erase all even numbers, cnt = [1, 5, 7, 9]
    Erased even numbers: 5
    After erase {4, 2}, nums = [(2,2), (4,8)]
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)