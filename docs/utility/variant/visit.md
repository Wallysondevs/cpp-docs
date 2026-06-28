# std::variant&lt;Types...&gt;::visit

```cpp
template< class Self, class Visitor >
constexpr decltype(auto) visit( this Self&& self, Visitor&& vis );  // (1) (desde C++26)
template< class R, class Self, class Visitor >
constexpr R visit( this Self&& self, Visitor&& vis );  // (2) (desde C++26)
```

  
Aplica o visitor `vis` (um [Callable](<#/doc/named_req/Callable>) que pode ser chamado com qualquer combinação de tipos do variant) ao variant mantido por `self`.

Dado o tipo V como `decltype([std::forward_like](<#/doc/utility/forward_like>)<Self>([std::declval](<#/doc/utility/declval>)<variant>()))`, a chamada equivalente é:

1) `return std::visit([std::forward](<#/doc/utility/forward>)<Visitor>(vis), (V) self);`.

2) `return std::visit<R>([std::forward](<#/doc/utility/forward>)<Visitor>(vis), (V) self);`.

### Parâmetros

vis  |  \-  |  um [Callable](<#/doc/named_req/Callable>) que aceita todas as alternativas possíveis do variant   
---|---|---
self  |  \-  |  o variant a ser passado para o visitor   
  
### Valor de retorno

1) O resultado da invocação de `std::visit`.

2) Nada se `R` for `void` (possivelmente cv-qualified); caso contrário, o resultado da invocação de `std::visit<R>`.

### Exceções

Somente lança uma exceção se a chamada para `std::visit` lançar uma exceção.

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_variant`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | `visit` membro  
  
### Exemplo

Execute este código
```
    #include <print>
    #include <string>
    #include <string_view>
    #include <variant>
     
    struct Base {};
    struct Derived : Base {};
     
    // helper type for the visitor
    template<class... Ts>
    struct overloads : Ts... { using Ts::operator()...; };
     
    // the variant to visit
    using var_t = std::variant<int, std::string, Derived>;
     
    int main()
    {
        const auto visitor = overloads
        {
            { std::print("int = {}\n", i); },
             s){ std::println("string = “{}”", s); },
            { std::println("base"); }
        };
     
        const var_t var1 = 42, var2 = "abc", var3 = Derived();
     
    #if (__cpp_lib_variant >= 202306L)
        var1.visit(visitor);
        var2.visit(visitor);
        var3.visit(visitor);
    #else
        std::visit(visitor, var1);
        std::visit(visitor, var2);
        std::visit(visitor, var3);
    #endif
    }
```

Saída: 
```
    int = 42
    string = “abc”
    base
```

### Ver também

[ visit](<#/doc/utility/variant/visit2>)(C++17) |  chama o functor fornecido com os argumentos mantidos por um ou mais `variant`s   
(modelo de função)  