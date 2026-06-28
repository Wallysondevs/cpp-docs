# Cabeçalho da biblioteca padrão &lt;tuple&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Includes

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Classes

[ tuple](<#/doc/utility/tuple>)(C++11) | implementa um contêiner de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(modelo de classe)
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo similar a tuple
(modelo de classe)
[ tuple_element](<#/doc/utility/tuple_element>)(C++11) | obtém os tipos dos elementos de um tipo similar a tuple
(modelo de classe)
[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(C++11) | obtém o tamanho de uma `tuple`
(especialização de modelo de classe)
[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) | obtém o tipo do elemento especificado
(especialização de modelo de classe)
[ std::uses_allocator<std::tuple>](<#/doc/utility/tuple/uses_allocator>)(C++11) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)

### Constants

[ ignore](<#/doc/utility/tuple/ignore>)(C++11) | marcador para pular um elemento ao desempacotar uma `tuple` usando [`tie`](<#/doc/utility/tuple/tie>)
(constante)

### Functions

[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de [referências de encaminhamento](<#/doc/language/reference>)
(modelo de função)
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) | cria uma `tuple` concatenando qualquer número de tuples
(modelo de função)
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tuple acessa o elemento especificado
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/tuple/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores na tuple
(modelo de função)
[ std::swap(std::tuple)](<#/doc/utility/tuple/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ apply](<#/doc/utility/apply>)(C++17) | chama uma função com uma tuple de argumentos
(modelo de função)
[ make_from_tuple](<#/doc/utility/make_from_tuple>)(C++17) | constrói um objeto com uma tuple de argumentos
(modelo de função)

### Sinopse
```cpp
    #include <compare>
    
    namespace std {
      // modelo de classe tuple
      template<class... Types>
        class tuple;
    
      // funções de criação de tuple
      inline constexpr /* unspecified */ ignore;
    
      template<class... TTypes>
        constexpr tuple<unwrap_ref_decay_t<TTypes>...> make_tuple(TTypes&&...);
    
      template<class... TTypes>
        constexpr tuple<TTypes&&...> forward_as_tuple(TTypes&&...) noexcept;
    
      template<class... TTypes>
        constexpr tuple<TTypes&...> tie(TTypes&...) noexcept;
    
      template<class... Tuples>
        constexpr tuple<CTypes...> tuple_cat(Tuples&&...);
    
      // chamando uma função com uma tuple de argumentos
      template<class F, class Tuple>
        constexpr decltype(auto) apply(F&& f, Tuple&& t);
    
      template<class T, class Tuple>
        constexpr T make_from_tuple(Tuple&& t);
    
      // classes auxiliares de tuple
      template<class T> struct tuple_size;                  // não definido
      template<class T> struct tuple_size<const T>;
    
      template<class... Types> struct tuple_size<tuple<Types...>>;
    
      template<size_t I, class T> struct tuple_element;     // não definido
      template<size_t I, class T> struct tuple_element<I, const T>;
    
      template<size_t I, class... Types>
        struct tuple_element<I, tuple<Types...>>;
    
      template<size_t I, class T>
        using tuple_element_t = typename tuple_element<I, T>::type;
    
      // acesso a elemento
      template<size_t I, class... Types>
        constexpr tuple_element_t<I, tuple<Types...>>& get(tuple<Types...>&) noexcept;
      template<size_t I, class... Types>
        constexpr tuple_element_t<I, tuple<Types...>>&& get(tuple<Types...>&&) noexcept;
      template<size_t I, class... Types>
        constexpr const tuple_element_t<I, tuple<Types...>>&
          get(const tuple<Types...>&) noexcept;
      template<size_t I, class... Types>
        constexpr const tuple_element_t<I, tuple<Types...>>&&
          get(const tuple<Types...>&&) noexcept;
      template<class T, class... Types>
        constexpr T& get(tuple<Types...>& t) noexcept;
      template<class T, class... Types>
        constexpr T&& get(tuple<Types...>&& t) noexcept;
      template<class T, class... Types>
        constexpr const T& get(const tuple<Types...>& t) noexcept;
      template<class T, class... Types>
        constexpr const T&& get(const tuple<Types...>&& t) noexcept;
    
      // operadores relacionais
      template<class... TTypes, class... UTypes>
        constexpr bool operator==(const tuple<TTypes...>&, const tuple<UTypes...>&);
      template<class... TTypes, class... UTypes>
        constexpr common_comparison_category_t</*synth-three-way-result*/<TTypes, UTypes>...>
          operator<=>(const tuple<TTypes...>&, const tuple<UTypes...>&);
    
      // traits relacionados a alocadores
      template<class... Types, class Alloc>
        struct uses_allocator<tuple<Types...>, Alloc>;
    
      // algoritmos especializados
      template<class... Types>
        constexpr void
          swap(tuple<Types...>& x, tuple<Types...>& y) noexcept(/* ver descrição */);
    
      // classes auxiliares de tuple
      template<class T>
        inline constexpr size_t tuple_size_v = tuple_size<T>::value;
    }
    
    // obsoleto
    namespace std {
      template<class T> class tuple_size<volatile T>;
      template<class T> class tuple_size<const volatile T>;
    
      template<size_t I, class T> class tuple_element<I, volatile T>;
      template<size_t I, class T> class tuple_element<I, const volatile T>;
    }
```

#### Modelo de classe [std::tuple](<#/doc/utility/tuple>)
```cpp
    namespace std {
      template<class... Types>
      class tuple {
      public:
        // construção de tuple
        constexpr explicit(/* ver descrição */) tuple();
        constexpr explicit(/* ver descrição */)
          tuple(const Types&...);         // somente se sizeof...(Types) >= 1
        template<class... UTypes>
          constexpr explicit(/* ver descrição */)
            tuple(UTypes&&...);           // somente se sizeof...(Types) >= 1
    
        tuple(const tuple&) = default;
        tuple(tuple&&) = default;
    
        template<class... UTypes>
          constexpr explicit(/* ver descrição */) tuple(const tuple<UTypes...>&);
        template<class... UTypes>
          constexpr explicit(/* ver descrição */) tuple(tuple<UTypes...>&&);
    
        template<class U1, class U2>
          constexpr explicit(/* ver descrição */)
            tuple(const pair<U1, U2>&);   // somente se sizeof...(Types) == 2
        template<class U1, class U2>
          constexpr explicit(/* ver descrição */)
            tuple(pair<U1, U2>&&);        // somente se sizeof...(Types) == 2
    
        // construtores estendidos por alocador
        template<class Alloc>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a);
        template<class Alloc>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a, const Types&...);
        template<class Alloc, class... UTypes>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a, UTypes&&...);
        template<class Alloc>
          constexpr tuple(allocator_arg_t, const Alloc& a, const tuple&);
        template<class Alloc>
          constexpr tuple(allocator_arg_t, const Alloc& a, tuple&&);
        template<class Alloc, class... UTypes>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a, const tuple<UTypes...>&);
        template<class Alloc, class... UTypes>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a, tuple<UTypes...>&&);
        template<class Alloc, class U1, class U2>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a, const pair<U1, U2>&);
        template<class Alloc, class U1, class U2>
          constexpr explicit(/* ver descrição */)
            tuple(allocator_arg_t, const Alloc& a, pair<U1, U2>&&);
    
        // atribuição de tuple
        constexpr tuple& operator=(const tuple&);
        constexpr tuple& operator=(tuple&&) noexcept(/* ver descrição */);
    
        template<class... UTypes>
          constexpr tuple& operator=(const tuple<UTypes...>&);
        template<class... UTypes>
          constexpr tuple& operator=(tuple<UTypes...>&&);
    
        template<class U1, class U2>
          constexpr tuple& operator=(const pair<U1, U2>&); // somente se sizeof...(Types) == 2
        template<class U1, class U2>
          constexpr tuple& operator=(pair<U1, U2>&&);      // somente se sizeof...(Types) == 2
    
        // troca de tuple
        constexpr void swap(tuple&) noexcept(/* ver descrição */);
      };
    
      template<class... UTypes>
        tuple(UTypes...) -> tuple<UTypes...>;
      template<class T1, class T2>
        tuple(pair<T1, T2>) -> tuple<T1, T2>;
      template<class Alloc, class... UTypes>
        tuple(allocator_arg_t, Alloc, UTypes...) -> tuple<UTypes...>;
      template<class Alloc, class T1, class T2>
        tuple(allocator_arg_t, Alloc, pair<T1, T2>) -> tuple<T1, T2>;
      template<class Alloc, class... UTypes>
        tuple(allocator_arg_t, Alloc, tuple<UTypes...>) -> tuple<UTypes...>;
    }
```