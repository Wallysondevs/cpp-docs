# Cabeçalho da biblioteca padrão &lt;variant&gt; (C++17)

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Classes

[ variant](<#/doc/utility/variant>)(C++17) | uma união discriminada type-safe
(modelo de classe)
[ monostate](<#/doc/utility/variant/monostate>)(C++17) | tipo de marcador de posição para uso como a primeira alternativa em um `variant` de tipos não construíveis por padrão
(classe)
[ bad_variant_access](<#/doc/utility/variant/bad_variant_access>)(C++17) | exceção lançada em acessos inválidos ao valor de um `variant`
(classe)
[ variant_sizevariant_size_v](<#/doc/utility/variant/variant_size>)(C++17) | obtém o tamanho da lista de alternativas do `variant` em tempo de compilação
(modelo de classe) (modelo de variável)
[ variant_alternativevariant_alternative_t](<#/doc/utility/variant/variant_alternative>)(C++17) | obtém o tipo da alternativa especificada por seu índice, em tempo de compilação
(modelo de classe) (modelo de alias)
[ std::hash<std::variant>](<#/doc/utility/variant/hash>)(C++17) | suporte a hash para [`std::variant`](<#/doc/utility/variant>)
(especialização de modelo de classe)

### Constantes

[ variant_npos](<#/doc/utility/variant/variant_npos>)(C++17) | índice do `variant` no estado inválido
(constante)

### Funções

[ visit](<#/doc/utility/variant/visit2>)(C++17) | chama o functor fornecido com os argumentos mantidos por um ou mais `variant`s
(modelo de função)
[ holds_alternative](<#/doc/utility/variant/holds_alternative>)(C++17) | verifica se um `variant` atualmente contém um determinado tipo
(modelo de função)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor do variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(modelo de função)
[ get_if](<#/doc/utility/variant/get_if>)(C++17) | obtém um ponteiro para o valor de um `variant` apontado, dado o índice ou o tipo (se único), retorna nulo em caso de erro
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/variant/operator_cmp>)(C++17)(C++17)(C++17)(C++17)(C++17)(C++17)(C++20) | compara objetos `variant` como seus valores contidos
(modelo de função)
[ std::swap(std::variant)](<#/doc/utility/variant/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Synopsis
```cpp
    #include <compare>
    
    namespace std {
      // class template variant
      template<class... Types>
        class variant;
    
      // variant helper classes
      template<class T> struct variant_size;                        // not defined
      template<class T> struct variant_size<const T>;
      template<class T>
        inline constexpr size_t variant_size_v = variant_size<T>::value;
    
      template<class... Types>
        struct variant_size<variant<Types...>>;
    
      template<size_t I, class T> struct variant_alternative;       // not defined
      template<size_t I, class T> struct variant_alternative<I, const T>;
      template<size_t I, class T>
        using variant_alternative_t = typename variant_alternative<I, T>::type;
    
      template<size_t I, class... Types>
        struct variant_alternative<I, variant<Types...>>;
    
      inline constexpr size_t variant_npos = -1;
    
      // value access
      template<class T, class... Types>
        constexpr bool holds_alternative(const variant<Types...>&) noexcept;
    
      template<size_t I, class... Types>
        constexpr variant_alternative_t<I, variant<Types...>>& get(variant<Types...>&);
      template<size_t I, class... Types>
        constexpr variant_alternative_t<I, variant<Types...>>&& get(variant<Types...>&&);
      template<size_t I, class... Types>
        constexpr const variant_alternative_t<I, variant<Types...>>&
          get(const variant<Types...>&);
      template<size_t I, class... Types>
        constexpr const variant_alternative_t<I, variant<Types...>>&&
          get(const variant<Types...>&&);
    
      template<class T, class... Types>
        constexpr T& get(variant<Types...>&);
      template<class T, class... Types>
        constexpr T&& get(variant<Types...>&&);
      template<class T, class... Types>
        constexpr const T& get(const variant<Types...>&);
      template<class T, class... Types>
        constexpr const T&& get(const variant<Types...>&&);
    
      template<size_t I, class... Types>
        constexpr add_pointer_t<variant_alternative_t<I, variant<Types...>>>
          get_if(variant<Types...>*) noexcept;
      template<size_t I, class... Types>
        constexpr add_pointer_t<const variant_alternative_t<I, variant<Types...>>>
          get_if(const variant<Types...>*) noexcept;
    
      template<class T, class... Types>
        constexpr add_pointer_t<T>
          get_if(variant<Types...>*) noexcept;
      template<class T, class... Types>
        constexpr add_pointer_t<const T>
          get_if(const variant<Types...>*) noexcept;
    
      // relational operators
      template<class... Types>
        constexpr bool operator==(const variant<Types...>&, const variant<Types...>&);
      template<class... Types>
        constexpr bool operator!=(const variant<Types...>&, const variant<Types...>&);
      template<class... Types>
        constexpr bool operator<(const variant<Types...>&, const variant<Types...>&);
      template<class... Types>
        constexpr bool operator>(const variant<Types...>&, const variant<Types...>&);
      template<class... Types>
        constexpr bool operator<=(const variant<Types...>&, const variant<Types...>&);
      template<class... Types>
        constexpr bool operator>=(const variant<Types...>&, const variant<Types...>&);
      template<class... Types> requires (three_way_comparable<Types> && ...)
        constexpr common_comparison_category_t<compare_three_way_result_t<Types>...>
          operator<=>(const variant<Types...>&, const variant<Types...>&);
    
      // visitation
      template<class Visitor, class... Variants>
        constexpr /* see description */ visit(Visitor&&, Variants&&...);
      template<class R, class Visitor, class... Variants>
        constexpr R visit(Visitor&&, Variants&&...);
    
      // class monostate
      struct monostate;
    
      // monostate relational operators
      constexpr bool operator==(monostate, monostate) noexcept;
      constexpr strong_ordering operator<=>(monostate, monostate) noexcept;
    
      // specialized algorithms
      template<class... Types>
        constexpr void swap(variant<Types...>&,
                            variant<Types...>&) noexcept(/* see description */);
    
      // class bad_variant_access
      class bad_variant_access;
    
      // hash support
      template<class T> struct hash;
      template<class... Types> struct hash<variant<Types...>>;
      template<> struct hash<monostate>;
    }
    
    // obsoleto
    namespace std {
      template<class T> struct variant_size<volatile T>;
      template<class T> struct variant_size<const volatile T>;
    
      template<size_t I, class T> struct variant_alternative<I, volatile T>;
      template<size_t I, class T> struct variant_alternative<I, const volatile T>;
    }
```

#### Modelo de classe [std::variant](<#/doc/utility/variant>)
```cpp
    namespace std {
      template<class... Types>
      class variant {
      public:
        // construtores
        constexpr variant() noexcept(/* see description */);
        constexpr variant(const variant&);
        constexpr variant(variant&&) noexcept(/* see description */);
    
        template<class T>
          constexpr variant(T&&) noexcept(/* see description */);
    
        template<class T, class... Args>
          constexpr explicit variant(in_place_type_t<T>, Args&&...);
        template<class T, class U, class... Args>
          constexpr explicit variant(in_place_type_t<T>, initializer_list<U>, Args&&...);
    
        template<size_t I, class... Args>
          constexpr explicit variant(in_place_index_t<I>, Args&&...);
        template<size_t I, class U, class... Args>
          constexpr explicit variant(in_place_index_t<I>, initializer_list<U>, Args&&...);
    
        // destrutor
        constexpr ~variant();
    
        // atribuição
        constexpr variant& operator=(const variant&);
        constexpr variant& operator=(variant&&) noexcept(/* see description */);
    
        template<class T> constexpr variant& operator=(T&&) noexcept(/* see description */);
    
        // modificadores
        template<class T, class... Args>
          constexpr T& emplace(Args&&...);
        template<class T, class U, class... Args>
          constexpr T& emplace(initializer_list<U>, Args&&...);
        template<size_t I, class... Args>
          constexpr variant_alternative_t<I, variant<Types...>>& emplace(Args&&...);
        template<size_t I, class U, class... Args>
          constexpr variant_alternative_t<I, variant<Types...>>&
            emplace(initializer_list<U>, Args&&...);
    
        // status do valor
        constexpr bool valueless_by_exception() const noexcept;
        constexpr size_t index() const noexcept;
    
        // troca
        constexpr void swap(variant&) noexcept(/* see description */);
      };
    }
```

#### Classe [std::monostate](<#/doc/utility/variant/monostate>)
```cpp
    struct monostate{};
```

#### Classe [std::bad_variant_access](<#/doc/utility/variant/bad_variant_access>)
```cpp
    class bad_variant_access : public exception {
    public:
      // veja [exception] para a especificação das funções membro especiais
      const char* what() const noexcept override;
    };
```