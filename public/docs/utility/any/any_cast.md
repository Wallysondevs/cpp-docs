# std::any_cast

Definido no cabeçalho `[<any>](<#/doc/header/any>)`

```c
template< class T >
T any_cast( const any& operand );
template< class T >
T any_cast( any& operand );
template< class T >
T any_cast( any&& operand );
template< class T >
const T* any_cast( const any* operand ) noexcept;
template< class T >
T* any_cast( any* operand ) noexcept;
```

Realiza acesso type-safe ao objeto contido.

Seja `U` [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;>.

1) O programa é malformado se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const U&> for falso.

2) O programa é malformado se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U&> for falso.

3) O programa é malformado se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U> for falso.

4,5) O programa é malformado se [std::is_void_v](<#/doc/types/is_void>)&lt;T&gt; for verdadeiro.

### Parâmetros

- **operand** — objeto `any` alvo

### Valor de retorno

1,2) Retorna static_cast&lt;T&gt;(*std::any_cast&lt;U&gt;(&operand)).

3) Retorna static_cast&lt;T&gt;(std::move(*std::any_cast&lt;U&gt;(&operand))).

4,5) Se `operand` não for um ponteiro nulo, e o [`typeid`](<#/doc/language/typeid>) do `T` solicitado corresponder ao do conteúdo de `operand`, um ponteiro para o valor contido por `operand`, caso contrário um ponteiro nulo.

### Exceções

1-3) Lança [std::bad_any_cast](<#/doc/utility/any/bad_any_cast>) se o [`typeid`](<#/doc/language/typeid>) do `T` solicitado não corresponder ao do conteúdo de `operand`.

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <iostream>
    #include <string>
    #include <type_traits>
    #include <utility>
    
    int main()
    {
        // Simple example
        auto a1 = std::any(12);
        std::cout << "1) a1 is int: " << std::any_cast<int>(a1) << '\n';
    
        try
        {
            auto s = std::any_cast<std::string>(a1); // throws
        }
        catch (const std::bad_any_cast& e)
        {
            std::cout << "2) " << e.what() << '\n';
        }
    
        // Pointer example
        if (int* i = std::any_cast<int>(&a1))
            std::cout << "3) a1 is int: " << *i << '\n';
        else if (std::string* s = std::any_cast<std::string>(&a1))
            std::cout << "3) a1 is std::string: " << *s << '\n';
        else
            std::cout << "3) a1 is another type or unset\n";
    
        // Advanced example
        a1 = std::string("hello");
        auto& ra = std::any_cast<std::string&>(a1); // reference
        ra[1] = 'o';
    
        std::cout << "4) a1 is string: "
                  << std::any_cast<const std::string&>(a1) << '\n'; // const reference
    
        auto s1 = std::any_cast<std::string&&>(std::move(a1)); // rvalue reference
        // Note: “s1” is a move-constructed std::string:
        static_assert(std::is_same_v<decltype(s1), std::string>);
    
        // Note: the std::string in “a1” is left in valid but unspecified state
        std::cout << "5) a1.size(): "
                  << std::any_cast<std::string>(&a1)->size() // pointer
                  << '\n'
                  << "6) s1: " << s1 << '\n';
    }
```

Saída possível:
```
    1) a1 is int: 12
    2) bad any_cast
    3) a1 is int: 12
    4) a1 is string: hollo
    5) a1.size(): 0
    6) s1: hollo
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3305](<https://cplusplus.github.io/LWG/issue3305>) | C++17 | o comportamento das sobrecargas ([4,5](<#/doc/utility/any/any_cast>)) era incerto se `T` fosse `void` | o programa malformado neste caso