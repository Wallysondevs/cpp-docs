# Cabeçalho da biblioteca padrão &lt;coroutine&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [suporte à linguagem](<#/doc/utility>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para o operador de comparação de três vias

### Classes

[ coroutine_traits](<#/doc/coroutine/coroutine_traits>)(C++20) | tipo trait para descobrir tipos de promise de coroutine
(modelo de classe)
[ coroutine_handle](<#/doc/coroutine/coroutine_handle>)(C++20) | usado para referenciar uma coroutine suspensa ou em execução
(modelo de classe)
[ std::hash<std::coroutine_handle>](<#/doc/coroutine/coroutine_handle/hash>)(C++20) | suporte a hash para [`std::coroutine_handle`](<#/doc/coroutine/coroutine_handle>)
(especialização de modelo de classe)

##### Coroutines No-op

[ noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)(C++20) | usado para coroutines sem efeitos observáveis
(classe)
[ noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>)(C++20) | [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>, destinado a referenciar uma coroutine no-op
(typedef)

##### Awaitables Triviais

[ suspend_never](<#/doc/coroutine/suspend_never>)(C++20) | indica que uma await-expression nunca deve suspender
(classe)
[ suspend_always](<#/doc/coroutine/suspend_always>)(C++20) | indica que uma await-expression sempre deve suspender
(classe)

### Funções

[ operator==operator<=>](<#/doc/coroutine/coroutine_handle/operator_cmp>)(C++20) | compara dois objetos `coroutine_handle`
(função)

##### Coroutines No-op

[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) | cria um coroutine handle que não tem efeitos observáveis quando retomado ou destruído
(função)

### Sinopse
```cpp
    #include <compare>
    
    namespace std {
      // coroutine traits
      template<class R, class... ArgTypes>
        struct coroutine_traits;
    
      // coroutine handle
      template<class Promise = void>
        struct coroutine_handle;
    
      // comparison operators
      constexpr bool operator==(coroutine_handle<> x, coroutine_handle<> y) noexcept;
      constexpr strong_ordering operator<=>(coroutine_handle<> x, 
                                            coroutine_handle<> y) noexcept;
    
      // hash support
      template<class T> struct hash;
      template<class P> struct hash<coroutine_handle<P>>;
    
      // no-op coroutines
      struct noop_coroutine_promise;
    
      template<> struct coroutine_handle<noop_coroutine_promise>;
      using noop_coroutine_handle = coroutine_handle<noop_coroutine_promise>;
    
      noop_coroutine_handle noop_coroutine() noexcept;
    
      // trivial awaitables
      struct suspend_never;
      struct suspend_always;
    }
```

#### Modelo de classe [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)
```cpp
    namespace std {
      template<>
      struct coroutine_handle<void>
      {
        // construct/reset
        constexpr coroutine_handle() noexcept;
        constexpr coroutine_handle(nullptr_t) noexcept;
        coroutine_handle& operator=(nullptr_t) noexcept;
    
        // export/import
        constexpr void* address() const noexcept;
        static constexpr coroutine_handle from_address(void* addr);
    
        // observers
        constexpr explicit operator bool() const noexcept;
        bool done() const;
    
        // resumption
        void operator()() const;
        void resume() const;
        void destroy() const;
    
      private:
        void* ptr;  // exposition only
      };
    
      template<class Promise>
      struct coroutine_handle
      {
        // construct/reset
        constexpr coroutine_handle() noexcept;
        constexpr coroutine_handle(nullptr_t) noexcept;
        static coroutine_handle from_promise(Promise&);
        coroutine_handle& operator=(nullptr_t) noexcept;
    
        // export/import
        constexpr void* address() const noexcept;
        static constexpr coroutine_handle from_address(void* addr);
    
        // conversion
        constexpr operator coroutine_handle<>() const noexcept;
    
        // observers
        constexpr explicit operator bool() const noexcept;
        bool done() const;
    
        // resumption
        void operator()() const;
        void resume() const;
        void destroy() const;
    
        // promise access
        Promise& promise() const;
    
      private:
        void* ptr;  // exposition only 
      };
    }
```

#### Classe [std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)
```cpp
    namespace std {
      struct noop_coroutine_promise {};
    }
```

#### Classe [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>
```cpp
    namespace std {
      template<>
      struct coroutine_handle<noop_coroutine_promise>
      {
        // conversion
        constexpr operator coroutine_handle<>() const noexcept;
    
        // observers
        constexpr explicit operator bool() const noexcept;
        constexpr bool done() const noexcept;
    
        // resumption
        constexpr void operator()() const noexcept;
        constexpr void resume() const noexcept;
        constexpr void destroy() const noexcept;
    
        // promise access
        noop_coroutine_promise& promise() const noexcept;
    
        // address
        constexpr void* address() const noexcept;
      private:
        coroutine_handle(/* unspecified */);
        void* ptr; // exposition only 
      };
    }
```

#### Classe [std::suspend_never](<#/doc/coroutine/suspend_never>)
```cpp
    namespace std {
      struct suspend_never {
        constexpr bool await_ready() const noexcept { return true; }
        constexpr void await_suspend(coroutine_handle<>) const noexcept {}
        constexpr void await_resume() const noexcept {}
      };
    }
```

#### Classe [std::suspend_always](<#/doc/coroutine/suspend_always>)
```cpp
    namespace std {
      struct suspend_always {
        constexpr bool await_ready() const noexcept { return false; }
        constexpr void await_suspend(coroutine_handle<>) const noexcept {}
        constexpr void await_resume() const noexcept {}
      };
    }
```