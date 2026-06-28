# Cabeçalho da biblioteca padrão &lt;any&gt; (C++17)

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Classes

---
[ any](<#/doc/utility/any>)(C++17) | objetos que armazenam instâncias de qualquer tipo [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(classe)
[ bad_any_cast](<#/doc/utility/any/bad_any_cast>)(C++17) | exceção lançada pelas formas de `any_cast` que retornam valor em caso de incompatibilidade de tipo
(classe)

### Funções

[ std::swap(std::any)](<#/doc/utility/any/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)
[ make_any](<#/doc/utility/any/make_any>)(C++17) | cria um objeto `any`
(modelo de função)
[ any_cast](<#/doc/utility/any/any_cast>)(C++17) | acesso seguro ao tipo do objeto contido
(modelo de função)

### Sinopse
```cpp
    namespace std {
      // class bad_any_cast
      class bad_any_cast;
    
      // class any
      class any;
    
      // non-member functions
      void swap(any& x, any& y) noexcept;
    
      template<class T, class... Args>
        any make_any(Args&&... args);
      template<class T, class U, class... Args>
        any make_any(initializer_list<U> il, Args&&... args);
    
      template<class T>
        T any_cast(const any& operand);
      template<class T>
        T any_cast(any& operand);
      template<class T>
        T any_cast(any&& operand);
    
      template<class T>
        const T* any_cast(const any* operand) noexcept;
      template<class T>
        T* any_cast(any* operand) noexcept;
    }
```

#### Classe [std::bad_any_cast](<#/doc/utility/any/bad_any_cast>)
```cpp
    namespace std {
      class bad_any_cast : public bad_cast {
      public:
        // see [exception] for the specification of the special member functions
        const char* what() const noexcept override;
      };
    }
```

#### Classe [std::any](<#/doc/utility/any>)
```cpp
    namespace std {
      class any {
      public:
        // construction and destruction
        constexpr any() noexcept;
    
        any(const any& other);
        any(any&& other) noexcept;
    
        template<class T>
          any(T&& value);
    
        template<class T, class... Args>
          explicit any(in_place_type_t<T>, Args&&...);
        template<class T, class U, class... Args>
          explicit any(in_place_type_t<T>, initializer_list<U>, Args&&...);
    
        ~any();
    
        // assignments
        any& operator=(const any& rhs);
        any& operator=(any&& rhs) noexcept;
    
        template<class T>
          any& operator=(T&& rhs);
    
        // modifiers
        template<class T, class... Args>
          decay_t<T>& emplace(Args&&...);
        template<class T, class U, class... Args>
          decay_t<T>& emplace(initializer_list<U>, Args&&...);
        void reset() noexcept;
        void swap(any& rhs) noexcept;
    
        // observers
        bool has_value() const noexcept;
        const type_info& type() const noexcept;
      };
    }
```