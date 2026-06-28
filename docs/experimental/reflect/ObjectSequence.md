# std::experimental::reflect::ObjectSequence

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept ObjectSequence = Object<T> && /* see below */;
```

O `concept` `ObjectSequence` é satisfeito por tipos de sequência de meta-objetos.

Um tipo de sequência de meta-objetos é um tipo de meta-objeto que é obtido a partir de uma operação de meta-objeto que gera uma sequência, por exemplo, [`get_data_members`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_data_members&action=edit&redlink=1> "cpp/experimental/reflect/get data members \(page does not exist\)"). Cada elemento de um tipo de sequência de meta-objetos é um tipo de meta-objeto.

### Exemplo

Execute este código
```cpp
    #include<cmath>
    #include<experimental/reflect>
    #include<tuple>
    #include<type_traits>
     
    namespace reflect = std::experimental::reflect;
     
    template<reflect::Typed... Ms>
    using tuple_from_seq_t = std::tuple<reflect::get_reflected_type_t<
        reflect::get_type_t<Ms>>...>;
     
    template<reflect::Record T>
    using collect_tuple = reflect::unpack_sequence_t<
        tuple_from_seq_t,
        reflect::get_data_members_t<T>>;
     
    int main()
    {
        static_assert(reflect::ObjectSequence<
                          reflect::get_data_members<reflexpr(std::div_t)>>, "");
        static_assert(std::is_same<collect_tuple<reflexpr(std::div_t)>,
                                   std::tuple<int, int>>::value, "");
    }
```

### Veja também

| Esta seção está incompleta
Razão: templatização