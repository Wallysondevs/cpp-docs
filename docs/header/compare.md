# Cabeçalho da biblioteca padrão &lt;compare&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [suporte à linguagem](<#/doc/utility>).

### Conceitos

---
[ three_way_comparablethree_way_comparable_with](<#/doc/utility/compare/three_way_comparable>)(C++20) | especifica que o operador <=> produz um resultado consistente em tipos fornecidos
(concept)

### Classes

[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(class)
[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e não é substituível
(class)
[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e é substituível
(class)
[ common_comparison_category](<#/doc/utility/compare/common_comparison_category>)(C++20) | a categoria de comparação mais forte para a qual todos os tipos fornecidos podem ser convertidos
(modelo de classe)
[ compare_three_way_result](<#/doc/utility/compare/compare_three_way_result>)(C++20) | obtém o tipo de resultado do operador de comparação de três vias <=> em tipos fornecidos
(modelo de classe)
[ compare_three_way](<#/doc/utility/compare/compare_three_way>)(C++20) | objeto de função restrito que implementa x <=> y
(class)

### Objetos de ponto de customização

[ strong_order](<#/doc/utility/compare/strong_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`
(objeto de ponto de customização)
[ weak_order](<#/doc/utility/compare/weak_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`
(objeto de ponto de customização)
[ partial_order](<#/doc/utility/compare/partial_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`
(objeto de ponto de customização)
[ compare_strong_order_fallback](<#/doc/utility/compare/compare_strong_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`, mesmo que o operador<=> não esteja disponível
(objeto de ponto de customização)
[ compare_weak_order_fallback](<#/doc/utility/compare/compare_weak_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`, mesmo que o operador<=> não esteja disponível
(objeto de ponto de customização)
[ compare_partial_order_fallback](<#/doc/utility/compare/compare_partial_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`, mesmo que o operador<=> não esteja disponível
(objeto de ponto de customização)

### Funções

[ is_eqis_neqis_ltis_lteqis_gtis_gteq](<#/doc/utility/compare/named_comparison_functions>)(C++20) | funções de comparação nomeadas
(função)

### Sinopse
```cpp
    namespace std {
      // comparison category types
      class partial_ordering;
      class weak_ordering;
      class strong_ordering;
    
      // named comparison functions
      constexpr bool is_eq  (partial_ordering cmp) noexcept { return cmp == 0; }
      constexpr bool is_neq (partial_ordering cmp) noexcept { return cmp != 0; }
      constexpr bool is_lt  (partial_ordering cmp) noexcept { return cmp < 0; }
      constexpr bool is_lteq(partial_ordering cmp) noexcept { return cmp <= 0; }
      constexpr bool is_gt  (partial_ordering cmp) noexcept { return cmp > 0; }
      constexpr bool is_gteq(partial_ordering cmp) noexcept { return cmp >= 0; }
    
      // common comparison category type
      template<class... Ts>
      struct common_comparison_category {
        using type = /* see description */;
      };
      template<class... Ts>
        using common_comparison_category_t = typename common_comparison_category<Ts...>::type;
    
      // concept three_way_comparable
      template<class T, class Cat = partial_ordering>
        concept three_way_comparable = /* see description */;
      template<class T, class U, class Cat = partial_ordering>
        concept three_way_comparable_with = /* see description */;
    
      // result of three-way comparison
      template<class T, class U = T> struct compare_three_way_result;
    
      template<class T, class U = T>
        using compare_three_way_result_t = typename compare_three_way_result<T, U>::type;
    
      // class compare_three_way
      struct compare_three_way;
    
      // comparison algorithms
      inline namespace /* unspecified */ {
        inline constexpr /* unspecified */ strong_order = /* unspecified */;
        inline constexpr /* unspecified */ weak_order = /* unspecified */;
        inline constexpr /* unspecified */ partial_order = /* unspecified */;
        inline constexpr /* unspecified */ compare_strong_order_fallback = /* unspecified */;
        inline constexpr /* unspecified */ compare_weak_order_fallback = /* unspecified */;
        inline constexpr /* unspecified */ compare_partial_order_fallback = /* unspecified */;
      }
    }
```

#### Concept [`three_way_comparable`](<#/doc/utility/compare/three_way_comparable>)
```cpp
    namespace std {
      template<class T, class Cat>
        concept __ComparesAs =                // exposition only
          same_as<common_comparison_category_t<T, Cat>, Cat>;
    
      template<class T, class U>
        concept __PartiallyOrderedWith =      // exposition only
          requires(const remove_reference_t<T>& t, const remove_reference_t<U>& u) {
            { t <  u } -> boolean-testable;
            { t >  u } -> boolean-testable;
            { t <= u } -> boolean-testable;
            { t >= u } -> boolean-testable;
            { u <  t } -> boolean-testable;
            { u >  t } -> boolean-testable;
            { u <= t } -> boolean-testable;
            { u >= t } -> boolean-testable;
          };
    
      template<class T, class Cat = partial_ordering>
        concept three_way_comparable =
          __WeaklyEqualityComparableWith<T, T> &&
          __PartiallyOrderedWith<T, T> &&
          requires(const remove_reference_t<T>& a, const remove_reference_t<T>& b) {
            { a <=> b } -> __ComparesAs<Cat>;
          };
    }
```

#### Concept [`three_way_comparable_with`](<#/doc/utility/compare/three_way_comparable>)
```cpp
    namespace std {
      template<class T, class U, class Cat = partial_ordering>
        concept three_way_comparable_with =
          __WeaklyEqualityComparableWith<T, U> &&
          __PartiallyOrderedWith<T, U> &&
          three_way_comparable<T, Cat> &&
          three_way_comparable<U, Cat> &&
          common_reference_with<const remove_reference_t<T>&, const remove_reference_t<U>&> &&
          three_way_comparable<
            common_reference_t<
              const remove_reference_t<T>&, const remove_reference_t<U>&>, Cat> &&
          requires(const remove_reference_t<T>& t, const remove_reference_t<U>& u) {
            { t <=> u } -> __ComparesAs<Cat>;
            { u <=> t } -> __ComparesAs<Cat>;
          };
    }
```

#### Classe [std::partial_ordering](<#/doc/utility/compare/partial_ordering>)
```cpp
    namespace std {
      class partial_ordering {
        int value;          // exposition only
        bool is_ordered;    // exposition only
    
        // exposition-only constructors
        constexpr explicit
          partial_ordering(eq v) noexcept :
            value(int(v)), is_ordered(true) {}      // exposition only
        constexpr explicit
          partial_ordering(ord v) noexcept :
            value(int(v)), is_ordered(true) {}     // exposition only
        constexpr explicit
          partial_ordering(ncmp v) noexcept :
            value(int(v)), is_ordered(false) {}   // exposition only
    
      public:
        // valid values
        static const partial_ordering less;
        static const partial_ordering equivalent;
        static const partial_ordering greater;
        static const partial_ordering unordered;
    
        // comparisons
        friend constexpr bool operator==(partial_ordering v, /* unspecified */) noexcept;
        friend constexpr bool
          operator==(partial_ordering v, partial_ordering w) noexcept = default;
        friend constexpr bool operator< (partial_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator> (partial_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator<=(partial_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator>=(partial_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator< (/* unspecified */, partial_ordering v) noexcept;
        friend constexpr bool operator> (/* unspecified */, partial_ordering v) noexcept;
        friend constexpr bool operator<=(/* unspecified */, partial_ordering v) noexcept;
        friend constexpr bool operator>=(/* unspecified */, partial_ordering v) noexcept;
        friend constexpr partial_ordering
          operator<=>(partial_ordering v, /* unspecified */) noexcept;
        friend constexpr partial_ordering
          operator<=>(/* unspecified */, partial_ordering v) noexcept;
      };
    
      // valid values' definitions
      inline constexpr partial_ordering partial_ordering::less(ord::less);
      inline constexpr partial_ordering partial_ordering::equivalent(eq::equivalent);
      inline constexpr partial_ordering partial_ordering::greater(ord::greater);
      inline constexpr partial_ordering partial_ordering::unordered(ncmp::unordered);
    }
```

#### Classe [std::weak_ordering](<#/doc/utility/compare/weak_ordering>)
```cpp
    namespace std {
      class weak_ordering {
        int value;  // exposition only
    
        // exposition-only constructors
        constexpr explicit weak_ordering(eq v) noexcept : value(int(v)) {}  // exposition only
        constexpr explicit weak_ordering(ord v) noexcept : value(int(v)) {} // exposition only
    
      public:
        // valid values
        static const weak_ordering less;
        static const weak_ordering equivalent;
        static const weak_ordering greater;
    
        // conversions
        constexpr operator partial_ordering() const noexcept;
    
        // comparisons
        friend constexpr bool operator==(weak_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator==(weak_ordering v, weak_ordering w) noexcept = default;
        friend constexpr bool operator< (weak_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator> (weak_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator<=(weak_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator>=(weak_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator< (/* unspecified */, weak_ordering v) noexcept;
        friend constexpr bool operator> (/* unspecified */, weak_ordering v) noexcept;
        friend constexpr bool operator<=(/* unspecified */, weak_ordering v) noexcept;
        friend constexpr bool operator>=(/* unspecified */, weak_ordering v) noexcept;
        friend constexpr weak_ordering
          operator<=>(weak_ordering v, /* unspecified */) noexcept;
        friend constexpr weak_ordering
          operator<=>(/* unspecified */, weak_ordering v) noexcept;
      };
    
      // valid values' definitions
      inline constexpr weak_ordering weak_ordering::less(ord::less);
      inline constexpr weak_ordering weak_ordering::equivalent(eq::equivalent);
      inline constexpr weak_ordering weak_ordering::greater(ord::greater);
    }
```

#### Classe [std::strong_ordering](<#/doc/utility/compare/strong_ordering>)
```cpp
    namespace std {
      class strong_ordering {
        int value;  // exposition only
    
        // exposition-only constructors
        constexpr explicit strong_ordering(eq v) noexcept :
          value(int(v)) {}    // exposition only
        constexpr explicit strong_ordering(ord v) noexcept :
          value(int(v)) {}   // exposition only
    
      public:
        // valid values
        static const strong_ordering less;
        static const strong_ordering equal;
        static const strong_ordering equivalent;
        static const strong_ordering greater;
    
        // conversions
        constexpr operator partial_ordering() const noexcept;
        constexpr operator weak_ordering() const noexcept;
    
        // comparisons
        friend constexpr bool operator==(strong_ordering v, /* unspecified */) noexcept;
        friend constexpr bool
          operator==(strong_ordering v, strong_ordering w) noexcept = default;
        friend constexpr bool operator< (strong_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator> (strong_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator<=(strong_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator>=(strong_ordering v, /* unspecified */) noexcept;
        friend constexpr bool operator< (/* unspecified */, strong_ordering v) noexcept;
        friend constexpr bool operator> (/* unspecified */, strong_ordering v) noexcept;
        friend constexpr bool operator<=(/* unspecified */, strong_ordering v) noexcept;
        friend constexpr bool operator>=(/* unspecified */, strong_ordering v) noexcept;
        friend constexpr strong_ordering
          operator<=>(strong_ordering v, /* unspecified */) noexcept;
        friend constexpr strong_ordering
        operator<=>(/* unspecified */, strong_ordering v) noexcept;
      };
    
      // valid values' definitions
      inline constexpr strong_ordering strong_ordering::less(ord::less);
      inline constexpr strong_ordering strong_ordering::equal(eq::equal);
      inline constexpr strong_ordering strong_ordering::equivalent(eq::equivalent);
      inline constexpr strong_ordering strong_ordering::greater(ord::greater);
    }
```

#### Classe [std::compare_three_way](<#/doc/utility/compare/compare_three_way>)
```cpp
    namespace std {
      struct compare_three_way {
        template<class T, class U>
        constexpr auto operator()(T&& t, U&& u) const;
    
        using is_transparent = /* unspecified */;
      };
    }
```

### Ver também

[**operador de comparação de três vias**](<#/doc/language/operator_comparison>) expressão _lhs_ `< =>` _rhs_ (C++20)
---