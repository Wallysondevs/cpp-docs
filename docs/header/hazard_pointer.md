# Cabeçalho da biblioteca padrão &lt;hazard_pointer&gt; (C++26)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

- [ hazard_pointer_obj_base](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/hazard_pointer_obj_base&action=edit&redlink=1> "cpp/thread/hazard pointer obj base \(page does not exist\)")(C++26) | permite que um objeto seja protegível contra hazards
(modelo de classe)
- [ hazard_pointer](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/hazard_pointer&action=edit&redlink=1> "cpp/thread/hazard pointer \(page does not exist\)")(C++26) | ponteiro de escritor único e múltiplos leitores que pode ser possuído por no máximo uma thread a qualquer momento
(classe)

### Funções

- [ make_hazard_pointer](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/make_hazard_pointer&action=edit&redlink=1> "cpp/thread/make hazard pointer \(page does not exist\)")(C++26) | constrói um hazard pointer
(função)
- [ std::swap(std::hazard_pointer)](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/hazard_pointer/swap2&action=edit&redlink=1> "cpp/thread/hazard pointer/swap2 \(page does not exist\)")(C++26) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Sinopse
```cpp
    namespace std {
      // hazard_pointer_obj_base
      template<class T, class D = default_delete<T>> class hazard_pointer_obj_base;
    
      // hazard_pointer
      class hazard_pointer;
    
      // make_hazard_pointer
      hazard_pointer make_hazard_pointer();
      void swap(hazard_pointer&, hazard_pointer&) noexcept;
    }
```

#### Modelo de classe std::hazard_pointer_obj_base
```cpp
    namespace std {
      template<class T, class D = default_delete<T>>
      class hazard_pointer_obj_base {
      public:
        void retire(D d = D()) noexcept;
      protected:
        hazard_pointer_obj_base() = default;
        hazard_pointer_obj_base(const hazard_pointer_obj_base&) = default;
        hazard_pointer_obj_base(hazard_pointer_obj_base&&) = default;
        hazard_pointer_obj_base& operator=(const hazard_pointer_obj_base&) = default;
        hazard_pointer_obj_base& operator=(hazard_pointer_obj_base&&) = default;
        ~hazard_pointer_obj_base() = default;
      private:
        D deleter;      // apenas para exposição
      };
    }
```

#### Classe std::hazard_pointer
```cpp
    namespace std {
      class hazard_pointer {
      public:
        hazard_pointer() noexcept;
        hazard_pointer(hazard_pointer&&) noexcept;
        hazard_pointer& operator=(hazard_pointer&&) noexcept;
        ~hazard_pointer();
    
        bool empty() const noexcept;
        template<class T> T* protect(const atomic<T*>& src) noexcept;
        template<class T> bool try_protect(T*& ptr, const atomic<T*>& src) noexcept;
        template<class T> void reset_protection(const T* ptr) noexcept;
        void reset_protection(nullptr_t = nullptr) noexcept;
        void swap(hazard_pointer&) noexcept;
      };
    }
```