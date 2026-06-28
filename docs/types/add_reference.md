# std::add_lvalue_reference, std::add_rvalue_reference

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct add_lvalue_reference;
template< class T >
struct add_rvalue_reference;
```

Cria um tipo de referência lvalue ou rvalue de `T`.

Trait de tipo | O tipo referido pelo tipo aninhado `type`
---|---
`T` é um [tipo referenciável](<#/doc/meta>) | `T` não é um tipo referenciável
(1) | `T&`[1](<#/doc/types/add_reference>) | `T`
(2) | `T&&`[2](<#/doc/types/add_reference>)

1.  [↑](<#/doc/types/add_reference>) Esta regra reflete a semântica de [reference collapsing](<#/doc/language/reference>).
2.  [↑](<#/doc/types/add_reference>) Esta regra reflete a semântica de [reference collapsing](<#/doc/language/reference>). Note que std::add_rvalue_reference<T&>::type é `T&`, que não é um tipo de referência rvalue.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Tipos aninhados

Nome | Definição
---|---
`type` | determinado como acima

### Tipos auxiliares

```cpp
template< class T >
using add_lvalue_reference_t = typename add_lvalue_reference<T>::type;  // (desde C++14)
template< class T >
using add_rvalue_reference_t = typename add_rvalue_reference<T>::type;  // (desde C++14)
```

### Notas

A principal diferença para usar diretamente `T&` ou `T&&` é que `T` pode ser um tipo não-[referenciável](<#/doc/meta>). Por exemplo, std::add_lvalue_reference&lt;void&gt;::type é void, enquanto void& leva a um erro de compilação.

### Implementação possível
```cpp
    namespace detail
    {
        template<class T>
        struct type_identity { using type = T; }; // or use std::type_identity (since C++20)
    
        template<class T> // Note that “cv void&” is a substitution failure
        auto try_add_lvalue_reference(int) -> type_identity<T&>;
        template<class T> // Handle T = cv void case
        auto try_add_lvalue_reference(...) -> type_identity<T>;
    
        template<class T>
        auto try_add_rvalue_reference(int) -> type_identity<T&&>;
        template<class T>
        auto try_add_rvalue_reference(...) -> type_identity<T>;
    } // namespace detail
    
    template<class T>
    struct add_lvalue_reference
        : decltype(detail::try_add_lvalue_reference<T>(0)) {};
    
    template<class T>
    struct add_rvalue_reference
        : decltype(detail::try_add_rvalue_reference<T>(0)) {};
```

---

### Exemplo

[Execute este código](<https://godbolt.org/g/63148>)
```cpp
    #include <type_traits>
    
    using non_ref = int;
    static_assert(std::is_lvalue_reference_v<non_ref> == false);
    
    using l_ref = std::add_lvalue_reference_t<non_ref>;
    static_assert(std::is_lvalue_reference_v<l_ref> == true);
    
    using r_ref = std::add_rvalue_reference_t<non_ref>;
    static_assert(std::is_rvalue_reference_v<r_ref> == true);
    
    using void_ref = std::add_lvalue_reference_t<void>;
    static_assert(std::is_reference_v<void_ref> == false);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2101](<https://cplusplus.github.io/LWG/issue2101>) | C++11 | o programa era malformado se `T` fosse um [tipo de função](<#/doc/language/function>) com cv ou ref | o tipo produzido é `T` neste caso

### Veja também

[is_reference](<#/doc/types/is_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_ ou _referência rvalue_
(class template)
[remove_reference](<#/doc/types/remove_reference>)(C++11) | remove uma referência do tipo fornecido
(class template)
[remove_cvref](<#/doc/types/remove_cvref>)(C++20) | combina [std::remove_cv](<#/doc/types/remove_cv>) e [std::remove_reference](<#/doc/types/remove_reference>)
(class template)