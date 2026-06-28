# std::variant_alternative, std::variant_alternative_t

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template <std::size_t I, class T>
struct variant_alternative; /* undefined */
template <std::size_t I, class... Types>
struct variant_alternative<I, variant<Types...>>;
template <std::size_t I, class T> class variant_alternative<I, const T>;
template <std::size_t I, class T>
class variant_alternative<I, volatile T>;
template <std::size_t I, class T>
class variant_alternative<I, const volatile T>;
(obsoleto em C++20)
```

Fornece acesso indexado em tempo de compilação aos tipos das alternativas da variant possivelmente cv-qualificada, combinando as cv-qualificações da variant (se houver) com as cv-qualificações da alternativa.

Formalmente,

2) atende aos requisitos de [TransformationTrait](<#/doc/named_req/TransformationTrait>) com um typedef membro `type` igual ao tipo da alternativa com índice `I`

3) atende aos requisitos de [TransformationTrait](<#/doc/named_req/TransformationTrait>) com um typedef membro `type` que nomeia, respectivamente, [std::add_const_t](<#/doc/types/add_cv>)<std::variant_alternative_t<I,T>>, [std::add_volatile_t](<#/doc/types/add_cv>)<std::variant_alternative_t<I,T>>, e [std::add_cv_t](<#/doc/types/add_cv>)<std::variant_alternative_t<I,T>>

### Tipos membro

Tipo membro | Definição
---|---
type | o tipo da `I`-ésima alternativa da variant, onde `I` deve estar em `[0, sizeof...(Types))`, caso contrário o programa é malformado.

### Alias de template auxiliar

```cpp
template <size_t I, class T>
using variant_alternative_t = typename variant_alternative<I, T>::type;  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <variant>
    #include <iostream>
     
    using my_variant = std::variant<int, float>;
    static_assert(std::is_same_v
        <int,   std::variant_alternative_t<0, my_variant>>);
    static_assert(std::is_same_v
        <float, std::variant_alternative_t<1, my_variant>>);
    // cv-qualification on the variant type propagates to the extracted alternative type.
    static_assert(std::is_same_v
        <const int, std::variant_alternative_t<0, const my_variant>>);
     
    int main()
    {
        std::cout << "All static assertions passed.\n";
    }
```

Saída:
```
    All static assertions passed.
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2974](<https://cplusplus.github.io/LWG/issue2974>) | C++17 | índice fora dos limites resultava em comportamento indefinido | tornou-se malformado

### Veja também

[ variant_sizevariant_size_v](<#/doc/utility/variant/variant_size>)(C++17) | obtém o tamanho da lista de alternativas da `variant` em tempo de compilação
(modelo de classe) (modelo de variável)
[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) | obtém o tipo do elemento especificado
(especialização de modelo de classe)