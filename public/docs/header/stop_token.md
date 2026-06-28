# Cabeçalho da biblioteca padrão &lt;stop_token&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

---
[ stop_token](<#/doc/thread/stop_token>)(C++20) | uma interface para consultar se uma solicitação de cancelamento de [std::jthread](<#/doc/thread/jthread>) foi feita
(classe)
[ stop_source](<#/doc/thread/stop_source>)(C++20) | classe que representa uma solicitação para parar uma ou mais [std::jthread](<#/doc/thread/jthread>)s
(classe)
[ stop_callback](<#/doc/thread/stop_callback>)(C++20) | uma interface para registrar callbacks no cancelamento de [std::jthread](<#/doc/thread/jthread>)
(modelo de classe)
[ never_stop_token](<#/doc/thread/never_stop_token>)(C++26) | fornece uma interface de stop token onde uma parada nunca é possível nem solicitada
(classe)
[ inplace_stop_token](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/inplace_stop_token&action=edit&redlink=1> "cpp/thread/inplace stop token \(page does not exist\)")(C++26) | um stop token que referencia o estado de parada de seu objeto `std::inplace_stop_source` associado
(classe)
[ inplace_stop_source](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/inplace_stop_source&action=edit&redlink=1> "cpp/thread/inplace stop source \(page does not exist\)")(C++26) | um `_stoppable-source_` que é o único proprietário do estado de parada
(classe)
[ inplace_stop_callback](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/inplace_stop_callback&action=edit&redlink=1> "cpp/thread/inplace stop callback \(page does not exist\)")(C++26) | um stop callback para `std::inplace_stop_token`
(modelo de classe)

### Modelos de alias

[ stop_callback_for_t](<#/doc/thread/stop_callback_for_t>)(C++26) | obtém o tipo de callback para um dado tipo de stop token
(modelo de alias)

### Conceitos

[ stoppable_token](<#/doc/thread/stoppable_token>)(C++26) | especifica a interface básica de stop tokens que permite consultas por solicitações de parada e se a solicitação de parada é possível
(conceito)
[ unstoppable_token](<#/doc/thread/unstoppable_token>)(C++26) | especifica um stop token que não permite parar
(conceito)

### Tags

[ nostopstatenostopstate_t](<#/doc/thread/stop_source/nostopstate_t>)(C++20) | uma tag usada para `stop_source` para indicar nenhum stop-state associado na construção
(tag)

### Sinopse
```cpp
    namespace std {
      // stop token concepts
      template<class CallbackFn, class Token, class Init = CallbackFn>
        concept /*stoppable-callback-for*/ = /* see description */; // exposition only
    
      template<class Token>
        concept stoppable_token = /* see description */;
    
      template<class Token>
        concept unstoppable_token = /* see description */;
    
      template<class Source>
        concept /*stoppable-source*/ = /* see description */; // exposition only
    
      // class stop_token
      class stop_token;
    
      // class stop_source
      class stop_source;
    
      // no-shared-stop-state indicator
      struct nostopstate_t {
        explicit nostopstate_t() = default;
      };
      inline constexpr nostopstate_t nostopstate{};
    
      // class template stop_callback
      template<class Callback>
      class stop_callback;
    
      // class never_stop_token
      class never_stop_token;
    
      // class inplace_stop_token
      class inplace_stop_token;
    
      // class inplace_stop_source
      class inplace_stop_source;
    
      // class template inplace_stop_callback
      template<class CallbackFn>
        class inplace_stop_callback;
    
      template<class T, class CallbackFn>
        using stop_callback_for_t = T::template callback_type<CallbackFn>;
    }
```

#### Conceitos de stop token
```cpp
    namespace std {
      template<class CallbackFn, class Token, class Init = CallbackFn>
        concept /*stoppable-callback-for*/ =                         // exposition only
          invocable<CallbackFn> &&
          constructible_from<CallbackFn, Init> &&
          requires { typename stop_callback_for_t<Token, CallbackFn>; } &&
          constructible_from<stop_callback_for_t<Token, CallbackFn>, const Token&, Init>;
    
      template<template<class> class>
        struct /*check-type-alias-exists*/;                          // exposition only
    
      template<class Token>
        concept stoppable_token = 
          requires (const Token tok) {
            typename /*check-type-alias-exists*/<Token::template callback_type>;
            { tok.stop_requested() } noexcept -> same_as<bool>;
            { tok.stop_possible() } noexcept -> same_as<bool>;
            { Token(tok) } noexcept; // see implicit expression variations
          } &&
          copyable<Token> &&
          equality_comparable<Token>;
    
      template<class Token>
        concept unstoppable_token = 
          stoppable_token<Token> &&
          requires (const Token tok) {
            requires bool_constant<(!tok.stop_possible())>::value;
          };
    
      template<class Source>
        concept /*stoppable-source*/ =                               // exposition only
          requires (Source& src, const Source csrc) {
            { csrc.get_token() } -> stoppable_token;
            { csrc.stop_possible() } noexcept -> same_as<bool>;
            { csrc.stop_requested() } noexcept -> same_as<bool>;
            { src.request_stop() } -> same_as<bool>;
          };
    }
```

#### Classe [std::stop_token](<#/doc/thread/stop_token>)
```cpp
    namespace std {
      class stop_token {
      public:
        template<class CallbackFn>
          using callback_type = stop_callback<CallbackFn>;
    
        // constructors, copy, and assignment
        stop_token() noexcept = default;
    
        // member functions
        void swap(stop_token&) noexcept;
    
        // stop handling
        bool stop_requested() const noexcept;
        bool stop_possible() const noexcept;
    
        friend bool operator==(const stop_token& lhs, const stop_token& rhs) noexcept;
        friend void swap(stop_token& lhs, stop_token& rhs) noexcept;
    
      private:
        shared_ptr</*unspecified*/> stop_state_; // exposition only
      };
    }
```

#### Classe [std::stop_source](<#/doc/thread/stop_source>)
```cpp
    namespace std {
      class stop_source {
      public:
        // constructors, copy, and assignment
        stop_source();
        explicit stop_source(nostopstate_t) noexcept {}
    
        // member functions
        void swap(stop_source&) noexcept;
    
        // stop handling
        stop_token get_token() const noexcept;
        bool stop_possible() const noexcept;
        bool stop_requested() const noexcept;
        bool request_stop() noexcept;
    
        friend bool
        operator==(const stop_source& lhs, const stop_source& rhs) noexcept;
        friend void swap(stop_source& lhs, stop_source& rhs) noexcept;
    
      private:
        shared_ptr</*unspecified*/> stop_state_; // exposition only
      };
    }
```

#### Modelo de classe [std::stop_callback](<#/doc/thread/stop_callback>)
```cpp
    namespace std {
      template<class CallbackFn>
      class stop_callback {
      public:
        using callback_type = CallbackFn;
    
        // constructors and destructor
        template<class Init>
        explicit stop_callback(const stop_token& st, Init&& init)
            noexcept(is_nothrow_constructible_v<CallbackFn, Init>);
        template<class Init>
        explicit stop_callback(stop_token&& st, Init&& init)
            noexcept(is_nothrow_constructible_v<CallbackFn, Init>);
        ~stop_callback();
    
        stop_callback(const stop_callback&) = delete;
        stop_callback(stop_callback&&) = delete;
        stop_callback& operator=(const stop_callback&) = delete;
        stop_callback& operator=(stop_callback&&) = delete;
    
      private:
        CallbackFn callback_fn_;      // exposition only
      };
    
      template<class CallbackFn>
      stop_callback(stop_token, CallbackFn) -> stop_callback<CallbackFn>;
    }
```

#### Modelo de classe std::never_stop_token
```cpp
    namespace std {
      class never_stop_token {
        struct /*callback-type*/ {       // exposition only
          explicit /*callback-type*/(never_stop_token, auto&&) noexcept {}
        };
    
      public:
        template<class>
          using callback_type = /*callback-type*/;
    
        static constexpr bool stop_requested() noexcept { return false; }
        static constexpr bool stop_posible() noexcept { return false; }
    
        bool operator==(const never_stop_token&) const = default;
      };
    }
```

#### Modelo de classe std::inplace_stop_token
```cpp
    namespace std {
      class inplace_stop_token {
      public:
        template<class CallbackFn>
          using callback_type = inplace_stop_callback<CallbackFn>;
    
        inplace_stop_token() = default;
        bool operator==(const inplace_stop_token&) const = default;
    
        // member functions
        bool stop_requested() const noexcept;
        bool stop_possible() const noexcept;
        void swap(inplace_stop_token&) noexcept;
    
      private:
        const inplace_stop_source* stop_source_ = nullptr; // exposition only
      };
    }
```

#### Modelo de classe std::inplace_stop_source
```cpp
    namespace std {
      class inplace_stop_source {
        // constructors, assignments, and destructor
        constexpr inplace_stop_source() noexcept;
    
        inplace_stop_source(inplace_stop_source&&) = delete;
        inplace_stop_source(const inplace_stop_source&) = delete;
        inplace_stop_source& operator=(inplace_stop_source&&) = delete;
        inplace_stop_source& operator=(const inplace_stop_source&) = delete;
        ~inplace_stop_source();
    
        // stop handling
        constexpr inplace_stop_token get_token() const noexcept;
        static constexpr bool stop_possible() noexcept { return true; }
        bool stop_requested() const noexcept;
        bool request_stop() noexcept;
      };
    }
```

#### Modelo de classe std::inplace_stop_callback
```cpp
    namespace std {
      template<class CallbackFn>
      class inplace_stop_callback {
      public:
        using callback_type = CallbackFn;
    
        // constructors and destructor
        template<class Init>
        explicit inplace_stop_callback(inplace_stop_token st, Init&& init)
            noexcept(is_nothrow_constructible_v<CallbackFn, Init>);
        ~inplace_stop_callback();
    
        inplace_stop_callback(const inplace_stop_callback&) = delete;
        inplace_stop_callback(inplace_stop_callback&&) = delete;
        inplace_stop_callback& operator=(const inplace_stop_callback&) = delete;
        inplace_stop_callback& operator=(inplace_stop_callback&&) = delete;
    
      private:
        CallbackFn callback_fn_;      // exposition only
      };
    
      template<class CallbackFn>
      inplace_stop_callback(inplace_stop_token, CallbackFn) 
        -> inplace_stop_callback<CallbackFn>;
    }
```