# std::indirect_result_t

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class F, class... Is >
requires (std::indirectly_readable<Is> && ...) &&
std::invocable<F, std::iter_reference_t<Is>...>
using indirect_result_t = std::invoke_result_t<F, std::iter_reference_t<Is>...>;
```

O alias template `indirect_result_t` obtém o tipo de resultado de invocar um tipo [`invocable`](<#/doc/concepts/invocable>) `F` no resultado da desreferenciação de tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) `Is...`.

### Parâmetros de template

F | \- | um tipo invocável
---|---|---
Is | \- | tipos indiretamente legíveis que são desreferenciados para argumentos

### Exemplo

Execute este código
```
    #include <iterator>
    #include <type_traits>
    
    struct Fn
    {
        long operator()(const int&);
        int operator()(int&&);
        short operator()(int, int) const;
        auto operator()(const float) -> int&;
        void operator()(int[8]);
    };
    
    static_assert(
        std::is_same_v<std::indirect_result_t<Fn, const int*>, long> and
        std::is_same_v<std::indirect_result_t<Fn, std::move_iterator<int*>>, int> and
        std::is_is_same_v<std::indirect_result_t<const Fn, int*, int*>, short> and
        std::is_same_v<std::indirect_result_t<Fn, float*>, int&> and
        std::is_same_v<std::indirect_result_t<Fn, int**>, void>
    );
    
    int main() {}
```

### Veja também

[ result_ofinvoke_result](<#/doc/types/result_of>)(C++11)(removido em C++20)(C++17) | deduz o tipo de resultado de invocar um objeto chamável com um conjunto de argumentos
(class template)
[ projected_value_t](<#/doc/iterator/projected_value_t>)(C++26) | calcula o tipo de valor de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) por projeção
(alias template)