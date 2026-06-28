# std::as_const

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T >
constexpr std::add_const_t<T>& as_const( T& t ) noexcept;
template< class T >
void as_const( const T&& ) = delete;
```

1) Forma uma referência lvalue para o tipo const de t.

2) A sobrecarga de referência rvalue const é deletada para não permitir argumentos rvalue.

### Possível implementação
```cpp
    template<class T>
    constexpr std::add_const_t<T>& as_const(T& t) noexcept
    {
        return t;
    }
```

---

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_as_const`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | [`std::as_const`](<#/doc/utility/as_const>)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string>
    #include <type_traits>
    #include <utility>
    
    int main()
    {
        std::string mutableString = "Hello World!";
        auto&& constRef = std::as_const(mutableString);
    
        mutableString.clear(); // OK
    //  constRef.clear(); // Erro: 'constRef' é qualificado como 'const',
                          //        mas 'clear' não está marcado como const
    
        assert(&constRef == &mutableString);
        assert(&std::as_const(mutableString) == &mutableString);
    
        using ExprType = std::remove_reference_t<decltype(std::as_const(mutableString))>;
    
        static_assert(std::is_same_v<std::remove_const_t<ExprType>, std::string>,
                      "ExprType deve ser algum tipo de string.");
        static_assert(!std::is_same_v<ExprType, std::string>,
                      "ExprType não deve ser uma string mutável.");
    }
```

### Veja também

[ is_const](<#/doc/types/is_const>)(C++11) | verifica se um tipo é qualificado como const
(modelo de classe)
[ add_cvadd_constadd_volatile](<#/doc/types/add_cv>)(C++11)(C++11)(C++11) | adiciona especificadores const e/ou volatile ao tipo fornecido
(modelo de classe)
[ remove_cvremove_constremove_volatile](<#/doc/types/remove_cv>)(C++11)(C++11)(C++11) | remove especificadores const e/ou volatile do tipo fornecido
(modelo de classe)
[ ranges::as_const_viewviews::as_const](<#/doc/ranges/as_const_view>)(C++23) | converte uma [`view`](<#/doc/ranges/view>) em um [`constant_range`](<#/doc/ranges/constant_range>)
(modelo de classe) (objeto adaptador de range)