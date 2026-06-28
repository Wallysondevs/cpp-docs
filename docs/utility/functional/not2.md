# std::not2

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Predicate >
std::binary_negate<Predicate> not2( const Predicate& pred );
template< class Predicate >
constexpr std::binary_negate<Predicate> not2( const Predicate& pred );
(obsoleto desde C++17)
(removido em C++20)
```

`std::not2` é uma função auxiliar para criar um objeto de função que retorna o complemento da função de predicado binário passada. O objeto de função criado é do tipo [std::binary_negate](<#/doc/utility/functional/binary_negate>)&lt;Predicate&gt;.

O tipo de predicado binário deve definir dois tipos de membros, `first_argument_type` e `second_argument_type`, que são conversíveis para os tipos de parâmetros do predicado. Os objetos de função obtidos de [std::owner_less](<#/doc/memory/owner_less>), [std::ref](<#/doc/utility/functional/ref>), [std::cref](<#/doc/utility/functional/ref>), [std::plus](<#/doc/utility/functional/plus>), [std::minus](<#/doc/utility/functional/minus>), [std::multiplies](<#/doc/utility/functional/multiplies>), [std::divides](<#/doc/utility/functional/divides>), [std::modulus](<#/doc/utility/functional/modulus>), [std::equal_to](<#/doc/utility/functional/equal_to>), [std::not_equal_to](<#/doc/utility/functional/not_equal_to>), [std::greater](<#/doc/utility/functional/greater>), [std::less](<#/doc/utility/functional/less>), [std::greater_equal](<#/doc/utility/functional/greater_equal>), [std::less_equal](<#/doc/utility/functional/less_equal>), [std::logical_not](<#/doc/utility/functional/logical_not>), [std::logical_or](<#/doc/utility/functional/logical_or>), [std::bit_and](<#/doc/utility/functional/bit_and>), [std::bit_or](<#/doc/utility/functional/bit_or>), std::bit_xor, [std::mem_fn](<#/doc/utility/functional/mem_fn>), [std::map::value_comp](<#/doc/container/map/value_comp>), [std::multimap::value_comp](<#/doc/container/multimap/value_comp>), [std::function](<#/doc/utility/functional/function>), ou de outra chamada para `std::not2` têm esses tipos definidos, assim como objetos de função derivados da [std::binary_function](<#/doc/utility/functional/binary_function>) obsoleta.

### Parâmetros

- **pred** — predicado binário

### Valor de retorno

`std::not2` retorna um objeto do tipo [std::binary_negate](<#/doc/utility/functional/binary_negate>)&lt;Predicate&gt;, construído com pred.

### Exceções

(nenhuma)

### Exemplo

Executar este código
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    struct old_same : std::binary_function<int, int, bool>
    {
        bool operator()(int a, int b) const { return a == b; }
    };
    
    struct new_same
    {
        bool operator()(int a, int b) const { return a == b; }
    };
    
    bool same_fn(int a, int b)
    {
        return a == b;
    }
    
    int main()
    {
        std::vector<int> v1{0, 1, 2};
        std::vector<int> v2{2, 1, 0};
        std::vector<bool> v3(v1.size());
    
        std::cout << "negating a binary_function:\n";
        std::transform(v1.begin(), v1.end(), v2.begin(), v3.begin(),
                       std::not2(old_same()));
    
        std::cout << std::boolalpha;
        for (std::size_t i = 0; i < v1.size(); ++i)
            std::cout << v1[i] << ' ' << v2[i] << ' ' << v3[i] << '\n';
    
        std::cout << "negating a standard functor:\n";
        std::transform(v1.begin(), v1.end(), v2.begin(), v3.begin(),
                       std::not2(std::equal_to<int>()));
    
        for (std::size_t i = 0; i < v1.size(); ++i)
            std::cout << v1[i] << ' ' << v2[i] << ' ' << v3[i] << '\n';
    
        std::cout << "negating a std::function:\n";
        std::transform(v1.begin(), v1.end(), v2.begin(), v3.begin(),
                       std::not2(std::function<bool(int, int)>(new_same())));
    
        for (std::size_t i = 0; i < v1.size(); ++i)
            std::cout << v1[i] << ' ' << v2[i] << ' ' << v3[i] << '\n';
    
        std::cout << "negating a std::reference_wrapper:\n";
        std::transform(v1.begin(), v1.end(), v2.begin(), v3.begin(),
                       std::not2(std::ref(same_fn)));
    
        for (std::size_t i = 0; i < v1.size(); ++i)
            std::cout << v1[i] << ' ' << v2[i] << ' ' << v3[i] << '\n';
    }
```

Saída:
```
    negating a binary_function:
    0 2 true
    1 1 false
    2 0 true
    negating a standard functor:
    0 2 true
    1 1 false
    2 0 true
    negating a std::function:
    0 2 true
    1 1 false
    2 0 true
    negating a std::reference_wrapper:
    0 2 true
    1 1 false
    2 0 true
```

### Veja também

[ not_fn](<#/doc/utility/functional/not_fn>)(C++17) | cria um objeto de função que retorna o complemento do resultado do objeto de função que ele contém
(function template)
[ binary_negate](<#/doc/utility/functional/binary_negate>)(obsoleto desde C++17)(removido em C++20) | objeto de função wrapper que retorna o complemento do predicado binário que ele contém
(class template)
[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável copiável
(class template)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper apenas-movível de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(class template)
[ not1](<#/doc/utility/functional/not1>)(obsoleto desde C++17)(removido em C++20) | constrói um objeto [std::unary_negate](<#/doc/utility/functional/unary_negate>) personalizado
(function template)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido em C++17) | cria um objeto de função wrapper compatível com adaptador a partir de um ponteiro para função
(function template)
[ binary_function](<#/doc/utility/functional/binary_function>)(obsoleto desde C++11)(removido em C++17) | classe base de função binária compatível com adaptador
(class template)