# Cabeçalho da biblioteca padrão &lt;optional&gt; (C++17)

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Classes

[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(modelo de classe)
[ bad_optional_access](<#/doc/utility/optional/bad_optional_access>)(C++17) | exceção indicando acesso verificado a um optional que não contém um valor
(classe)
[ std::hash<std::optional>](<#/doc/utility/optional/hash>)(C++17) | suporte a hash para [`std::optional`](<#/doc/utility/optional>)
(especialização de modelo de classe)
[ nullopt_t](<#/doc/utility/optional/nullopt_t>)(C++17) | indicador de um `std::optional` que não contém um valor
(classe)

##### Declarações antecipadas

Definido no cabeçalho [`<functional>`](<#/doc/header/functional>)

```cpp
 hash(C++11)
(modelo de classe)
```

### Constantes

[ nullopt](<#/doc/utility/optional/nullopt>)(C++17) | um objeto do tipo `nullopt_t`
(constante)

### Funções

##### Comparação

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/optional/operator_cmp>)(C++17)(C++17)(C++17)(C++17)(C++17)(C++17)(C++20) | compara objetos `optional`
(modelo de função)

##### Algoritmos especializados

[ std::swap(std::optional)](<#/doc/utility/optional/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ make_optional](<#/doc/utility/optional/make_optional>)(C++17) | cria um objeto `optional`
(modelo de função)

### Sinopse
```cpp
    #include <compare>
     
    namespace std {
      // modelo de classe optional
      template<class T>
        class optional;
     
      template<class T>
        constexpr bool ranges::enable_view<optional<T>> = true;
      template<class T>
        constexpr auto format_kind<optional<T>> = range_format::disabled;
     
      template<class T>
        concept /*is-derived-from-optional*/ = requires(const T& t) { // apenas para exposição
          []<class U>(const optional<U>&){ }(t);
        };
     
      // indicador de estado sem valor
      struct nullopt_t{/* veja a descrição */};
      inline constexpr nullopt_t nullopt(/* não especificado */);
     
      // classe bad_optional_access
      class bad_optional_access;
     
      // operadores relacionais
      template<class T, class U>
        constexpr bool operator==(const optional<T>&, const optional<U>&);
      template<class T, class U>
        constexpr bool operator!=(const optional<T>&, const optional<U>&);
      template<class T, class U>
        constexpr bool operator<(const optional<T>&, const optional<U>&);
      template<class T, class U>
        constexpr bool operator>(const optional<T>&, const optional<U>&);
      template<class T, class U>
        constexpr bool operator<=(const optional<T>&, const optional<U>&);
      template<class T, class U>
        constexpr bool operator>=(const optional<T>&, const optional<U>&);
      template<class T, three_way_comparable_with<T> U>
        constexpr compare_three_way_result_t<T,U>
          operator<=>(const optional<T>&, const optional<U>&);
     
      // comparação com nullopt
      template<class T> constexpr bool operator==(const optional<T>&, nullopt_t) noexcept;
      template<class T>
        constexpr strong_ordering operator<=>(const optional<T>&, nullopt_t) noexcept;
     
      // comparação com T
      template<class T, class U> constexpr bool operator==(const optional<T>&, const U&);
      template<class T, class U> constexpr bool operator==(const T&, const optional<U>&);
      template<class T, class U> constexpr bool operator!=(const optional<T>&, const U&);
      template<class T, class U> constexpr bool operator!=(const T&, const optional<U>&);
      template<class T, class U> constexpr bool operator<(const optional<T>&, const U&);
      template<class T, class U> constexpr bool operator<(const T&, const optional<U>&);
      template<class T, class U> constexpr bool operator>(const optional<T>&, const U&);
      template<class T, class U> constexpr bool operator>(const T&, const optional<U>&);
      template<class T, class U> constexpr bool operator<=(const optional<T>&, const U&);
      template<class T, class U> constexpr bool operator<=(const T&, const optional<U>&);
      template<class T, class U> constexpr bool operator>=(const optional<T>&, const U&);
      template<class T, class U> constexpr bool operator>=(const T&, const optional<U>&);
      template<class T, class U>
          requires (!/*is-derived-from-optional*/<U>) && three_way_comparable_with<T, U>
        constexpr compare_three_way_result_t<T, U>
          operator<=>(const optional<T>&, const U&);
     
      // algoritmos especializados
      template<class T>
        constexpr void swap(optional<T>&, optional<T>&) noexcept(/* veja a descrição */);
     
      template<class T>
        constexpr optional<decay_t<T>> make_optional(T&&);
      template<class T, class... Args>
        constexpr optional<T> make_optional(Args&&... args);
      template<class T, class U, class... Args>
        constexpr optional<T> make_optional(initializer_list<U> il, Args&&... args);
     
      // suporte a hash
      template<class T> struct hash;
      template<class T> struct hash<optional<T>>;
    }
```

#### Modelo de classe [std::optional](<#/doc/utility/optional>)
```cpp
    namespace std {
      template<class T>
      class optional {
      public:
        using value_type     = T;
        using iterator       = /* implementação-definida */;
        using const_iterator = /* implementação-definida */;  
     
        // construtores
        constexpr optional() noexcept;
        constexpr optional(nullopt_t) noexcept;
        constexpr optional(const optional&);
        constexpr optional(optional&&) noexcept(/* veja a descrição */);
        template<class... Args>
          constexpr explicit optional(in_place_t, Args&&...);
        template<class U, class... Args>
          constexpr explicit optional(in_place_t, initializer_list<U>, Args&&...);
        template<class U = T>
          constexpr explicit(/* veja a descrição */) optional(U&&);
        template<class U>
          constexpr explicit(/* veja a descrição */) optional(const optional<U>&);
        template<class U>
          constexpr explicit(/* veja a descrição */) optional(optional<U>&&);
     
        // destrutor
        constexpr ~optional();
     
        // atribuição
        constexpr optional& operator=(nullopt_t) noexcept;
        constexpr optional& operator=(const optional&);
        constexpr optional& operator=(optional&&) noexcept(/* veja a descrição */);
        template<class U = T> constexpr optional& operator=(U&&);
        template<class U> constexpr optional& operator=(const optional<U>&);
        template<class U> constexpr optional& operator=(optional<U>&&);
        template<class... Args> constexpr T& emplace(Args&&...);
        template<class U, class... Args> constexpr T& emplace(initializer_list<U>, Args&&...);
     
        // troca
        constexpr void swap(optional&) noexcept(/* veja a descrição */);
     
        // suporte a iteradores
        constexpr iterator begin() noexcept;
        constexpr const_iterator begin() const noexcept;
        constexpr iterator end() noexcept;
        constexpr const_iterator end() const noexcept;
     
        // observadores
        constexpr const T* operator->() const noexcept;
        constexpr T* operator->() noexcept;
        constexpr const T& operator*() const& noexcept;
        constexpr T& operator*() & noexcept;
        constexpr T&& operator*() && noexcept;
        constexpr const T&& operator*() const&& noexcept;
        constexpr explicit operator bool() const noexcept;
        constexpr bool has_value() const noexcept;
        constexpr const T& value() const&;
        constexpr T& value() &;
        constexpr T&& value() &&;
        constexpr const T&& value() const&&;
        template<class U> constexpr T value_or(U&&) const&;
        template<class U> constexpr T value_or(U&&) &&;
     
        // operações monádicas
        template <class F> constexpr auto and_then(F&& f) &;
        template <class F> constexpr auto and_then(F&& f) &&;
        template <class F> constexpr auto and_then(F&& f) const&;
        template <class F> constexpr auto and_then(F&& f) const&&;
        template <class F> constexpr auto transform(F&& f) &;
        template <class F> constexpr auto transform(F&& f) &&;
        template <class F> constexpr auto transform(F&& f) const&;
        template <class F> constexpr auto transform(F&& f) const&&;
        template <class F> constexpr optional or_else(F&& f) &&;
        template <class F> constexpr optional or_else(F&& f) const&;
     
        // modificadores
        constexpr void reset() noexcept;
     
      private:
        T *val;         // apenas para exposição
      };
     
      template<class T>
        optional(T) -> optional<T>;
    }
```