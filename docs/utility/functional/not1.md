# std::not1

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Predicate >
std::unary_negate<Predicate> not1( const Predicate& pred );
template< class Predicate >
constexpr std::unary_negate<Predicate> not1( const Predicate& pred );
(obsoleto desde C++17)
(removido desde C++20)
```

`std::not1` é uma função auxiliar para criar um objeto de função que retorna o complemento da função predicado unário passada. O objeto de função criado é do tipo [std::unary_negate](<#/doc/utility/functional/unary_negate>)&lt;Predicate&gt;.

O tipo de predicado unário deve definir um tipo membro, `argument_type`, que seja conversível para o tipo de parâmetro do predicado. Os objetos de função unários obtidos de [std::ref](<#/doc/utility/functional/ref>), [std::cref](<#/doc/utility/functional/ref>), [std::negate](<#/doc/utility/functional/negate>), [std::logical_not](<#/doc/utility/functional/logical_not>), [std::mem_fn](<#/doc/utility/functional/mem_fn>), [std::function](<#/doc/utility/functional/function>), [std::hash](<#/doc/utility/hash>), ou de outra chamada para `std::not1` têm este tipo definido, assim como os objetos de função derivados da obsoleta [std::unary_function](<#/doc/utility/functional/unary_function>).

### Parâmetros

- **pred** — predicado unário

### Valor de retorno

`std::not1` retorna um objeto do tipo [std::unary_negate](<#/doc/utility/functional/unary_negate>)&lt;Predicate&gt;, construído com pred.

### Exceções

(nenhuma)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    struct LessThan7 : std::unary_function<int, bool>
    {
        bool operator()(int i) const { return i < 7; }
    };
    
    int main()
    {
        std::vector<int> v(10);
        std::iota(std::begin(v), std::end(v), 0);
    
        std::cout << std::count_if(begin(v), end(v), std::not1(LessThan7())) << '\n';
    
        // the same as above using std::function
        std::function<bool(int)> less_than_9 =  { return x < 9; };
        std::cout << std::count_if(begin(v), end(v), std::not1(less_than_9)) << '\n';
    }
```

Saída:
```
    3
    1
```

### Veja também

[ not_fn](<#/doc/utility/functional/not_fn>)(C++17) | cria um objeto de função que retorna o complemento do resultado do objeto de função que ele contém
(modelo de função)
[ unary_negate](<#/doc/utility/functional/unary_negate>)(obsoleto desde C++17)(removido desde C++20) | objeto de função wrapper que retorna o complemento do predicado unário que ele contém
(modelo de classe)
[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável copiável
(modelo de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper somente-movível de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ not2](<#/doc/utility/functional/not2>)(obsoleto desde C++17)(removido desde C++20) | constrói um objeto [std::binary_negate](<#/doc/utility/functional/binary_negate>) personalizado
(modelo de função)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido desde C++17) | cria um objeto de função wrapper compatível com adaptador a partir de um ponteiro para função
(modelo de função)
[ unary_function](<#/doc/utility/functional/unary_function>)(obsoleto desde C++11)(removido desde C++17) | classe base de função unária compatível com adaptador
(modelo de classe)