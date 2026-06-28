# std::binary_negate

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Predicate >
struct binary_negate
: public std::binary_function<
Predicate::first_argument_type,
Predicate::second_argument_type,
bool
>;
template< class Predicate >
struct binary_negate;
(obsoleto desde C++17)
(removido desde C++20)
```

`std::binary_negate` é um objeto de função wrapper que retorna o complemento do predicado binário que ele contém.

O tipo de predicado binário deve definir dois tipos de membros, `first_argument_type` e `second_argument_type`, que são conversíveis para os tipos de parâmetros do predicado. Os objetos de função obtidos de [std::owner_less](<#/doc/memory/owner_less>), [std::ref](<#/doc/utility/functional/ref>), [std::cref](<#/doc/utility/functional/ref>), [std::plus](<#/doc/utility/functional/plus>), [std::minus](<#/doc/utility/functional/minus>), [std::multiplies](<#/doc/utility/functional/multiplies>), [std::divides](<#/doc/utility/functional/divides>), [std::modulus](<#/doc/utility/functional/modulus>), [std::equal_to](<#/doc/utility/functional/equal_to>), [std::not_equal_to](<#/doc/utility/functional/not_equal_to>), [std::greater](<#/doc/utility/functional/greater>), [std::less](<#/doc/utility/functional/less>), [std::greater_equal](<#/doc/utility/functional/greater_equal>), [std::less_equal](<#/doc/utility/functional/less_equal>), [std::logical_not](<#/doc/utility/functional/logical_not>), [std::logical_or](<#/doc/utility/functional/logical_or>), [std::bit_and](<#/doc/utility/functional/bit_and>), [std::bit_or](<#/doc/utility/functional/bit_or>), std::bit_xor, [std::mem_fn](<#/doc/utility/functional/mem_fn>), [std::map::value_comp](<#/doc/container/map/value_comp>), [std::multimap::value_comp](<#/doc/container/multimap/value_comp>), [std::function](<#/doc/utility/functional/function>), ou de uma chamada para [std::not2](<#/doc/utility/functional/not2>) têm esses tipos definidos, assim como os objetos de função derivados do obsoleto [std::binary_function](<#/doc/utility/functional/binary_function>).

Objetos `std::binary_negate` são facilmente construídos com a função auxiliar [std::not2](<#/doc/utility/functional/not2>).

### Tipos de membros

Tipo | Definição
---|---
`first_argument_type` | Predicate::first_argument_type
`second_argument_type` | Predicate::second_argument_type
`result_type` | bool

### Funções de membros

(construtor) | constrói um novo objeto binary_negate com o predicado fornecido
(função membro pública)
operator() | retorna o complemento lógico do resultado de uma chamada ao predicado armazenado
(função membro pública)

## std::binary_negate::binary_negate

```cpp
explicit binary_negate( Predicate const& pred );  // (até C++14)
constexpr explicit binary_negate( Predicate const& pred );  // (desde C++14)
```

Constrói um objeto de função `std::binary_negate` com o predicado `pred` armazenado.

### Parâmetros

- **pred** — objeto de função predicado

## std::binary_negate::operator()

```cpp
bool operator()( first_argument_type const& x,
second_argument_type const& y ) const;  // (até C++14)
constexpr bool operator()( first_argument_type const& x,
second_argument_type const& y ) const;  // (desde C++14)
```

Retorna o complemento lógico do resultado da chamada a pred(x, y).

### Parâmetros

- **x** — primeiro argumento a ser passado para o predicado
- **y** — segundo argumento a ser passado para o predicado

### Valor de retorno

O complemento lógico do resultado da chamada a pred(x, y).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    struct same : std::binary_function<int, int, bool>
    {
        bool operator()(int a, int b) const { return a == b; }
    };
    
    int main()
    {
        std::vector<int> v1;
        for (int i = 0; i < 7; ++i)
            v1.push_back(i);
    
        std::vector<int> v2(v1.size());
        std::reverse_copy(v1.begin(), v1.end(), v2.begin());
    
        std::vector<bool> v3(v1.size());
    
        std::binary_negate<same> not_same((same()));
    
        // C++11 solution:
        // std::function<bool (int, int)> not_same =
        //      -> bool { return !same()(x, y); };
    
        std::transform(v1.begin(), v1.end(), v2.begin(), v3.begin(), not_same);
    
        std::cout.setf(std::ios_base::boolalpha);
        for (std::size_t i = 0; i != v1.size(); ++i)
            std::cout << v1[i] << " != " << v2[i] << " : " << v3[i] << '\n';
    }
```

Saída:
```
    0 != 6 : true
    1 != 5 : true
    2 != 4 : true
    3 != 3 : false
    4 != 2 : true
    5 != 1 : true
    6 != 0 : true
```

### Veja também

[ binary_function](<#/doc/utility/functional/binary_function>)(obsoleto desde C++11)(removido desde C++17) | classe base de função binária compatível com adaptador
(modelo de classe)
[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável copiável
(modelo de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper somente-movível de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ not2](<#/doc/utility/functional/not2>)(obsoleto desde C++17)(removido desde C++20) | constrói um objeto **std::binary_negate** personalizado
(modelo de função)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido desde C++17) | cria um wrapper de objeto de função compatível com adaptador a partir de um ponteiro para função
(modelo de função)
[ unary_negate](<#/doc/utility/functional/unary_negate>)(obsoleto desde C++17)(removido desde C++20) | objeto de função wrapper que retorna o complemento do predicado unário que ele contém
(modelo de classe)