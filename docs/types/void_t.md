# std::void_t

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class... >
using void_t = void;
```

  
Metafunção utilitária que mapeia uma sequência de quaisquer tipos para o tipo void. Esta metafunção é uma maneira conveniente de aproveitar [SFINAE](<#/doc/language/sfinae>) antes dos [concepts](<#/doc/language/constraints>) do C++20, em particular para remover condicionalmente funções do [conjunto de candidatos](<#/doc/language/overload_resolution>) com base na validade de uma expressão no [contexto não avaliado](<#/doc/language/expressions>) (como operando para uma expressão [`decltype`](<#/doc/language/decltype>)), permitindo a existência de sobrecargas de função ou especializações separadas com base nas operações suportadas.

### Notas

Esta metafunção é usada em metaprogramação de template para detectar tipos malformados no contexto SFINAE:
```cpp
    // primary template handles types that have no nested ::type member:
    template<class, class = void>
    struct has_type_member : std::false_type {};
     
    // specialization recognizes types that do have a nested ::type member:
    template<class T>
    struct has_type_member<T, std::void_t<typename T::type>> : std::true_type {};
```

Também pode ser usada para detectar a validade de uma expressão:
```cpp
    // primary template handles types that do not support pre-increment:
    template<class, class = void>
    struct has_pre_increment_member : std::false_type {};
     
    // specialization recognizes types that do support pre-increment:
    template<class T>
    struct has_pre_increment_member<T,
               std::void_t<decltype( ++std::declval<T&>() )>
           > : std::true_type {};
```

Até a resolução do [problema CWG 1558](<https://cplusplus.github.io/CWG/issues/1558.html>) (um defeito do C++11), parâmetros não utilizados em [alias templates](<#/doc/language/type_alias>) não tinham garantia de assegurar SFINAE e podiam ser ignorados, então compiladores mais antigos exigem uma definição mais complexa de `void_t`, como
```cpp
    template<typename... Ts>
    struct make_void { typedef void type; };
     
    template<typename... Ts>
    using void_t = typename make_void<Ts...>::type;
```

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_void_t`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [`std::void_t`](<#/doc/types/void_t>)  
  
### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <type_traits>
    #include <vector>
     
    // Variable template that checks if a type has begin() and end() member functions
    template<typename, typename = void>
    constexpr bool is_iterable = false;
     
    template<typename T>
    constexpr bool is_iterable<
        T,
        std::void_t<decltype(std::declval<T>().begin()),
                    decltype(std::declval<T>().end())
        >
    > = true;
     
    // An iterator trait those value_type is the value_type of the iterated container,
    // supports even back_insert_iterator (where value_type is void)
     
    template<typename T, typename = void>
    struct iterator_trait : std::iterator_traits<T> {};
     
    template<typename T>
    struct iterator_trait<T, std::void_t<typename T::container_type>>
        : std::iterator_traits<typename T::container_type::iterator> {};
     
    class A {};
     
    #define SHOW(...) std::cout << std::setw(34) << #__VA_ARGS__ \
                                << " == " << __VA_ARGS__ << '\n'
     
    int main()
    {
        std::cout << std::boolalpha << std::left;
        SHOW(is_iterable<std::vector<double>>);
        SHOW(is_iterable<std::map<int, double>>);
        SHOW(is_iterable<double>);
        SHOW(is_iterable<A>);
     
        using container_t = std::vector<int>;
        container_t v;
     
        static_assert(std::is_same_v<
            container_t::value_type,
            iterator_trait<decltype(std::begin(v))>::value_type
        >);
     
        static_assert(std::is_same_v<
            container_t::value_type,
            iterator_trait<decltype(std::back_inserter(v))>::value_type
        >);
    }
```

Saída:
```
    is_iterable<std::vector<double>>   == true
    is_iterable<std::map<int, double>> == true
    is_iterable<double>                == false
    is_iterable<A>                     == false
```

### Veja também

[ enable_if](<#/doc/types/enable_if>)(C++11) | remove condicionalmente uma sobrecarga de função ou especialização de template da resolução de sobrecarga   
(template de classe)  