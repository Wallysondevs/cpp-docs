# std::binary_function

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<
class Arg1,
class Arg2,
class Result
> struct binary_function;
(removido em C++17)
```

`std::binary_function` é uma classe base para criar objetos de função com dois argumentos.

`std::binary_function` não define operator(); espera-se que as classes derivadas o definam. `std::binary_function` fornece apenas três tipos - `first_argument_type`, `second_argument_type` e `result_type` - definidos pelos parâmetros de template.

Alguns adaptadores de objetos de função da standard library, como [std::not2](<#/doc/utility/functional/not2>), exigem que os objetos de função que eles adaptam tenham certos tipos definidos; [std::not2](<#/doc/utility/functional/not2>) exige que o objeto de função sendo adaptado tenha dois tipos nomeados `first_argument_type` e `second_argument_type`. Derivar objetos de função que aceitam dois argumentos de `std::binary_function` é uma maneira fácil de torná-los compatíveis com esses adaptadores.

`std::binary_function` é obsoleto desde C++11 e foi removido em C++17.

### Tipos Membro

Tipo | Definição
---|---
`first_argument_type` | `Arg1`
`second_argument_type` | `Arg2`
`result_type` | `Result`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    struct same : std::binary_function<int, int, bool>
    {
        bool operator()(int a, int b) const { return a == b; }
    };
    
    int main()
    {
        std::vector<char> v1{'A', 'B', 'C', 'D', 'E'};
        std::vector<char> v2{'E', 'D', 'C', 'B', 'A'};
        std::vector<bool> v3(v1.size());
    
        std::transform(v1.begin(), v1.end(), v2.begin(), v3.begin(), std::not2(same()));
    
        std::cout << std::boolalpha;
        for (std::size_t i = 0; i < v1.size(); ++i)
            std::cout << v1[i] << " != " << v2[i] << " : " << v3[i] << '\n';
    }
```

Saída:
```
    A != E : true
    B != D : true
    C != C : false
    D != B : true
    E != A : true
```

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável copiável
(modelo de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido em C++17) | cria um wrapper de objeto de função compatível com adaptador a partir de um ponteiro para função
(modelo de função)
[ pointer_to_binary_function](<#/doc/utility/functional/pointer_to_binary_function>)(obsoleto desde C++11)(removido em C++17) | wrapper compatível com adaptador para um ponteiro para função binária
(modelo de classe)
[ unary_function](<#/doc/utility/functional/unary_function>)(obsoleto desde C++11)(removido em C++17) | classe base de função unária compatível com adaptador
(modelo de classe)