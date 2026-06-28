# Header da biblioteca padrão &lt;functional&gt;

Este header faz parte da biblioteca de [objetos de função](<#/doc/utility/functional>) e fornece a [função hash](<#/doc/utility/hash>) padrão.

### Namespaces

---
[`placeholders`](<#/doc/utility/functional/placeholders>) (C++11) | Fornece placeholders para os argumentos não vinculados em uma expressão [std::bind](<#/doc/utility/functional/bind>)

### Classes

##### Wrappers

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto callable copiável
(class template)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto callable que suporte qualificadores em uma dada assinatura de chamada
(class template)
[ copyable_function](<#/doc/utility/functional/copyable_function>)(C++26) | wrapper copiável de qualquer objeto callable copiável que suporte qualificadores em uma dada assinatura de chamada
(class template)
[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) | wrapper não proprietário de qualquer objeto callable
(class template)
[ mem_fn](<#/doc/utility/functional/mem_fn>)(C++11) | cria um objeto de função a partir de um ponteiro para um membro
(function template)
[ reference_wrapper](<#/doc/utility/functional/reference_wrapper>)(C++11) | wrapper de referência [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>)
(class template)
[ unwrap_referenceunwrap_ref_decay](<#/doc/utility/functional/unwrap_reference>)(C++20)(C++20) | obtém o tipo de referência encapsulado em [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)
(class template)

##### Classes auxiliares

[ bad_function_call](<#/doc/utility/functional/bad_function_call>)(C++11) | a exceção lançada ao invocar um [std::function](<#/doc/utility/functional/function>) vazio
(class)
[ is_bind_expression](<#/doc/utility/functional/is_bind_expression>)(C++11) | indica que um objeto é uma expressão `std::bind` ou pode ser usado como tal
(class template)
[ is_placeholder](<#/doc/utility/functional/is_placeholder>)(C++11) | indica que um objeto é um placeholder padrão ou pode ser usado como tal
(class template)

##### Operações aritméticas

[ plus](<#/doc/utility/functional/plus>) | objeto de função que implementa x + y
(class template)
[ minus](<#/doc/utility/functional/minus>) | objeto de função que implementa x - y
(class template)
[ multiplies](<#/doc/utility/functional/multiplies>) | objeto de função que implementa x * y
(class template)
[ divides](<#/doc/utility/functional/divides>) | objeto de função que implementa x / y
(class template)
[ modulus](<#/doc/utility/functional/modulus>) | objeto de função que implementa x % y
(class template)
[ negate](<#/doc/utility/functional/negate>) | objeto de função que implementa -x
(class template)

##### Comparações

[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(class template)
[ not_equal_to](<#/doc/utility/functional/not_equal_to>) | objeto de função que implementa x != y
(class template)
[ greater](<#/doc/utility/functional/greater>) | objeto de função que implementa x > y
(class template)
[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(class template)
[ greater_equal](<#/doc/utility/functional/greater_equal>) | objeto de função que implementa x >= y
(class template)
[ less_equal](<#/doc/utility/functional/less_equal>) | objeto de função que implementa x <= y
(class template)

##### Comparações restritas por concept

[ ranges::equal_to](<#/doc/utility/functional/ranges/equal_to>)(C++20) | objeto de função restrito que implementa x == y
(class)
[ ranges::not_equal_to](<#/doc/utility/functional/ranges/not_equal_to>)(C++20) | objeto de função restrito que implementa x != y
(class)
[ ranges::greater](<#/doc/utility/functional/ranges/greater>)(C++20) | objeto de função restrito que implementa x > y
(class)
[ ranges::less](<#/doc/utility/functional/ranges/less>)(C++20) | objeto de função restrito que implementa x < y
(class)
[ ranges::greater_equal](<#/doc/utility/functional/ranges/greater_equal>)(C++20) | objeto de função restrito que implementa x >= y
(class)
[ ranges::less_equal](<#/doc/utility/functional/ranges/less_equal>)(C++20) | objeto de função restrito que implementa x <= y
(class)
[ compare_three_way](<#/doc/utility/compare/compare_three_way>)(C++20) | objeto de função restrito que implementa x <=> y
(class)

##### Operações lógicas

[ logical_and](<#/doc/utility/functional/logical_and>) | objeto de função que implementa x && y
(class template)
[ logical_or](<#/doc/utility/functional/logical_or>) | objeto de função que implementa x || y
(class template)
[ logical_not](<#/doc/utility/functional/logical_not>) | objeto de função que implementa !x
(class template)

##### Operações bit a bit

[ bit_and](<#/doc/utility/functional/bit_and>) | objeto de função que implementa x & y
(class template)
[ bit_or](<#/doc/utility/functional/bit_or>) | objeto de função que implementa x | y
(class template)
[ bit_xor](<#/doc/utility/functional/bit_xor>) | objeto de função que implementa x ^ y
(class template)
[ bit_not](<#/doc/utility/functional/bit_not>)(C++14) | objeto de função que implementa ~x
(class template)

##### Negadores

[ not_fn](<#/doc/utility/functional/not_fn>)(C++17) | cria um objeto de função que retorna o complemento do resultado do objeto de função que ele contém
(function template)

##### Identidades

[ identity](<#/doc/utility/functional/identity>)(C++20) | objeto de função que retorna seu argumento inalterado
(class)

##### Buscadores

[ default_searcher](<#/doc/utility/functional/default_searcher>)(C++17) | implementação do algoritmo de busca da biblioteca padrão C++
(class template)
[ boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore
(class template)
[ boyer_moore_horspool_searcher](<#/doc/utility/functional/boyer_moore_horspool_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore-Horspool
(class template)

##### Hashing

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)
[ std::hash<_Arithmetic_ >std::hash<_Enumeration_ >std::hash<std::nullptr_t>std::hash<T*>](<#/doc/utility/hash>)(C++11) | especializações de [std::hash](<#/doc/utility/hash>) para tipos fundamentais, de enumeração e ponteiro
(class template specialization)

### Constantes

Definido no namespace `std::placeholders`
[ _1, _2, _3, _4, ...](<#/doc/utility/functional/placeholders>)(C++11) | placeholders para os argumentos não vinculados em uma expressão `std::bind`
(constante)

### Funções

[ bind_frontbind_back](<#/doc/utility/functional/bind_front>)(C++20)(C++23) | vincula um número variável de argumentos, em ordem, a um objeto de função
(function template)
[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(function template)
[ refcref](<#/doc/utility/functional/ref>)(C++11)(C++11) | cria um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>) com um tipo deduzido de seu argumento
(function template)
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(function template)

### Descontinuado em C++11 e removido em C++17

##### Base

---
[ unary_function](<#/doc/utility/functional/unary_function>)(descontinuado em C++11)(removido em C++17) | classe base de função unária compatível com adaptador
(class template)
[ binary_function](<#/doc/utility/functional/binary_function>)(descontinuado em C++11)(removido em C++17) | classe base de função binária compatível com adaptador
(class template)

##### Binders

[ binder1stbinder2nd](<#/doc/utility/functional/binder12>)(descontinuado em C++11)(removido em C++17) | objeto de função que contém uma função binária e um de seus argumentos
(class template)
[ bind1stbind2nd](<#/doc/utility/functional/bind12>)(descontinuado em C++11)(removido em C++17) | vincula um argumento a uma função binária
(function template)

##### Adaptadores de função

[ pointer_to_unary_function](<#/doc/utility/functional/pointer_to_unary_function>)(descontinuado em C++11)(removido em C++17) | wrapper compatível com adaptador para um ponteiro para função unária
(class template)
[ pointer_to_binary_function](<#/doc/utility/functional/pointer_to_binary_function>)(descontinuado em C++11)(removido em C++17) | wrapper compatível com adaptador para um ponteiro para função binária
(class template)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(descontinuado em C++11)(removido em C++17) | cria um wrapper de objeto de função compatível com adaptador a partir de um ponteiro para função
(function template)
[ mem_fun_tmem_fun1_tconst_mem_fun_tconst_mem_fun1_t](<#/doc/utility/functional/mem_fun_t>)(descontinuado em C++11)(removido em C++17) | wrapper para um ponteiro para função membro nula ou unária, invocável com um ponteiro para objeto
(class template)
[ mem_fun](<#/doc/utility/functional/mem_fun>)(descontinuado em C++11)(removido em C++17) | cria um wrapper a partir de um ponteiro para função membro, invocável com um ponteiro para objeto
(function template)
[ mem_fun_ref_tmem_fun1_ref_tconst_mem_fun_ref_tconst_mem_fun1_ref_t](<#/doc/utility/functional/mem_fun_ref_t>)(descontinuado em C++11)(removido em C++17) | wrapper para um ponteiro para função membro nula ou unária, invocável com uma referência a objeto
(class template)
[ mem_fun_ref](<#/doc/utility/functional/mem_fun_ref>)(descontinuado em C++11)(removido em C++17) | cria um wrapper a partir de um ponteiro para função membro, invocável com uma referência a objeto
(function template)

### Descontinuado em C++17 e removido em C++20

##### Negadores

---
[ unary_negate](<#/doc/utility/functional/unary_negate>)(descontinuado em C++17)(removido em C++20) | objeto de função wrapper que retorna o complemento do predicado unário que ele contém
(class template)
[ binary_negate](<#/doc/utility/functional/binary_negate>)(descontinuado em C++17)(removido em C++20) | objeto de função wrapper que retorna o complemento do predicado binário que ele contém
(class template)
[ not1](<#/doc/utility/functional/not1>)(descontinuado em C++17)(removido em C++20) | constrói um objeto [std::unary_negate](<#/doc/utility/functional/unary_negate>) personalizado
(function template)
[ not2](<#/doc/utility/functional/not2>)(descontinuado em C++17)(removido em C++20) | constrói um objeto [std::binary_negate](<#/doc/utility/functional/binary_negate>) personalizado
(function template)

### Synopsis
```cpp
    namespace std {
      // invoke
      template<class F, class... Args>
        constexpr invoke_result_t<F, Args...> invoke(F&& f, Args&&... args)
          noexcept(is_nothrow_invocable_v<F, Args...>);
      template<class R, class F, class... Args>
        constexpr R invoke_r(F&& f, Args&&... args)
          noexcept(is_nothrow_invocable_r_v<R, F, Args...>);
    
      // reference_wrapper
      template<class T> class reference_wrapper;
    
      template<class T> constexpr reference_wrapper<T> ref(T&) noexcept;
      template<class T> constexpr reference_wrapper<const T> cref(const T&) noexcept;
      template<class T> void ref(const T&&) = delete;
      template<class T> void cref(const T&&) = delete;
    
      template<class T>
        constexpr reference_wrapper<T> ref(reference_wrapper<T>) noexcept;
      template<class T>
        constexpr reference_wrapper<const T> cref(reference_wrapper<T>) noexcept;
    
      template<class T> struct unwrap_reference;
      template<class T> using unwrap_reference_t = typename unwrap_reference<T>::type;
      template<class T> struct unwrap_ref_decay;
      template<class T> using unwrap_ref_decay_t = typename unwrap_ref_decay<T>::type;
    
      // especializações relacionadas a common_reference
      template<class R, class T, template<class> class RQual, template<class> class TQual>
        requires /* see below */
      struct basic_common_reference<R, T, RQual, TQual>;
    
      template<class T, class R, template<class> class TQual, template<class> class RQual>
        requires /* see below */
      struct basic_common_reference<T, R, TQual, RQual>;
    
      // operações aritméticas
      template<class T = void> struct plus;
      template<class T = void> struct minus;
      template<class T = void> struct multiplies;
      template<class T = void> struct divides;
      template<class T = void> struct modulus;
      template<class T = void> struct negate;
      template<> struct plus<void>;
      template<> struct minus<void>;
      template<> struct multiplies<void>;
      template<> struct divides<void>;
      template<> struct modulus<void>;
      template<> struct negate<void>;
    
      // comparações
      template<class T = void> struct equal_to;
      template<class T = void> struct not_equal_to;
      template<class T = void> struct greater;
      template<class T = void> struct less;
      template<class T = void> struct greater_equal;
      template<class T = void> struct less_equal;
      template<> struct equal_to<void>;
      template<> struct not_equal_to<void>;
      template<> struct greater<void>;
      template<> struct less<void>;
      template<> struct greater_equal<void>;
      template<> struct less_equal<void>;
    
      // operações lógicas
      template<class T = void> struct logical_and;
      template<class T = void> struct logical_or;
      template<class T = void> struct logical_not;
      template<> struct logical_and<void>;
      template<> struct logical_or<void>;
      template<> struct logical_not<void>;
    
      // operações bit a bit
      template<class T = void> struct bit_and;
      template<class T = void> struct bit_or;
      template<class T = void> struct bit_xor;
      template<class T = void> struct bit_not;
      template<> struct bit_and<void>;
      template<> struct bit_or<void>;
      template<> struct bit_xor<void>;
      template<> struct bit_not<void>;
    
      // identidade
      struct identity;
    
      // function template not_fn
      template<class F> constexpr /* unspecified */ not_fn(F&& f);
    
      // function templates bind_front e bind_back
      template<class F, class... Args> constexpr /* unspecified */ bind_front(F&&, Args&&...);
      template<class F, class... Args> constexpr /* unspecified */ bind_back(F&&, Args&&...);
    
      // bind
      template<class T> struct is_bind_expression;
      template<class T>
        inline constexpr bool is_bind_expression_v = is_bind_expression<T>::value;
    
      template<class T> struct is_placeholder;
      template<class T>
        inline constexpr int is_placeholder_v = is_placeholder<T>::value;
    
      template<class F, class... BoundArgs>
        constexpr /* unspecified */ bind(F&&, BoundArgs&&...);
      template<class R, class F, class... BoundArgs>
        constexpr /* unspecified */ bind(F&&, BoundArgs&&...);
    
      namespace placeholders {
        // M é o número de placeholders definido pela implementação
        /* see description */ _1;
        /* see description */ _2;
                   .
                   .
                   .
        /* see description */ _M;
      }
    
      // adaptadores de função membro
      template<class R, class T>
        constexpr /* unspecified */ mem_fn(R T::*) noexcept;
    
      // wrappers de função polimórfica
      class bad_function_call;
    
      template<class> class function; // not defined
      template<class R, class... ArgTypes> class function<R(ArgTypes...)>;
    
      template<class R, class... ArgTypes>
        void swap(function<R(ArgTypes...)>&, function<R(ArgTypes...)>&) noexcept;
    
      template<class R, class... ArgTypes>
        bool operator==(const function<R(ArgTypes...)>&, nullptr_t) noexcept;
    
      // wrapper move-only
      template<class...> class move_only_function; // not defined
    
      template<class R, class... ArgTypes>
        class move_only_function<R(ArgTypes...) /*cv ref*/ noexcept(/*noex*/)>;
    
      // wrapper copiável
      template<class...> class copyable_function; // not defined
    
      template<class R, class... ArgTypes>
        class copyable_function<R(ArgTypes...) /*cv ref*/ noexcept(/*noex*/)>;
    
      // wrapper não proprietário
      template<class...> class function_ref; // not defined
    
      template<class R, class... ArgTypes>
        class function_ref<R(ArgTypes...) /*cv*/ noexcept(/*noex*/)>;
    
      // buscadores
      template<class ForwardIter, class BinaryPredicate = equal_to<>>
        class default_searcher;
    
      template<class RandomAccessIter,
               class Hash = hash<typename iterator_traits<RandomAccessIter>::value_type>,
               class BinaryPredicate = equal_to<>>
        class boyer_moore_searcher;
    
      template<class RandomAccessIter,
               class Hash = hash<typename iterator_traits<RandomAccessIter>::value_type>,
               class BinaryPredicate = equal_to<>>
        class boyer_moore_horspool_searcher;
    
      // template primário de função hash
      template<class T>
        struct hash;
    
      // comparações restritas por concept
      struct compare_three_way;
      namespace ranges {
        struct equal_to;
        struct not_equal_to;
        struct greater;
        struct less;
        struct greater_equal;
        struct less_equal;
      }
    
      // apenas para exposição
      template<class Fn, class... Args>
        concept /*callable*/ =
          requires (Fn&& fn, Args&&... args) {
            std::forward<Fn>(fn)(std::forward<Args>(args)...);
          };
    
      // apenas para exposição
      template<class Fn, class... Args>
        concept /*nothrow-callable*/ =
          /*callable*/<Fn, Args...> &&
          requires (Fn&& fn, Args&&... args) {
            { std::forward<Fn>(fn)(std::forward<Args>(args)...) } noexcept;
          };
    
      // apenas para exposição
      template<class Fn, class... Args>
        using /*call-result-t*/ = decltype(std::declval<Fn>()(std::declval<Args>()...));
    
      // apenas para exposição
      template<const auto& T>
        using /*decayed-typeof*/ = decltype(auto(T));
    }
```

#### Class template [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)
```cpp
    namespace std {
      template<class T> class reference_wrapper {
      public:
        // types
        using type = T;
    
        // construct/copy/destroy
        template<class U>
          constexpr reference_wrapper(U&&) noexcept(/* see below */);
        constexpr reference_wrapper(const reference_wrapper& x) noexcept;
    
        // assignment
        constexpr reference_wrapper& operator=(const reference_wrapper& x) noexcept;
    
        // access
        constexpr operator T& () const noexcept;
        constexpr T& get() const noexcept;
    
        // invocation
        template<class... ArgTypes>
          constexpr invoke_result_t<T&, ArgTypes...> operator()(ArgTypes&&...) const
            noexcept(is_nothrow_invocable_v<T&, ArgTypes...>);
    
        // comparison
        friend constexpr bool operator==(reference_wrapper, reference_wrapper);
        friend constexpr bool operator==(reference_wrapper, const T&);
        friend constexpr bool operator==(reference_wrapper, reference_wrapper<const T>);
    
        friend constexpr auto operator<=>(reference_wrapper, reference_wrapper);
        friend constexpr auto operator<=>(reference_wrapper, const T&);
        friend constexpr auto operator<=>(reference_wrapper, reference_wrapper<const T>);
      };
      // deduction guides
      template<class T>
        reference_wrapper(T&) -> reference_wrapper<T>;
    }
```

#### Class template [std::unwrap_reference](<#/doc/utility/functional/unwrap_reference>)
```cpp
    namespace std {
      template<class T>
        struct unwrap_reference;
    }
```

#### Class template [std::unwrap_ref_decay](<#/doc/utility/functional/unwrap_reference>)
```cpp
    namespace std {
      template<class T>
        struct unwrap_ref_decay;
    }
```

#### Class template [std::plus](<#/doc/utility/functional/plus>)
```cpp
    namespace std {
      template<class T = void> struct plus {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct plus<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) + std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::minus](<#/doc/utility/functional/minus>)
```cpp
    namespace std {
      template<class T = void> struct minus {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct minus<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) - std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::multiplies](<#/doc/utility/functional/multiplies>)
```cpp
    namespace std {
      template<class T = void> struct multiplies {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct multiplies<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) * std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::divides](<#/doc/utility/functional/divides>)
```cpp
    namespace std {
      template<class T = void> struct divides {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct divides<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) / std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::modulus](<#/doc/utility/functional/modulus>)
```cpp
    namespace std {
      template<class T = void> struct modulus {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct modulus<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) % std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::negate](<#/doc/utility/functional/negate>)
```cpp
    namespace std {
      template<class T = void> struct negate {
        constexpr T operator()(const T& x) const;
      };
    
      template<> struct negate<void> {
        template<class T> constexpr auto operator()(T&& t) const
          -> decltype(-std::forward<T>(t));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::equal_to](<#/doc/utility/functional/equal_to>)
```cpp
    namespace std {
      template<class T = void> struct equal_to {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct equal_to<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) == std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::not_equal_to](<#/doc/utility/functional/not_equal_to>)
```cpp
    namespace std {
      template<class T = void> struct not_equal_to {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct not_equal_to<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) != std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::greater](<#/doc/utility/functional/greater>)
```cpp
    namespace std {
      template<class T = void> struct greater {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct greater<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) > std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::less](<#/doc/utility/functional/less>)
```cpp
    namespace std {
      template<class T = void> struct less {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct less<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) < std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::greater_equal](<#/doc/utility/functional/greater_equal>)
```cpp
    namespace std {
      template<class T = void> struct greater_equal {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct greater_equal<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) >= std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class template [std::less_equal](<#/doc/utility/functional/less_equal>)
```cpp
    namespace std {
      template<class T = void> struct less_equal {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct less_equal<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) <= std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class [std::compare_three_way](<#/doc/utility/compare/compare_three_way>)
```cpp
    namespace std {
      struct compare_three_way {
        template<class T, class U>
        constexpr auto operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class std::ranges::equal_to
```cpp
    namespace std::ranges {
      struct equal_to {
        template<class T, class U>
        constexpr bool operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class std::ranges::not_equal_to
```cpp
    namespace std::ranges {
      struct not_equal_to {
        template<class T, class U>
        constexpr bool operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class std::ranges::greater
```cpp
    namespace std::ranges {
      struct greater {
        template<class T, class U>
        constexpr bool operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class std::ranges::less
```cpp
    namespace std::ranges {
      struct less {
        template<class T, class U>
        constexpr bool operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class std::ranges::greater_equal
```cpp
    namespace std::ranges {
      struct greater_equal {
        template<class T, class U>
        constexpr bool operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Class std::ranges::less_equal
```cpp
    namespace std::ranges {
      struct less_equal {
        // ... (conteúdo omitido para brevidade, pois o original também omite)
      };
    }
```
```cpp
    namespace std::ranges {
      struct less_equal {
        template<class T, class U>
        constexpr bool operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::logical_and](<#/doc/utility/functional/logical_and>)
```cpp
    namespace std {
      template<class T = void> struct logical_and {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct logical_and<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) && std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::logical_or](<#/doc/utility/functional/logical_or>)
```cpp
    namespace std {
      template<class T = void> struct logical_or {
        constexpr bool operator()(const T& x, const T& y) const;
      };
    
      template<> struct logical_or<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) || std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::logical_not](<#/doc/utility/functional/logical_not>)
```cpp
    namespace std {
      template<class T = void> struct logical_not {
        constexpr bool operator()(const T& x) const;
      };
    
      template<> struct logical_not<void> {
        template<class T> constexpr auto operator()(T&& t) const
          -> decltype(!std::forward<T>(t));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::bit_and](<#/doc/utility/functional/bit_and>)
```cpp
    namespace std {
      template<class T = void> struct bit_and {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct bit_and<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) & std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::bit_or](<#/doc/utility/functional/bit_or>)
```cpp
    namespace std {
      template<class T = void> struct bit_or {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct bit_or<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) | std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe std::bit_xor
```cpp
    namespace std {
      template<class T = void> struct bit_xor {
        constexpr T operator()(const T& x, const T& y) const;
      };
    
      template<> struct bit_xor<void> {
        template<class T, class U> constexpr auto operator()(T&& t, U&& u) const
          -> decltype(std::forward<T>(t) ^ std::forward<U>(u));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::bit_not](<#/doc/utility/functional/bit_not>)
```cpp
    namespace std {
      template<class T = void> struct bit_not {
        constexpr T operator()(const T& x) const;
      };
    
      template<> struct bit_not<void> {
        template<class T> constexpr auto operator()(T&& t) const
          -> decltype(~std::forward<T>(t));
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe std::identity
```cpp
    namespace std {
      struct identity {
        template<class T>
          constexpr T&& operator()(T&& t) const noexcept;
    
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::is_bind_expression](<#/doc/utility/functional/is_bind_expression>)
```cpp
    namespace std {
      template<class T> struct is_bind_expression;
    }
```

#### Modelo de classe [std::is_placeholder](<#/doc/utility/functional/is_placeholder>)
```cpp
    namespace std {
      template<class T> struct is_placeholder;
    }
```

#### Classe [std::bad_function_call](<#/doc/utility/functional/bad_function_call>)
```cpp
    namespace std {
      class bad_function_call : public exception {
      public:
        // veja [exception] para a especificação das funções membro especiais
        const char* what() const noexcept override;
      };
    }
```

#### Modelo de classe [std::function](<#/doc/utility/functional/function>)
```cpp
    namespace std {
      template<class> class function; // não definido
    
      template<class R, class... ArgTypes>
      class function<R(ArgTypes...)> {
      public:
        using result_type = R;
    
        // construir/copiar/destruir
        function() noexcept;
        function(nullptr_t) noexcept;
        function(const function&);
        function(function&&) noexcept;
        template<class F> function(F);
    
        function& operator=(const function&);
        function& operator=(function&&);
        function& operator=(nullptr_t) noexcept;
        template<class F> function& operator=(F&&);
        template<class F> function& operator=(reference_wrapper<F>) noexcept;
    
        ~function();
    
        // modificadores de função
        void swap(function&) noexcept;
    
        // capacidade da função
        explicit operator bool() const noexcept;
    
        // invocação da função
        R operator()(ArgTypes...) const;
    
        // acesso ao alvo da função
        const type_info& target_type() const noexcept;
        template<class T>       T* target() noexcept;
        template<class T> const T* target() const noexcept;
      };
    
      template<class R, class... ArgTypes>
        function(R(*)(ArgTypes...)) -> function<R(ArgTypes...)>;
    
      template<class F> function(F) -> function</* veja descrição */>;
    
      // funções de comparação de ponteiro nulo
      template<class R, class... ArgTypes>
        bool operator==(const function<R(ArgTypes...)>&, nullptr_t) noexcept;
    
      // algoritmos especializados
      template<class R, class... ArgTypes>
        void swap(function<R(ArgTypes...)>&, function<R(ArgTypes...)>&) noexcept;
    }
```

#### Modelo de classe std::move_only_function
```cpp
    namespace std {
      template<class... S> class move_only_function; // não definido
    
      template<class R, class... ArgTypes>
      class move_only_function<R(ArgTypes...) /*cv-ref*/ noexcept(/*noex*/)> {
      public:
        using result_type = R;
    
        // construir/mover/destruir
        move_only_function() noexcept;
        move_only_function(nullptr_t) noexcept;
        move_only_function(move_only_function&&) noexcept;
        template<class F> move_only_function(F&&);
    
        template<class T, class... Args>
          explicit move_only_function(in_place_type_t<T>, Args&&...);
        template<class T, class U, class... Args>
          explicit move_only_function(in_place_type_t<T>, initializer_list<U>, Args&&...);
    
        move_only_function& operator=(move_only_function&&);
        move_only_function& operator=(nullptr_t) noexcept;
        template<class F> move_only_function& operator=(F&&);
    
        ~move_only_function();
    
        // invocação
        explicit operator bool() const noexcept;
    
        R operator()(ArgTypes...) /*cv-ref*/ noexcept(/*noex*/);
    
        // utilitário
        void swap(move_only_function&) noexcept;
    
        friend void swap(move_only_function&, move_only_function&) noexcept;
    
        friend bool operator==(const move_only_function&, nullptr_t) noexcept;
    
      private:
        // apenas para exposição
        template<class VT>
          static constexpr bool /*is-callable-from*/ = /* veja descrição */; 
      };
    }
```

#### Modelo de classe std::copyable_function
```cpp
    namespace std {
      template<class... S> class copyable_function; // não definido
    
      template<class R, class... ArgTypes>
      class copyable_function<R(ArgTypes...) /*cv-ref*/ noexcept(/*noex*/)> {
      public:
        using result_type = R;
    
        // construir/mover/destruir
        copyable_function() noexcept;
        copyable_function(nullptr_t) noexcept;
        copyable_function(const copyable_function&);
        copyable_function(copyable_function&&) noexcept;
        template<class F> copyable_function(F&&);
    
        template<class T, class... Args>
          explicit copyable_function(in_place_type_t<T>, Args&&...);
        template<class T, class U, class... Args>
          explicit copyable_function(in_place_type_t<T>, initializer_list<U>, Args&&...);
    
        copyable_function& operator=(const copyable_function&);
        copyable_function& operator=(copyable_function&&);
        copyable_function& operator=(nullptr_t) noexcept;
        template<class F> copyable_function& operator=(F&&);
    
        ~copyable_function();
    
        // invocação
        explicit operator bool() const noexcept;
    
        R operator()(ArgTypes...) /*cv-ref*/ noexcept(/*noex*/);
    
        // utilitário
        void swap(copyable_function&) noexcept;
    
        friend void swap(copyable_function&, copyable_function&) noexcept;
    
        friend bool operator==(const copyable_function&, nullptr_t) noexcept;
    
      private:
        // apenas para exposição
        template<class VT>
          static constexpr bool /*is-callable-from*/ = /* veja descrição */; 
      };
    }
```

#### Modelo de classe std::function_ref
```cpp
    namespace std {
      template<class... S> class function_ref; // não definido
    
      template<class R, class... ArgTypes>
      class function_ref<R(ArgTypes...) /*cv*/ noexcept(/*noex*/)> {
      public:
        // construtores e operadores de atribuição
        template<class F> function_ref(F*) noexcept;
        template<class F> constexpr function_ref(F&&) noexcept;
        template<auto f> constexpr function_ref(nontype_t<f>) noexcept;
        template<auto f, class U>
          constexpr function_ref(nontype_t<f>, U&&) noexcept;
        template<auto f, class T>
          constexpr function_ref(nontype_t<f>, /*cv*/ T*) noexcept;
    
        constexpr function_ref(const function_ref&) noexcept = default;
        constexpr function_ref& operator=(const function_ref&) noexcept = default;
        template<class T> function_ref& operator=(T) = delete;
    
        // invocação
        R operator()(ArgTypes...) /*cv*/ noexcept(/*noex*/);
    
      private:
        // apenas para exposição
        template<class... T>
          static constexpr bool /*is-invocable-using*/ = /* veja descrição */;
    
        R (*thunk-ptr)(BoundEntityType, ArgTypes&&...) noexcept(/*noex*/); // apenas para exposição
        BoundEntityType bound-entity; // apenas para exposição
      };
      // guias de dedução
      template<class F>
        function_ref(F*) -> function_ref<F>;
      template<auto f>
        function_ref(nontype_t<f>) -> function_ref</* veja descrição */>;
      template<auto f, class T>
        function_ref(nontype_t<f>, T&&) -> function_ref</* veja descrição */>;
    }
```

#### Modelo de classe [std::default_searcher](<#/doc/utility/functional/default_searcher>)
```cpp
    namespace std {
      template<class ForwardIter1, class BinaryPredicate = equal_to<>>
        class default_searcher {
        public:
          constexpr default_searcher(ForwardIter1 pat_first, ForwardIter1 pat_last,
                                     BinaryPredicate pred = BinaryPredicate());
    
          template<class ForwardIter2>
            constexpr pair<ForwardIter2, ForwardIter2>
              operator()(ForwardIter2 first, ForwardIter2 last) const;
    
        private:
          ForwardIter1 pat_first_;            // apenas para exposição
          ForwardIter1 pat_last_;             // apenas para exposição
          BinaryPredicate pred_;              // apenas para exposição
      };
    }
```

#### Modelo de classe [std::boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)
```cpp
    namespace std {
      template<class RandomAccessIter1,
               class Hash = hash<typename iterator_traits<RandomAccessIter1>::value_type>,
               class BinaryPredicate = equal_to<>>
        class boyer_moore_searcher {
        public:
          boyer_moore_searcher(RandomAccessIter1 pat_first,
                               RandomAccessIter1 pat_last,
                               Hash hf = Hash(),
                               BinaryPredicate pred = BinaryPredicate());
    
          template<class RandomAccessIter2>
            pair<RandomAccessIter2, RandomAccessIter2>
              operator()(RandomAccessIter2 first, RandomAccessIter2 last) const;
    
        private:
          RandomAccessIter1 pat_first_;       // apenas para exposição
          RandomAccessIter1 pat_last_;        // apenas para exposição
          Hash hash_;                         // apenas para exposição
          BinaryPredicate pred_;              // apenas para exposição
        };
    }
```

#### Modelo de classe [std::boyer_moore_horspool_searcher](<#/doc/utility/functional/boyer_moore_horspool_searcher>)
```cpp
    namespace std {
      template<class RandomAccessIter1,
               class Hash = hash<typename iterator_traits<RandomAccessIter1>::value_type>,
               class BinaryPredicate = equal_to<>>
        class boyer_moore_horspool_searcher {
        public:
          boyer_moore_horspool_searcher(RandomAccessIter1 pat_first,
                                        RandomAccessIter1 pat_last,
                                        Hash hf = Hash(),
                                        BinaryPredicate pred = BinaryPredicate());
    
          template<class RandomAccessIter2>
            pair<RandomAccessIter2, RandomAccessIter2>
              operator()(RandomAccessIter2 first, RandomAccessIter2 last) const;
    
        private:
          RandomAccessIter1 pat_first_;       // apenas para exposição
          RandomAccessIter1 pat_last_;        // apenas para exposição
          Hash hash_;                         // apenas para exposição
          BinaryPredicate pred_;              // apenas para exposição
      };
    }
```

### Veja também

[std::hash](<#/doc/utility/hash>) [especializações para tipos de biblioteca](<#/doc/utility/hash>)  
---