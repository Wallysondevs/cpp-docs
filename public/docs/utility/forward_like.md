# std::forward_like

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T, class U >
constexpr auto&& forward_like( U&& x ) noexcept;
```

Retorna uma referência para x que possui propriedades semelhantes a `T&&`.

O tipo de retorno é determinado como segue:

1.  Se [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; for um tipo qualificado com `const`, então o tipo referenciado do tipo de retorno é `const` [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;. Caso contrário, o tipo referenciado é [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;.
2.  Se `T&&` for um tipo de referência lvalue, então o tipo de retorno também é um tipo de referência lvalue. Caso contrário, o tipo de retorno é um tipo de referência rvalue.

Se `T` não for um [tipo referenciável](<#/doc/meta>), o programa é malformado.

### Parâmetros

- **x** — um valor que precisa ser encaminhado como o tipo `T`

### Valor de retorno

Uma referência para x do tipo determinado acima.

### Notas

Assim como [std::forward](<#/doc/utility/forward>), [`std::move`](<#/doc/utility/move>), e [std::as_const](<#/doc/utility/as_const>), `std::forward_like` é um type cast que apenas influencia a [categoria de valor](<#/doc/language/value_category>) de uma expressão, ou potencialmente adiciona qualificação `const`.

Quando `m` é um membro real e, portanto, `o.m` uma expressão válida, isso é geralmente escrito como [std::forward](<#/doc/utility/forward>)<decltype(o)>(o).m em código C++20.

Isso leva a três modelos possíveis, chamados _merge_ , _tuple_ , e _language_.

*   _merge_ : mescla os qualificadores `const` e adota a categoria de valor do `Owner`.
*   _tuple_ : o que std::get<0>(Owner) faz, assumindo que `Owner` é um [std::tuple](<#/doc/utility/tuple>)&lt;Member&gt;.
*   _language_ : o que [std::forward](<#/doc/utility/forward>)<decltype(Owner)>(o).m faz.

O principal cenário que `std::forward_like` atende é a adaptação de objetos “distantes”. Nem os cenários _tuple_ nem _language_ fazem a coisa certa para esse caso de uso principal, então o modelo _merge_ é usado para `std::forward_like`.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_forward_like`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [`std::forward_like`](<#/doc/utility/forward_like>)

### Possível implementação
```cpp
    template<class T, class U>
    constexpr auto&& forward_like(U&& x) noexcept
    {
        constexpr bool is_adding_const = std::is_const_v<std::remove_reference_t<T>>;
        if constexpr (std::is_lvalue_reference_v<T&&>)
        {
            if constexpr (is_adding_const)
                return std::as_const(x);
            else
                return static_cast<U&>(x);
        }
        else
        {
            if constexpr (is_adding_const)
                return std::move(std::as_const(x));
            else
                return std::move(x);
        }
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <memory>
    #include <optional>
    #include <type_traits>
    #include <utility>
    #include <vector>
    
    struct TypeTeller
    {
        void operator()(this auto&& self)
        {
            using SelfType = decltype(self);
            using UnrefSelfType = std::remove_reference_t<SelfType>;
            if constexpr (std::is_lvalue_reference_v<SelfType>)
            {
                if constexpr (std::is_const_v<UnrefSelfType>)
                    std::cout << "const lvalue\n";
                else
                    std::cout << "mutable lvalue\n";
            }
            else
            {
                if constexpr (std::is_const_v<UnrefSelfType>)
                    std::cout << "const rvalue\n";
                else
                    std::cout << "mutable rvalue\n";
            }
        }
    };
    
    struct FarStates
    {
        std::unique_ptr<TypeTeller> ptr;
        std::optional<TypeTeller> opt;
        std::vector<TypeTeller> container;
    
        auto&& from_opt(this auto&& self)
        {
            return std::forward_like<decltype(self)>(self.opt.value());
            // It is OK to use std::forward<decltype(self)>(self).opt.value(),
            // because std::optional provides suitable accessors.
        }
    
        auto&& operator
        {
            return std::forward_like<decltype(self)>(self.container.at(i));
            // It is not so good to use std::forward<decltype(self)>(self)[i], because
            // containers do not provide rvalue subscript access, although they could.
        }
    
        auto&& from_ptr(this auto&& self)
        {
            if (!self.ptr)
                throw std::bad_optional_access{};
            return std::forward_like<decltype(self)>(*self.ptr);
            // It is not good to use *std::forward<decltype(self)>(self).ptr, because
            // std::unique_ptr<TypeTeller> always dereferences to a non-const lvalue.
        }
    };
    
    int main()
    {
        FarStates my_state
        {
            .ptr{std::make_unique<TypeTeller>()},
            .opt{std::in_place, TypeTeller{}},
            .container{std::vector<TypeTeller>(1)},
        };
    
        my_state.from_ptr()();
        my_state.from_opt()();
        my_state0;
    
        std::cout << '\n';
    
        std::as_const(my_state).from_ptr()();
        std::as_const(my_state).from_opt()();
        std::as_const(my_state)0;
    
        std::cout << '\n';
    
        std::move(my_state).from_ptr()();
        std::move(my_state).from_opt()();
        std::move(my_state)0;
    
        std::cout << '\n';
    
        std::move(std::as_const(my_state)).from_ptr()();
        std::move(std::as_const(my_state)).from_opt()();
        std::move(std::as_const(my_state))0;
    
        std::cout << '\n';
    }
```

Saída:
```
    mutable lvalue
    mutable lvalue
    mutable lvalue
    
    const lvalue
    const lvalue
    const lvalue
    
    mutable rvalue
    mutable rvalue
    mutable rvalue
    
    const rvalue
    const rvalue
    const rvalue
```

### Ver também

[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(modelo de função)
[ forward](<#/doc/utility/forward>)(C++11) | encaminha um argumento de função e usa o argumento de modelo de tipo para preservar sua categoria de valor
(modelo de função)
[ as_const](<#/doc/utility/as_const>)(C++17) | obtém uma referência `const` para seu argumento
(modelo de função)