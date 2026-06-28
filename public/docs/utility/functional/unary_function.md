# std::unary_function

Definido no header `[<functional>](<#/doc/header/functional>)`

```cpp
template< typename ArgumentType, typename ResultType >
struct unary_function;
(removido em C++17)
```

`std::unary_function` é uma classe base para criar objetos de função com um argumento.

`std::unary_function` não define operator(); espera-se que as classes derivadas o definam. `std::unary_function` fornece apenas dois tipos - `argument_type` e `result_type` \- definidos pelos parâmetros do template.

Alguns adaptadores de objetos de função da standard library, como [std::not1](<#/doc/utility/functional/not1>), exigem que os objetos de função que eles adaptam tenham certos tipos definidos; [std::not1](<#/doc/utility/functional/not1>) exige que o objeto de função sendo adaptado tenha um tipo chamado `argument_type`. Derivar objetos de função que aceitam um argumento de `std::unary_function` é uma maneira fácil de torná-los compatíveis com esses adaptadores.

`std::unary_function` é obsoleto desde C++11.

### Tipos Membro

Tipo | Definição
---|---
`argument_type` | `ArgumentType`
`result_type` | `ResultType`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    struct less_than_7 : std::unary_function<int, bool>
    {
        bool operator()(int i) const { return i < 7; }
    };
    
    int main()
    {
        std::vector<int> v(10, 7);
        v[0] = v[1] = v[2] = 6;
    
        std::cout << std::count_if(v.begin(), v.end(), std::not1(less_than_7()));
    
        // C++11 solution:
        // Cast to std::function<bool (int)> somehow - even with a lambda
        // std::cout << std::count_if(v.begin(), v.end(),
        //     std::not1(std::function<bool (int)>( { return i < 7; })));
    }
```

Saída:
```
    7
```

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável construtível por cópia
(template de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper somente-movível de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(template de classe)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido em C++17) | cria um wrapper de objeto de função compatível com adaptador a partir de um ponteiro para função
(template de função)
[ pointer_to_unary_function](<#/doc/utility/functional/pointer_to_unary_function>)(obsoleto desde C++11)(removido em C++17) | wrapper compatível com adaptador para um ponteiro para função unária
(template de classe)
[ binary_function](<#/doc/utility/functional/binary_function>)(obsoleto desde C++11)(removido em C++17) | classe base de função binária compatível com adaptador
(template de classe)