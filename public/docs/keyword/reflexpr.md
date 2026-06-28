# Palavra-chave C++: reflexpr (reflection TS)

### Uso

1) Obtém a lista de membros de um tipo [class](<#/doc/keyword/class>), ou a lista de enumeradores de um tipo [enum](<#/doc/keyword/enum>).

2) Obtém o nome do tipo e do membro.

3) Detecta se um membro de dados é [static](<#/doc/keywords/static>) ou [constexpr](<#/doc/keyword/constexpr>).

4) Detecta se uma função membro é [virtual](<#/doc/keyword/virtual>), [public](<#/doc/keyword/public>), [protected](<#/doc/keyword/protected>) ou [private](<#/doc/keyword/private>).

5) Obtém a _linha_ e a _coluna_ do código-fonte onde o tipo é definido.

### Exemplo

`reflexpr` nos fornece as meta informações do objeto através de _meta-object types_. Note que `std::reflect::get_data_members_t` permite aos programadores visitar qualquer classe assim como [std::tuple](<#/doc/utility/tuple>).

Execute este código
```cpp
    #include <string>
    #include <vector>
     
    struct S
    {
        int b;
        std::string s;
        std::vector<std::string> v;
    };
     
    // Reflection TS
    #include <experimental/reflect>
    using meta_S = reflexpr(S);
    using mem = std::reflect::get_data_members_t<meta_S>;
    using meta = std::reflect::get_data_members_t<mem>;
    static_assert(std::reflect::is_public_v<meta>); // successful
     
    int main() {}
```

Também podemos obter informações de nome a partir de `reflexpr`:

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <string_view>
    // Reflection TS
    #include <experimental/reflect>
     
    template<typename Tp>
    constexpr std::string_view nameof()
    {
        using TpInfo = reflexpr(Tp);
        using aliased_Info = std::experimental::reflect::get_aliased_t<TpInfo>;
        return std::experimental::reflect::get_name_v<aliased_Info>;
    }
     
    int main()
    {
        std::cout << nameof<std::string>() << '\n';
        static_assert(nameof<std::string>() == "basic_string"); // successful
    }
```

Este é um exemplo de como obter o _escopo_ de um tipo no [Reflection TS](<#/doc/experimental/reflect>).

Execute este código
```cpp
    namespace Foo
    {
        struct FooFoo
        {
            int FooFooFoo;
        };
    }
    namespace Bar
    {
        using BarBar = ::Foo::FooFoo;
    }
    using BarBarInfo = reflexpr(::Bar::BarBar);
    using BarBarScope = ::std::experimental::reflect::get_scope_t<BarBarInfo>; // Bar, not Foo
     
    struct Spam
    {
        int SpamSpam;
    };
    struct Grok
    {
        using GrokGrok = Spam::SpamSpam;
    };
    using GrokGrokInfo = reflexpr(::Grok::GrokGrok);
    using GrokGrokScope = std::experimental::reflect::get_scope_t<GrokGrokInfo>; // Grok, not Spam
```