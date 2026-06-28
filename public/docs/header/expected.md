# Cabeçalho da biblioteca padrão &lt;expected&gt; (C++23)

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Classes

---
[ expected](<#/doc/utility/expected>)(C++23) | um wrapper que contém um valor esperado ou de erro
(class template)
[ unexpected](<#/doc/utility/expected/unexpected>)(C++23) | representado como um valor inesperado
(class template)
[ bad_expected_access](<#/doc/utility/expected/bad_expected_access>)(C++23) | exceção indicando acesso verificado a um `expected` que contém um valor inesperado
(class template)
[ unexpectunexpect_t](<#/doc/utility/expected/unexpect_t>)(C++23) | tag de construção in-place para valor inesperado em `expected`
(tag)

### Sinopse
```cpp
    namespace std {
      // class template unexpected
      template<class E> class unexpected;
    
      // class template bad_expected_access
      template<class E> class bad_expected_access;
    
      // specialization of bad_expected_access for void
      template<> class bad_expected_access<void>;
    
      // in-place construction of unexpected values
      struct unexpect_t {
        explicit unexpect_t() = default;
      };
      inline constexpr unexpect_t unexpect{};
    
      // class template expected
      template<class T, class E> class expected;
    
      // partial specialization of expected for void types
      template<class T, class E> requires is_void_v<T> class expected<T, E>;
    }
```

#### Modelo de classe std::unexpected
```cpp
    namespace std {
      template<class E>
      class unexpected {
      public:
        // construtores
        constexpr unexpected(const unexpected&) = default;
        constexpr unexpected(unexpected&&) = default;
        template<class... Args>
          constexpr explicit unexpected(in_place_t, Args&&...);
        template<class U, class... Args>
          constexpr explicit unexpected(in_place_t, initializer_list<U>, Args&&...);
        template<class Err = E>
          constexpr explicit unexpected(Err&&);
    
        // atribuição
        constexpr unexpected& operator=(const unexpected&) = default;
        constexpr unexpected& operator=(unexpected&&) = default;
    
        // observador
        constexpr const E& error() const& noexcept;
        constexpr E& error() & noexcept;
        constexpr const E&& error() const&& noexcept;
        constexpr E&& error() && noexcept;
    
        // troca
        constexpr void swap(unexpected& other) noexcept(/* see description */);
    
        friend constexpr void swap(unexpected& x, unexpected& y) noexcept(noexcept(x.swap(y)));
    
        // operador de igualdade
        template<class E2>
          friend constexpr bool operator==(const unexpected&, const unexpected<E2>&);
    
      private:
        E unex;    // apenas para exposição
      };
    
      template<class E> 
        unexpected(E) -> unexpected<E>;
    }
```

#### Modelo de classe std::bad_expected_access
```cpp
    namespace std {
      template<class E>
      class bad_expected_access : public bad_expected_access<void> {
      public:
    
        // construtor explícito
        explicit bad_expected_access(E);
    
        // observadores
        const char* what() const noexcept override;
        E& error() & noexcept;
        const E& error() const& noexcept;
        E&& error() && noexcept;
        const E&&  error() const&& noexcept;
    
      private:
        E unex;              // apenas para exposição
      };
    }
```

#### Especialização de modelo de classe std::bad_expected_access&lt;void&gt;
```cpp
    namespace std {
      template<>
      class bad_expected_access<void> : public exception {
      protected:
        // construtores
        bad_expected_access() noexcept;
        bad_expected_access(const bad_expected_access&);
        bad_expected_access(bad_expected_access&&);
        bad_expected_access& operator=(const bad_expected_access&);
        bad_expected_access& operator=(bad_expected_access&&);
    
        ~bad_expected_access();
    
      public:
        const char* what() const noexcept override;
      };
    }
```

#### Modelo de classe std::expected
```cpp
    namespace std {
      template<class T, class E>
      class expected {
      public:
        using value_type = T;
        using error_type = E;
        using unexpected_type = unexpected<E>;
    
        template<class U>
        using rebind = expected<U, error_type>;
    
        // construtores
        constexpr expected();
        constexpr explicit(/* see description */) 
          expected(const expected&);
        constexpr explicit(/* see description */) 
          expected(expected&&) noexcept(/* see description */);
        template<class U, class G>
          constexpr explicit(/* see description */) expected(const expected<U, G>&);
        template<class U, class G>
          constexpr explicit(/* see description */) expected(expected<U, G>&&);
    
        template<class U = T>
          constexpr explicit(/* see description */) expected(U&& v);
    
        template<class G>
          constexpr expected(const unexpected<G>&);
        template<class G>
          constexpr expected(unexpected<G>&&);
    
        template<class... Args>
          constexpr explicit expected(in_place_t, Args&&...);
        template<class U, class... Args>
          constexpr explicit expected(in_place_t, initializer_list<U>, Args&&...);
        template<class... Args>
          constexpr explicit expected(unexpect_t, Args&&...);
        template<class U, class... Args>
          constexpr explicit expected(unexpect_t, initializer_list<U>, Args&&...);
    
        // destrutor
        constexpr ~expected();
    
        // atribuição
        constexpr expected& operator=(const expected&);
        constexpr expected& operator=(expected&&) noexcept(/* see description */);
        template<class U = T> constexpr expected& operator=(U&&);
        template<class G>
          constexpr expected& operator=(const unexpected<G>&);
        template<class G>
          constexpr expected& operator=(unexpected<G>&&);
    
        template<class... Args>
          constexpr T& emplace(Args&&...) noexcept;
        template<class U, class... Args>
          constexpr T& emplace(initializer_list<U>, Args&&...) noexcept;
    
        // troca
        constexpr void swap(expected&) noexcept(/* see description */);
        friend constexpr void swap(expected&, expected&) noexcept(/* see description */);
    
        // observadores
        constexpr const T* operator->() const noexcept;
        constexpr T* operator->() noexcept;
        constexpr const T& operator*() const& noexcept;
        constexpr T& operator*() & noexcept;
        constexpr const T&& operator*() const&& noexcept;
        constexpr T&& operator*() && noexcept;
        constexpr explicit operator bool() const noexcept;
        constexpr bool has_value() const noexcept;
        constexpr const T& value() const&;
        constexpr T& value() &;
        constexpr const T&& value() const&&;
        constexpr T&& value() &&;
        constexpr const E& error() const&;
        constexpr E& error() &;
        constexpr const E&& error() const&&;
        constexpr E&& error() &&;
        template<class U> constexpr T value_or(U&&) const&;
        template<class U> constexpr T value_or(U&&) &&;
        template<class G = E> constexpr E error_or(G&&) const &;
        template<class G = E> constexpr E error_or(G&&) &&;
    
        // operações monádicas
        template<class F> constexpr auto and_then(F&& f) &;
        template<class F> constexpr auto and_then(F&& f) &&;
        template<class F> constexpr auto and_then(F&& f) const &;
        template<class F> constexpr auto and_then(F&& f) const &&;
        template<class F> constexpr auto or_else(F&& f) &;
        template<class F> constexpr auto or_else(F&& f) &&;
        template<class F> constexpr auto or_else(F&& f) const &;
        template<class F> constexpr auto or_else(F&& f) const &&;
        template<class F> constexpr auto transform(F&& f) &;
        template<class F> constexpr auto transform(F&& f) &&;
        template<class F> constexpr auto transform(F&& f) const &;
        template<class F> constexpr auto transform(F&& f) const &&;
        template<class F> constexpr auto transform_error(F&& f) &;
        template<class F> constexpr auto transform_error(F&& f) &&;
        template<class F> constexpr auto transform_error(F&& f) const &;
        template<class F> constexpr auto transform_error(F&& f) const &&;
    
        // operadores de igualdade
        template<class T2, class E2> requires (!is_void_v<T2>)
          friend constexpr bool operator==(const expected& x, const expected<T2, E2>& y);
        template<class T2>
          friend constexpr bool operator==(const expected&, const T2&);
        template<class E2>
          friend constexpr bool operator==(const expected&, const unexpected<E2>&);
    
      private:
        bool has_val;       // apenas para exposição
        union {
          T val;            // apenas para exposição
          E unex;           // apenas para exposição
        };
      };
    }
```

#### Especialização parcial de std::expected para tipos void
```cpp
    namespace std {
      template<class T, class E> requires is_void_v<T>
      class expected<T, E> {
      public:
        using value_type = T;
        using error_type = E;
        using unexpected_type = unexpected<E>;
    
        template<class U>
        using rebind = expected<U, error_type>;
    
        // construtores
        constexpr expected() noexcept;
        constexpr explicit(/* see description */)
          expected(const expected&);
        constexpr explicit(/* see description */)
          expected(expected&&) noexcept(/* see description */);
        template<class U, class G>
          constexpr explicit(/* see description */) expected(const expected<U, G>&);
        template<class U, class G>
          constexpr explicit(/* see description */) expected(expected<U, G>&&);
    
        template<class G>
          constexpr expected(const unexpected<G>&);
        template<class G>
          constexpr expected(unexpected<G>&&);
    
        constexpr explicit expected(in_place_t) noexcept;
        template<class... Args>
          constexpr explicit expected(unexpect_t, Args&&...);
        template<class U, class... Args>
          constexpr explicit expected(unexpect_t, initializer_list<U>, Args&&...);
    
        // destrutor
        constexpr ~expected();
    
        // atribuição
        constexpr expected& operator=(const expected&);
        constexpr expected& operator=(expected&&) noexcept(/* see description */);
        template<class G>
          constexpr expected& operator=(const unexpected<G>&);
        template<class G>
          constexpr expected& operator=(unexpected<G>&&);
        constexpr void emplace() noexcept;
    
        // troca
        constexpr void swap(expected&) noexcept(/* see description */);
        friend constexpr void swap(expected&, expected&) noexcept(/* see description */);
    
        // observadores
        constexpr explicit operator bool() const noexcept;
        constexpr bool has_value() const noexcept;
        constexpr void operator*() const noexcept;
        constexpr void value() const&;
        constexpr void value() &&;
        constexpr const E& error() const&;
        constexpr E& error() &;
        constexpr const E&& error() const&&;
        constexpr E&& error() &&;
        template<class G = E> constexpr E error_or(G&&) const &;
        template<class G = E> constexpr E error_or(G&&) &&;
    
        // operações monádicas
        template<class F> constexpr auto and_then(F&& f) &;
        template<class F> constexpr auto and_then(F&& f) &&;
        template<class F> constexpr auto and_then(F&& f) const &;
        template<class F> constexpr auto and_then(F&& f) const &&;
        template<class F> constexpr auto or_else(F&& f) &;
        template<class F> constexpr auto or_else(F&& f) &&;
        template<class F> constexpr auto or_else(F&& f) const &;
        template<class F> constexpr auto or_else(F&& f) const &&;
        template<class F> constexpr auto transform(F&& f) &;
        template<class F> constexpr auto transform(F&& f) &&;
        template<class F> constexpr auto transform(F&& f) const &;
        template<class F> constexpr auto transform(F&& f) const &&;
        template<class F> constexpr auto transform_error(F&& f) &;
        template<class F> constexpr auto transform_error(F&& f) &&;
        template<class F> constexpr auto transform_error(F&& f) const &;
        template<class F> constexpr auto transform_error(F&& f) const &&;
    
        // operadores de igualdade
        template<class T2, class E2> requires is_void_v<T2>
          friend constexpr bool operator==(const expected& x, const expected<T2, E2>& y);
        template<class E2>
          friend constexpr bool operator==(const expected&, const unexpected<E2>&);
    
      private:
        bool has_val;        // apenas para exposição
        union {
          E unex;            // apenas para exposição
        };
      };
    }
```