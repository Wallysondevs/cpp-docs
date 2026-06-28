# Header da biblioteca padrão &lt;rcu&gt; (C++26)

Este header faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

---
[ rcu_obj_base](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/rcu_obj_base&action=edit&redlink=1> "cpp/thread/rcu obj base \(page does not exist\)")(C++26) | permite que um objeto seja protegido por RCU
(modelo de classe)
[ rcu_domain](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/rcu_domain&action=edit&redlink=1> "cpp/thread/rcu domain \(page does not exist\)")(C++26) | fornece regiões de proteção RCU
(classe)

### Funções

[ rcu_default_domain](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/rcu_default_domain&action=edit&redlink=1> "cpp/thread/rcu default domain \(page does not exist\)")(C++26) | retorna uma referência a um objeto de duração estática do tipo `std::rcu_domain`
(função)
[ rcu_synchronize](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/rcu_synchronize&action=edit&redlink=1> "cpp/thread/rcu synchronize \(page does not exist\)")(C++26) | bloqueia até que uma região de proteção seja desbloqueada em um domínio RCU
(função)
[ rcu_barrier](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/rcu_barrier&action=edit&redlink=1> "cpp/thread/rcu barrier \(page does not exist\)")(C++26) | pode avaliar operações agendadas em um domínio RCU e bloqueia até que todas as avaliações precedentes estejam completas
(função)
[ rcu_retire](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/rcu_retire&action=edit&redlink=1> "cpp/thread/rcu retire \(page does not exist\)")(C++26) | agenda a avaliação de uma função especificada em um domínio RCU, potencialmente alocando memória e invocando avaliações agendadas
(modelo de função)

### Sinopse
```cpp
    namespace std {
      template<class T, class D = default_delete<T>> class rcu_obj_base;
    
      class rcu_domain;
    
      rcu_domain& rcu_default_domain() noexcept;
      void rcu_synchronize(rcu_domain& dom = rcu_default_domain()) noexcept;
      void rcu_barrier(rcu_domain& dom = rcu_default_domain()) noexcept;
      template<class T, class D = default_delete<T>>
        void rcu_retire(T* p, D d = D(), rcu_domain& dom = rcu_default_domain());
    }
```

#### Modelo de classe std::rcu_obj_base
```cpp
    namespace std {
      template<class T, class D = default_delete<T>>
      class rcu_obj_base {
      public:
        void retire(D d = D(), rcu_domain& dom = rcu_default_domain()) noexcept;
      protected:
        rcu_obj_base() = default;
        rcu_obj_base(const rcu_obj_base&) = default;
        rcu_obj_base(rcu_obj_base&&) = default;
        rcu_obj_base& operator=(const rcu_obj_base&) = default;
        rcu_obj_base& operator=(rcu_obj_base&&) = default;
        ~rcu_obj_base() = default;
      private:
        D deleter;            // exposition only
      };
    }
```

#### Classe std::rcu_domain
```cpp
    namespace std {
      class rcu_domain {
      public:
        rcu_domain(const rcu_domain&) = delete;
        rcu_domain& operator=(const rcu_domain&) = delete;
    
        void lock() noexcept;
        bool try_lock() noexcept;
        void unlock() noexcept;
      };
    }
```